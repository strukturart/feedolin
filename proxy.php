<?php

// ========================
// CORS
// ========================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Accept, Range");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

// ========================
// INPUT
// ========================
$url = $_GET['cors'] ?? null;

if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    exit("Invalid URL");
}

// ========================
// MINIMAL SSRF PROTECTION
// ========================
$host = parse_url($url, PHP_URL_HOST);
$ip = gethostbyname($host);

$blocked = [
    '127.0.0.1',
    'localhost',
    '0.0.0.0',
    '169.254.169.254'
];

if (in_array($ip, $blocked, true)) {
    http_response_code(403);
    exit("Blocked host");
}

// ========================
// CURL
// ========================
$ch = curl_init($url);

// Forward headers (important for APIs + auth + range)
$forwardHeaders = [];

foreach (getallheaders() as $k => $v) {
    $kl = strtolower($k);

    if (in_array($kl, ['accept', 'user-agent', 'authorization', 'range'])) {
        $forwardHeaders[] = "$k: $v";
    }
}

// ========================
// CRITICAL: NO BUFFERING (chunk safe)
// ========================
curl_setopt_array($ch, [
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_RETURNTRANSFER => false,   // 🔥 key for chunk streaming
    CURLOPT_HTTPHEADER => $forwardHeaders,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_TIMEOUT => 60,

    // 🔥 stream directly to output (chunk passthrough)
    CURLOPT_WRITEFUNCTION => function ($ch, $data) {
        echo $data;
        flush();
        return strlen($data);
    },

    // forward response headers (content-type, length, etc.)
    CURLOPT_HEADERFUNCTION => function ($ch, $header) {
        $len = strlen($header);
        $parts = explode(':', $header, 2);

        if (count($parts) == 2) {
            $name = strtolower(trim($parts[0]));
            $value = trim($parts[1]);

            // safe headers only
            if (in_array($name, [
                'content-type',
                'content-length',
                'accept-ranges',
                'content-range',
                'transfer-encoding'
            ])) {
                header("$parts[0]: $value");
            }
        }

        return $len;
    }
]);

// ========================
// EXECUTE
// ========================
$ok = curl_exec($ch);

if ($ok === false) {
    http_response_code(500);
    echo "Proxy error: " . curl_error($ch);
}

$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
http_response_code($code ?: 200);

curl_close($ch);
