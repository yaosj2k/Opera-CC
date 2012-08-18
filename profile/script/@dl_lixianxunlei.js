// ==UserScript==
// @name insertDL
// @description xunDL
// @create 2012-4-10
// @lastmodified 2012-4-10
// @version 1.0.0.0
// @include http://dynamic.cloud.vip.xunlei.com/*
// ==/UserScript==


(function(){
	if(!window.opera)return;
    function process()
    {
        document.getElementById('main_nav').style.width="800px";
        var dl_url=document.querySelectorAll("[id^='dl_url']");

        var click_area=document.createElement('li');
        click_area.setAttribute('align','center');
        var click_button=document.createElement('a');
        var a_text=document.createTextNode('▲click to download');
        click_button.setAttribute('href','');
        click_button.appendChild(a_text);
        click_button.id='insert_url';
        click_area.appendChild(click_button);
        document.querySelector('#main_nav').children[0].appendChild(click_area);

        for (i=0;i<dl_url.length;i++){
            url=dl_url[i].value;
            if(url){
                var dl_button=document.createElement('a');
                var a_text=document.createTextNode('▲build DL');
                //dl_button.setAttribute('onclick',"javascript:var click_area=document.createElement('li');click_area.setAttribute('align','center');var click_button=document.createElement('a');var a_text=document.createTextNode('▲download');click_button.setAttribute('href','dl:'+'"+url+"'+','+window.location.href+','+document.cookie);click_button.appendChild(a_text);click_area.appendChild(click_button);document.querySelector('#main_nav').children[0].appendChild(click_area);");
                dl_button.setAttribute('onclick',"javascript:document.getElementById('insert_url').href='dl:'+'"+url+"'+','+window.location.href+','+document.cookie");
                dl_button.appendChild(a_text);
                dl_url[i].parentNode.appendChild(dl_button);
            }
            
            /*
            var click_area=document.createElement('li');
            click_area.setAttribute('align','center');
            var click_button=document.createElement('a');
            var a_text=document.createTextNode('▲download');
            click_button.setAttribute('href','dl:'+url+','+window.location.href+document.cookie);
            click_button.appendChild(a_text);

            click_area.appendChild(click_button);
            document.querySelector('#main_nav').children[0].appendChild(click_area);
            */
        }
        
    }
    
    function bt_process2(){
        var btdown_url=document.querySelectorAll("[id^='btdownurl']");
        var click_area=document.createElement('li');
        click_area.setAttribute('align','center');
        var click_button=document.createElement('a');
        var a_text=document.createTextNode('▲click to download');
        click_button.setAttribute('href','');
        click_button.appendChild(a_text);
        click_button.id='insertbt_url';
        click_area.appendChild(click_button);
        document.querySelector('#view_bt_list_nav').children[0].appendChild(click_area);
        for (i=0;i<btdown_url.length;i++){
            url=btdown_url[i].value;
            if(url){
                var dl_button=document.createElement('a');
                var a_text=document.createTextNode('▲build DL');
                dl_button.setAttribute('onclick',"javascript:document.getElementById('insertbt_url').href='dl:'+'"+url+"'+','+window.location.href+','+document.cookie");
                dl_button.appendChild(a_text);
                btdown_url[i].parentNode.insertBefore(dl_button,btdown_url[i]);
            }
        }
        
    }
    
    window.addEventListener("DOMContentLoaded",process,false);
    window.opera.addEventListener("AfterScript",bt_process2,false);

})();
