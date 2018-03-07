function invocation(){
    var image = document.getElementById("shower");
    image.onmouseover = to_inflation;
    image.onmouseout = to_back;

    function to_inflation(){
        this.className = "shower2";
        return false;
    }
    function to_back(){
        this.className = "shower1";
        return false;
    }
}

window.onload = invocation;