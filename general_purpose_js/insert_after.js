/*
function  add_more_handler_for_load()  may be expensive when we attach many functions because of the overhead of function call. 
when we add a new handler,when create a wrapper function to hold the old handler and the new handler  and we increment the function call by one time to call the
wrapper.so every time we add a new function we have one more extra function call overhead! if we add n new handler functions in total,n times extra function call for 
wrapper function is wasteless,,,,,,maybe we could sacrifice space to save time.
*/
function myAddEventHandler(func) {
    var old_load = window.onload; //to save old event handler
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            old_load();
            func();
        }
    }
}

/*      // oh it is so difficult to write  my own "AddEventHandler()"   ,too many things have to be concerned!!
function myAddEventHandler(event_to, func_to) {
    var event = "on" + event_to;
    var handler = new Array();
    var to_call_function = function() {
        for (var i = 0; i < handler.length; i++) {
            handler[i]();
        }
    }
    handler.push(window.event);
    handler.push(func_to);

    window.event = to_call_function;

}
*/



function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}