window.onload = function () {
    //图层
    var gaodeMapLayer = new ol.layer.Tile({
        source:new ol.source.XYZ({
            url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });

    var newId = 1;
    //保存绘制的feature
    var drawFeature = null;

    // 动画圆圈的图层
    var vectorLayer =  new ol.layer.Vector({
        source: new ol.source.Vector()
    })

    // 保存绘制线的图层
    var lineLayer =  new ol.layer.Vector({
        source: new ol.source.Vector(),
        style:new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 4
            })
        })
    })

    //视图
    var view = new ol.View({
        center: [104.068, 30.664],
        projection: 'EPSG:4326',
        zoom:10
    })

    //控件
    var controls_extend = new ol.control.defaults({
        attribution:true
    }).extend([
        new ol.control.FullScreen(),
        new ol.control.MousePosition(),
        new ol.control.OverviewMap(),
        new ol.control.ScaleLine(),
        new ol.control.ZoomSlider(),
        new ol.control.ZoomToExtent(),
        new ol.control.Attribution()
    ]);


    //
    var map = new ol.Map({
        layers: [gaodeMapLayer],
        view: view,
        controls:controls_extend,
        target: 'map'
    })

    //绑定事件
    //无动画效果
    document.getElementById("noAnim").onclick = backNoAnim;
    //有动画效果
    document.getElementById("withAnim").onclick = withAnim;
    
    $("#query").click(function () {
        alert(3434);
    })


    //无动画效果
    function backNoAnim() {
        map.getView().setCenter([104.068, 30.664]);

    }

    //有动画效果
    function withAnim() {
        // var pan = ol.animation.pan({
        //     duration: 2000,
        //     source: map.getView().setCenter()
        // });
        //
        // map.beforeRender(pan);
        //
        // map.getView().setCenter([106.51, 29.55]);

        map.getView().animate({
            center:[104.068, 30.664],
            duration:2000
        })
    }


    // 画个圈圈
    var circle = new ol.Feature({
        geometry: new ol.geom.Point([104.068, 30.664])
    })

    circle.setStyle(new ol.style.Style({
        image:new ol.style.Circle({
            radius:0,
            stroke:new ol.style.Stroke({
                color:'red',
                size:1
            })
        })
    }))

    vectorLayer.getSource().addFeature(circle);

    //将圈圈图层添加到地图中
    map.addLayer(vectorLayer);

    //将绘制图层添加到地图中
    map.addLayer(lineLayer);

    //关键：监听postcompose事件，重置circle的样式
    var radius = 0;
    map.on('postcompose',function () {
        radius++;
        radius = radius % 20;
        //设置样式
        circle.setStyle(new ol.style.Style({
            image:new ol.style.Circle({
                radius: radius,
                stroke:new ol.style.Stroke({
                    color: 'red',
                    size: 1
                })
            })
        }))
    })

    var lineDraw = new ol.interaction.Draw({
        type: "LineString",
        style: new ol.style.Style({
            stroke:new ol.style.Stroke({
                color: "red",
                width: 4
            }),
            fill:new ol.style.Fill({
                color: "red",
                width: 4
            })
        }),
        maxPoints: 4, //限制不超过4个点

        source: lineLayer.getSource()

    })

    // map.addInteraction(lineDraw);

    lineDraw.on('drawend', function (event) {
        document.getElementById('Points').innerHTML = JSON.stringify(event.feature.getGeometry().getCoordinates());
        //绘制结束暂存绘制的矢量
        drawFeature = event.feature;
    });

    // 绑定新增按钮
    $("#add").change(function () {
        if (this.checked) {
            map.removeInteraction(lineDraw);
            map.addInteraction(lineDraw);
        } else {
            map.removeInteraction(lineDraw);
            if (drawFeature) {
                lineLayer.getSource().removeFeature(drawFeature);
            }
            drawFeature = null;
        }

    })

    function OnSaveNew() {
        var newFeature = ol.Feature();
        newFeature.setId('nyc_roads.new.' + newId);
        newFeature.setGeometryName('the_geom');
        newFeature.set('the_geom', null);
        newFeature.set('name', newFeature.getId());
        newFeature.set('modified', newFeature.getId());
        newFeature.set('vsam', 0);
        newFeature.set('sourcedate', '');
        newFeature.set('sourcetype', '');
        newFeature.set('source_id', newId);
        newFeature.set('borough', '');
        newFeature.set('feat_code', 0);
        newFeature.set('feat_desc', '11');
        newFeature.set('feat_type', 0);
        newFeature.set('exported', 'true');

        // newFeature.setGeometry(new ol.geom.MultiLineString([geometry.getCoordinates]));
        addWfs([newFeature]);

        //更新id
        newId = newId + 1;
        //设置定时器，刷新feature
        // setTimeout(function () {
        //
        // })
    }
    
    function addWfs(features) {
        var WFSTSerializer = new ol.format.WFS();
        var featObject = WFSTSerializer.writeTransaction(features,null,null,{
            featureType: "nyc_roads",
            featureNS: "http://geoserver.org/nyc_roads",
            srsName: 'EPSG:4326'
        })
        var serializer = new XMLSerializer();
        var featString = serializer.serializeToString(featObject);
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8082/geoserver/wfs?service=wfs');
        request.setRequestHeader('Content-Type', 'text/xml');
        request.send(featString);
    }

}

