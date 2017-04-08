/*我们可以在moveComeAndGo.html中将一个div的left属性现行变化的思路更近一步，将改变对象的属性的过程 尽可能的封装起来
1.我们需要一个对象，
2.我们需要该对象需要改变的属性名称，需要时数值类型的
3.该属性将要变化到什么程度，它的终点值是多少。

4.该变化过程的持续时间
5.变化完成之后，需要做其他的操作吗，传递一个callback函数。
这就是jQuery的animate()函数的主要选项了
*/

function myAnimate(obj,attr,iTarget){
	clearInterval(obj.timerHandler);
	var speed = 10;
	obj.timerHandler  = setInertval(function(){
		if((iTarget - obj[attr]) > 0){
			speed = speed;
			if(obj[attr] < iTarget){
				obj[attr] = obj[attr] + speed;
			}
		}else{
			speed = -speed;
		}

		if(Math.abs(iTarget - obj[attr]) < 10 obj[attr] )   //这里该如何表示  属性正在朝着 目标变化 ，需要进一步计算？？？？？

	},30);
}
maAnimate.timerHandler = false;