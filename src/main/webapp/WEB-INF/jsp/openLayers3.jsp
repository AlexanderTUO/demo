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
    <%--<link rel="stylesheet" href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/css/ol.css" type="text/css">--%>
    <link type="text/css" rel="stylesheet" href="openLayers-5.3.0/ol.css" >
    <style>
        .map {
            height: 95%;
            width: 100%;
        }
    </style>
    <%--<script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js"></script>--%>
        <script type="text/javascript" src="openLayers-5.3.0/ol.js"></script>
    <title>OpenLayers example</title>
</head>
<body>
<h2>My Map</h2>
<div id="map" class="map"></div>
<%--<script type="text/javascript">--%>
    <%--var map = new ol.Map({--%>
        <%--target: 'map',--%>
        <%--layers: [--%>
            <%--new ol.layer.Tile({--%>
                <%--source: new ol.source.OSM()--%>
            <%--})--%>
        <%--],--%>
        <%--view: new ol.View({--%>
            <%--center: ol.proj.fromLonLat([37.41, 8.82]),--%>
            <%--zoom: 4--%>
        <%--})--%>
    <%--});--%>
<%--</script>--%>
    <script type="text/javascript" src="js/openLayers3.js"></script>
</body>
</html>
