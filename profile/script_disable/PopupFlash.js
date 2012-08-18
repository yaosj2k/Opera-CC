// ==UserScript==
// @author yansyrs
// @name PopupFlash
// @description 在 flash 旁出现一个按钮，点击后可放大浮动在页面上。
// @version v1.0.0
// @include *
// ==/UserScript==

(function(){
/* -------------------------------------------- 设置开始 ------------------------------------------*/
	// 箭头按钮的尺寸，w 为宽度，h 为高度。单位为像素
	var POPUP_ICON_SIZE = {w: 34, h: 50};
	
	// 浮动的 FLASH 的尺寸，默认长和宽为浏览器页面大小的 70%
	var POPUP_FLASH_SIZE = 70;
	
	// 浮动 FLASH 的最小宽度，单位为像素
	var POPUP_FLASH_MIN_WIDTH = 640;
	
	// 浮动 FLASH 的最小高度，单位为像素
	var POPUP_FLASH_MIN_HEIGHT = 480;
	
	// 黑色背景的不透明度，0 为全透，1 为不透
	var BACKGROUND_OPACITY = 0.8;
	
	// 点击背景关闭浮动的 FLASH，true 为开启，false 为关闭
	var CLICK_BLANK_TO_CLOSE = true;
/* -------------------------------------------- 设置结束 ------------------------------------------*/
	
	var icon = {
		popup_icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAyCAYAAAA5kQlZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJGODY2QUVCRkQyQTExRTBBM0NDOTE0MzkyMTY0NUE3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJGODY2QUVDRkQyQTExRTBBM0NDOTE0MzkyMTY0NUE3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkY4NjZBRTlGRDJBMTFFMEEzQ0M5MTQzOTIxNjQ1QTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkY4NjZBRUFGRDJBMTFFMEEzQ0M5MTQzOTIxNjQ1QTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6aIVL8AAACP0lEQVR42syZzY0CMQyFM9EAEhTCnTsHoAJogxpAAlqgEe78HKCJVMPy0M7IROPE+dslUgQSI/Lxnp04pno+n+obhlZfMoqCLJdLczgcjOhhWFNizmYzU9f1e+73e+N7vjiEFKY4RK/XE8EUV8IG4mCqXOk7n8/N/X4XPbvZbNR2ux1nz5oQiKqq1CuTlJ1NugQEFnNlKcbLog8YXQIixm6d2w4XRKMUXl8xglgZJ4E0EC4LXLYgWClEFAhVIsYCW4lm1KWyo8uWLiWCFaEQLku4z1wQYhAbItQSzo6PH+D70hQ7pBBeRWIgoFhjjxTCCeKC8O2cmCEQLIhPCWonhWre+wJTBBKqBIXC+66TNRgEEI/HQ6SE9HgPBmkgYuuTFIgWBNU27JAeWF0pmgLRgkwmE/GB1QV7u93y3GsQ4fhVsQNqwtosF6z/htFWwAXD0JhJgdEd0R8EY8dMLIxmUpGF4bb3VGW0Y19oYegi3Paeqoz2bFJvGOniKQHsLYxsmzioVBhRhcbFjPQ4kMCIa1ZpNnEq+WCCrhM2jK8ssAcOVQ4mqhuAOyvurrFjOp2q6/Wa3g2IsYnWsl02Rd99AYMaxAXxbsD8Lt52hohNq9UqTzcANYitDF3YFTP9fl+t1+t8/RFbGW5hatNgMFCn00ktFotx9vYmemNc/4zO0WhkLpeLKdrMAwztItpzOBya8/ls/qS9SZWhUFCCgyjW8LVt8kEUA8Hc7XZiiKIgmMfjUQSRteH71X+ThIwfAQYAuBDet6hGSAIAAAAASUVORK5CYII=',
		
		close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCNTczMEM3RkQ0QjExRTA4M0U3QUNBRTYwODI2Q0Y0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCNTczMEM4RkQ0QjExRTA4M0U3QUNBRTYwODI2Q0Y0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUI1NzMwQzVGRDRCMTFFMDgzRTdBQ0FFNjA4MjZDRjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUI1NzMwQzZGRDRCMTFFMDgzRTdBQ0FFNjA4MjZDRjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz47qcxnAAAFR0lEQVR42sRXfUxWVRh/7ouD+EoC3mwIyodGFCHYCwSSYpKgsuV/NVY5qenIBAbCgtnaKiSm/sP6p3KLNYmcLP4SDdJCbbWYtPiULzHicway+LBW7z39nnvfF++9vFdepa2z/e6555zn43ee55xzz5WEECRJErlT9mRlWSEbK1kscaht6AoFrI7hQWAE9n4SstyLuv3chQsLy9mU3CGwOzPzIcgcgONs1PHoCgQsJuL/AOOw+yOINMh2+5nzzc3igQhkZWR4WSyWl+H4bTSjVTGdrFFRaF9hmtstsmw/cb6pufG+CGTu2OED50WSRSpGc7XDl3u50hFSOI3LslwuZHH664sX7csSeGH7dquHh8fnzEMz6/t1riOBxzxcHReyvaLp0rd2UwIZ6dt8EPJ3LZJUskLHLlIjQEIUIho133zXopBY5SIrhUjeYRnE3N4eyxfJsSh8UVfA8jTqhiUReP65tDDMvg3dQY55qyEw4cG6Oi/LyykrE4W3avqlK1f/XNxK6VtSvSBYioEgIWRCLQHkhJenJ+3cmUlFxUcoLi5O6VOWuWPc+c5jLMOyrKO1odhU5ZJQH9ClAB3RvASEIfT8yspZu3bTvtxc8vf3p03x8XS0vIxuDg3pZhkREUHFJaUUsnYtpW3dSt4+3vRV/VklkJooOBvZ21JT6iwaA7vgKFpoZuVESEgIHcrPV5xzYQcfHKskW2Liogy/v48+HuPCsocO55M1OHiJPYePzagTFAJpSYkc7nQZoccKlQDSYnZ2lmZmZnR5ZUeFRcUUHh6ugN+dzp2FdWZn58hoz4FAToWSky2JNkRamkK0AzjoSxeWoJgnY6mkrIw2bNxocHJbqQMCHtH1D/T30/EPK6mnq9OYAu3WbLKo4ZdDwWa1K6Z2u12puzs7qOpYBd2entZZYcdG5yxTVVmh6GhtuECUSkAW/mr4heRaUJAddVdHO5UWFVJ/X5/phucxlulqb4djVdfE+V0CjtybgmfgnEVXZyed/bLOlACPsYxRzwyOCMh2RGHpatXAuc9tScn02v5cUwI8ZktMXnJOmOAPNQKyPOJgJFyx5AUEjhQeEUmlZeUUGhZmSoDHSsvLFVnWUXVNIzDiXAML8DxgPnM7Jaek0snq6iXOfxseVmAkwbKsw7r3iETr4rcg/olo/vy+Yrxo8Jifnx/V1tdT2Lr1OkfTU1NUnP+W8n6y+iMKDArSjQ8O9NP+nByam5szbkNno0BzEsoNwLzyHTDAz9+Pgq2P6oz3Xu+hgjcP0s/XrikoyDuo9BkPKx9fH3JlE+gDLt8lIMttyEkX582IibExqjn1Cd25s7A48/feOUodv7QvhrMD2477eIwLy9ac+pTGR0eN9oRay61Ar+5zHBsVsQ9UPtOmQfkYIWC4IVH23r2U8IyNztSexgnXpUhI2pji8fSmOHop51X6/uplampsVLah7qqoNuag+Wzn4FC3jsBTkeE+aDdDJsUVCdOLjukdVT3YdfcBtffj7qFf81xeyWLC1yUgN1/wLdjU6oquZXROkix5PTeHR1wTWB/mgb49QB02j/d/REKoRqRJ+Mq8PjzSvuy1/PHQkBcRiSp+XQEJocnFFRA40jcy1qoVWHUPXf6RuIVDqhr1ZqFfBZK7juH0bzyaoFDYNzo+eN+/ZhtC1jwMmdexd95AMwrwdO/PiOaBNlxyT8B+08DY5F8P/G/IJfIxayyCkAJ5Pi0TAF8DCadzvjC0wGYtDP9wY+LWxIp/TnVE1lglpMMLZGLQ5A+Dl2bGg7DVd2Pyd+H2D4MQgv7P8q8AAwDJYk66CQZGEAAAAABJRU5ErkJggg==',
	};
	
	var styleText = '\
		#fv_popup_icon{ \
			width: ' + POPUP_ICON_SIZE.w + 'px; height: ' + POPUP_ICON_SIZE.h + 'px; \
			position: absolute; \
			background-image: url("' + icon.popup_icon + '"); \
			background-size: 100% 100%; \
			z-index: 99999; \
			cursor: pointer; \
		} \
		#fv_black_background{ \
			background-color: rgba(0, 0, 0, ' + BACKGROUND_OPACITY + '); \
			position: fixed; \
			left: 0px; top: 0px; \
			width: 100%; \
			height: 100%; \
			z-index: 99998; \
			text-align: center; \
		} \
		#fv_popup_container{ \
			position: relative; \
			z-index: 99999; \
			padding: 10px; \
			display: inline-block; \
			border-radius: 5px; \
			box-shadow: 0 0 30px black; \
			background-color: white; \
			line-height: 100px; \
		} \
		#fv_popup_close{ \
			width: 32px; \
			height: 32px; \
			background-image: url("' + icon.close + '"); \
			cursor: pointer; \
			position: absolute; \
			top: -16px; \
			left: -16px; \
		}\
	';
	
	function _addStyle(str){
		var styleObj = _createElement('style');
		styleObj.textContent = str;
		$('head').appendChild(styleObj);
	}
	
	function _getObjTag(obj){
		return obj ? obj.nodeName.toLowerCase() : '';
	}
	
	function $(str){
		return document.querySelector(str);
	}
	
	function $$(str){
		return document.querySelectorAll(str);
	}
	
	function _createElement(tag, id, classId){
		var obj = document.createElement(tag);
		id && (obj.id = id);
		classId && (obj.className = classId);
		return obj;
	}

	function _getElementXY(ele){
		if(ele.getBoundingClientRect){
			return {
				x : ele.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
				y : ele.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
			}
		}
		else{
			var i = ele.offsetLeft, j = ele.offsetTop;
			var temp_node = ele;
			while(temp_node.offsetParent){
				temp_node = temp_node.offsetParent;
				i += temp_node.offsetLeft;
				j += temp_node.offsetTop;
			}
			temp_node = ele;
			while(temp_node.parentNode && temp_node.parentNode.tagName != 'BODY'){
				temp_node = temp_node.parentNode;
				i -= temp_node.scrollLeft;
				j -= temp_node.scrollTop;
			}
			return {
				x : i,
				y : j
			}
		}
	}
	
	var zeroTimeouts = [];
	
	function setZeroTimeout(fn) {
		zeroTimeouts.push(fn);
		window.postMessage('fv_zero_timer_msg', "*");
	}
	
	function handleZeroMessage(event) {
		if (event.source == window && event.data == 'fv_zero_timer_msg') {
			event.stopPropagation();
			if (zeroTimeouts.length> 0) {
				var fn = zeroTimeouts.shift();
				fn();
			}
		}
	}
	window.addEventListener("message", handleZeroMessage, true);
	
	function create_black_background(){
		if(!$('#fv_black_background')){
			var div = _createElement('div', 'fv_black_background');
			div.innerHTML = '.';
			document.body.appendChild(div);
			if(CLICK_BLANK_TO_CLOSE == true){
				div.addEventListener('click', function(e){
					if(e.target == this){
						var close = $('#fv_popup_close')
						if(close) close.click();
					}
				}, false);
			}
		}
	}
	
	function del_black_background(){
		var bk = $('#fv_black_background');
		if(bk) document.body.removeChild(bk);
	}
	
	function create_popup_player(obj){
		if(!$('#fv_popup_container')){
			var div = _createElement('div', 'fv_popup_container');
			var cloneObj = obj.cloneNode(true);
			cloneObj.id = 'fv_popup_player';
			cloneObj.setAttribute('width', Math.max(window.innerWidth * POPUP_FLASH_SIZE / 100, POPUP_FLASH_MIN_WIDTH));
			cloneObj.setAttribute('height', Math.max(window.innerHeight * POPUP_FLASH_SIZE / 100, POPUP_FLASH_MIN_HEIGHT));
			var embed = cloneObj.getElementsByTagName('embed');
			if(embed.length == 1){
				embed = embed[0];
				embed.setAttribute('width', Math.max(window.innerWidth * POPUP_FLASH_SIZE / 100, POPUP_FLASH_MIN_WIDTH));
				embed.setAttribute('height', Math.max(window.innerHeight * POPUP_FLASH_SIZE / 100, POPUP_FLASH_MIN_HEIGHT));
			}
			cloneObj.setAttribute('align', 'middle');
			div.innerHTML = '\
				<span id="fv_popup_close"></span> \
				' + cloneObj.outerHTML + ' \
			';
			$('#fv_black_background').appendChild(div);
			div.style.top = (window.innerHeight - div.offsetHeight) / 2 + 'px';
			$('#fv_popup_close').addEventListener('click', function(){
				this.parentNode.parentNode.removeChild(this.parentNode);
				del_black_background();
				recover_original_player(obj);
			}, false);
		}
	}
	
	function hide_original_player(obj){
		var _display = obj.style.display || window.getComputedStyle(obj, null).display;
		obj.setAttribute('_display', _display);
		obj.style.display = 'none';
	}
	
	function recover_original_player(obj){
		var display = obj.getAttribute('_display');
		obj.style.display = display;
		obj.removeAttribute('_display');
	}
		
	function popup_icon_hdlr(obj){
		create_black_background();
		create_popup_player(obj);
		hide_original_player(obj);
		del_popup_icon();
	}
	
	function check_plugin_type(obj){
		var keyword;
		keyword = obj.getAttribute('type');
		if(keyword && keyword.toLowerCase() == 'application/x-shockwave-flash'){
			return true;
		}
		keyword = obj.getAttribute('classid');
		if(keyword && keyword.toLowerCase() == 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'){
			return true;
		}
		return false;
	}
	
	function show_popup_icon(obj){
		if($('#fv_popup_icon')){
			del_popup_icon();
		}

		var ele = obj;
		var objTag = _getObjTag(obj);
		var pos = null;
		if(objTag == 'embed'){
			while(ele.parentNode && _getObjTag(ele.parentNode) != 'body'){
				ele = ele.parentNode;
				if(_getObjTag(ele) == 'object') break;
			}
			if(_getObjTag(ele) != 'object'){
				ele = obj;
			}
		}
		
		/* 只处理 flash 插件*/
		if(check_plugin_type(ele) == false){
			return;
		}
		
		/* 已经打开 player 的则不再显示工具按钮*/
		if($('#fv_popup_container')){
			return;
		}
		
		var div = _createElement('div', 'fv_popup_icon');
		pos = _getElementXY(ele);
		pos.x -= POPUP_ICON_SIZE.w;
		div.style.left = pos.x + 1 + 'px';
		pos.y = pos.y + (ele.offsetHeight - POPUP_ICON_SIZE.h)/ 2;
		div.style.top = pos.y + 'px';
		document.body.appendChild(div);
		div.addEventListener('click', function(e){ popup_icon_hdlr(ele); }, false);
	}
	
	function del_popup_icon(){
		var obj = $('#fv_popup_icon');
		if(obj){
			obj.parentNode.removeChild(obj);
		}
	}
	
	window.addEventListener('mouseover', function(e){
		var obj = e.target;
		var tag = _getObjTag(obj);
		if(tag == 'embed' || tag == 'object'){
			//setZeroTimeout( function (){	show_popup_icon(obj);	} );
			show_popup_icon(obj);
		}
		else if(obj == $('#fv_popup_icon')){
			// do nothing
		}
		else{
			//setZeroTimeout( function (){ del_popup_icon(); } );
			del_popup_icon();
		}
	}, false);
		
	_addStyle(styleText);
})();