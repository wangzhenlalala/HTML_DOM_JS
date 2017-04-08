/*
Element.addEventListener("click",handler_function,false)  第三个表示是否可以事件拦截
		removeEventListener("click",handler_function)
Element.attachEvent("onclick",handler_function)
		deattachEvent("onclick",handler_function)



*/
//事件处理的参数
function handler_function(event){//其中event有浏览器提供：事件对象
		event = event || window.event;
}


//事件处理的上下文 this 
//在window.onevent=func 和 addEventListener() 中，调用函数是 this都是指向当前的对象，
//但是在attachEvent()中 this 是 全局对象

function addEvent(target,type,handler){
	if(target.addEventListener)
		target.addEventListener(type,handler);
	else
		attachEvent("on"+type,function(){ retuen handler.call(target,event);});
		//在target上调用 event 使得 this 指向 target
}

/*
事件处理程序的作用域
1.词法作用域，引用在其定义是确定的作用域，而不是运行时的作用域
2.在<p onclick=“your codes” > 的函数 运行在顶级的作用域
*/

/*
事件处理程序的返回值：
 返回 false 就是告诉浏览器 不要指向 此事件的默认处理函数。  当时这只对 window.onclick = func
 定义的函数才有效。
*/

/*
事件的传播：大部分事件冒泡到DOM 的树根
事件传播的三个阶段：
	一、事件的捕获阶段。在事件没有送达 目标 之前
	二、事件的处理阶段。送达目标，且处理中
	三、目标处理事件完毕，将事件冒泡给父元素。
*/


//一下定义事件处理函数，并取消默认的处理函数。
function Handler_not_Default(event){
	var event = event || window.event;

	//在这里 是 你的代码逻辑

	if(event.preventDefault) event.preventDefault();  //标准技术
	if(event.returnValue) event.returnValue = false;  //IE
	return false;  //使用对象属性定义的处理程序

}

/*
事件的取消
在支持addEventListener 的浏览器中，使用 Event.stopPropagation() 组织事件继续传播
IE9 event.cancelBubble()
IE9之前，不支持事件捕获，所以不能阻止事件冒泡
*/

/*
文档的加载事件：
document.readyState 
event.type = "readystatechange"
*/

