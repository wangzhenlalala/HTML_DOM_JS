myobj = {
	name:"wangzhen",
	age:24,
	say_hello:function(){
		alert(this.name + age);
	}
}

function cre_obj(){
	this.sex = "male"; //here this points to the newly-created object.
}

cre_obj.prototype = myobj;

function to_call(){
	
	var now_obj = new cre_obj();
	alert(now_obj.name + now_obj.sex);
}



// above codes say:when we create an object from a constructor,the keyword this points to the newly-created object.


var scope="global scope";
function outerouter(){
	var scope="outerouter scope";
	function outer(){
		var scope="outer scope";
		function inner(){
			alert(scope);
			alert(arguments.caller.arguments.caller.scope); /// this and arguments can not be inherited!!
		}
		return inner;
	}
	outer()();
}


//above codes say:scope chain 



function normal(){
		console.log("hi this is normal");
		var addition = 0;
		for(var i = 0;i<arguments.length;i++){
			addition+=arguments[i];
		}
		console.log(addition);
}

function wrapper(name){
	
	return function(){
		console.log("before");
		//var outer_argument = arguments;
		
		/* 
		//var relult = name(arguments);
		如果这样来调用被包装的函数的话，会出错的。因为这个时候，我们只是把当前的arguments
		赋值给了 被包装函数的arguments[0]，而不是被包装函数的arguments，所以我们得告诉被包装
		的函数，我们给你的参数，就是你的实参对象，不要把它当成你的第一个实参。
		而function.apply(this,array_like)就是做这个的，它明确的告诉function，我的第二个参数
		就是你的实参对象，别想多了！！
		*/
		var result = name.apply(this,arguments);
		console.log("after");
		return result;
	}
	
}

//wrapper(normal);

//window.onload=function(){normal(3,4);}
//window.onload=function(){wrapper(normal)(3,4,5)};

function Person(name){
	this.name = name;
	this.sex=22;
	//this.age = age;
}
Person.prototype.say=function xx(){console.log(this.name +this.age);};
Person.prototype.age=23;
Person.prototype.sex;  //原型对象的属性，如果不初始化那就是不存在的，
Person.prototype.xiaomeing=55;
//Person.name = "Person";

var v1 = new Person("wangzhen");
var v2 = new Person("fanghua");

//console.log(v1.name + " " + v1.age);
//console.log(v1.say());
//console.log(v2.say());

console.log(v1.name);
console.log(v1.constructor.name);
function list_pro(){
	for(var p in v1){
		console.log(p);
	}
}
console.log(Object.isExtensible(Person.prototype));