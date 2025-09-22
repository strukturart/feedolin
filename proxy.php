<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Requested-With");

// Parse input data
$requestBody = file_get_contents("php://input");
$isJsonRequest = false;
$requestData = json_decode($requestBody, true);
if (json_last_error() === JSON_ERROR_NONE) {
    $isJsonRequest = true;
}

// Determine request parameters
$method = $_REQUEST['method'] ?? 'GET'; // Default to GET if method is not provided
$url = $isJsonRequest ? $requestData['cors'] ?? null : ($_REQUEST['cors'] ?? null);

// Handle direct query string URL (e.g., ?https://example.com..)
if (!$url && isset($_SERVER['QUERY_STRING']) && filter_var($_SERVER['QUERY_STRING'], FILTER_VALIDATE_URL)) {
    $url = $_SERVER['QUERY_STRING'];
}

if (!$url) {
    echo json_encode(["message" => "PROXY ACCESS DENIED! URL not specified"]);
    exit();
}

// Prepare headers
$headers = [];
foreach (getallheaders() as $key => $value) {
    if (in_array(strtolower($key), ['content-type', 'authorization', 'x-requested-with'])) {
        $headers[] = "$key: $value";
    }
}

// Prepare CURL options
$curl = curl_init();
switch (strtoupper($method)) {
    case 'POST':
        $postData = $isJsonRequest ? $requestData : $_POST;
        unset($postData['method'], $postData['cors']);
        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $isJsonRequest ? json_encode($postData) : http_build_query($postData),
        ]);
        break;

    case 'GET':
        $getData = $isJsonRequest ? $requestData : $_GET;
        unset($getData['method'], $getData['cors']);
        $queryString = http_build_query($getData);
        curl_setopt($curl, CURLOPT_URL, $url . ($queryString ? "?$queryString" : ""));
        break;

    default:
        echo json_encode(["message" => "Proxy only supports POST and GET requests"]);
        exit();
}

curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => false, // Disable for development, enable in production
    CURLOPT_HTTPHEADER => $headers,
]);

// Execute CURL request
$response = curl_exec($curl);
$error = curl_error($curl);
curl_close($curl);

if ($error) {
    echo json_encode(["error" => $error]);
    exit();
}

// Set response content type if possible
if (json_decode($response) !== null) {
    header('Content-Type: application/json');
} elseif (strpos($response, '<?xml') === 0) {
    header('Content-Type: application/xml');
}

// Output the response
echo $response;
