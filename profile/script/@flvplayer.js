// ==UserScript==
// @name flvplayer
// @lastmodified 2012-5-30
// @include http://v.youku.com/*
// @include http://www.bilibili.tv/video/av*
// ==/UserScript==


(function(){
	if(!window.opera)return;
    function process()
    {
        var play_button=document.createElement("div");
        var click_button=document.createElement("a");
        click_button.setAttribute('href','mplayer:'+window.location.href+','+window.location.href);
        play_button.appendChild(document.createTextNode('play by mplayer'));
        play_button.setAttribute('style',"width:50px;height:50px;background:blue;color:white;")
        click_button.setAttribute('style',"position:absolute;top: 30px; right: 30px; z-index: 10000;")
        click_button.appendChild(play_button)
        document.body.appendChild(click_button)
    }
    
    window.addEventListener("DOMContentLoaded",process,false);

})();
