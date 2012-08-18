// ==UserScript==
// @name Let me see where images
// @author Lex1
// @version 1.4.1
// @description  Replaces empty or undefined image attributes
// ==/UserScript==

window.addEventListener('DOMContentLoaded',function(e){
    // 判断是否为图片浏览页面
    var oLinks = document.getElementsByTagName("link");
   if (oLinks && oLinks.length === 1 && oLinks[0].href === "opera:style/image.css")
      return;

   var d = document.selectNodes('//img[@src]');
   for (var i=0, di; di=d[i]; i++){
      if(di.getAttribute ('alt')==''){
         di.setAttribute ('alt', '#');
         di.style.fontFamily='verdana';
         di.style.fontSize='12';
      };
      if(!di.complete){
         di.style.color='#000000';
         di.style.background = '';
      };
   }
},false);