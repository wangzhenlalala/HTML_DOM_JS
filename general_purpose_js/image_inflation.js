/*
目的：为文档中的图片元素，添加 鼠标一移动到上面就...变大..，移走就恢复原样的效果
思路：1：先找出文档中的所有img元素，
      2.为每个img元素添加onmouseover,onmouserout 事件处理方法。
      3.对于onmouseover:在其外部添加一个div，position：relative，来让img相对其定位，大小和图片的当前大小一样，防止影响其“邻居”，然后墙图片的width 和 height都增加60px，就是想让他水平膨胀..，
        设置其position：absolute，然后让图片从div的左上角(-30px,-30px)开始显示
      4.onmouseout : 尽最大努力恢复图片的大小和定位，及其他初始的状

	  还是有很多的东西要考虑啊！！！ 好难啊，，，，
	  在给img添加div的时候，为了维持div正好处在原来img的位置，我们应该还得把img的样式表赋值给div，
	  本来想用div.className = img.className and div.id = img.div 但是，如果别的脚本正好通过id or className来引用
	  该图片的话，在鼠标处在图片上的时候，他将得到一个div！！！！！这不是他想要的。。。
	  所以我觉得 可以把 img上的 【计算样式】 都复制给div的style元素，并且把img.className对应的对象变成null,但不改变其名字。
	  额....也不行，如果别人得到该img就是为了得到他的 样式规则的话，也会出错啊。。

	  要是 不通过 父亲元素 而直接 在img元素上实现 变大的效果就好了，不然就事先准备好，变大后的图片，然后动态的更新img.src。。。岂不是更好！！
      */

var my_name_space = (function(){
    function inflate_image(){
        var images = document.getElementsByTagName("img");
        for(var i = 0 ;i < images.length ; i++){
            var at_now = images[i];
            if(at_now.addEventListener){
                at_now.addEventListener("mouseover",to_inflate);
                at_now.addEventListener("mouseout",to_back);
            }else{
                at_now.attachEvent("onmouseover",to_inflate);
                at_now.attachEvent("onmouseout",to_back);
            }
        }
    }

    function to_inflate(){
        var width = this.width;  //返回的都是数值
        var height = this.height;
        var outter_div = document.createElement("div");//创建一个div 来作为img 父元素
        outter_div.style.width = width + "px"; //必须给出字符串的表示
        outter_div.style.height = height + "px";
        outter_div.style.position = "relative";
		outter_div.style.overflow = "hidden";
		
        
        this.style.width = Number(width + 60) + "px"; 
        this.style.height = Number(height + 60) + "px";
        this.style.position = "absolute";
        this.style.left = "-30px";
        this.style.top = "-30px";

        this.parentNode.insertBefore(outter_div,this);
        outter_div.appendChild(this);
        //console.log("hi here");

        return false; //不让onmouseover消息冒泡
    }

    function to_back(){
        /*
        如果你写成这样的话，运行错误。
        this.parentNode.parentNode.insertBefore(this,this.parentNode);
        this.parentNode.parentNode.removeBefore(this.parentNode);
        我也不知道为什么出错，运行完这两句后，this，和this.parentNode 都被从当前的文档树中删除了
        
        我猜想：当removeChild之后，对于this.parentNode来说已经没有外部的引用了，所以被当成垃圾回收了
        因为，this指向的对象，是挂在其上面的，自然也被回收了（感觉有不对 不是还有this引用他的吗？？？，还是在函数运行结束后this不指向他了，才被回收？？
        可是在chrome调试中，只要removechild执行完毕，this指向的img就没有了！！！！）

        幸好removeChild的返回值是 删除了的Node对象，我就为他添加一个引用，不让他被回收！！
        */
        var grandparent = this.parentNode.parentNode;
        var parent = this.parentNode;
        var self = this.parentNode.removeChild(this);  //为this 添加引用 防止被回收
        grandparent.insertBefore(self,parent);  
        grandparent.removeChild(parent);
        /*以下，做一些恢复工作，，但是我并没有保存之前的状态，所以这样做是有问题的，
        如果某个IMG元素，的属性设置和样式没有彻底分离，而是在标签中添加了style属性，那么我这样回复后，很有可能就和原来的不一样了。
        当如果没有指定style，额....也是有问题的！！！！哈哈
        */
        self.style.width = Number(parseInt(this.style.width) - 60) + "px";  
        self.style.height = Number(parseInt(this.style.height) - 60) + "px";
        self.style.position = "static";
        self.style.left="0px";
        self.style.top="0px";
        
        //console.log("hi there");
        return false;
    }
    return {inflate_image:inflate_image};
}())



myAddEventHandler(my_name_space.inflate_image);


