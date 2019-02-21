<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/2/21
  Time: 14:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>demo-01</title>
    <link rel="stylesheet" href="../script/lib/theme/default/layer.css">
    <link href="../script/lib/ol.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="./index.css" type="text/css">
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
<script src="../script/lib/jquery-3.3.1.min.js" type="text/javascript"></script>
<!-- layer -->
<script src="../script/lib/layer.js" type="text/javascript"></script>
<!-- ol -->
<script src="../script/lib/ol.js" type="text/javascript"></script>

<!-- test -->
<script src="./test_data.js" type="text/javascript"></script>
<!-- main -->
<script src="./index.js" type="text/javascript"></script>

<script type="text/javascript">
    $(function() {
        new CC().init();
    });
</script>

</html>
