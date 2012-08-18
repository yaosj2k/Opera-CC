// ==UserScript==
// @name verycd_dl
// @author NLF
// @description ~~
// @create_date 2011-3-5
// @mod_date 2011-3-5
// @version 1.0.0.0
// @namespace  http://userscripts.org/users/NLF
// @include http://www.verycd.com/topics/*
// ==/UserScript==

(function(){

	//string转为DOM
	function createDocumentByString(str){
		if(!str){
			return;
		};
		if(document.documentElement.nodeName != 'HTML'){
			return new DOMParser().parseFromString(str, 'application/xhtml+xml');
		};
		var doc;
		if(document.implementation.createHTMLDocument){
			doc=document.implementation.createHTMLDocument('superPreloader');
		}else{
			try{
				doc=document.cloneNode(false);
				doc.appendChild(doc.importNode(document.documentElement, false));
				doc.documentElement.appendChild(doc.createElement('head'));
				doc.documentElement.appendChild(doc.createElement('body'));
			}catch(e){};
		};
		if(!doc)return;
		var range=document.createRange();
		range.selectNodeContents(document.body);
		var fragment = range.createContextualFragment(str);
		doc.body.appendChild(fragment);
		var headChildNames={
			TITLE: true,
			META: true,
			LINK: true,
			STYLE:true, 
			BASE: true
		};
		var child;
		var body=doc.body;
		var bchilds=body.childNodes;
		for(var i=bchilds.length-1;i>=0;i--){//移除head的子元素
			child=bchilds[i];
			if(headChildNames[child.nodeName])body.removeChild(child);
		};
		//alert(doc.documentElement.innerHTML);
		return doc;
	};

	//xpath 获取单个元素
	function getElementByXpath(xpath,contextNode,doc){
		doc=doc || document;
		contextNode=contextNode || doc;
		return doc.evaluate(xpath,contextNode,null,9,null).singleNodeValue;
	};

	document.addEventListener('DOMContentLoaded',function(){
		var iptcomED2K=document.getElementById('iptcomED2K');
		if(!iptcomED2K)return;
		var resa=getElementByXpath('.//a[contains(text(),"搜索相关文件")]',iptcomED2K);
		if(!resa)return;
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(this.readyState!=4)return;
			var str=this.responseText;
			var doc=createDocumentByString(str);
			if(!doc)return;
			var dlc=getElementByXpath('//*[@id="file-results"]/table[@class="result"]','',doc);
			if(!dlc)return;
			dlc=doc.importNode(dlc,true);
			//resa.parentNode.replaceChild(dlc,resa);
			iptcomED2K.appendChild(dlc);
			dlc.style.cssText='\
				border:1px solid #ccc;\
			';
		};
		xhr.open("GET",resa.href,true);
		xhr.overrideMimeType('text/html; charset=' + document.characterSet);
		xhr.send(null);
	},false);
})();