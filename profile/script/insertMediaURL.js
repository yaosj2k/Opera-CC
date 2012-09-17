// ==UserScript==
// @name insertVideoURL
// @description 插入视频源地址
// @lastmodified 2012-9-17
// @include http*
// ==/UserScript==


(function(){
    if(!window.opera)return;
    function process()
    {
        var list=window.document.getElementsByTagName("embed");
        if(!list)return;
        for (i=0;i<list.length;i++)
        {
            var url=list[i].getAttribute("src");
            if (/player\.youku\.com/.test(url)){
                var f_url="http://v.youku.com/v_show/id_"+url.match(/\w{13}/)+".html";
            }
            else if (/www\.tudou\.com/.test(url)){
                var f_url="http://www.tudou.com/programs/view/"+url.split('\/')[4]+'/'+url.split('\/')[5];
            }
            else if (/video\.sina\.com\.cn/.test(url)){
            var f_url="http://you.video.sina.com.cn/b/"+url.match(/\d{8}(_|-)\d{10}/g)[0]+".html";
            }
            else if (/player\.56\.com/.test(url)){
            var f_url="http://www.56.com/u/v_"+url.match(/\w{11}(?=.swf)/)[0]+".html";
            }
            else{
                continue;
            }
            
            var click_area=document.createElement('p');
            click_area.setAttribute('align','center');
            
            var click_button=document.createElement('a');
            var a_text=document.createTextNode('▲用户视频入口');
            click_button.setAttribute('href','mplayer:'+f_url+','+window.location.href);
            click_button.setAttribute('style',"clear:both");
            click_button.appendChild(a_text);

            click_area.appendChild(click_button)

            var iparent=list[i].parentNode;
            if(iparent.lastChild==list[i]){
                iparent.appendChild(click_area);
            }else
            {
                iparent.insertBefore(click_area,list[i].nextSibling);
            }
        }
    }
    
    window.addEventListener("DOMContentLoaded",process,false);

})();
