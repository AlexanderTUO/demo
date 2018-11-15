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
    $("#query").click(function () {
        queryWfs();
    });
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

    queryWfs();
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
        alert("save")
        if (modifiledFeatures && modifiledFeatures.getLength() > 0) {
            //转换坐标
            var modifiledFeature = modifiledFeatures.item(0).clone();
            modifiledFeature.setId(modifiledFeatures.item(0).getId());

            //调换经纬度坐标，以符合wfs中经纬度的位置
            modifiledFeature.getGeometry().applyTransform(function (flatCoordinates, flatCoordinates2, stride) {
                for (var i = 0; i < flatCoordinates.length; i+=stride) {
                    var y = flatCoordinates[i];
                    var x = flatCoordinates[i + 1];

                    flatCoordinates[i] = x;
                    flatCoordinates[i + 1] = y;
                }
            })
            modifyWfs([modifiledFeature]);
        }
    }

    $("#save").click(function () {
        onSave();
    });
    
    function modifyWfs(features) {
        var WFSTSerializer = new ol.format.WFS();
        var featObject = WFSTSerializer.writeTransaction(null, features, null, null, {
            featureType: "nyc_roads",
            featureNS: 'http://geoserver.org/nyc_roads',
            srsName: 'EPSG:4326'
        });

        //转换为xml发送到服务端
        var xmlSerializer = new XMLSerializer();
        var featString = xmlSerializer.serializeToString(featObject);
        var request = new XMLHttpRequest();
        request.open("http://localhost:8080/geoserver/wfs?service=wfs");
        request.setRequestHeader("Content-Type", "text/xml");
        request.send(featString);
    }

})


