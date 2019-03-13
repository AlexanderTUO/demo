<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/3/12
  Time: 11:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>高德地图api调用</title>
    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=3d5bc0273dae19cfb06956b8b9cc3b15"></script>
    <script type="text/javascript">
        $(function () {
            var map = new AMap.Map('container',{
                zoom: 10,
                center: [104.068, 30.664],//new AMap.LngLat(116.39,39.9)
            });
            var url = 'http://uri.amap.com/navigation?from=103.34220886230469,30.823516845703125,startpoint&to=103.568115234375,30.8990478515625,endpoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0';
            fetch(url).then(function (value) {

                debugger;
            })
        })

    </script>
</head>
<body>
    <div id="container" style="width: 100%;height: 100%;"></div>
</body>
</html>
