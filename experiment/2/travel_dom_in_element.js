function parent(element,n){
    /*返回element 的第n层祖先元素对象
    如果 n > 0,返回element的第n层祖先
    如果不存在第n层祖先，则返回 null ，
    如果 n = 0 ,返回element自身，
    如果 n = 1,或者 没有指定n 则返回element的父元素对象
    */
    if(n === undefined) n = 1;
    for(var i = 0 ; i < n && element ; i++){
        element = element.parentNode;   
    } 
    return element; //调用者要 自己去检查 函数的返回值是否为  null.

    
}

function sibling(element,n){
    /* 返回element元素对象的第n个，元素节点对象，
    如果n= 0,返回自身
    如果n > 0,返回后续的第n 个元素节点
    如果n < 0,返回先前的第n 个元素节点
    如果不存在第n 个元素节点，则返回nul.
    */
    if(element.nodeType != 1) throw new TypeError("Element is needed");
    if(n<0){
        for(var i = 0 ; i > n && (element !== null) ; i--){
            do{
                element = element.previousSibling;
            }while(element && element.nodeType != 1);  //使的element总是指向一个 Element 节点对象。  
        }
    }else{ // when n >= 0 时。
        for(var i = 0 ; i < n && (element !== null); i++){
            //while(element !== null && element.nodeType != 1) element = element.nextSibing;
            do{
                element = element.nextSibling;
            }while(element && element.nodeType != 1);
        }
    }
    return element;
}


function child(element,n){
    /*返回element元素的第n个  孩子元素节点
    其中n = 1,返回第一个孩子节点 n = 2 返回第二个孩子节点.............
       n= -1 返回倒数第一个孩子节点，n =-2 返回倒数第二个孩子节点 ......
    */
    if (!element) return null;
    
    if(n > 0){
        element = element.firstChild;
        while(element && element.nodeType != 1) element = element.nextSibling;  //是element总是指向第一个Element元素。
        return sibling(element,n-1);
                
            //for(var i = 1; i < n+1 && element ; i++){
            /* 
                while(element && element.nodeType != 1){
                    element = element.nextSibling;
                }
                这样写这个循环是不对的，当element为Element元素时，下一次来到while循环，条件总是为假，不会进入while的循环体，；element 将不会改变了
                所以element总是为 第一个 元素节点
            */ 
    }else if( n < 0){
        element = element.lastChild; //这里的lastChild 不一定是 Element 元素，所以 i=-1 时，执行循环体后，element 指向 倒数第一个Element元素
        while(element && element.nodeType != 1) element = element.previousSibling;  //是element总是指向最后一个Element元素。 
        return sibling(element,n+1);
            //for(var i = -1 ;i > n-1 && element; i--){
            /*
                while(element && element.nodeType != 1){
                    element = element.previousSibling;
                }
                和上面一样的问题  element总是为  倒数第一个元素节点
            */
    }
    return element;
}

function print_message(){
    var byid = document.getElementById("target");
    
    console.log(byid.toString());

    var div_par = parent(byid,1);
    var div_sib = sibling(byid,-2);
    var div_child = child(byid,1);
    var div_child2 = child(byid,-3);
    

    console.log(div_par.nodeName);
    console.log(div_sib.nodeName);
    console.log(div_child.nodeName);
    console.log(div_child2.nodeName);
}
    

window.onload = print_message;
