// ==UserScript==
// @name           baiducss
// @namespace      baiducss
// @description    baiducss
// @include        http://www.baidu.com/*
// ==/UserScript==

(function(){
var owrapper=document.getElementById("wrapper");
var obr=owrapper.getElementsByTagName("br");
for (i = obr.length-1;i>=0;i--){
    obr[i].parentNode.removeChild(obr[i]);
}
})();
