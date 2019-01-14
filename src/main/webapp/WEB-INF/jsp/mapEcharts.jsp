<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/1/14
  Time: 10:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html style="height: 100%">
<head>
    <meta charset="utf-8">
</head>
<body style="height: 100%; margin: 0">
<div id="container" style="height: 100%"></div>
<script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></script>
<script>
    $.get('data/510100.json', function (testSC) {
        echarts.registerMap('testSC', testSC);
        var chart = echarts.init(document.getElementById('container'));
        chart.setOption({
            series: [{
                type: 'map',
                map: 'testSC'
            }]
        });
    });
</script>

</body>
</html>
