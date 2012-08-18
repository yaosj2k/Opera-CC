// ==UserScript==
// @name noWhiteTextColor
// @author lazyPig
// @date 2011-4-1
// ==/UserScript==
(function() {
    function noWhiteTextColor() {
        function changeTextColor(x)  {  // auto change text colors
            var colorHex=window.getComputedStyle(x,null).color;  // get text color
            if(colorHex.charAt(0)=="#")  {  // convert hex color to rgb color to compare
                var hexCode=colorHex.substring(1);  //get rid of the "#" in front of a hex color
                var hexRed=hexCode.substring(0,2);  // pick the first two hex numbers， which represents red
                var hexGreen=hexCode.substring(2,4);
                var hexBlue=hexCode.substring(4,6);
                var red=parseInt(hexRed, 16);  //hex to decimal
                var green=parseInt(hexGreen, 16);
                var blue=parseInt(hexBlue, 16);
                }
            if (red>=230&&red<=255&&green>=230&&green<=255&&blue>=230&&blue<=255)  {  //set the color range to change
                x.style.color="#483d8b";}  // choose the text color you want
            }        
        var allElements=document.getElementsByTagName("*");  // get all elements on a page
        for(var i=0; i<allElements.length; i++)  {
            changeTextColor(allElements[i]);}
    }
    window.opera.addEventListener("AfterEvent.load",noWhiteTextColor, false);
})();
