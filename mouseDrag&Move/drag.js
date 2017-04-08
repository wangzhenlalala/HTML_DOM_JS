/*
目的：拖动一个绝对定位的元素（且其父元素为body元素），四处移动它。
流程：
	1.为元素的mousedown注册事件处理程序。并得到鼠标按下时的文档坐标，以及按下时相对于元素左上角的距离
	2.为元素的mousemove注册事件处理程序，并得到鼠标此时的文档坐标，进一步得到元素左上角的文档坐标。
	3.在元素的mouseup 事件处理程序中，一处为mousedown，和mousemove注册的事件
*/

function drag(element,event){  //这就是要给mousedown 注册的事件处理函数
	//var deltaX,deltaY;  如果在此处定义 deltax 来表示点击时鼠标位置和元素左上角之间的距离，则在mousemove的事件处理函数中就无法引用该变量
	event = event || window.event;
	var scroll_offsets = getScrollOffsets(); //获取当前窗口的滚动偏移量
	var mouse_offset_documentX = event.clientX + scroll_offsets.x;
	console.log(event.clientX);
	var mouse_offset_documentY = event.clientY + scroll_offsets.y;
	console.log(event.clientY);

	var element_top_left_X = element.offsetLeft;  //我们认为当前的元素，的父元素是 body 元素
	var element_top_left_Y = element.offsetTop; //返回的是文档坐标

	deltaX = mouse_offset_documentX - element_top_left_X;
	deltaY = mouse_offset_documentY - element_top_left_Y;

	if(document.addEventListener){
		document.addEventListener("mousemove",moveFunc,true);  //这里是document.mousemove and mouseup
		document.addEventListener("mouseup",upFunc,true);
	}else{ 
		element.setCapture();
		element.attachEvent("onmousemove",moveFunc);          //这里是给 element.mousemove
		element.attachEvent("onmouseup",upFunc);
		element.attachEvent("onlosecapture",upFunc);
	}

//如果我们处理了mousedown 事件，则不让他冒泡
	if(event.stopPropagation)   
		event.stopPropagation();
	else
		event.cancelBubble = true;
//阻止任何默认的处理	
	if(event.preventDefault)
		event.preventDefault();
	else
		event.returnValue = false;


	function moveFunc(event){
		event = event || window.event;
		var scroll_offsets = getScrollOffsets();
		var x = scroll_offsets.x + event.clientX - deltaX;
		var y = scroll_offsets.y + event.clientY - deltaY;
		//this.style.left....  这样是不好的，应为用attachEvent注册的事件处理函数 的this 并不是指向 元素，而是指向一个全局量
		//我们当前处在drag() 函数的词法作用域内，我们可以通过drag 的变量来引用当前要拖动的对象元素。
		element.style.left = x + "px";
		element.style.top = y + "px";
		element.style.opacity = String(1-event.clientX/window.innerWidth);

		if(event.stopPropagation)   
			event.stopPropagation();
		else
			event.cancelBubble = true;

	}

	function upFunc(event){
		event = event || window.event;
		if(document.addEventListener){
			document.removeEventListener("mousemove",moveFunc,true);//如果这里不加 true的话，mousedown后松开按键，对象也会获得焦点，好像鼠标绑定在了对象上一样
			document.removeEventListener("mouseup",upFunc,true);
		}else{
			element.detachEvent("onlosecapture",upFunc);
			element.detachEvent("onmousemove",moveFunc);
			element.detachEvent("onmouseup",upFunc);
			element.releaseCapture();
		}

		if(event.stopPropagation)   
			event.stopPropagation();
		else
			event.cancelBubble = true;
	}
}