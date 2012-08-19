Opera AG  
=========================

这个版本主要是一些脚本，你需要下载opera的linux安装包，  
然后解压到任何一个路径(绿色版)，我推荐 $HOME/opt 里面  
###安装方法如下：  
+ 下载并解压  
> wget ftp://ftp.opera.com/pub/opera/linux/1164/opera-11.64-1403.x86_64.linux.tar.xz  
 tar xf opera-11.64-*.tar.xz -C $HOME/opt/  
 cd $HOME/opt  
 mv opera-11.64-1403.x86_64.linux opera  
 cd opera  
 rm ./opera  
+ git 初始化  
>> cd $HOME/opt/  
 git init  
 git remote add origin https://github.com/atmouse-/Opera-AG.git  
 git pull origin canch  
+ 测试  
>>> ./bin/parse.sh  
+ 全部OK的话，说明命令都没有问题，可以直接双击opera运行  

*****************************
###注意:  
如果你自行下载解压的是opera-next,请把目录下的opera改为opera-next  
