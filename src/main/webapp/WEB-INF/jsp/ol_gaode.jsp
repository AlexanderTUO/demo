<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018\11\7 0007
  Time: 22:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <link type="text/css" rel="stylesheet" href="openLayers-5.3.0/ol.css" >
    <script type="text/javascript" src="openLayers-5.3.0/ol.js"></script>
    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="lib/zepto.js"></script>

    <style>
        .map {
            height: 100%;
            width: 100%;
        }
    </style>
    <title>高德地图</title>
</head>
<body>
<%--<h2>My Map</h2>--%>
    <input type="button" value="回到原点-带动画" id="withAnim">
    <input type="button" value="回到原点-不带动画" id="noAnim">
    绘制点的坐标为：
    <span id="Points"></span>
    <input type="button" value="查询" id="query">
    <input type="checkbox" value="新增" id="add">
    <input type="button" value="保存" id="save">
    <div id="map" class="map">
    </div>
    <script type="text/javascript" src="js/ol_gaode.js"></script>
</body>
</html>
