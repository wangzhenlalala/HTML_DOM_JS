window.onload=function(){
	/*Wie左边的自动收缩的div设置事件*/
	$("#out").bind("mouseover",function(){
		$(this).stop(true).animate({left:0},{duration:1000});
	});

	$("#out").bind("mouseout",function(){
		$(this).stop(true).animate({left:-100},{duration:1000});
	});

	/*为右边的自动回到窗口中央的滑块，设置scroll事件。但是这里的scroll事件是，注册在window对象上的，如果注册在元素对象上，就失败了*/
	$(window).bind("scroll",function(){	
		var to = Math.floor(($(window).height() - $('#mover').height())/2) + $(window).scrollTop();
		$("#mover").stop(true).animate({top:to},{duration:1000});
	});
	//$("#out").scroll(function(){console.log("hello")}); //错误的，对象并不会收到scroll事件

	//一下为up对象设置事件，使得被单击的时候，让窗口回到最顶部。并且用户可以随意的拖动他到其他的位置
	var oUp = $('#up');
	//oUp[0]["isThatYou"] = false;
	/*
		click 事件是在 mousedown 和 mouseup 之后紧接着的 事件，我们必须分清楚，
		click事件的来源，1.单击使页面回到顶部   2.是拖动动作，mousedown，mousemove，mouseup之后形成的click，此时我们不能是页面回到顶端。
		好在我们的 mousemove和mouseup事件是在mousedown事件中定义的，而不是单独定义的。这就使得拖动行为是一个  原子的 行为，
		正常的mousedown，mouseup之后的click，之前是没有mousemove的，所以跟在mousedown，mousemove，mouseup之后的click不需要调用其回调函数
		因此我们可以在外部设置一个标志，让mousemove事件来改变他，来区分正常的click事件。
	*/
	oUp.bind("click",function(){
		if(this.getAttribute("isThatYou") == "yes"){
			this.setAttribute("isThatYou","no") ;  
			return;
		}else{
			$(window).scrollTop(0);
			$(this).css({"top":550,"left":200});
		}
	});

	oUp.bind("mousedown",down);

	function down(event){
		var oUpDom = oUp.toArray()[0];
		var event = event || window.event;
		var toLeft = event.clientX - parseInt(oUp.css("left"));
		var toTop = event.clientY - parseInt(oUp.css("top"));
		

		if(document.addEventListener){
			document.addEventListener("mousemove",move,true);
			document.addEventListener("mouseup",up,true);
		}else{
			oUpDom.setCapture();
			oUpDom.attachEvent("onmousedmove",move);
			oUpDom.attachEvent("onmousedup",up);
		}

		if(event.preventDefault)
			event.preventDefault();  //标准的取消默认事件做法
		else
			event.returnValue = false; // IE 下的取消默认事件的做法

		if(event.stopPropagation)
			event.stopPropagation();
		else
			event.cancelBubble = true;

		function move(event){
			var event = event || window.event;
			var left = Math.max(Math.min($(window).width()*0.9-$('#up').width(),event.clientX-toLeft),$(window).width()*0.1);
			$('#up').css({"top":event.clientY-toTop,"left":left});
			$('#up').attr("isThatYou","yes");

			if(event.preventDefault)
				event.preventDefault();
			else
				event.returnValue = false;

			if(event.stopPropagation)
				event.stopPropagation();
			else
				event.cancelBubble = true;
		}

		function up(event){
			if(this.removeEventListener){
				this.removeEventListener("mousemove",move,true);
				this.removeEventListener("mouseup",up,true);
			}else{
				this.detachEvent("onmousemove",move);
				this.detachEvent("onmouseup",up);
				this.releaseCapture();

			}
			

			if(event.preventDefault)
				event.preventDefault();
			else
				event.returnValue = false;

			if(event.stopPropagation)
				event.stopPropagation();
			else{
				event.cancelBubble = true;
			}
		}
	}
	
//下面来改变 右上角的事件  每秒钟改变一次

function changeTime(){
	
	var oTimeDiv = document.getElementById("time");
	var aParas = oTimeDiv.getElementsByTagName("p");
	var oDate = new Date();
	function addZero(who,n){
		who=who + '';
		while(who.length < n )
			who = '0' + who;
		return who;
	}
	function Day(day){
		switch(day){
			case 0 :
				return "日"  + "  Sunday";
			case 2 :
				return "二" + "  Tuesday";
			case 3 :
				return "三" +　"  Wednesday";
			case 4 :
				return "四" + "  Thursday";
			case 5 :
				return "五" + "  Friday";
			case 6 :
				return "六" + "  Saturday";
			case 1 : 
				return "一" + "  Monday";
		}
	}
	aParas[0].innerHTML = addZero(oDate.getHours(),2) + " : " + addZero(oDate.getMinutes(),2) + " : " + addZero(oDate.getSeconds(),2);
	aParas[1].innerHTML = oDate.getFullYear() + "-" + addZero(oDate.getMonth() + 1 ,2)+ "-"  + addZero(oDate.getDate(),2);
	aParas[2].innerHTML = "星期" + Day(oDate.getDay());
	
}
changeTime();
setInterval(changeTime,1000);

//以下制作或灯片的部分。
//首先，我希望单击小图的时候，对应的大图能够显示出来。并且显示是从上面的框下拉下来的效果。

var oThumbPicturesLi = $("#thumbPicture li"); //盛放小图的li
var oUlThumb = $("#thumbPicture");  //盛放小图的ul,我们要改变他的left让小图能左右移动。
var oBigPicture = $("#holdBig img");  //所有的大图
var maxIndex = 5;
oBigPicture[0].style.zIndex = maxIndex;  //这是一个潜在的bug，如果用户单击此处超过65535次，底部大图的zIndex将大于thumb,thumb 将不可见

for(var i = 0 ;i<oThumbPicturesLi.length;i++){
	oThumbPicturesLi[i].index = i ;
	oThumbPicturesLi[i].onclick = function(){
		//if(oBigPicture[this.index].style.zIndex == maxIndex) return ; //这句应该放在下面，否则开始的时候单击第一张图片的时候，就直接返回了，他就没有动画
		//oUlThumb.css("left",-100*(i-2));  //这是一个错误，大错误，这里形成了很多个闭包，他们共享i 变量，而此时的i,始终是循环最后得值，10
		var offset = null;
		switch(this.index){
			case 0:
			case 1:
			case 2:
					offset = 0;
					break;
			case oThumbPicturesLi.length-1:
			case oThumbPicturesLi.length-2:
			case oThumbPicturesLi.length-3:
					offset = oThumbPicturesLi.length-3-2;
					break;
			default:
					offset = this.index - 2;
					break;
		};
		// oUlThumb.css("left",-(100+13)*offset);
		oUlThumb.animate({"left":-(100+13)*offset},{"duration":400});
		oThumbPicturesLi.css({"opacity":0.5});
		// $(this).animate({"opacity":1,"height":120,"width":120,"top":-10,"left":-10},{duration:1000});
		$(this).animate({"opacity":1});
		if(oBigPicture[this.index].style.zIndex == maxIndex) return ;
		oBigPicture[this.index].style.zIndex = ++maxIndex;
		oBigPicture[this.index].style.height = "0px";
		oBigPicture[this.index].style.width = "580px";
		$(oBigPicture[this.index]).animate({"height":516},{duration:400});
			
	}
	

}


}//这个是window.onload 的结束