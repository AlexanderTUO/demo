$(document).ready(function () {
    var flashFeature;
    var preFeature;
    var flag = false;
    var feature;
    var draw;
    var geoStr = null;
    var currentFeature = null;

    var myMap = {};
    // 初始化地图
    initMap();

    function initMap(){
        //初始化osm地图
        var view = new ol.View({
            projection: ol.proj.get('EPSG:4326'),
            zoom: 10,
            center: [104.068, 30.664],
        });
        //绘制热区的样式
        var flashStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 102, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#0a13cc',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#cc3300'
                })
            })
        });
        //矢量要素（区）的样式
        var feaStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#19ff0f',
                width: 2
            }),
            fill:new ol.style.Fill({
                color: 'rgba(255,255,255,0.2)'
            }),
            image: new ol.style.Circle({
                radius: 15,
                fill:new ol.style.Fill({
                    color: '#ff382d',
                })
            })
        })

        // 高德地图
        myMap.gaodeMapLayer = new ol.layer.Tile({
            source:new ol.source.XYZ({
                url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
            })
        });

        // osm地图
        myMap.OSM = new ol.layer.Tile({
            source: new ol.source.OSM()
        })

        // kml地图
        myMap.kmlLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: "data/510100.kml",
                format: new ol.format.KML(),
            }),
            style: flashStyle,
            zIndex: 99
        })

        myMap.map = new ol.Map({
            target: 'map',
            layer: null,
            view: view
        });

        myMap.map.addLayer(myMap.kmlLayer);
        myMap.map.addLayer(myMap.gaodeMapLayer);

        if (myMap.pointLayer == null) {
            myMap.pointLayer = new ol.layer.Vector({
                source: new ol.source.Vector()
            })
        }

        if (myMap.lineStringLayer == null) {
            myMap.lineStringLayer = new ol.layer.Vector({
                source: new ol.source.Vector()
            })
        }

        if (myMap.polygonLayer == null) {
            myMap.polygonLayer = new ol.layer.Vector({
                source: new ol.source.Vector()
            })
        }
        // 从后台获取要素
        displayFeatures();
    }

    /**
     * 从后台获取要素
     */
    function displayFeatures() {
        $.ajax({
            url: '/Feature/query',
            type: "get",
            success: function (data) {
                preFeature = null;
                flag = false;
                for (var index = 0; index < data.length; index++) {
                    var coordinate = JSON.parse(data[index].geometry);
                    // var coordinate1 = eval("("+coordinate+")");

                    if (data[index].type == "Point") {
                        var point = new ol.Feature({
                            geometry: new ol.geom.Point(coordinate),
                            name: data[index].name,
                            id: data[index].id,
                            type: "Point"
                        });
                        myMap.pointLayer.getSource().addFeature(point);
                        myMap.pointLayer.setVisible(false);
                    }
                    else if (data[index].type == "LineString") {
                        var lineString = new ol.Feature({
                            geometry: new ol.geom.LineString(coordinate),
                            name: data[index].name,
                            id: data[index].id
                        });
                        myMap.lineStringLayer.getSource().addFeature(lineString);
                        myMap.lineStringLayer.setVisible(false);
                    }
                    if (data[index].type == "Polygon") {
                        var polygon = new ol.Feature({
                            geometry: new ol.geom.Polygon(coordinate),
                            name: data[index].name,
                            id: data[index].id
                        });
                        myMap.polygonLayer.getSource().addFeature(polygon);
                        myMap.polygonLayer.setVisible(false);
                    }
                }

                // map.on('pointermove',pointermoveFun,this)
            }
        })
    }

    $('#displayFea :checkbox').on('change',function () {
        var checkbox = $('#displayFea :checkbox :checked');
        for (var index = 0; index < checkbox.length; index++) {
            switch (checkbox[index].value) {
                case 1:
                    myMap.pointLayer.setVisible(true);
                    break;
                case 2:
                    myMap.pointLayer.setVisible(true);
                    break;
                case 3:
                    myMap.pointLayer.setVisible(true);
                    break;
                default:
            }
        }
        alert(checkbox.length);
    })


    

