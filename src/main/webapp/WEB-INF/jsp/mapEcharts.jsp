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
<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js"></script>
<script>
    $.get('data/510100.json', function (testSC) {
        echarts.registerMap('testSC', testSC);
        var chart = echarts.init(document.getElementById('container'));
        chart.hideLoading();

        var geoCoorMap = {
            '成华区': [104.14060057153, 30.6918833246988],
            '崇州市': [103.521117798566, 30.716073139581],
            '大邑县': [103.362073604491, 30.6172478383543],
            '都江堰市': [103.627977262828, 31.0346496115975],
            '金牛区': [104.050678967924, 30.7303873930805],
            '金堂县': [104.607420015926, 30.724069980042],
            '锦江区': [104.112983491828, 30.6053824627115],
            '龙泉驿区': [104.291313879765, 30.5994672573044],
            '彭州市': [103.881031254066, 31.1457088830054],
            '蒲江县': [103.488650597266, 30.2362809614852],
            '青白江区': [104.336503709516, 30.792209289953],
            '青羊区': [103.979072213196, 30.681899852324],
            '双流县': [104.034342403882, 30.4514129586961],
            '温江区': [103.808322381756, 30.7266030962285],
            '武侯区': [104.022890270188, 30.6105226233973],
            '新都区': [104.106966998222, 30.8348898998284],
            '新津县': [103.823529251788, 30.4248014642224],
            '邛崃市': [103.368711942677, 30.3845974830898],
            '郫县': [103.875291733239, 30.8377533189145]
        };
        var data = [
            {name: '成华区', value: 9},
            {name: '金牛区', value: 9.48},
            {name: '青羊区', value: 9.1},
            {name: '武侯区', value: 9.6},
            {name: '锦江区', value: 9.49},
            {name: '龙泉驿区', value: 9.64},
            {name: '新都区', value: 9.78},
            {name: '青白江区', value: 9.97},
            {name: '温江区', value: 9.26},
            {name: '金堂县', value: 9.9},
            {name: '彭州市', value: 9.26},
            {name: '都江堰市', value: 9.84},
            {name: '崇州市', value: 9.01},
            {name: '大邑县', value: 9.92},
            {name: '邛崃市', value: 9.98},
            {name: '蒲江县', value: 9.94},
            {name: '郫县', value: 9},
            {name: '新津县', value: 9},
            {name: '双流县', value: 9.98}
        ];
        function convertData(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoorMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        }

        var option = {
            // title: "we",//why?
            title: {
                text: "成都市行政区划图",
                subtext: "信息来源",
                left: "center"
            },
            geo: {
                id: "chengdu",
                map: "testSC",
                // show: false,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                },
                roam: true
            },
            series: [
                {
                    name: '成都市行政区划图',
                    type: 'map',
                    map: 'testSC',
                    geoIndex: 0,
                    itemStyle: {
                        normal: {label: {show: false}},
                        emphasis: {label: {show: true}}
                    },
                    data: [
                        {name: '成华区', value: 20057.34},
                        {name: '金牛区', value: 15477.48},
                        {name: '青羊区', value: 31686.1},
                        {name: '武侯区', value: 6992.6},
                        {name: '锦江区', value: 44045.49},
                        {name: '龙泉驿区', value: 40689.64},
                        {name: '新都区', value: 37659.78},
                        {name: '青白江区', value: 45180.97},
                        {name: '温江区', value: 55204.26},
                        {name: '金堂县', value: 21900.9},
                        {name: '彭州市', value: 4918.26},
                        {name: '都江堰市', value: 5881.84},
                        {name: '崇州市', value: 4178.01},
                        {name: '大邑县', value: 2227.92},
                        {name: '邛崃市', value: 2180.98},
                        {name: '蒲江县', value: 9172.94},
                        {name: '郫县', value: 3368},
                        {name: '新津县', value: 3368},
                        {name: '双流县', value: 806.98}
                    ],
                    roam: true
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {
                        return val[2]*2;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 5
                }
            ],

            tooltip: {
                // trigger: "item",
                // formatter: '{b}<br/>{c} (p / km2)'
            },
            visualMap: {
                min: 800,
                max: 5000,
                text: ['high', 'low'],
                // text: ['low', 'high'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            }
        };
        // chart.showLoading();
        chart.setOption(option);
        if (option && typeof option === "object") {
            chart.setOption(option, true);
        }
    });
</script>

</body>
</html>
