window.onload= function (ev) {
    var a = 0.1,
        b = 0.2,
        c = 0.15,
        d = 0.25;

    console.log("a+b="+(a+b));
    console.log("c+d="+(c+d));

    // 布尔运算
    var ob = {
        name: "javascript"
    };
    var str = "String";
    console.log("-----&&操作符用法：");
    console.log("操作数一为对象，：")
    console.log(ob && str);

    console.log("Infinity/23:" + Infinity / 23);
    console.log("23/0:" + 23 / 0);
    console.log("Infinity-Infinity:" + Infinity-Infinity);
    console.log("'5'+5:" + ('5'+5));
    console.log("5+'5':" + (5+'5'));
    console.log("'23'<'3':" + ('23'<'3'));//"2"的字符编码是 50，而"3"的字符编码是 51
    console.log("" + 1);

    for (var i = 0; i < 10; i++) {

    }
    // alert(i);

    /*********引用类型************/
    // 1、可选参数
    console.log("--------可选参数：")
    function displayInfo(args) {
        var output = "";
        if (typeof args.name == "string") {
            output += "Name:" + args.name + "\n";
        }
        if (typeof args.age == "number") {
            output += "age" + args.age + "\n";
        }
        console.log(output);
    }

    displayInfo({
        name: "tyk1",
        age: 26
    });
    displayInfo({
        name:"tyk2"
    })
    // 2.转换方法
    console.log("--------转换方法：")
    var person1 = {
        toLocaleString: function () {
            return 'Nikolaos';
        },
        toString: function () {
            return 'Nikolaos';
        }
    };
    var person2 = {
        toLocaleString: function () {
            return 'Grigorios';
        },
        toString: function () {
            return 'Greg';
        }
    };
    var person = [person1, person2];
    console.log(person);
    console.log(person.toString());
    console.log(person.toLocaleString());

    console.log("------反队列效果：");
    var colors = new Array();
    var count = colors.unshift("red", "orange");
    console.log(count);

    count = colors.unshift("black");
    console.log(count);

    var item = colors.pop();
    console.log(item);
    console.log(colors.length);

    // 3.重排序方法
    console.log("------重排序方法：");
    var values = [0, 1, 5, 10, 15];
    values.sort();
    console.log(values);

    function compare(value1, value2) {
        if (value1 > value2) {
            return -1;
        } else if (value2 < value2) {
            return 1;
        } else {
            return 0;
        }
    }

    values.sort(compare);
    console.log(values);

    // 4.位置方法
    console.log("------位置方法：")
    var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    console.log(numbers.indexOf(4));
    console.log(numbers.lastIndexOf(4));
    console.log(numbers.indexOf(4, 4));
    console.log(numbers.lastIndexOf(4, 4));

    // 4.迭代方法
    console.log("------迭代方法：")
    var everyResult = numbers.every(function (value, index, array) {
        return (value > 2);
    });
    console.log(everyResult);
    var someResult = numbers.some(function (value) {
        return (value > 2);
    });
    console.log(someResult);

    var filterResult = numbers.filter(function (value) {
        return (value > 2);
    });
    console.log(filterResult);

    var mapResult = numbers.map(function (value) {
        return (value * 2);
    });
    console.log(mapResult);

    numbers.forEach(function (value) {
        console.log(value);
    });

    // RegExp类型
    console.log("-----RegExp类型-----");
    var re = null;
    for (var j = 0; j < 10; j++) {
        re = /cat/g;
        console.log(re.test("catastrophe"));
    }
    for (var j = 0; j < 10; j++) {
        re = new RegExp('cat', 'g');
        var test2 = re.test("catastrophe");
        console.log(test2);
    }

    // 作为值的函数
    console.log('----作为值的函数');
    function createConparisonFunction(propertyName) {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (value1 > value2) {
                return 1;
            }else if (value1 < value2) {
                return -1;
            } else {
                return 0
            }
        }
    }

    var  data = [
        {
            name:'Zachary',
            age: 26
        },
        {
            name:'Nicholas',
            age: 27
        }
    ]
    data.sort(createConparisonFunction('name'));
    console.log(data[0].name);

    data.sort(createConparisonFunction('age'));
    console.log(data[0].name);

    // 函数的内部属性
    console.log('----函数的内部属性：');
    console.log('----函数的内部属性arguments：');
    function factorial(num) {
        if (num <= 1) {
            return 1;
        } else {
            // return num * factorial(num - 1);
            return num * arguments.callee(num - 1);
        }
    }

    console.log(factorial(5));
    console.log('----函数的内部属性this：');
    window.color = 'red';
    var o = {color:'blue'}
    function sayColor() {
        console.log(this.color);
    }

    // sayColor();
    // o.sayColor = sayColor;
    // o.sayColor();
    sayColor.call(this);
    sayColor.call(window);
    sayColor.call(o);

    var objectSayColor = sayColor.bind(o);
    objectSayColor();

    console.log('----函数的内部属性caller：');
    function outer() {
        inner();
    }
    function inner() {
        // console.log(inner.caller);
        console.log(arguments.callee.caller);
    }

    outer();


}