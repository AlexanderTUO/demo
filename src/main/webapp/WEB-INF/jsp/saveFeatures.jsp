<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/11/21
  Time: 9:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>保存几何图形</title>
    <link rel="stylesheet" href="openLayers-5.3.0/ol.css" type="text/css" />
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
    <script src="openLayers-5.3.0/ol.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>

    <script src="lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <link rel="stylesheet" href="lib/bootstrap-3.3.7-dist/css/bootstrap.css">

    <script type="text/javascript" src="lib/jquery-ui.js"></script>

    <script type="text/javascript" src="js/saveFeatures.js"></script>

    <link rel="stylesheet" href="css/saveFeatures.css">
    <link rel="stylesheet" href="http://jqueryui.com/resources/demos/style.css">


</head>
<body>
<div id="menu">
    <label>几何图形类型：&nbsp;</label>
    <select id="type">
        <option value="Point">点</option>
        <option value="LineString">线</option>
        <option value="Polygon">面</option>
    </select>
    <input type="button" value="清空" id="empty">
    <input type="button" value="查询" id="query">
</div>
<div id="dialog-confirm" title="图形属性信息设置">
    <label >图形类型（GeoType）：</label>
    <select id="geoType">
        <option value="Point" selected="selected" disabled="disabled">点</option>
        <option value="LineString" disabled="disabled">线</option>
        <option value="Polygon" disabled="disabled">多边形</option>
    </select><br/>
    <label >信息类别（infoType）：</label>
    <select id="infoType">
        <option value="Point" selected="selected" disabled="disabled">兴趣点</option>
        <option value="LineString" disabled="disabled">道路线</option>
        <option value="Polygon" disabled="disabled">高校区域</option>
    </select><br/>
    <label>名称（name）：<input id='name' type="text" value=""></label><br/>
    <label>省市（city）：<input id='city' type="text" value=""></label>
</div>
<div id="map" style="width: 100%;height: 500px;"></div>
<div id="popup" title="我是气泡"></div>
<div id="info"></div>
</body>
</html>
