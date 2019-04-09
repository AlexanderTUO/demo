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


    // parentNode.appendText("我是新增的节点");
    console.log('文本节点：');
    var textNode = document.createTextNode("hello world!");
    parentNode.appendChild(textNode);

    // var node = document.createElement("div");
    // node.className = "fragment";
    // node.appendChild(document.createTextNode("fragment类型："));
    // document.body.appendChild(node);

    var fragment = document.createDocumentFragment();
    var ul = document.getElementById("myList");
    var li = null;
    for (var i = 0; i < 5; i++) {
        li = document.createElement("li");
        li.appendChild(document.createTextNode("Item" + (i + 1)));
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);

    var node1 = document.querySelector("div");
    var lis = node1.querySelectorAll("li");

    console.log('遍历元素：');
    var child = parentNode.firstElementChild;
    while (child != parentNode.lastElementChild) {
        console.log(child.textContent);
        child = child.nextElementSibling;
    }

    console.log('=====HTML5=====');
    console.log('自定义数据属性：');
    var appId = parentNode.dataset.appid;
    var myName = parentNode.dataset.myname;
    console.log(appId);
    console.log(myName);

    var div = document.getElementById("content");
    // div.innerHTML = "<p>This is a paragraph</p>";
    // div.outerHTML = "<p>This is a paragraph</p>";

    var para = document.getElementById("para");
    para.insertAdjacentHTML("beforebegin", "<p>hello world</p>");

    console.log(parentNode.style.width);
}