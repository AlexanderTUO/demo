$(document).ready(function () {
    //初始化osm地图
    var view = new ol.View({
        projection: ol.proj.get('EPSG:4326'),
        zoom: 10,
        center: [104.068, 30.664],
    })
    var map = new ol.Map({
        target: 'map',
        layer: null,
        view: view
    });
    // osm地图
    var OSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    })

    // 高德地图
    var gaodeMapLayer = new ol.layer.Tile({
        source:new ol.source.XYZ({
            url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });


    map.addLayer(gaodeMapLayer);

    var style = new ol.style.Style({
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

    // 添加矢量
    var pointFeatures = new ol.Feature(new ol.geom.Point([0,0]));
    var lineFeatures = new ol.Feature(new ol.geom.LineString([[101.2939453125,31.640625],[111.4892578125,36.123046875]]));

    var source = new ol.source.Vector({
    })
    // source.addFeature(pointFeatures);
    // source.addFeature(lineFeatures);
    var vectorLayer = new ol.layer.Vector({
        style: style
    })
    vectorLayer.setSource(source);
    // map.addLayer(vectorLayer);



    var typeSelect = document.getElementById('type');
    var draw = null;
    /**
     * 用户更改绘制类型触发的事件
     * @param ev 更改事件
     */
    typeSelect.onchange = function (ev) {
        map.removeInteraction(draw);
        addInteraction();
    }
    // addInteraction();

    var geoStr = null;
    var currentFeature = null;



    function  addInteraction() {
        var type = typeSelect.value;
        draw = new ol.interaction.Draw({
            type: type,
            source: vectorLayer.getSource()
        });
        // map.addInteraction(draw);
        draw.on('drawend', drawAndCallBack,this);
    }


    // 初始化信息设置对话框
    $('#dialog-confirm').dialog({
        modal: true,
        autoOpen: false,
        open:function (event, ui) {
            // 隐藏默认的关闭按钮
            $(".ui-dialog-titlebar-close", $(this).parent()).hide();
            // 根据绘制图形类型进行分别处理
            switch (typeSelect.value) {
                case 'Points':
                    $('#geoType,#infoType').val('Point');
                    break;
                case 'LineString':
                    $('#geoType,#infoType').val('LineString');
                    break;
                case 'Polygon':
                    $('#geoType,#infoType').val('Polygon');
                    break;
                default:
            }
        },
        buttons:{
            '提交':function () {
                submitData();
                $(this).dialog('close');
            },
            '取消':function () {
                $(this).dialog('close');
                // 删除绘制的图形
                vectorLayer.getSource().removeFeature(currentFeature);
            },

        }

    })

    /**
     * 绘制结束后的回调函数
     * @param e
     */
    function drawAndCallBack(e) {
        var geoType = $("#type option:selected").val();
        currentFeature = e.feature;
        $("#dialog-confirm").dialog("open");
        var geometry = currentFeature.getGeometry();
        var coordinates = geometry.getCoordinates();
        if (geoType == 'Polygon') {
            geoStr = coordinates[0].join('],[');
            geoStr = "[[[" + geoStr + "]]]";
        } else if (geoType == "LineString") {
            geoStr = coordinates.join('],[');
            geoStr = "[[" + geoStr + "]]";
        } else {
            geoStr = coordinates.join(',');
            geoStr = "[" + geoStr + "]";
        }
    }






    function submitData() {
        var geoType = $('#type option:selected').val();
        var name = $('#name').val();
        var city = $('#city').val();
        var attrData = name + "," + city;
        if (geoStr != null) {
            saveData(geoType, attrData, geoStr);
            currentFeature = null;
            geoStr = null;
        } else {
            alert('未得到任何绘制图形信息！');
            vectorLayer.getSource().removeFeature(currentFeature);
        }
    };

    /**
     * 提交数据到后台保存
     * @param geoType
     * @param attrData
     * @param geoStr
     */
    function saveData(geoType, attrData, geoStr) {

        var data = {
            type: geoType,
            attr: attrData,
            geometry: geoStr
        };

        $.ajax({
            url: '/Feature/save',
            type: "POST",
            data: JSON.stringify(data),//必要
            dataType:"json",
            contentType:"application/json",
            success:function(response){
                alert(response);
            },
            error:function (err) {
                alert('执行失败')
            }
        });
    }
    // 绑定查询按钮
    $("#query").click(function () {
        $.ajax({
            url: '/Feature/query',
            type: "get",
            success:function (data) {
                var querySource = new ol.source.Vector({
                });
                var queryLayer = new ol.layer.Vector({
                    style: style
                })
                for (var index = 0; index < data.length; index++) {
                    var coordinate = JSON.parse(data[index].geometry);
                    // var coordinate1 = eval("("+coordinate+")");
                    if (data[index].type == "Point") {
                        var point = new ol.Feature(new ol.geom.Point(coordinate));
                        querySource.addFeature(point);
                    }
                    else if (data[index].type == "LineString") {
                        var lineString = new ol.Feature(new ol.geom.LineString(coordinate));
                        querySource.addFeature(lineString);
                    }
                    else if (data[index].type == "Polygon") {
                        var polygon = new ol.Feature(new ol.geom.Polygon(coordinate));
                        querySource.addFeature(polygon);
                    }
                }
                queryLayer.setSource(querySource);
                queryLayer.setStyle(style);
                map.addLayer(queryLayer);
            }

        })
    })

    var select = new ol.interaction.Select();
    map.addInteraction(select);
    var selectedFeatures = select.getFeatures();
    // a DragBox interaction used to select features by drawing boxes
    var dragBox = new ol.interaction.DragBox({
        condition: ol.events.condition.platformModifierKeyOnly
    });

    map.addInteraction(dragBox);

    dragBox.on('boxend', function() {
        // features that intersect the box are added to the collection of
        // selected features
        var extent = dragBox.getGeometry().getExtent();
        vectorLayer.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
            selectedFeatures.push(feature);
        });
    });

    // clear selection when drawing a new box and when clicking on the map
    dragBox.on('boxstart', function() {
        selectedFeatures.clear();
    });

    var infoBox = document.getElementById('info');

    selectedFeatures.on(['add', 'remove'], function() {
        var names = selectedFeatures.getArray().map(function(feature) {
            return feature.get('name');
        });
        if (names.length > 0) {
            infoBox.innerHTML = names.join(', ');
        } else {
            infoBox.innerHTML = 'No countries selected';
        }
    });
    /* 框选 */
    // var draw = new ol.interaction.Draw({
    //     source: vectorLayer.getSource(),
    //     type: "v",
    //     style: new ol.style.Style({
    //         stroke:new ol.style.Stroke({
    //             color: '#cc3300',
    //             width: 5
    //         })
    //
    //     })});
    // map.addInteraction(draw);
    // draw.on('drawend', function (evt) {
    //     var polygon = evt.feature.getGeometry();
    //     setTimeout(function () {
    //         //如果不设置延迟，范围内要素选中后自动取消选中，具体原因不知道
    //         var center = polygon.getCenter(),
    //             radius = polygon.getRadius(),
    //             extent = polygon.getExtent();
    //         var features = vectorLayer.getSource().getFeaturesInExtent(extent);
    //         //先缩小feature的范围
    //         var str = "";
    //         for(var i=0;i<features.length;i++){
    //             var newCoords = features[i].getGeometry().getCoordinates();
    //             if(pointInsideCircle(newCoords,center,radius)){
    //                 selectedFeatures.push(features[i]);
    //                 // str += "<div class=\"selectedItem\" onclick='showDeviceOnMap(\""+features[i].getId()+"\");'>"+features[i].get("name")+"</div>";
    //             }
    //         }
    //         $("#selectedInfoContent").html(str);
    //     },300)
    // })
    /**
     *判断一个点是否在多边形内部
     * @param points 多边形坐标集合
     * @param testPoint 测试点坐标
     * @returns {boolean} 返回true为真，false为假
     */
    function insidePolygon(points, testPoint) {
        var x = testPoint[0], y = testPoint[1];
        var inside = false;
        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
            var xi = points[i][0], yi = points[i][1];
            var xj = points[j][0], yj = points[j][1];
            var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    /**
     *判断一个点是否在圆的内部
     * @param point 测试点坐标
     * @param circle 圆心坐标
     * @param r 圆半径
     * @returns {boolean} 返回true为真，false为假
     */
    function pointInsideCircle(point, circle, r) {
        if (r === 0) return false
        var dx = circle[0] - point[0]
        var dy = circle[1] - point[1]
        return dx * dx + dy * dy <= r * r
    }


})


