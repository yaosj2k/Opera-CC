// ==UserScript==
// @author      DemoJameson
// @description 使 Opera 图片浏览页面的图片可以拖拽，左键点击页面则可以缩放图片
// @exclude *.html
// @exclude *.htm
// @exclude *.jsp
// @exclude *.php
// @exclude *.aspx
// @exclude *.asp
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function () {
    // 判断是否为图片浏览页面
    var oLinks = document.getElementsByTagName("link");
    if (oLinks && oLinks.length === 1 && oLinks[0].href === "opera:style/image.css") {
      // ------------------------------------------------ 设置项开始（true 代表启用，false 代表禁用） ------------------------------------------------
      var bDragDrop = true,            // 是否允许拖拽移动图片
      bZoom = true;               // 是否允许缩放图片

      var ROTATE_ENABLE = true;//是否启用长按旋转，旋转将以图像中点为中心
      var ROTATE_STYLE = 0;//旋转开启的方式。0——长按； 1——按住alt键不放
      var LONG_PRESS_TIME = 500;//长按x毫秒后开启旋转模式

      var oMode= {
          defaultMode: "NORMAL",         // 打开页面时的默认模式，任选其一：NORMAL、FIT_TO_WINDOW、FIT_TO_WIDTH、FIT_TO_HEIGHT

          // 从默认模式开始，按数字从小到大（0，1，2……）循环切换；如不想使用某模式，则将其设为负数（如 -1、-2，不能重复）。
          NORMAL: 0,                  // 图片保持原状
          FIT_TO_WIDTH: 1,            // 图片宽度适应窗口宽度
          FIT_TO_WINDOW: 2,            // 图片适应窗口大小（如果 bOnlyZoomOut = true 且图片小于窗口，则不变，下同）
          FIT_TO_HEIGHT: -3,            // 图片高度适应窗口高度

          bOnlyZoomOut: false,         // 图片只缩小不放大，即当图片本身小于窗口时不对图像做任何改变
          bAutoSkip: true            // bOnlyZoomOut = true 且应用缩放模式后，图像大小与原始大小一样，则自动跳到下一模式
      }
      // ------------------------------------------------ 设置项结束 ------------------------------------------------

      // ------------------------ 初始化变量 ------------------------
      var oBody = document.body,
         oDiv = document.getElementsByTagName("div")[0],
         oImg = oDiv.getElementsByTagName("img")[0];

      var iDiffX,   iDiffY;

      var iPosXBefore, iPosYBefore, iPosXAfter, iPosYAfter;

      var iWidth_Normal = 0, iHeight_Normal = 0;

      var i = 0;
      // ------------------------ 初始化变量 ------------------------

      fakeArray(oMode);

      // 创建一个数组，用于保存每个模式切换前滚动条的位置
      var aPageOffset = [];
      for (i = 0, iLength = oMode.length; i < iLength; i++) {
         aPageOffset[i] = {
            pageXOffset: 0,
            pageYOffset: 0
         }
      }

      oMode.mode = 0;
       // 设置图片居中
      oImg.alt = "";
      var iCount = 0;
      var iIntervalID = setInterval(function () {
         if (oImg.width > 1 || iCount++ > 100) {
            window.clearInterval(iIntervalID);

            oImg.removeAttribute("alt");
            oDiv.style.position = "absolute";
            oDiv.style.height = "auto";

            // 记录图片原始大小
            iWidth_Normal = oImg.width;
            iHeight_Normal = oImg.height;

            if (bZoom) {
               oMode.mode = oMode[oMode.defaultMode];
               resizeImgage();
            } else {
               setImageCenter();
            }
         }
      }, 100);

      // 拖拽
      if (bDragDrop) {
         document.addEventListener("mousedown", startDrag, false);
      }

      // 缩放
      if (bZoom) {
         document.addEventListener("mouseup", zoomImage, false);
      }

        // 拖拽处理函数
        function startDrag(oEvent) {
         iPosXBefore = oEvent.clientX;
         iPosYBefore = oEvent.clientY;

            if(oEvent.button === 0 && oEvent.target.nodeName === "IMG") {
            iDiffX = oEvent.clientX - oDiv.offsetLeft;
            iDiffY = oEvent.clientY - oDiv.offsetTop;
            document.addEventListener("mousemove", dragImage, false);
            document.addEventListener("mouseup", stopDrag, false);
            window.addEventListener("blur", stopDrag, false);

            img_ox = get_img_origin().x;
            img_oy = get_img_origin().y;
            if(ROTATE_ENABLE && window.opera.version() >= 10.50){
               switch(ROTATE_STYLE)
               {
               case 0://长按
                  if(timmer_rotate == null)
                     timmer_rotate = setTimeout(function(){start_rotate(img_ox, img_oy, oEvent.pageX, oEvent.pageY)}, LONG_PRESS_TIME);
                  break;
               case 1:
                  if(oEvent.altKey){
                     start_rotate(img_ox, img_oy, oEvent.pageX, oEvent.pageY);
                  }
                  break;
               }
            }
            }

        }

      function clear_rotate_timmer(){
         if(timmer_rotate != null){
            clearTimeout(timmer_rotate);
            timmer_rotate = null;
         }
      }

      // 随鼠标移动图片
        function dragImage(oEvent) {
         clear_rotate_timmer();
            oDiv.style.left = oEvent.clientX - iDiffX;
            oDiv.style.top = oEvent.clientY - iDiffY;
        }

      // 停止拖拽
        function stopDrag(oEvent) {
         if(flag_rotate){
            angle_now = angle_org - get_angle(img_ox, img_oy, oEvent.pageX, oEvent.pageY) + angle_now;
            flag_rotate = false;
         }
         clear_rotate_timmer();
         window.removeEventListener('mousemove', rotate_handler, false);
         document.removeEventListener("mousemove", dragImage, false);
         window.removeEventListener("blur", stopDrag, false);
      }

      // 松开鼠标左键时缩放图像
      function zoomImage(oEvent) {
         if(oEvent.button === 0) {
            // 鼠标按下与松开时在同一位置才缩放图像
            iPosXAfter = oEvent.clientX;
            iPosYAfter = oEvent.clientY;
            if (Math.abs(iPosXAfter-iPosXBefore) < 5 && Math.abs(iPosYAfter-iPosYBefore) < 5) {
               resizeImgage();
            }
         }
      }

      function resizeImgage() {
      if(timmer_rotate != null){
         clearTimeout(timmer_rotate);
         timmer_rotate = null;
      }
      angle_now = 0;
      window.removeEventListener('mousemove', rotate_handler, false);

         // 记录滚动条位置
         aPageOffset[oMode.mode].pageXOffset = window.pageXOffset - oDiv.offsetLeft;
         aPageOffset[oMode.mode].pageYOffset = window.pageYOffset - oDiv.offsetTop;

         // 还原图片
         oImg.style = "";
         oDiv.style.top = oDiv.style.left = "0px";

         // 记录图片原始大小
         iWidth_Normal = oImg.width;
         iHeight_Normal = oImg.height;

         // 重新调整图片
         switch (oMode.mode) {
            case oMode.FIT_TO_WINDOW:
               // 如果允许放大图片，或者图片大于窗口，则改变图像大小
               if (!oMode.bOnlyZoomOut || oImg.width > window.innerWidth || oImg.height > window.innerHeight) {
                  // 判断改变宽度还是高度
                  if (oImg.width / window.innerWidth > oImg.height / window.innerHeight) {
                     // 当允许跳过当前模式时，如果开启了适应高度模式，因为当前模式的图像大小与高度适应模式的图像大小一样，则自动跳过当前模式
                     if (oMode.bAutoSkip && oMode.FIT_TO_WIDTH >= 0) {
                        oMode.mode = (oMode.mode + 1) % oMode.length;
                        resizeImgage();
                        return;
                     }
                     oImg.style.width = window.innerWidth + "px";
                  } else {
                     if (oMode.bAutoSkip && oMode.FIT_TO_HEIGHT >= 0) {
                        oMode.mode = (oMode.mode + 1) % oMode.length;
                        resizeImgage();
                        return;
                     }
                     oImg.style.height = window.innerHeight + "px";
                  }
               } else if (oMode.bAutoSkip) {
                  oMode.mode = (oMode.mode + 1) % oMode.length;
                  resizeImgage();
                  return;
               }
               break;
            case oMode.FIT_TO_WIDTH:
               if (!oMode.bOnlyZoomOut || oImg.width > window.innerWidth) {
                  oImg.style.width = window.innerWidth + "px";
                  if (window.innerWidth > oBody.clientWidth) {   // 竖向滚动条存在
                     oImg.style.width = oBody.clientWidth + "px";
                  }
               } else if (oMode.bAutoSkip) {
                  oMode.mode = (oMode.mode + 1) % oMode.length;
                  resizeImgage();
                  return;
               }
               break;
            case oMode.FIT_TO_HEIGHT:
               if (!oMode.bOnlyZoomOut || oImg.height > window.innerHeight) {
                  oImg.style.height = window.innerHeight + "px";
                  if (window.innerHeight > oBody.clientHeight) {
                     oImg.style.height = oBody.clientHeight + "px";
                  }
               } else if (oMode.bAutoSkip) {
                  oMode.mode = (oMode.mode + 1) % oMode.length;
                  resizeImgage();
                  return;
               }
               break;
         }
         setImageCenter();

         // 下一模式
         oMode.mode = ++oMode.mode % oMode.length;
         // 还原滚动条位置
         window.scrollTo(aPageOffset[oMode.mode].pageXOffset, aPageOffset[oMode.mode].pageYOffset);
      }

      // 使图片居中
      function setImageCenter() {
         if (oBody.clientHeight > oImg.height) {
            oDiv.style.top = (oBody.clientHeight - oImg.height) / 2;
         }
         if (oBody.clientWidth > oImg.width) {
            oDiv.style.left = (oBody.clientWidth - oImg.width) / 2;
         }
      }

      // 伪装成数组
      function fakeArray(oObject) {
         oObject.length = 0;
         for (var object in oObject) {
            if (oObject.hasOwnProperty(object) && typeof oObject[object] === "number" && object !== "length" && oObject[object] >= 0) {
               oObject[oObject.length++] = object;
            }
         }
      }
     /*--------------------------add by yansyrs--------------------------*/
     /*-----------图片旋转功能，零零散散的上面还有些代码=.=!!----------*/
      var img;
      var img_ox;
      var img_oy;

      var timmer_rotate = null;

      var flag_rotate = false;

      var angle_org;
      var angle_now = 0;

      function initMain(){
         img = document.getElementsByTagName('img')[0];
      }

      function get_img_origin(){
         return {
            x: oDiv.offsetLeft + (img.width >> 1),
            y: oDiv.offsetTop + (img.height >> 1)
         }
      }

      function get_angle(ox, oy, x, y){
         x = x - ox;
         y = oy - y;
         ox = oy = 0;
         if(ox == x)
            return (y > oy) ? 90 : 270;
         else if(oy == y)
            return (x > ox) ? 0 : 180;
         else if(y > oy && x > ox)//第一象限
            return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180;
         else if( (y > oy && x < ox) || (y < oy && x < ox))//第二、三象限
            return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180 + 180;
         else if(y < oy && x > ox)//第四象限
            return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180 + 360;
      }

      function rotate_handler(ev){
         var angle = get_angle(img_ox, img_oy, ev.pageX, ev.pageY);
         if('OTransform' in img.style)
            img.style.OTransform = 'rotate(' + (angle_org - angle + angle_now) + 'deg)';
         else if('transform' in img.style)
            img.style.transform = 'rotate(' + (angle_org - angle + angle_now) + 'deg)';
      }

      function start_rotate(ox, oy, x, y){
         timmer_rotate = null;
         document.removeEventListener('mousemove', dragImage, false);
         if(ox == x && oy == y)
            return false;
         flag_rotate = true;
         angle_org = get_angle(ox, oy, x, y);
         window.addEventListener('mousemove', rotate_handler, false);
      }

      initMain();
    }
}, false);