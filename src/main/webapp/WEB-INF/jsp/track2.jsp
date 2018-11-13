<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018\11\13 0013
  Time: 23:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>demo-01</title>
    <link rel="stylesheet" href="../script/lib/layer/skin/layer.css">
    <link href="../script/lib/ol-v5.0.2-dist/ol.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="./index.css">
</head>

<body>
<div class="app">
    <!-- nav -->
    <div class="nav" id="nav">
        <div class="item " key='1'>单点追踪</div>
        <div class="item " key='2'>实时监控</div>
        <div class="item ac" key='3'>历史轨迹</div>
        <div class="item" key='4'>地图绘制</div>
    </div>
    <!-- tool -->
    <div class="tool" id="tool">

    </div>
    <div id="map"></div>








</div>
</body>
<!-- JQ -->
<script src="js/jquery-3.3.1.min.js" type="text/javascript"></script>
<!-- layer -->
<script src="../script/lib/layer/layer.js" type="text/javascript"></script>
<!-- ol -->
<script src="openLayers-5.3.0/ol.js" type="text/javascript"></script>
<!-- test -->
<script src="track2/test_data.js" type="text/javascript"></script>
<!-- main -->
<script src="track2/index.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        new CC().init();
    });
</script>

</html>
