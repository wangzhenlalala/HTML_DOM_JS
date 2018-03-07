/*http://www.jb51.net/article/48679.htm
关于标准模式，和怪异模式 可查看以上链接内容。主要是前期IE对CSS标准的解析不同，
*/

//返回指定窗体的  滚动偏移量 scroll offset
function getScrollOffsets(win){
	win = win || window;
	//除了小于等于ie8的浏览器都支持一下的属性
	if(win.pageXOffset)	return {x:win.pageXOffset,y:win.pageYOffset};

	if(document.compatMode == "CSS1Compat") //浏览器处于标准模式
		return {
				x:win.document.documentElement.scrollLeft,
		        y:win.document.documentElement.scrollTop,
		};
	//以下 IE 处于 怪异模式下
	return {x:win.document.body.scrollLeft,y:win.document.body.scrollTop}	;
	
}

function getViewPortSize(win){
	win = win || window;
	if(win.innerWidth)	return {x:win.innerWidth,y:win.innerWidth};

	if(document.compatMode == "CSS1Compat") 
		return {
				x:win.document.documentElement.clientWidth,
		        y:win.document.documentElement.clientHeight,
		};
	
	return {x:win.document.body.clientWidth,y:win.document.body.clientWidth};
}

/*Element.getBoundingClientRect()，元素对象的方法，返回元素在 视口 中的坐标位置，不包含margin的尺寸
left,right,top,bottom,(maybe width，height）

window.scrollTo(x,y) 接受一个文档的坐标，并使得文档的x,y位置尽可能的与视口的0,0对应
element.scrollIntoView()  让元素处于视口之中
*/



/*
更老的浏览器，所有的HTML元素都有，offsetLeft offsetRight 元素相对于其父元素的 左右边距离
offsetParent 是元素位置的相对父元素
*/

function getElementPosition(ele){ //最终返回的是文档坐标
	var x,y;
	while(ele){
		x= ele.offsetLeft;
		y=ele.offsetRight;
		ele = ele.offsetParent;
	}
	return {x:x,y:y};
}