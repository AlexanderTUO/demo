window.onload = function () {
    //图层
    var gaodeMapLayer = new ol.layer.Tile({
        source:new ol.source.XYZ({
            url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });

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

    //无动画效果
    document.getElementById("noAnim").onclick = backNoAnim;
    //有动画效果
    document.getElementById("withAnim").onclick = withAnim;

    //无动画效果
    function backNoAnim() {
        map.getView().setCenter([104.068, 30.664]);
        // map.getView().setCenter(ol.proj.transform([104.068, 30.664], 'EPSG:4326', 'EPSG:3857'));

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


    // var circle = new ol.Feature({
    //     geometry: new ol.geom.Point(ol.proj.transform(
    //         [104.068, 30.664], 'EPSG:4326', 'EPSG:3857'))
    // });
    // circle.setStyle(new ol.style.Style({
    //     image: new ol.style.Circle({
    //         radius: 0,
    //         stroke: new ol.style.Stroke({
    //             color: 'red',
    //             size: 1
    //         })
    //     })
    // }));
    // layer.getSource().addFeature(circle);

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

    gaodeMapLayer.getSource().addFeature(circle);

    //关键：监听postcompose事件，重置circle的样式

    // var radius = 0;
    // map.on('postcompose',function () {
    //     radius++;
    //     radius = radius % 20;
    //     //设置样式
    //     circle.setStyle(new ol.style.Style({
    //         radius: radius,
    //         stroke:new ol.style.Stroke({
    //             color: 'red',
    //             size: 1
    //         })
    //     }))
    // })

    // 关键的地方在此：监听postcompose事件，在里面重新设置circle的样式
    var radius = 0;
    map.on('postcompose', function(){
        // 增大半径，最大20
        radius++;
        radius = radius % 20;
        // 设置样式
        circle.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: radius,
                stroke: new ol.style.Stroke({
                    color: 'red',
                    size: 1
                })
            })
        }));
    })


}

