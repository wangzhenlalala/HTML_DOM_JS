function showPic(whichpic) { //it needs a parameter of type nodeType;
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source); // if placeholder exists,thing goes all right regardless of description's presence ,or it is bad and we tell
                                             // our caller that we failed to update picture by returing false.
    if (document.getElementById("description")) {
        text = whichpic.getAttribute("title");
        description = document.getElementById("description");
        description.firstChild.nodeValue = text; // p's firstchild is a TextElement
    } // id description dose not exist ,we ignore to update it.
    return true;
}

function create_img_p() {
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "default.png");
    placeholder.setAttribute("alt", "to hold picture");

    var para = document.createElement("p");
    para.setAttribute("id", "description");
    var text = document.createTextNode("pleade choose an img!");
    para.appendChild(text);

    var mark_a = document.getElementById("mark_a");
    insertAfter(placeholder, mark_a);
    insertAfter(para, placeholder);

}

function count_nodes() {
    var oBody = document.getElementsByTagName("body")[0];
    alert(oBody.childNodes.length);
}

function popUp(URL_TO) {
    window.open(URL_TO, "popup_window", "width=500px,height=400px")
}



function a_add_onclick() {
    if (!document.getElementById) return false; //object detection 
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("mark_a")) return false;
    var gallery = document.getElementById("mark_a");
    var all_a = gallery.getElementsByTagName("a"); //getElementById is call in object gallery of type Element
    
	for (var i = 0; i < all_a.length; i++) {
        all_a[i].onclick = function(){ //to register a function for tag "a" when it is clicked!!
            return !showPic(this);    // when a anchor element is clicked,whather to follow the default onclick fuction that open a new window to show the href
                                       // depends on whether showPic() runs successfully or not.
			console.log(i);
		}
    }
}



myAddEventHandler(create_img_p);
myAddEventHandler(a_add_onclick);

 // it is ok to put this line before or after "add_more_handler_for_load(a_add_onclick)"
//add_more_handler_for_load(count_nodes);



