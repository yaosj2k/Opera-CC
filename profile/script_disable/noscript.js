// ==UserScript==
// @name           Disable javascript
// @exclude        http://web2.qq.com/*
// @include        http://*
// ==/UserScript==

window.opera.addEventListener('BeforeExternalScript',function (e){e.preventDefault();},false);
window.opera.addEventListener('BeforeScript',function (e){e.preventDefault();},false);
