<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/11/15
  Time: 15:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<head>
    <title>wfs demo</title>
    <link rel="stylesheet" href="openLayers-5.3.0/ol.css" type="text/css" />
    <script src="openLayers-5.3.0/ol.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
</head>

<body>
<input type="button" value="查询" id="query"/>
<input id="select" type="checkbox" value="select" />选择
<input id="modify" type="checkbox" value="modify" />编辑
<input id="save" type="button" value="保存" i />
<div id="map" style="width:100%;height:100%;"></div>

<script type="text/javascript" src="js/wfs.js"></script>

</body>

</html>
