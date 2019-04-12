window.onload = function (ev) {
    console.log('我来了');
    var btn = document.getElementById("myButton");
    // DOM0方式
    // btn.onclick = function (ev1) {
    //     console.log(this.id);
    // }
    // DOM2方式
    // btn.addEventListener('click', function (ev1) {
    //     console.log(this.id);
    // }, false);
    //
    // btn.addEventListener('click', function (ev1) {
    //     console.log('Hello world!');
    // }, false);

    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            }
            // else if (element._attachEvents) {
            //     element._attachEvents("on" + type, handler);
            // }
            else {
                element["on" + type] = handler;
            }
        },
        removeHandler:function (element,type,handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            }
            // }else if (element.detac) {
            //     element._attachEvents("on" + type, handler);
            // }
            else {
                element["on" + type] = null;
            }
        }
    }

    // 同时绑定多个事件,event.type
    var handler = function (event) {
        switch (event.type) {
            case 'click':
                console.log('点我点我');
                console.log(event.eventPhase);
                // event.stopPropagation();//阻止冒泡
                break;
            case 'mouseover':
                event.target.style.backgroundColor = 'red';
                break;
            case 'mouseout':
                event.target.style.backgroundColor = "";
                break;
        }
    }

    // 事件传播
    // document.body.onclick = function (ev1) {
    //     console.log('body clicked');
    //     console.log(ev1.eventPhase);
    // };

    document.body.addEventListener('click', function (ev1) {
        console.log('body clicked:冒泡阶段');
        console.log(ev1.eventPhase);
    }, false);
    document.body.addEventListener('click', function (ev1) {
        console.log('body clicked:捕获阶段');
        console.log(ev1.eventPhase);
    }, true);

    // 阻止冒泡

    btn.onclick = handler;
    btn.onmouseover = handler;
    btn.onmouseout = handler;

    // 阻止特定事件的默认行为
    var link = document.getElementById("myLink");
    link.onclick = function (ev1) {
        ev1.preventDefault();
    }

    var img = document.getElementById("myImage");
    img.style.width = 200;
    img.style.height = 200;
    // EventUtil.addHandler(img,'load',function (event) {
    //     console.log('image loaded');
    // })
    img.onload = function (ev1) {
        console.log('image loaded');
    }

    var txt1 = document.getElementById("myText1");
    var txt2 = document.getElementById("myText2");

    txt1.onfocus = function (ev1) {
        console.log('你获得了我1');
    }
    txt1.onblur = function (ev1) {
        console.log('你失去了我1');
    }

    txt2.onfocus = function (ev1) {
        console.log('你获得了我2');
    }
    txt2.onblur = function (ev1) {
        console.log('你失去了我2');
    }

    // 鼠标滚轮事件
    document.onmousewheel = function (ev1) {
        console.log(ev1.wheelDelta);
    }

    document.onkeydown = function (ev1) {
        console.log('随便按了'+ev1.key);
    }

    document.onkeypress = function (ev1) {
        console.log('按了字符'+ev1.key);
    }

    document.onkeyup = function (ev1) {
        console.log('溜了溜了');
    }




    // txt1.ontextInput
    // 右键显示菜单
    var div = document.getElementById("myDiv");
    div.oncontextmenu = function (ev1) {
        ev1.preventDefault();

        var menu = document.getElementById("myMenu");
        menu.style.left = ev1.clientX + "px";
        menu.style.top = ev1.clientY + "px";

        menu.style.visibility = "visible";

        // 为每个li绑定不同的事件,方式一

        var lis = document.getElementsByTagName("li");
        if (!lis) {
            return;
        }
        // lis.forEach(function (item) {
        //     item.addEventListener('click', function (ev2) {
        //         console.log('sdfs');
        //     }, false);
        // })
        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click',function (evt) {
                var children = evt.target.children;
                if (children && children.length > 0) {
                    console.log(children[0].href);
                }
            },false)
        }

        document.onclick = function (ev2) {
            menu.style.visibility = "hidden";
        };
    }


}

window.onresize = function () {
    console.log('我变形了');
}

window.onbeforeunload = function (ev) {
    // var message = "我会想你的";
    // ev.returnValue = message;
    // return message;
}

document.oncontextmenu = function (ev) {
    console.log('wewe');
}

// window.onload = function (ev) {
//
// }
// (function () {
//     var showCount = 0;
//
//     window.onpageshow = function (ev) {
//         showCount++;
//         console.log('页面被显示了' + showCount + "次");
//     }
// })();
