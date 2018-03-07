window.onload=function(){
	oblock=document.getElementById("blockSquare"); //找到随着鼠标移动而移动的block
	ohold_small = document.getElementById("hold_small"); //找到盛放block，和小图片的div,用他来响应mouseover，mouseout，mouseover,事件
	ohold_big = document.getElementById("hold_big");
	oimg = ohold_big.getElementsByTagName('img')[0];
	oimgSmall = ohold_small.getElementsByTagName('img')[0];
	
	ohold_small.onmouseover=function(){
		//在这里将方块和大图显示出来
		oblock.style.display="block";
		ohold_big.style.display="block";
	}
	ohold_small.onmouseout=function(){
		//鼠标移开后是方块和大图隐藏
		oblock.style.display="none";
		ohold_big.style.display="none";
	}
	ohold_small.onmousemove=function(event){

		event = event || window.event;
		var x = event.clientX;
		var y = event.clientY;
		document.title = x + ":" + y ;
		var totalX = oimgSmall.offsetWidth - oblock.offsetWidth;
		var totalY = oimgSmall.offsetHeight - oblock.offsetHeight;
		var blockX = Math.min(Math.max(0,x - ohold_small.offsetLeft  - oblock.offsetWidth/2),totalX);
		var blockY = Math.min(Math.max(0,y - ohold_small.offsetTop - oblock.offsetHeight/2),totalY);
		//以上代码让 方块的的中心处在鼠标的位置,当时还得让方块始终处在,外围div的范围内.
		//即让0 < 方块的左上角坐标  < 外围div的width - 方块的width,我们已经把padding,margin都调成0 了.

		oblock.style.left = blockX + "px";
		oblock.style.top = blockY +"px";

		
		var currentX = oblock.offsetLeft;
		var currentY = oblock.offsetTop;
		var ratioX =  currentX / totalX;
		var ratioY = currentY / totalY;

		
		oimg.style.left = -ratioX * (oimg.offsetWidth - ohold_big.offsetWidth ) + "px";
		oimg.style.top = -ratioY * (oimg.offsetHeight - ohold_big.offsetHeight) + "px";
		/*
			以上的代码我们 是的 大图的位置随着 方块的移动而 按照 规律的 变化.
			水平方向上,方块的最大移动距离是,其外围div的宽度- 方块的宽度,
			大图片位置的最大值是,大图的宽度 - 盛放大图的div的宽度,且和方块的移动方向相反,
			两者位置变化的比例 要同步,要等比例的 变化,

		*/
	

	}
}