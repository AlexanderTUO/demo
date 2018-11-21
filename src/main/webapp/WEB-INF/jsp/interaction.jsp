<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/11/20
  Time: 16:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>绘图</title>
    <link rel="stylesheet" href="openLayers-5.3.0/ol.css" type="text/css" />
    <script src="openLayers-5.3.0/ol.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js/interaction.js"></script>

</head>
<body>
    <div id="menu">
        <label>几何图形类型：&nbsp;</label>
        <select id="type">
            <option value="None">无</option>
            <option value="Point">点</option>
            <option value="LineString">线</option>
            <option value="Polygon">面</option>
            <option value="Circle">圆</option>
            <option value="Square">正方形</option>
            <option value="Box">长方形</option>
        </select>
    </div>
    <div id="map"></div>
</body>
</html>
