<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018\11\7 0007
  Time: 22:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
    <title>创建一个简单的电子地图</title>
    <%--加载openLayers类库--%>
    <script type="text/javascript" src="http://www.openlayers.cn/olapi/OpenLayers.js"></script>

    <%--<script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js"></script>--%>
    <%--<link rel="stylesheet" href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/css/ol.css">--%>
    <style>
        html, body { width: 100%; height: 100%; margin: 0; padding: 0; }
    </style>
    <script type="text/javascript">
        function init() {
            var map = new OpenLayers.Map("rcp1_map")

            var osm = new OpenLayers.Layer.OSM();
            map.addLayer(osm);
            map.zoomToMaxExtent();

        }
    </script>
</head>
<body onload="init()">
    <div id="rcp1_map" style="width:100%;height: 100%;"></div>
</body>
</html>
