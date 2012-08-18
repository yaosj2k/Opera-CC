// ==UserScript==
// @name           Scroll with Mouse Plus
// @namespace      http://userscripts.org/users/86496
// @description    Scroll a page by simply moving the cursor up and down, without even a click!
// @include        *
// @author         hzhbest
// @date           12/Jan/2010
// @version        1.16
// ==/UserScript==

// Original script by Protector one (http://userscripts.org/scripts/show/63593)
// hzhbest modded; -algorithm changed -compatibility improved -flexabiligy:move into the scrollbar to activate and continue scrolling while in the scroll-sensitive zone

(function(){

//###Customization: |可自定义的东西：
  
  //Show the scrolling indicator box or not, "1" to show. | 1－显示提示条，其他－不显示。
var scrollShowIndicator = 1;

  //Set the width of scroll-sensitive zone, "100" as full width, "10" as one tenth.
  // | “滚动触发区”宽度，区间：[0-100]，100为屏宽，0为禁用，10为十分之一屏宽。
var VScrollonWidth = 10;

  //Set the background of the indicator bar. | 提示条的背景，可以为“rgba()”带透明色式或“#xxxxxx”实颜色式或其他。
var IndicBarBG = "rgba(29,163,63,.4)"

  //Set the height of "thickness" of the indicator bar. | 提示条的粗细度，单位为像素。
var IndicBarH = 20;

  //Write here the width of the scrollbar (set in display properties) for highest accuracy.
  // | 在下面填写滚动条的宽度（也就是系统“显示属性”中的数字），这样能实现最高精确度。
var ScrollbarWidth = 15;

  //Set a trigger for activation, 1-none, 2-Ctrl key, 3-middle 100px range.
  // | 在下面设置激活条件，1－无，2－按住 Ctrl 键，3－鼠标在页面中间100像素高度范围内。
var activateCond = 1;


//###Customization ends. 请不要更改下面代码。
var scrollStartSWTM = -1;

var factor;
var b=0;
var VScrollOn=0;

	document.addEventListener('mousemove',function(event){
		var dheightMax = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
		var cwidthMax = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
		var cwinHeight = window.innerHeight;
		var scrollboxHeight = window.innerHeight - 2*ScrollbarWidth
		if(dheightMax > cwinHeight){
			if (event.clientX > cwidthMax)
				switch(activateCond){
					case 1:
						VScrollOn = 1;
						break;
					case 2:
						if(event.ctrlKey)VScrollOn = 1;
						break;
					case 3:
						if(event.clientY>cwinHeight/2-50 && event.clientY<cwinHeight/2+50)VScrollOn = 1;
				};
			if (event.clientX < ((1-VScrollonWidth/100) * cwidthMax))VScrollOn = 0;
			if (document.body.contentEditable == "true")VScrollOn = 0;
		}
		if (VScrollOn){
			if (scrollShowIndicator == 1)make_boxes();
			if (scrollStartSWTM != -1){
				factor = (event.ctrlKey) ? dheightMax / scrollboxHeight / 2 : dheightMax / scrollboxHeight;
				if (b){b.style.top = (event.clientY - IndicBarH/2) + 'px';}
				var delta = factor * (event.clientY - scrollStartSWTM);
				document.body.scrollTop += delta;
				document.documentElement.scrollTop += delta;
				if(event.clientY + 20 > cwinHeight){
					document.body.scrollTop += (factor * 10);
					document.documentElement.scrollTop += (factor * 10);
				}
				if(event.clientY > 0 && event.clientY < 20){
					document.body.scrollTop -= (factor * 10);
					document.documentElement.scrollTop -= (factor * 10);
				}
			}
		scrollStartSWTM = event.clientY;
		}else
		{
			scrollStartSWTM = -1;
			if (b) setTimeout(function(){b.style.top = -200 + 'px';},200);
		}
	},false);
	document.addEventListener('click',function(){VScrollOn=0;},false);

			
    function make_boxes() {
        if (!b) {
            b = document.createElement("div");
            b.setAttribute("id","IndicatorBox");
            b.setAttribute("style", "width:" + VScrollonWidth +"%;background:" + IndicBarBG + ";min-height:" +IndicBarH + "px;text-align:center;position: fixed; top: -40px; right: 0;overflow: hidden; z-index: 10005;font-family:Arial !important;cursor:n-resize;cursor:ns-resize;");
            document.body.appendChild(b);
			b.addEventListener('click',function(){VScrollOn=0;},false);
            return true;
        }
	}

})(); 