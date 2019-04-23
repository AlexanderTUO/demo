<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/4/22
  Time: 9:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>仿制</title>
    <link rel="stylesheet" href="lib/theme/default/layer.css">
    <link href="openLayers-5.3.0/ol.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="track2/track.css">
</head>
<body>
    <div class="app">
        <div class="nav" id="nav">
            <div class="item" key="1">单点追踪</div>
            <div class="item" key="2">实时监控</div>
            <div class="item ac" key="3">历史轨迹</div>
            <div class="item" key="4">编辑</div>
        </div>
        <div id="tool"class="tool"></div>
        <div id="map"></div>
    </div>
    <script src="js/jquery-3.3.1.min.js" type="text/javascript"></script>
    <!-- layer -->
    <script src="lib/layer.js" type="text/javascript"></script>
    <!-- ol -->
    <%--<script src="openLayers-5.3.0/ol.js" type="text/javascript"></script>--%>
    <script src="js/scgis/ol4.1.1_scgis.js" type="text/javascript"></script>
    <!-- test -->
    <script src="track2/test_data.js" type="text/javascript"></script>
    <script type="text/javascript" src="/track2/index2.js"></script>
    <script type="text/javascript">
        $(function () {
            // -function (new_p, old_p) {
            //
            //     var pi = Math.atan2(new_p[1] - old_p[1], new_p[0] - old_p[0]);
            //     debugger;
            //     // _map_p_rotation: function(new_p, old_p) {
            //     //     // 90度的PI值
            //     //     var pi_90 = Math.atan2(1, 0);
            //     //     // 当前点的PI值
            //     //     var pi_ac = Math.atan2(new_p[1] - old_p[1], new_p[0] - old_p[0]);
            //     //
            //     //     return pi_90 - pi_ac;
            //     // },
            //
            // }([0,0],[1,1]);

            new CC().init();
        })
    </script>
</body>
</html>
