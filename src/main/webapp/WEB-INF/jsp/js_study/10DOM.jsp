<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/4/8
  Time: 14:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>title</title>
    <script type="text/javascript" src="js/js_study/10DOM.js"></script>
    <style>
        #parent{
            width: 1200px;
            height: 1200px;
            background-color: #8ba19d;
        }
    </style>
</head>
<body>
    <div id="parent" data-appid="123456" data-myname="Nicholas"style="background-color: #1c94c4">我是文本
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </div>
    <ul id="myList"></ul>
    <div id="content">
        <p id="para">This is a <strong>paragraph</strong> with a list following it.</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
    </div>
</body>
</html>
