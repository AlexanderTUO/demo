window.onload = function (ev) {
    console.log('高级技巧');

    var arr = new Array();

    var fun = function () {
        console.log('我是方法');
    }

    console.log('检测类型');

    function isArray(value) {
        console.log(Object.prototype.toString.call(value));
        return Object.prototype.toString.call(value)=="[object Array]";//toString没得（），是属性？？
    }

    function isFuntion(value) {
        console.log(Object.prototype.toString.call(value));
        return Object.prototype.toString.call(value)=="[object Function]";
    }

    console.log('作用域安全的构造函数-----');

    function Polygon(sides) {
        if (this instanceof Polygon) {
            this.sides = sides;
        } else {
            return new Polygon(sides);
        }
    }

    Rectangle.prototype = new Polygon();
    function Rectangle(width,height) {
        Polygon.call(this, 4);
        this.width = width;
        this.height = height;
    }

    var rec = new Rectangle(5, 10);

    console.log(rec.sides);

    console.log('函数绑定----');

    var handler = {
        message: "来了，老弟",
        handleClick:function (event) {
            console.log(this.message);
        }
    }

    var myBindBtn = document.getElementById("myBindBtn");
    myBindBtn.addEventListener('click', handler.handleClick, false);


    // 防篡改对象
    Object.preventExtensions(handler);
    handler.age = 19;
    console.log(handler.age);

    console.log('=====高级定时器：');
    console.log('-----Yielding Process');

    function chunk(arr,process,context) {
        setTimeout(function () {
            var item = arr.shift();
            process.call(context,item);

            if (arr.length > 0) {
                setTimeout(arguments.callee, 100);
            }
        },100)
    }

    function process(item) {
        var myDiv = document.getElementById("myDiv");
        myDiv.innerHTML +=item+"<br>";
    }

    var data = [2323, 234, 34543, 4564, 7657, 56768, 7, 345, 546, 54654];
    chunk(data.concat(),process);

    console.log('函数节流');
    function throttle(method,context) {
        clearTimeout(method.tId);
        method.tId= setTimeout(function () {
            method.call(context);
        },100)
    }

    // 寄生组合继承
    function inheritPrototype(subType,superType) {
        var prototype = Object.create(superType.prototype);//创建对象
        prototype.constuctor = superType;//增强对象
        subType.prototype = prototype;//指定对象
    }

    console.log('=====自定义事件');
    function EventTarget() {
        this.handlers = {}
    }

    EventTarget.prototype ={
        constructor: EventTarget,
        addHandler:function (type,handler) {
            if (typeof this.handlers[type]=="undefined") {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },
        fire: function (event) {
            if (!event.target) {
                event.target = this;
            }
            if (this.handlers[event.type] instanceof Array) {
                var handlers = this.handlers[event.type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](event);
                }
            }
        },
        removeHandler:function (type,handler) {
            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (var i = 0,len = handlers.length; i < len ; i++) {
                    if (handler === handlers[i]) {
                        break;
                    }
                }
                handlers.splice(i, 1);
            }
        }
        
    }

    function Person(name,age) {
        EventTarget.call(this);
        this.name = name;
        this.age = age;
    }

    inheritPrototype(Person, EventTarget);
    
    Person.prototype.say = function (message) {
        this.fire({type:"message", message: message})
    }

    function handleMessage(event) {
        console.log(event.target.name + " says:" + event.message);
    }

    var person = new Person("Nicholas", 23);

    person.addHandler('message', handleMessage);

    person.say("我来了");

    console.log('=====拖动事件');
    // var drag = function () {
    //     var dragging = null,
    //         diffX=0,
    //         diffY=0;
    //
    //     function handlEvent(event) {
    //         switch (event.type) {
    //             case "mousedown":
    //                 if (event.target.className.indexOf("draggable") > -1) {
    //                     dragging = event.target;
    //                     // 改善
    //                     diffX = event.clientX - event.target.offsetLeft;
    //                     diffY = event.clientY - event.target.offsetTop;
    //                 }
    //                 break;
    //             case "mousemove":
    //                 if (dragging!==null) {
    //                     dragging.style.top = (event.clientY-diffY) + "px";
    //                     dragging.style.left = (event.clientX-diffX)+ "px";
    //                 }
    //                 break;
    //             case "mouseup":
    //                 dragging = null;
    //                 break;
    //         }
    //     }
    //
    //
    //     // 公共接口
    //     return {
    //         enable:function () {
    //             document.addEventListener('mousedown', handlEvent, false);
    //             document.addEventListener('mousemove', handlEvent, false);
    //             document.addEventListener('mouseup', handlEvent, false);
    //         },
    //         disable:function () {
    //             document.removeEventListener('mousedown', handlEvent, false);
    //             document.removeEventListener('mousemove', handlEvent, false);
    //             document.removeEventListener('mouseup', handlEvent, false);
    //         }
    //     }
    // }

    // DragDrop().enable();
    console.log('自定义事件：')
    // var DragDrop = function () {
    //     var dragdrop = new EventTarget(),
    //         dragging = null,
    //         diffX = 0,
    //         diffY = 0;
    //
    //     function handlEvent(event) {
    //         switch (event.type) {
    //             case "mousedown":
    //                 if (event.target.className.indexOf("draggable") > -1) {
    //                     dragging = event.target;
    //                     // 改善
    //                     diffX = event.clientX - event.target.offsetLeft;
    //                     diffY = event.clientY - event.target.offsetTop;
    //                     // dragdrop.fire({
    //                     //     type: "dragstart",
    //                     //     target: dragging,
    //                     //     x: event.clientX,
    //                     //     y: event.clientY
    //                     // })
    //                     dragdrop.fire({type:"dragstart", target: dragging,
    //                         x: event.clientX, y: event.clientY});
    //                 }
    //                 break;
    //             case "mousemove":
    //                 if (dragging !== null) {
    //                     dragging.style.top = (event.clientY - diffY) + "px";
    //                     dragging.style.left = (event.clientX - diffX) + "px";
    //
    //                     // dragdrop.fire({
    //                     //     type: "drag",
    //                     //     target: dragging,
    //                     //     x: event.clientX,
    //                     //     y: event.clientY
    //                     // })
    //                     //触发自定义事件
    //                     dragdrop.fire({type:"drag", target: dragging,
    //                         x: event.clientX, y: event.clientY});
    //                 }
    //                 break;
    //             case "mouseup":
    //                 // dragdrop.fire({
    //                 //     type: "dragend",
    //                 //     target: dragging,
    //                 //     x: event.clientX,
    //                 //     y: event.clientY
    //                 // })
    //                 dragdrop.fire({type:"dragend", target: dragging,
    //                     x: event.clientX, y: event.clientY});
    //                 dragging = null;
    //                 break;
    //         }
    //     }
    //
    //
    //     dragdrop.enable = function () {
    //         document.addEventListener('mousedown', handlEvent, false);
    //         document.addEventListener('mousemove', handlEvent, false);
    //         document.addEventListener('mouseup', handlEvent, false);
    //     };
    //     dragdrop.disable = function () {
    //         document.removeEventListener('mousedown', handlEvent, false);
    //         document.removeEventListener('mousemove', handlEvent, false);
    //         document.removeEventListener('mouseup', handlEvent, false);
    //     };
    //     return dragdrop;
    // }();

    var DragDrop = function(){
        var dragdrop = new EventTarget(),
            dragging = null,
            diffX = 0,
            diffY = 0;
        function handleEvent(event){
            //获取事件和对象
//             event = EventUtil.getEvent(event);
            var target = event.target;
            //确定事件类型

            switch(event.type){
                case "mousedown":
                    if (target.className.indexOf("draggable") > -1){
                        dragging = target;
                        diffX = event.clientX - target.offsetLeft;
                        diffY = event.clientY - target.offsetTop;
                        dragdrop.fire({type:"dragstart", target: dragging,
                            x: event.clientX, y: event.clientY});
                    }
                    break;
                case "mousemove":
                    if (dragging !== null){
                        //指定位置
                        dragging.style.left = (event.clientX - diffX) + "px";
                        dragging.style.top = (event.clientY - diffY) + "px";
                        //触发自定义事件
                        dragdrop.fire({type:"drag", target: dragging,
                            x: event.clientX, y: event.clientY});
                    }
                    break;
                case "mouseup":
                    dragdrop.fire({type:"dragend", target: dragging,
                        x: event.clientX, y: event.clientY});
                    dragging = null;
                    break;
            }
        };
        //公共接口
        dragdrop.enable = function () {
            document.addEventListener('mousedown', handleEvent, false);
            document.addEventListener('mousemove', handleEvent, false);
            document.addEventListener('mouseup', handleEvent, false);
        };
        dragdrop.disable = function () {
            document.removeEventListener('mousedown', handleEvent, false);
            document.removeEventListener('mousemove', handleEvent, false);
            document.removeEventListener('mouseup', handleEvent, false);
        };
        return dragdrop;
    }();


    DragDrop.addHandler("dragstart", function(event){
        var status = document.getElementById("status");
        status.innerHTML = "Started dragging " + event.target.id;
    });
    DragDrop.addHandler("drag", function(event){
        var status = document.getElementById("status");
        status.innerHTML += "<br/> Dragged " + event.target.id + " to (" + event.x +
            "," + event.y + ")";
    });
    DragDrop.addHandler("dragend", function(event){
        var status = document.getElementById("status");
        status.innerHTML += "<br/> Dropped " + event.target.id + " at (" + event.x +
            "," + event.y + ")";
    });


}