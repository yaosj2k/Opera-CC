// ==UserScript==
// @name 模仿116.com的网页预览功能
// @lastmodified 2011-3-29
// @include http://www.baidu.com/*
// @include http://www.google.com*
// ==/UserScript==

document.addEventListener("DOMContentLoaded", addpreview, false);

function addpreview(){
   if(location.hostname.indexOf('www.baidu.com')  != -1)
   {var es=document.selectNodes("//a[@class='m']");
	   for(var i=0;i<es.length;i++){
		    try{
			   var oo=document.createElement("a"); 
			   with(oo){
                   setAttribute("onclick","pview(this); return false;");
				   style="text-decoration: none;background: url(http://116.com/static/images/view.gif) left -15px no-repeat;padding-left: 13px;"
				   href="#";
				   innerHTML="预览";
				}
				   if(es[i].parentNode.lastChild.nodeName == "BR")
				   {es[i].parentNode.insertBefore(oo,es[i].parentNode.lastChild);}
				   else
				   {es[i].parentNode.appendChild(oo);}
            }catch(e){}
		}	
	}
	if(location.hostname.indexOf('www.google.com')  != -1)
    {var es=document.selectNodes("//span[@class='f']");
	   for(var i=0;i<es.length;i++){
		    try{
			   var oo=document.createElement("a"); 
			   with(oo){
                   setAttribute("onclick","pview(this); return false;");
				   style="text-decoration: none;background: url(http://116.com/static/images/view.gif) left -15px no-repeat;padding-left: 13px;"
				   href="#";
				   innerHTML="预览";
				}
				   es[i].innerHTML+="-  ";
				   es[i].appendChild(oo);
            }catch(e){}
		}	
	}
}

function pview(obj){
    var stText=obj.innerHTML;
    if(location.hostname.indexOf('www.baidu.com')  != -1)
	{var oPaNode=obj.parentNode.parentNode;}
    if(location.hostname.indexOf('www.google.com')  != -1)
	{var oPaNode=obj.parentNode.parentNode.parentNode;}
	var bHasFrame=oPaNode.getElementsByTagName("iframe");
    var h3=oPaNode.getElementsByTagName("h3")[0];
    var url=h3.getElementsByTagName("a")[0].getAttribute("href");
    if(stText=="预览"){
        if(bHasFrame.length==0){
            var p=document.createElement("p");
            p.style="overflow: hidden;height: 100%;";
            var iframe=document.createElement("iframe");
            iframe.setAttribute("frameborder","0");
            iframe.setAttribute("SECURITY","restricted");
            iframe.setAttribute("src",url);
            iframe.setAttribute("allowtransparency","no");
            iframe.setAttribute("scrolling","auto");
            iframe.style="width: 98%;height: 350px;margin-top: 10px;border: 1px #ccc solid;";
            p.appendChild(iframe);
            oPaNode.appendChild(p);
        }else{
            bHasFrame[0].setAttribute("src",url);
            bHasFrame[0].style.display="block";
        }
        obj.style="text-decoration: none;background: url(http://116.com/static/images/view.gif) left 3px no-repeat;padding-left: 13px;";
        obj.innerHTML="关闭预览";
    }else{
        bHasFrame[0].style.display="none";
        bHasFrame[0].setAttribute("src","");
        obj.style="text-decoration: none;background: url(http://116.com/static/images/view.gif) left -15px no-repeat;padding-left: 13px;";
        obj.innerHTML="预览";
    }
}
