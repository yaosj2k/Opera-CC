// ==UserScript==

// @name         Background huyll
// @description
// @description0x0804
// @author       Smilefly
// @injectframes     1
// @run-at        document_start
// ==/UserScript==

//护眼浏览
function FGrgb(Grgb){
   var color;
   if(Grgb.charAt(0)=="#"){
      var _color = Grgb.substr(1);
      _color = _color.toLowerCase();
      var _1, _2, _3;
      if(_color.length == 3){
         _1 = _color.substr(0,1);
         _1 = _1 + _1;
         _2 = _color.substr(1,1);
         _2 = _2 + _2;
         _3 = _color.substr(2,1);
         _3 = _3 + _3;
      }else{
         _1 = _color.substr(0,2);
         _2 = _color.substr(2,2);
         _3 = _color.substr(4,2);
      }
      color = {
         r: parseInt(_1, 16),
         g: parseInt(_2, 16),
         b: parseInt(_3, 16)
      };
   }else{
      var kaisi=Grgb.indexOf(",");
         if(kaisi > 0){
         var Gr=parseInt(Grgb.slice(4,kaisi));
         var kaisi1=Grgb.indexOf(",",kaisi+1);
         var Gg=parseInt(Grgb.slice(kaisi+1,kaisi1));
         var Gb=parseInt(Grgb.slice(kaisi1+1,Grgb.length-1));
         color = {
            r: Gr,
            g: Gg,
            b: Gb
         };
      }else{
         color = {
            r: -1,
            g: -1,
            b: -1
         };
      }
   }
   return color;
}

function FGrdb_init(e) {
var Gcolor = "#F0F0F0";color
var color = "#e5ede0"; 
var colorDiff = 20;  


var Lcolor=""; 

Gcolor = FGrgb(Gcolor);
Lcolor= (document.all) ?  document.body.currentStyle["backgroundColor"] : document.defaultView.getComputedStyle(document.body, "").getPropertyValue("background-Color");
var _Color = FGrgb(Lcolor);


if ((_Color.r > Gcolor.r && _Color.g > Gcolor.g && _Color.b > Gcolor.b && Math.abs(_Color.r - _Color.g) <= colorDiff && Math.abs(_Color.r - _Color.b) <= colorDiff && Math.abs(_Color.g - _Color.b) <= colorDiff) || Lcolor=="transparent")
{
   document.body.style.backgroundColor=color;
}
var alltags = (document.all) ? document.all : document.getElementsByTagName("*");
var n = alltags.length, x;
for (var i=0; i<n; i++) {
   x = alltags[i];
   Lcolor = (document.all) ? x.currentStyle["backgroundColor"] : document.defaultView.getComputedStyle(x, "").getPropertyValue("background-Color");
   _Color = FGrgb(Lcolor);
   if (_Color.r > Gcolor.r && _Color.g > Gcolor.g && _Color.b > Gcolor.b && Math.abs(_Color.r - _Color.g) <= colorDiff && Math.abs(_Color.r - _Color.b) <= colorDiff && Math.abs(_Color.g - _Color.b) <= colorDiff) {
      x.style.backgroundColor = color;
   }
}
}
if(window.addEventListener){
   document.addEventListener("DOMContentLoaded", FGrdb_init, false);
}else{
   window.attachEvent("onload", FGrdb_init);
}
