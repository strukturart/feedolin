    const cache = (() => {
        let getTime = function(cache_buffer) {
            let timestamp = Date.now();
            timestamp = timestamp.toString();

            let cache_time = Number(localStorage.getItem("cache_time"));

            //if id not set - do it

            if (cache_time == null || timestamp > (cache_buffer + cache_time)) {
                localStorage.setItem("cache_time", timestamp);
                //download
                return true
            } else {
                //cache
                return false
            }

        }



        let loadCache = function() {
            return JSON.parse(localStorage.getItem("data"));
        }

        let saveCache = function(data) {
            localStorage.setItem("data", JSON.stringify(data));
            alert(JSON.stringify(data))

        }

        return { getTime, saveCache, loadCache };
    })();