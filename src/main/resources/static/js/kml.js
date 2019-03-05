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
        // center: [87.264404296875, 41.044921875],//新疆
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
        // layers: [gaodeMapLayer],
        view: view,
        controls:controls_extend,
        target: 'map'
    })

    var kmlLayer = new ol.layer.Vector({
        source:new ol.source.Vector({
            // url: 'data/xj_jq.kml',
            url: 'data/doc.kml',
            format: new ol.format.KML()
        })
    })

    map.addLayer(kmlLayer);

}

