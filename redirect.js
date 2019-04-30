/************************ REDIRECT CODE ***********************/
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return detectRedirect(details);
}, {
    urls: ["<all_urls>"],
    types: ["main_frame", "sub_frame"]
}, ["blocking"]);


function detectRedirect(details) {
    var url = details.url;

    if (url == null) {
        return;
    }

    var domain = url_domain(url);
    var amazonurl = "www.amazon.com";
    var country = "com";

    var https = "https://";
    // ignore links with these strings in them
    var filter = "(sa-no-redirect=)" +
        "|(redirect=true)" +
        "|(redirect.html)" +
        "|(r.html)" +
        "|(f.html)" +
        "|(/gp/dmusic/cloudplayer)" +
        "|(/gp/photos)" +
        "|(/gp/wishlist)" +
        "|(/ap/)" +
        "|(aws.amazon.com)" +
        "|(read.amazon.com)" +
        "|(login.amazon.com)" +
        "|(payments.amazon.com)" +
        "|(amazon.com/clouddrive)" +
        "|(http://)"; //all Amazon pages now redirect to HTTPS, also fixes conflict with HTTPS Everywhere extension

    // Don't try and redirect pages that are in our filter
    if (url.match(filter) != null) {
        return;
    }

    return redirectToSmile(https, amazonurl, url, country);
}

function redirectToSmile(scheme, amazonurl, url, country) {
    var smileurl = "smile.amazon.com";
    return {
        // redirect to amazon smile append the rest of the url
        redirectUrl: url.replace("www.amazon", "smile.amazon") + "?sa-no-redirect=1"
    };
}

function url_domain(data) {
    var a = document.createElement('a');
    a.href = data;
    return a.hostname;
}