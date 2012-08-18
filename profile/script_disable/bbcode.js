// ==UserScript==
// @name BBCode
// @author Lex1
// @version 1.6.8 (oac)
// @description Inserts any BBCode and HTML tags. Use button with similar code: "javascript:ujs_bbcode_tag('[b]')".
// @ujs:documentation http://lexi.ucoz.ru/index/0-5
// @ujs:download http://lexi.ucoz.ru/oac/bbcode.js
// ==/UserScript==



document.addEventListener('mouseup', function(e){
	var link=e.target;
	link=link.selectSingleNode('ancestor-or-self::*[(local-name()="a" or local-name()="area") and @href]');
	if(link && link.href){window.lastHoveredLink=link};
}, true);

document.addEventListener('mouseup', function(e){navigator.lastClicked=e.target}, true);
document.addEventListener('focus', function(e){
	var et=e.target;
	var tag=et.tagName && et.tagName.toLowerCase();
	if(tag=='textarea' || (tag=='input' && et.type=='text')){navigator.lastFocusedTextArea=et};
}, true);


function ujs_bbcode_tag(tag){
	var getTextarea=function(){
		var t, ta=document.getElementsByTagName('textarea');
		var tl=ta.length-1;
		do{t=ta[tl]; tl--} while(t && (t.rows<5 || t.offsetHeight==0));
		return t;
	};
	var ts=document.getSelection();
	var ta=navigator.lastFocusedTextArea || getTextarea();
	if(!ta)return;

	var s, e_tag;
	var s_tag=tag;
	var nStart=ta.selectionStart;
	var nEnd=ta.selectionEnd;
	var txt=ta.value.substring(nStart,nEnd);
	var s_txt=ta.value.substring(0,nStart);
	var e_txt=ta.value.substring(nEnd,ta.value.length);

	var al=arguments.length;
	if(al==2 && arguments[1]!=''){
		e_tag=arguments[1];
	}
	else{
		e_tag=tag.replace(/(^.)([^= ]*)(.*)(.$)/, '$1/$2$4');
	};

	var stl=s_tag.length;
	var etl=e_tag.length;
	var lt=stl+etl;

	if(txt.indexOf(s_tag)==0 && txt.lastIndexOf(e_tag)==(txt.length-etl)){
		s=s_txt+txt.slice(stl, -etl)+e_txt;
		nEnd-=lt;
	}
	else{
		if(nStart==nEnd && s_txt.lastIndexOf(s_tag)==s_txt.length-stl && e_txt.indexOf(e_tag)==0){
			s=s_txt.slice(0,-stl)+e_txt.slice(etl);
			nStart-=stl;
			nEnd=nStart;
		}
		else{
			if(ts && ta!=navigator.lastClicked){
				s=s_txt+txt+s_tag+ts+e_tag+e_txt;
				nStart=nEnd;
				nEnd+=ts.length;
				txt=ts;
			}
			else{
				s=s_txt+s_tag+txt+e_tag+e_txt;
			};

			if(txt.length==0 && s_tag!=''){
				nStart+=stl;
				nEnd=nStart;
			}
			else{
				if(s_tag.slice(-4,-1)=='=""' || s_tag.slice(-2,-1)=='=' && s_tag.slice(-1)!='"'){
					nStart=nStart+stl-(s_tag.slice(-3,-1)=='""' ? 2 : 1);
					nEnd=nStart;
				}
				else{
					nEnd+=lt;
					if(s_tag=='' || s_tag.slice(-1)=='"' || (al==2 && arguments[1]==''))nStart=nEnd;
				}
			}
		}
	};

	ta.value=s;
	ta.setSelectionRange(nStart, nEnd);
	ta.focus();
};


function ujs_prequote(v){
	var n='';
	var u='';
	var c=navigator.lastClicked;
	if(location.hostname=='forum.ru-board.com'){
		while(c.className!='tpc' && c.parentNode){c=c.parentNode};
		if(c.className!='tpc')return;
		var tn=c.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[1];
		n='[b]'+c.parentNode.firstChild.innerText.replace(/\n.*/g,'')+'[/b] ';
		u='[url='+tn.childNodes[5].href+'][color=#007777][size=1][u]'+
		tn.childNodes[7].innerText.replace(/^ +/,'').replace(/ +$/,'')+'[/u][/size][/color][/url] ';
	};
	if(window.smf_theme_url){
		while(c.className.indexOf('windowbg')==-1 && c.parentNode){c=c.parentNode};
		var dv=c.getElementsByTagName('div');
		for(var i=0, di; di=dv[i]; i++){if(di.className=='post'){c=di; break}};
		if(c.className!='post')return;
		var a=c.parentNode.getElementsByTagName('a')[0];
		n='[b]'+c.parentNode.parentNode.getElementsByTagName('a')[0].innerText+'[/b] ';
		u='[url='+a.href+'][size=1][u][?][/u][/size][/url] ';
	};
	if(v.indexOf(n)!=-1)n='';
	if(v.indexOf(u)!=-1)u='';
	return n+u;
};