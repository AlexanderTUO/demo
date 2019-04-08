window.onload = function (ev) {
    console.log('节点操作：');
    var newNode = document.createElement("li");
    newNode.innerHTML = '5';
    var parentNode = document.getElementById("parent");
    var returnedNode = parentNode.appendChild(newNode);
    console.log(returnedNode);
    console.log(returnedNode == parentNode.firstChild);//false
    console.log(returnedNode == parentNode.lastChild);//true

    console.log('clonNode:');
    var deepList = parentNode.cloneNode(true);
    console.log(deepList.childNodes.length);//10，包含li和text

    var shallowList = parentNode.cloneNode(false);
    console.log(shallowList.childNodes.length);//0

    

}