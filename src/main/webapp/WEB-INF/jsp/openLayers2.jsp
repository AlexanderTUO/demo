<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018\11\7 0007
  Time: 22:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>

<head>
    <title>
        2创建一个简单的电子地图
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
    <!-- 加载OpenLayers 类库 -->
    <script type="text/javascript" src="http://www.openlayers.cn/olapi/OpenLayers.js">
    </script>
    <style>
        html, body { width: 100%; height: 100%; margin: 0; padding: 0; }
    </style>
    <!-- 关键代码在这里了 -->
    <script type="text/javascript">
        function init() {
// 使用指定的文档元素创建地图
            var map = new OpenLayers.Map("rcp1_map");
// 创建一个 OpenStreeMap raster layer
// 把这个图层添加到map中
            var osm = new OpenLayers.Layer.OSM();
            map.addLayer(osm);
// 设定视图缩放地图程度为最大
            map.zoomToMaxExtent();
        }
    </script>
</head>

<body onload="init()">
<div id="rcp1_map" style="width: 100%;
height: 100%;">
</div>
</body>


</html>

