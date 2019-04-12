<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/4/11
  Time: 16:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>

    <script type="text/javascript" src="js/js_study/13Event.js"></script>
</head>
<body>
    <form>
        <input type="button" id="myButton" value="ttt"><br/>
        <input type="text" id="myText1" value="ttt"><br/>
        <input type="text" id="myText2" value="ttt"><br/>
    </form>
    <a href="http://www.baidu.com" id="myLink">点我</a>
    <image id="myImage" src="/images/scean3.jpg"></image>
    <div id="myDiv">点击右键显示菜单</div>
    <ul id="myMenu" style="position:absolute;visibility: hidden;background-color: silver">
        <li><a href="http://www.baidu.com"></a>XXXXXX</li>
        <li><a href="http://www.sina.com"></a>YYYYYY</li>
        <li><a href="http://www.4399.com"></a>ZZZZZZ</li>
    </ul>
    <script type="text/javascript">
        document.getElementById("myImage").onload = function () {
            console.log('图像加载完毕');
        }
    </script>
</body>
</html>
