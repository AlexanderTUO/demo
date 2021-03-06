$(function () {
    var newId = 1;
    var wfsVectorLayer = null;
    var modifiedFeatures = null;
    var drawedFeature = null;

    // 创建用于新绘制feature的layer
    var drawLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 5
            })
        })
    });
    // 添加绘制新图形的interaction，用于添加新的线条
    var drawInteraction = new ol.interaction.Draw({
        type: 'LineString', // 设定为线条
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 10
            })
        }),
        source: drawLayer.getSource()
    });
    drawInteraction.on('drawend', function(e) {
        // 绘制结束时暂存绘制的feature
        drawedFeature = e.feature;
    });

    // 选择器
    var selectInteraction = new ol.interaction.Select({
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
    });

    // 修改器
    var modifyInteraction = new ol.interaction.Modify({
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 5
            })
        }),
        features: selectInteraction.getFeatures()
    });
    modifyInteraction.on('modifyend', function(e) {
        // 把修改完成的feature暂存起来
        modifiedFeatures = e.features;
    });

    var map = new ol.Map({
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
        }),drawLayer],
        target: 'map',
        // view: new ol.View({
        //     center: [-73.99710639567148, 40.742270050255556],
        //     maxZoom: 19,
        //     zoom: 13,
        //     projection: 'EPSG:4326'
        // })
        view:new ol.View({
            projection: ol.proj.get('EPSG:4326'),
            zoom: 10,
            center: [104.068, 30.664],
        })
    });

    // 通过wfs查询所有的要素
    function queryWfs() {
        // 支持重新查询
        if (wfsVectorLayer) {
            map.removeLayer(wfsVectorLayer);
        }

        // 创建新的图层来加载wfs的要素
        wfsVectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON({
                    geometryName: 'the_geom' // 因为数据源里面字段the_geom存储的是geometry，所以需要指定
                }),
                // url: 'http://localhost:8888/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=nyc_roads:nyc_roads&outputFormat=application/json&srsname=EPSG:4326'
                url: 'http://localhost:8888/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=nyc_roads:testsc&outputFormat=application/json&srsname=EPSG:4326'
            }),
            style: function(feature, resolution) {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'blue',
                        width: 5
                    })
                });
            }
        });
        map.addLayer(wfsVectorLayer);
    }

    $('#query').click(function () {
        queryWfs();
    })


    $('#add').change(function() {
        if (this.checked) {
            // 勾选新增复选框时，添加绘制的Interaction
            map.removeInteraction(drawInteraction);
            map.addInteraction(drawInteraction);
        } else {
            // 取消勾选新增复选框时，移出绘制的Interaction，删除已经绘制的feature
            map.removeInteraction(drawInteraction);
            if (drawedFeature) {
                drawLayer.getSource().removeFeature(drawedFeature);
            }
            drawedFeature = null;
        }
    });

    // 保存新绘制的feature
    function onSaveNew() {
        // 转换坐标
        var geometry = drawedFeature.getGeometry().clone();
        geometry.applyTransform(function(flatCoordinates, flatCoordinates2, stride) {
            for (var j = 0; j < flatCoordinates.length; j += stride) {
                var y = flatCoordinates[j];
                var x = flatCoordinates[j + 1];
                flatCoordinates[j] = x;
                flatCoordinates[j + 1] = y;
            }
        });

        // 设置feature对应的属性，这些属性是根据数据源的字段来设置的
        var newFeature = new ol.Feature();
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
        newFeature.setGeometry(new ol.geom.MultiLineString([geometry.getCoordinates()]));

        addWfs([newFeature]);
        // 更新id
        newId = newId + 1;
        // 3秒后，自动刷新页面上的feature
        setTimeout(function() {
            drawLayer.getSource().clear();
            queryWfs();
        }, 3000);
    }


    $('#saveNew').click(function () {
        onSaveNew();
    })

    $('#select').change(function() {
        if (this.checked) {
            // 勾选选择复选框时，添加选择器到地图
            map.removeInteraction(selectInteraction);
            map.addInteraction(selectInteraction);
        } else {
            // 不勾选选择复选框的情况下，移出选择器和修改器
            map.removeInteraction(selectInteraction);
            document.getElementById('modify').checked = false;
            map.removeInteraction(modifyInteraction);
            modifiedFeatures = null;
        }
    });

    $('#modify').change(function() {
        if (this.checked) {
            // 勾选修改复选框时，添加选择器和修改器到地图
            document.getElementById('select').checked = true;
            map.removeInteraction(modifyInteraction);
            map.addInteraction(modifyInteraction);
            map.removeInteraction(selectInteraction);
            map.addInteraction(selectInteraction);
        } else {
            // 不勾选修改复选框时，移出修改器
            map.removeInteraction(modifyInteraction);
            modifiedFeatures = null;
        }
    });

    // 保存已经编辑的要素
    function onSave() {
        if (modifiedFeatures && modifiedFeatures.getLength() > 0) {

            // 转换坐标
            var modifiedFeature = modifiedFeatures.item(0).clone();
            // 注意ID是必须，通过ID才能找到对应修改的feature
            modifiedFeature.setId(modifiedFeatures.item(0).getId());
            // 调换经纬度坐标，以符合wfs协议中经纬度的位置
            modifiedFeature.getGeometry().applyTransform(function(flatCoordinates, flatCoordinates2, stride) {
                for (var j = 0; j < flatCoordinates.length; j += stride) {
                    var y = flatCoordinates[j];
                    var x = flatCoordinates[j + 1];
                    flatCoordinates[j] = x;
                    flatCoordinates[j + 1] = y;
                }
            });
            modifyWfs([modifiedFeature]);
        }
    }



    // 把修改提交到服务器端
    function modifyWfs(features) {
        var WFSTSerializer = new ol.format.WFS();
        var featObject = WFSTSerializer.writeTransaction(null,
            features, null, {
                featureType: 'nyc_roads',
                featureNS: 'http://geoserver.org/nyc_roads',  // 注意这个值必须为创建工作区时的命名空间URI
                srsName: 'EPSG:4326'
            });
        // 转换为xml内容发送到服务器端
        var serializer = new XMLSerializer();
        var featString = serializer.serializeToString(featObject);
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8888/geoserver/wfs?service=wfs');
        // 指定内容为xml类型
        request.setRequestHeader('Content-Type', 'text/xml');
        request.send(featString);
    }

    $('#save').click(function () {
        onSave();
    })

    $('#unQuery').click(function () {
        map.removeLayer(wfsVectorLayer)
    })

    //新增元素
    // 添加到服务器端
    function addWfs(features) {
        var WFSTSerializer = new ol.format.WFS();
        var featObject = WFSTSerializer.writeTransaction(features,
            null, null, {
                featureType: 'nyc_roads',
                featureNS: 'http://geoserver.org/nyc_roads',
                srsName: 'EPSG:4326'
            });
        var serializer = new XMLSerializer();
        var featString = serializer.serializeToString(featObject);
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8888/geoserver/wfs?service=wfs');
        request.setRequestHeader('Content-Type', 'text/xml');
        request.send(featString);
    }

    function onDeleteFeature() {
        // 删选择器选中的feature
        if (selectInteraction.getFeatures().getLength() > 0) {
            deleteWfs([selectInteraction.getFeatures().item(0)]);
            // 3秒后自动更新features
            setTimeout(function() {
                selectInteraction.getFeatures().clear();
                queryWfs();
            }, 3000);
        }
    }

    // 在服务器端删除feature
    function deleteWfs(features) {
        var WFSTSerializer = new ol.format.WFS();
        var featObject = WFSTSerializer.writeTransaction(features,
            null, null, {
        // var featObject = WFSTSerializer.writeTransaction(null,
        //     null, features, {
                featureType: 'testsc',
                featureNS: 'http://geoserver.org/nyc_roads',
                srsName: 'EPSG:4326'
            });
        var serializer = new XMLSerializer();
        var featString = serializer.serializeToString(featObject);
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8888/geoserver/wfs?service=wfs');
        request.setRequestHeader('Content-Type', 'text/xml');
        request.send(featString);
    }

    $('#delete').click(function () {
        onDeleteFeature();
    })

})


