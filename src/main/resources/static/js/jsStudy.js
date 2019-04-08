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
    var count = colors.unshift("red", "orange"); //unshift向前插入
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
    function createComparisonFunction(propertyName) {
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
    data.sort(createComparisonFunction('name'));
    console.log(data[0].name);

    data.sort(createComparisonFunction('age'));
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

    console.log('======第六章 面向对象的程序设计======');
    console.log('------属性类型');
    var person = {};
    Object.defineProperty(person, "name", {
        writable: false,
        value: "Nicholas"
    });
    console.log(person.name);
    person.name = 'Greg';
    console.log(person.name);

    var descriptor = Object.getOwnPropertyDescriptor(person, 'name');
    console.log(descriptor.configurable);
    console.log(descriptor.writable);
    console.log(descriptor.enumerable);
    console.log(descriptor.value);

    console.log('-----原型模式：');

    function Person() {

    }

    // Person.prototype.name = 'Nicholas';
    Person.prototype.age = 29;
    Person.prototype.job = 'Software Engineer';
    Person.prototype.sayName = function () {
        console.log(this.name);

    };
    var person11 = new Person();
    person11.sayName();

    var person22 = new Person();
    person22.sayName();

    console.log(person11.sayName == person22.sayName);//true

    console.log(Person.prototype.isPrototypeOf(person11));//true
    console.log(Person.prototype.isPrototypeOf(person22));//true

    console.log(Object.getPrototypeOf(person11) == Person.prototype);//true
    console.log(Object.getPrototypeOf(person11).name);//Nicholas

    console.log(person11.hasOwnProperty('name'));//false
    person11.name = "Greg";
    console.log(person11.hasOwnProperty('name'));//true--来自原型

    console.log(person11.name);//Greg,从实例中获取
    console.log(person22.name);//Nicholas,从原型中获取

    delete person11.name;
    console.log(person11.name);//Nicholas,从原型中获取

    /**
     * 判断是否是原型属性
     * @param object
     * @param name
     * @returns {boolean}
     */
    function hasPrototypeProperty(object,name) {
        return !object.hasOwnProperty(name) && (name in object);
    }

    console.log('----遍历属性：');
    var o = {
        toString :function () {
            return "My Object";
        }
    }
    for(var prop in o){
        if (prop == 'toString') {
            console.log('Found toString');
        }
    }

    var customObj = {
        name: "tyk",
        birthday: '92-12'
    };
    var customObjKeys = Object.keys(customObj);
    console.log(customObjKeys);
    for(var prop1 in customObj){
        console.log(prop1);
    }
    console.log(Object.getOwnPropertyNames(customObj));

    console.log('------完全重写prototype对象：');


    Person.prototype = {
        name: 'Nicholas',
        age: 29,
        job: "Software Engineer",
        birthday: "92-12",
        friends: ['Shelby', 'Court'],
        sayName :function () {
            console.log(this.birthday);//undefined
        }
    }
    var friend = new Person();
    friend.sayName();

    var person111 = new Person();
    var person222 = new Person();

    person111.friends.push('Van');

    console.log(person111.friends);
    console.log(person222.friends);
    console.log(person222.friends == person111.friends);

    console.log('=====构造函数模式和原型模式组合======');

    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.friends = ['Shelby', 'Court'];
    }

    Person.prototype = {
        constructor: Person,
        sayName: function () {
            console.log(this.name);
        }
    };

    console.log('========继承=======');

    function SuperType(name) {
        // this.property = true;
        this.name = name;
        this.colors = ['red', 'green', 'blue'];
    }
    SuperType.prototype.sayName = function () {
        // return this.property;
        console.log(this.name);
    }
    
    function SubType(name,age) {
        // this.subProperty = false;
        SuperType.call(this, name);//调用超类构造函数
        this.age = age;
    }

    //子类的原型指向父类的实例，继承
    // SubType.prototype = new SuperType();
    // SubType.prototype.constructor = SubType;//没有影响？？

    inheritPrototype(SubType, SuperType);
    SubType.prototype.sayAge= function () {
        console.log(this.age);
    }

    var instance = new SubType();
    // console.log(instance.getSuperValue());//true

    console.log('原型与实例的关系：')
    console.log(instance instanceof Object);//true
    console.log(instance instanceof SuperType);//true
    console.log(instance instanceof SubType);//true

    console.log('原型与实例的关系2：');
    console.log(Object.prototype.isPrototypeOf(instance));
    console.log(SuperType.prototype.isPrototypeOf(instance));
    console.log(SubType.prototype.isPrototypeOf(instance));

    console.log('原型的问题：实例的属性是继承类型的原型属性');
    var subType1 = new SubType();
    subType1.colors.push('black');

    var subType2 = new SubType();
    console.log(subType2.colors);

    console.log('组合继承：')
    var instance1 = new SubType('Nicholas', 27);
    instance1.colors.push('black');
    instance1.sayName();
    instance1.sayAge();
    console.log(instance1.colors);

    var instance2 = new SubType('Greg', 29);
    instance2.sayName();
    instance2.sayAge();
    console.log(instance2.colors);


    console.log('原型式继承：');
    var student = {
        name: 'Nicholas',
        num: 23
    };

    var anotherStudent = Object.create(student,{
        name:{
            value: 'Greg'
        }
    });
    console.log(anotherStudent.name);

    console.log('寄生式继承：');
    function createAnother(original) {
        var clone = Object.create(original);
        clone.sayHi = function () {
            console.log('Hi');
        };
        return clone;
    }

    var yetAnotherStudent = createAnother(student);
    yetAnotherStudent.sayHi();

    console.log('寄生组合式继承：');
    function inheritPrototype(subType,superType) {
        var prototype = Object.create(superType.prototype);//创建对象
        prototype.constuctor = superType;//增强对象
        subType.prototype = prototype;//指定对象
    }

    console.log('======函数表达式======：');
    console.log('------递归：');
    var factorial = (function f(num) {
        if (num <= 1) {
            return num;
        } else {
            return num * f(num - 1);
        }
    });
    console.log(factorial(4));

    console.log('------闭包与变量');

    function createFunctions0() {
        var result = new Array();
        for (var i = 0; i < 10; i++) {
            result[i] = function () {
                return i;
            }
        }
        return result;
    }

    function createFunctions() {
        var result = new Array();
        for (var i = 0; i < 10; i++) {
            result[i] = function (num) {
                return function () {
                    return num;
                };
            }(i);
        }
        return result;
    }

    // console.log(createFunctions0);
    // console.log(createFunctions);
    // console.log(createFunctions());
    // var res = createFunctions();


    // createFunctions();
    console.log('关于this对象：');
    var name = "This window";
    var obj = {
        name: 'My object',
        getNameFunc: function () {
            var that = this;
            return function () {
                return that.name;
            }

        }
    };

    console.log(obj.getNameFunc()());
    // alert(obj.getNameFunc()());

    console.log('----模范块级作用域');
    console.log('全局作用域：');
    function outputNum(count) {
        for (var i = 0; i < count; i++) {
            console.log(i);
        }
        console.log(i);//执行
    }
    outputNum(4);

    console.log('块级作用域：');
    function outputNum1(count) {
        (function () {
            for (var ii = 0; ii < count; ii++) {
                console.log(ii);
            }
        })();
        // console.log(ii);//not defined
    }
    outputNum1(4);

    console.log('------私有变量');
    console.log('特权方法：');
    function MyObject() {
        var privateVariable = 10;

        function privateFunction() {
            return false;
        }

        this.publicMethod = function () {
            privateVariable++;
            return privateFunction();
        }
    }

    var myObj = new MyObject();
    myObj.publicMethod();

    console.log('模拟存取器：');
    function PersonF(name) {
        this.getName  = function () {
            return name;
        }
        this.setName = function (value) {
            name = value;
        }
    }

    var personf = new PersonF('Nicholas');
    console.log(personf.getName());//Nicholas

    personf.setName('Greg');
    console.log(personf.getName());//Greg

    console.log('静态私有变量：');
    (function () {
        var privateVariable = 10;
        var privateFunction = function () {
            return false;
        }

        MyObject1 = function () {

        }
        MyObject1.prototype.publicMethod = function () {
            privateVariable++;
            return privateFunction();
        }
    })();

    console.log('静态私有变量例子：');
    (function () {
        var name;

        Person1 = function (value) {
            name = value;
        };
        Person1.prototype.getName = function () {
            return name;
        };
        Person1.prototype.setName = function (value) {
            name = value;
        }
    })();

    var person5 = new Person1('Nicholas');
    console.log(person5.getName());//Nicholas
    person5.setName('Greg');
    console.log(person5.getName());//Greg

    var person6 = new Person1('Michael');
    console.log(person6.getName());//Michael
    console.log(person5.getName());//Michael

    console.log('模块模式：');
    var application = function () {
        var components = new Array();
        components.push('组件');

        return {
            getComponentsLength: function () {
                return components.length;
            },
            registerComponent: function (component) {
                if (typeof component == 'object') {
                    components.push(component);
                }
            }
        }
    }();

    var application2 = function () {
        var components = new Array();
        components.push('组件');

        var app = new SuperType();
        app.getComponentsLength = function () {
            return components.length;
        };
        app.registerComponent = function (component) {
            if (typeof component == 'Object') {
                components.push(component);
            }
        }
        return app;
    }();

}