$(function () {
    var wfsVectorLayer = null;
    var modifiledFeatures = null;

    //添加矢量图层
    // var vector = new ol.layer.Vector({
    //     source: new ol.source.Vector({
    //         format: new ol.format.GeoJSON(),
    //         url: 'http://localhost:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=nyc_roads:nyc_roads&outputFormat=application/json&srsname=EPSG:4326'
    //     }),
    //     style: function(feature, resolution) {
    //         return new ol.style.Style({
    //             stroke: new ol.style.Stroke({
    //                 color: 'blue',
    //                 width: 1
    //             })
    //         });
    //     }
    // });

    // 添加地图
    var map = new ol.Map({
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
        })],
        target: 'map',
        view: new ol.View({
            center: [-73.99710639567148, 40.742270050255556],
            maxZoom: 19,
            zoom: 14,
            projection: 'EPSG:4326'
        })
    });

    //选择器
    var selectInteraction = new ol.interaction.Select({
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
    });

    //修改器
    var modifiedInteraction = new ol.interaction.Modify({
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 5
            })
        }),
        features: selectInteraction.getFeatures()
    });

    modifiedInteraction.on('modifydend',function (event) {
        modifiledFeatures = event.features;
    });

    // 绑定查询按钮
    $("#query").click(queryWfs());

    function queryWfs() {
        if (wfsVectorLayer) {
            map.removeLayer(wfsVectorLayer);
        } else {
            wfsVectorLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    format: new ol.format.GeoJSON(),
                    url: 'http://localhost:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=nyc_roads:nyc_roads&outputFormat=application/json&srsname=EPSG:4326'
                }),
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'green',
                        width: 2
                    })
                })
            });
        }
        map.addLayer(wfsVectorLayer);
    }


    $('#select').change(function () {
        if (this.checked) {
            // 勾选选择复选框时，添加选择器到地图
            map.removeInteraction(selectInteraction);
            map.addInteraction(selectInteraction);
        } else {
            // 不勾选选择复选框的情况下，移出选择器和修改器
            map.removeInteraction(selectInteraction);
            map.removeInteraction(modifiedInteraction);

            $("#modify").checked = false;

            modifiledFeatures = null;
        }
    })

    $('#modify').change(function () {
        if (this.checked) {
            // 勾选选择复选框时，添加选择器和修改器到地图
            $("#select").checked = true;
            map.removeInteraction(selectInteraction);
            map.addInteraction(selectInteraction);

            map.removeInteraction(modifiedInteraction);
            map.addInteraction(modifiedInteraction);
        } else {
            // 不勾选修改复选框的情况下，移出修改器
            map.removeInteraction(modifiedInteraction);

            modifiledFeatures = null;
        }
    })

    // 保存修改的元素
    function onSave() {
        
    }

})