/*****************************实现框选功能START****************************************/
 //    var select = new ol.interaction.Select();
 //    map.addInteraction(select);
 //    var selectedFeatures = select.getFeatures();
 //
 //    // var dragBox = new ol.interaction.DragBox({
 //    //     condition: ol.events.condition.platformModifierKeyOnly
 //    // })
 //    //
 //    // map.addInteraction(dragBox);
 //    //
 //    // dragBox.on('boxend', function () {
 //    //     var extent = dragBox.getGeometry().getExtent();
 //    //     VectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
 //    //         selectedFeatures.push(feature);
 //    //     })
 //    // });
 //    //
 //    // dragBox.on('boxstart', function () {
 //    //     selectedFeatures.clear();
 //    // });
 //
 //    var infoBox = document.getElementById('info');
 //
 //    selectedFeatures.on(['add','remove'],function () {
 //        var names = selectedFeatures.getArray().map(function (feature) {
 //            return feature.get('name');
 //        });
 //        if (names.length > 0) {
 //            infoBox.innerHTML = names.join(',');
 //        } else {
 //            infoBox.innerHTML = '没有要素被选中';
 //        }
 //    })
 //
 // /*****************************实现框选功能END****************************************/
 // /*****************************实现圈选功能START****************************************/
 //    //  var circleDraw = new ol.interaction.Draw({
 //    //      source: VectorSource,
 //    //      type: 'Circle',
 //    //      condition: ol.events.condition.platformModifierKeyOnly
 //    //  })
 //    //
 //    //  map.addInteraction(circleDraw);
 //    //
 //    // circleDraw.on('drawend',function(evt){
 //    //     var polygon = evt.feature.getGeometry();
 //    //     setTimeout(function(){
 //    //         //如果不设置延迟，范围内要素选中后自动取消选中，具体原因不知道
 //    //         var center = polygon.getCenter(),
 //    //             radius = polygon.getRadius(),
 //    //             extent = polygon.getExtent();
 //    //         var features = vectorLayer.getSource().getFeaturesInExtent(extent);
 //    //         //先缩小feature的范围
 //    //         var str = "";
 //    //         for(var i=0;i<features.length;i++){
 //    //             var newCoords = features[i].getGeometry().getCoordinates();
 //    //             if(pointInsideCircle(newCoords,center,radius)){
 //    //                 selectedFeatures.push(features[i]);
 //    //             }
 //    //         }
 //    //     },300)
 //    // })
 //    //
 //    // circleDraw.on('drawend',function(evt){
 //    //     selectedFeatures.clear();
 //    // })
 //
 // /*****************************实现圈选功能END****************************************/
 // /*****************************实现多边形选择功能START****************************************/
 // var polygonDraw = new ol.interaction.Draw({
 //     source: VectorSource,
 //     type: 'Polygon',
 //     condition: ol.events.condition.platformModifierKeyOnly
 // })
 //
 //    map.addInteraction(polygonDraw);
 //
 //    polygonDraw.on('drawend',function(evt){
 //        var polygon = evt.feature.getGeometry();
 //        setTimeout(function(){
 //            //如果不设置延迟，范围内要素选中后自动取消选中，具体原因不知道
 //            var extent = polygon.getExtent();
 //            var features = vectorLayer.getSource().getFeaturesInExtent(extent);
 //            //先缩小feature的范围
 //            var polygonCoor = polygon.getCoordinates()[0];
 //            for(var i=0;i<features.length;i++){
 //                if (!features[i].get('type')) {
 //                    continue;
 //                }
 //                var newCoords = features[i].getGeometry().getCoordinates();
 //                if (insidePolygon(polygonCoor, newCoords)) {
 //                    selectedFeatures.push(features[i]);
 //                }
 //            }
 //        },300)
 //    })
 //
 //    polygonDraw.on('drawend',function(evt){
 //        selectedFeatures.clear();
 //    })
 //
 // /*****************************实现多边形选择功能END****************************************/
 //    /**
 //     *判断一个点是否在多边形内部
 //     * @param points 多边形坐标集合
 //     * @param testPoint 测试点坐标
 //     * @returns {boolean} 返回true为真，false为假
 //     */
 //    function insidePolygon(points, testPoint) {
 //        var x = testPoint[0], y = testPoint[1];
 //        var inside = false;
 //        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
 //            var xi = points[i][0], yi = points[i][1];
 //            var xj = points[j][0], yj = points[j][1];
 //            var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
 //            if (intersect) inside = !inside;
 //        }
 //        return inside;
 //    }
 //
 //    /**
 //     *判断一个点是否在圆的内部
 //     * @param point 测试点坐标
 //     * @param circle 圆心坐标
 //     * @param r 圆半径
 //     * @returns {boolean} 返回true为真，false为假
 //     */
 //    function pointInsideCircle(point, circle, r) {
 //        if (r === 0) return false
 //        var dx = circle[0] - point[0]
 //        var dy = circle[1] - point[1]
 //        return dx * dx + dy * dy <= r * r
 //    }
})


