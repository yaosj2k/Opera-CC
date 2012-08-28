// ==UserScript==
// @name insertVideoURL
// @description songtaste 源地址
// @create 2012-3-29
// @lastmodified 2012-4-1
// @version 1.0.0.0
// @include http://*songtaste.com/song/*
// ==/UserScript==


(function(){
	if(!window.opera)return;
    function process()
    {
        function playmedia1_1(playIcon, strID,strURL,intWidth,intHeight,type, Head,st_songid) {
         
            playIcon.replace(" ","%20");
            strID.replace(" ","%20");
            
            var objDiv=document.getElementById(strID);
            document.getElementById(playIcon).style.display='none';
            
            if (!objDiv) return false;
            if (objDiv.style.display!='none') {
                objDiv.innerHTML='';
                objDiv.style.display='none';
            } else {
                if(strURL.indexOf('rayfile')>0) {
                    var SongUrl = Head + strURL + GetSongType(type);
                    objDiv.innerHTML=makemedia_html_1(SongUrl,intWidth,intHeight);
                    objDiv.style.display='block';
                } else {
                    $.ajax({
                        type:'POST',
                        url:'/time.php',
                        cache:false,
                        data:'str='+strURL+'&sid='+st_songid,
                        dataType:'html',
                        success:function(data){
                            //alert(data);
                            objDiv.innerHTML=makemedia_html_1(data,intWidth,intHeight);
                            objDiv.style.display='block';
                        
                        },
                        error:function(data){
                            //alert('error');
                        }
                        });
                }
                
            }
        }

        function makemedia_html_1 (SongUrl,intWidth,intHeight) {
            var strHtml ="<a id='MediaPlayer1' href='mplayer:"+SongUrl+','+window.location.href+"' width='"+ intWidth +"' height='"+ intHeight +"'>▲音频入口</a>";
            return strHtml;
        }
        
        var play_click=document.getElementById('playicon');
        var scriptStr=play_click.getElementsByTagName("a")[0].href;
        if (scriptStr.indexOf('playmedia1')) {
            run_d=scriptStr.replace('playmedia1','playmedia1_1')
            eval(run_d)
            //playmedia1_1('playicon','player', 'fabd6e591794b3d95193fc4c2810f0c0888b909afdb951b0d75b1404b6d7d4f3caf1a7546103e7112f1ced3fe51ffc51', '355', '68', 'b3a7a4e64bcd8aabe4cabe0e55b57af5', 'http://ma.', '2099273')
        }
    }
    window.addEventListener("DOMContentLoaded",process,false);

})();
