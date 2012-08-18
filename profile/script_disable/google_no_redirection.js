// ==UserScript==
// @name google_no_redirection
// @author X
// @description google_no_redirection
// @create 2011-12-2
// @lastmodified 2011-12-2
// @version 1.0.0.0
// @include http://203.208.46.176/*
// ==/UserScript==


(function() {
    function xpath(expr)
    {
        return document.evaluate(
            expr,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
    }

    function base_process(evt) 
    {
        var redirect_re = /url\?(?:url|q)=([^&]*)/;
        var links = xpath("//div[@id='res']//a[starts-with(@href, '/url') or \
            starts-with(@href, 'http://www.google.com/url') or \
            starts-with(@href, 'http://webcache.googleusercontent.com') or \
            starts-with(@onmousedown, 'return rwt(this,') or \
            starts-with(@onmousedown, 'return clk(this,')]");

        evt.stopPropagation();

        for (var i=0, l="", len=links.snapshotLength; i < len; i++) {
            l = links.snapshotItem(i);

            if (l.hasAttribute("onmousedown"))
                l.removeAttribute("onmousedown");

            if (l.href.indexOf("http://webcache.googleusercontent.com") != -1)
                l.href = l.href.replace("http://webcache.googleusercontent.com", 
                    "https://www.ggssl.com/cache");
            else if (redirect_re.test(l.href))  
                l.href = decodeURIComponent(l.href.match(redirect_re)[1]);

            if (!l.hasAttribute("title"))
                l.setAttribute("title", l.href);
        }
    }

    function process(evt)
    {
        base_process(evt)

        var mblinks = xpath("//a[@class='mblink']");

        for(var i = 0, len = mblinks.snapshotLength; i < len; i++)
           mblinks.snapshotItem(i).addEventListener("DOMNodeInserted", base_process, false);
    }
    
    window.addEventListener("DOMContentLoaded", process, false);

    window.addEventListener("hashchange", process, false);
})();