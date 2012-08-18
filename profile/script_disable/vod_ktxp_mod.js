// ==UserScript==
// @name vod_mod
// @create 2012-4-12
// @lastmodified 2012-4-12
// @include http://vod.ktxp.com*
// ==/UserScript==

//opera.defineMagicFunction('getFlashPlayerVersion', function()
//{
            //return {
                //major: true,
                //minor: h.pv[1],
                //release: h.pv[2]
            //}
//});
(function(){
	if(!window.opera)return;
    
addEventListener('load', function (e)
{
  if (!document.body)
  {
    return;
  }
  var mydiv = document.createElement('div');
  mydiv.style.position = 'fixed';
  mydiv.style.top = '0px';
  mydiv.style.right = '0px';
  mydiv.style.border = '1px solid #000';
  mydiv.style.backgroundColor = '#fff';
  mydiv.style.color = '#000';
  mydiv.appendChild(document.createTextNode(document.compatMode))
  document.body.appendChild(mydiv);
}, false);

//opera.defineMagicFunction('getFlashPlayerVersion', function()
//{
            //return {
                //major: true,
                //minor: h.pv[1],
                //release: h.pv[2]
            //}
//});

})();
