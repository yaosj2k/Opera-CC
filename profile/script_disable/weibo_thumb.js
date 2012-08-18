// ==UserScript==
// @name scale_weibo_thumb
// @include http://weibo.com/*
// ==/UserScript==
(function(){
	if(!window.opera)return;
    function process()
    {
        thm=document.getElementsByClassName("bigcursor");for(i=0;i<thm.length;i++){thm[i].click()}
    }
    window.addEventListener("DOMContentLoaded",process,false);
})();
