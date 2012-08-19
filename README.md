Opera AG  
=========================

这个版本主要是一些py,bash脚本，而且比较适合宽屏用户,你需要下载opera原本的linux安装包，  
然后解压到任何一个路径(这是绿色版)，我推荐 $HOME/opt 里面  
然后你把这个项目zip打包下载回去，复制到你opera软件根目录，覆盖文件就可以了  
  
如果想用git，如下:  
###git安装方法如下：  
+ 下载并解压  
> wget ftp://ftp.opera.com/pub/opera/linux/1164/opera-11.64-1403.x86_64.linux.tar.xz  
> tar xf opera-11.64-*.tar.xz -C $HOME/opt/  
> cd $HOME/opt  
> mv opera-11.64-1403.x86_64.linux opera  
> cd opera  
> rm ./opera  
+ git 初始化  
>> cd $HOME/opt/  
>> git init  
>> git remote add origin https://github.com/atmouse-/Opera-AG.git  
>> git pull origin master  
+ 测试  
>>> ./bin/parse.sh  
+ 全部OK的话，说明命令都没有问题，可以直接双击opera运行  

*****************************
###注意:  
如果你自行下载解压的是opera-next版本,请把目录下的opera脚本名改为opera-next  
打开后记得把代理设置关掉，因为我用了squid，没有改，你们可以自行关掉代理设置  
版本功能特性参考wiki <https://github.com/atmouse-/Opera-AG/wiki/版本特性>
