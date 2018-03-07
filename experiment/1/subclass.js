function inherit(p) {
    if (p === null) throw TypeError("can not be null");
    if (typeof p != "object") {
        throw new TypeError("object is needed!");
    }
    if (Object.create) {
        return Object.create(p);
    }

    function f() {};
    f.prototype = p;
    return new f();
}
//返回一个以参数p为原型的对象，换句话说，就是继承了p的所有属性的对象，如果把此返回的对象，当做一个原型对象的话
//就可以吧返回的对象看作是，p 的子类。。应为可以用其创建别的实例对象。。。

function extend(o, p) {
    for (var prop in p) {
        o[prop] = p[prop];
    }
    return o;
}
//扩充对象o 的属性，使其具备对象p 的功能。。。。。将p 的可枚举属性交给o 继承。
//或者说是让返回的对象继承  o and p ；

function createSubClass(superClass, //由于构造函数是类的公有标识，所以此处的superClass是一个构造函数对象
                        new_property,//需要为子类添加的新的实例属性
                        class_property)//为子类添加的新的类属性
 { 
    function f() {
        superClass.apply(this,arguments);//调用父类的构造函数，来初始化新对象。
    };
    extend(f,class_property);
    //f.prototype = superClass.prototype;
    extend(f.prototype,superClass.prototype);
    extend(f.prototype,new_property);
    f.prototype.constructor = f;
    return f;
    
}

var obj = {
    x: 3,
    y: 4,
};

var obj2 = {
    z: 5,
    w: 6,
}

function c_obj(){

}

c_obj.prototype = obj;     // !!!!!!!!!!!!!!!!!!!!!!!!!注意  注意，这次赋值语句之前，请一定要让obj 和 c_obj 已经声明过，即已经存在过
                           // 虽然变量的声明会提升到脚本或者函数的顶部，，，但是，但是，，我猜想，他们依然是按照声明的先后，有序的，
                           //就像是：编译c程序时，，在命令行后给出的 源文件的顺序 是有影响的， 
                           //否则 运行时 createSubClass 可以感知到  superClass 为 c_obj，但是显示 c_obj.prototype 为 undefined！！

console.log(c_obj.prototype);  
                           

var child1 = inherit(obj);
var child2 ={} ;
extend(child2, child1);
//c_obj.prototype = obj;
var subclass = createSubClass(c_obj,{name:"wangzhen"},{age:23});
var child3 = new subclass();
//console.log(child1.x + " " + child1.y);
//console.log(child2.x + " " + child2.y + " " + child2.w + " " + child2.z);
console.log(child3.x + " " + child3.name);