// ==UserScript==
// @name            Auto-Hide Statusbar
// @author          The-Doc, kyleabaker
// @version         0.5
// @namespace       http://extendopera.org/userjs/
// @description     Shows a temporary status bar when the cursor is over a link
// @include         *
// ==/UserScript==
// This script is based on Foursquared usercss - http://extendopera.org/css/content/chromes-status-bar-opera-browser

// Changelog
// v0.5 (2010-08-01)
//          [*] Prevent bar from remaining visible after moving back in history 
//          [*] Fix HTML entities showing in title
//          [*] Status bar is now hidden if it overlays the mouse cursor
// v0.4 (2010-05-30) {kyleabaker}
//          [+] Added border radius to top right
//          [+] Added listeners to elements with defined titles
//          [+] Added 'parent' specifier to control the placement of the statusbar when dealing with iframes
//          [*] Matched default background color to Opera's normal status bar color
// v0.3 (2010-05-16)
//          [*] Script applied once the DOM is loaded
// v0.2 (2010-05-06)
//          [*] Fix overlay issue
// v0.1 (2010-04-28)
//          [+] Initial release

(function ()
{
    ////////////////////////////////////////////////////////////////////
    // Preferences
    ////////////////////////////////////////////////////////////////////
    var font_size    = /*@Font size (px)@int@*/14/*@*/;
    var font_color   = '/*@Font color@string@*/#000/*@*/';
    var bg_color     = '/*@Background color@string@*/#EEE/*@*/';
    var opacity      = /*@Opacity@int@*/0.9/*@*/;
    var border       = /*@Enable border@bool@*/true/*@*/;
    var border_color = '/*@_Border color@string@*/#999/*@*/';
    ////////////////////////////////////////////////////////////////////

    var sb;

    init();

    function init()
    {
        var allTags = new Array();
        allTags = document.getElementsByTagName("*");
        var allTagsLength = allTags.length;
        
        // Add listener to elements with defined titles and/or href
        for (var i=0; i<allTagsLength; ++i)
        {            
            if (allTags[i].title || allTags[i].href)
            {
                allTags[i].addEventListener("mouseOver", hello, false);
                allTags[i].addEventListener("mouseOut", bye, false);
                allTags[i].addEventListener("mouseMove", oncollision, false);
                
                // Prevent temporary status bar from remaining visible after moving back in history by Opera mouse flip
                allTags[i].addEventListener("mouseDown", bye, false);  
            }
        }
    }


    function hello()
    {
        // Create a statusbar
        if (sb == undefined)
        {
            sb = parent.document.createElement('span');

            sb.style.overflow="hidden !important";
            sb.style.whiteSpace="nowrap !important";
            sb.style.position="fixed !important";
            sb.style.bottom="0 !important";
            sb.style.left="0 !important";
            sb.style.zIndex="2147483647 !important";

            if (border)
            {
                sb.style.border="1px solid "+border_color+" !important";
                sb.style.borderLeft="0 !important";
                sb.style.borderBottom="0 !important";
            }
            else
            {
                sb.style.border="0";
            }

            sb.style.background=bg_color+" !important";
            sb.style.opacity=opacity+" !important";
            sb.style.color=font_color+" !important";
            sb.style.fontSize=font_size+"px !important";
            sb.style.lineHeight=font_size+"px !important";
            sb.style.padding="2px !important";
            sb.style.width="auto !important";
            sb.style.maxWidth="80% !important";
            sb.style.OTextOverflow="ellipsis !important";

            sb.style.fontStyle="normal !important";
            sb.style.fontWeight="normal !important";
            sb.style.fontVariant="normal !important";
            sb.style.letterSpacing="normal !important";
            sb.style.textDecoration="none !important";
            sb.style.textAlign="left !important";
            sb.style.fontFamily='"Trebuchet MS", Arial, sans-serif !important';

            sb.style.borderRadius="0 6px 0 0";

            parent.document.body.appendChild(sb);
        }
        // If statusbar already created, then just set to visible
        else
        {
            sb.style.display="block";
        }



        if (this.title && this.href && (this.title != this.href) && (this.title+"/" != this.href))
        {
            sb.innerHTML=htmlentities(this.title)+"<br>"+this.href;
        }
        else if (this.href)
        { 
            sb.innerHTML=this.href;
        }
        else
        {
            sb.innerHTML=htmlentites(this.title);
        }
    }


    // Test if the status bar and the mouse cursor are overlayed or not
    function oncollision(e)
    {
        if ( (window.innerHeight-sb.offsetHeight) < window.event.clientY
                && (sb.offsetWidth) > window.event.clientX )
        {
            // The status bar hides a link, so we set it to off
            sb.style.display='none';
        }
    }

    function bye()
    {
        // Hide the statusbar
        sb.style.display="none";
    }
    
    function htmlentities(str)
    {
        str = str.replace(/&/g,'&amp;');
        str = str.replace(/'/g,'&#39;');
        str = str.replace(/</g,'&lt;');
        str = str.replace(/>/g,'&gt;');
        str = str.replace(/\^/g,'&circ;');
        str = str.replace(/«/g,'&laquo;');
        str = str.replace(/»/g,'&raquo;');
        return str;
    }

    document.addEventListener('DOMContentLoaded', init, false);
})();
