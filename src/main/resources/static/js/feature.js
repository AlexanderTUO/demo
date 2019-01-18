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
            myMap.map.addLayer(myMap.pointLayer);
        }

        if (myMap.lineStringLayer == null) {
            myMap.lineStringLayer = new ol.layer.Vector({
                source: new ol.source.Vector()
            });
            myMap.map.addLayer(myMap.lineStringLayer);
        }

        if (myMap.polygonLayer == null) {
            myMap.polygonLayer = new ol.layer.Vector({
                source: new ol.source.Vector()
            });
            myMap.map.addLayer(myMap.polygonLayer);

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

    /**
     * 绑定显示复选框改变事件
     */
    $('#displayFea :checkbox').on('change',function () {
        var checkbox = $('#displayFea :checkbox');
        for (var index = 0; index < checkbox.length; index++) {
            switch (checkbox[index].value) {
                case '1':
                    if (checkbox[index].checked) {
                        myMap.pointLayer.setVisible(true);
                    } else {
                        myMap.pointLayer.setVisible(false);
                    }
                    break;
                case '2':
                    if (checkbox[index].checked) {
                        myMap.lineStringLayer.setVisible(true);
                    } else {
                        myMap.lineStringLayer.setVisible(false);
                    }
                    break;
                case '3':
                    if (checkbox[index].checked) {
                        myMap.polygonLayer.setVisible(true);
                    } else {
                        myMap.polygonLayer.setVisible(false);
                    }
                    break;
                default:
            }
        }
    })


    /**
     * 绑定绘制单选框改变事件
     */
    $('#addFea :radio').on('change', function () {
        // var radio = $('#addFea :checked');
        var addType = $('#addFea input:checked')[0].value;

        var radio = $('#modifyFea input:checked');
        if (radio && radio.length > 0) {
            addType = radio[0].value;
        }
        console.log(addType);
        // 开始绘制
        addFeature(addType);
    });

    var addDraw = null;
    var currentFeature = null;

    /**
     * 类型转换
     * @param type 数字
     * @returns {*[]}
     */
    function typeTransfer(type) {
        if (type === '1') {
            return ["Point",myMap.pointLayer];
        }else  if (type === '2') {
            return ["LineString",myMap.lineStringLayer];
        }else  if (type === '3') {
            return ["Polygon",myMap.polygonLayer];
        }
    }

    
    /**
     * 绘制图形
     * @param geoType 绘制图形的集合类型
     */
    function addFeature(geoType) {
        addDraw = new ol.interaction.Draw({
            source: typeTransfer(geoType)[1].getSource(),
            type: typeTransfer(geoType)[0]
        })
        myMap.map.addInteraction(addDraw);
        addDraw.on('drawend', drawAndCallBack, this);
    }

    function drawAndCallBack(evt) {
        var addType = $('#addFea input:checked')[0].value;

        currentFeature = evt.feature;

        var geometry = evt.feature.getGeometry();
        var coordinates = geometry.getCoordinates();
        if (addType === '1') {
            geoStr = coordinates.join(',');
            geoStr = "[" + geoStr + "]";
        } else if (addType === "2") {
            geoStr = coordinates.join('],[');
            geoStr = "[[" + geoStr + "]]";
        } else {
            geoStr = coordinates[0].join('],[');
            geoStr = "[[[" + geoStr + "]]]";
        }

        // 打开对话框
        $("#dialog-form").dialog('open');

    }

    $("#dialog-form").dialog({
        autoOpen: false,
        height: 300,
        width:350,
        modal: true,
        buttons:{
            "提交": function () {
                if (validate()) {
                    submitData();
                }
                $(this).dialog(close);
            },
            "取消":function () {
                $(this).dialog(close);
            }
        },
        close:function () {
            
        }
    });

    var name = $("#name"),
        city = $("#city"),
        geoType = $("#geoType"),
        infoType = $("#infoType"),
        allFields = $([]).add(name).add(city).add(geoType).add(infoType),
        tips = $(".validateTips");

    /**
     * 更新提示消息
     * @param t
     */
    function updateTips(t) {
        tips.text(t).addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    /**
     * 验证输入内容的长度
     * @param o
     * @param n
     * @param min
     * @param max
     * @returns {boolean}
     */
    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("" + n + "的长度必须在" + min + "和" + max + "之间。");
            return false;
        } else {
            return true;
        }
    }

    /**
     * 正则表达式验证内容
     * @param o
     * @param regexp
     * @param n
     * @returns {boolean}
     */
    function checkRegexp(o, regexp, n) {
        if (!regexp.test(o.val())) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }

    }

    function validate() {
        var bValid = true;
        allFields.removeClass("ui-state-error");
        bValid = bValid && checkLength(name, "name", 3, 16);
        bValid = bValid && checkLength(city, "city", 3, 16);
        bValid = bValid && checkLength(geoType, "geoType", 1, 16);
        bValid = bValid && checkLength(infoType, "infoType", 1, 16);

        // bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z])+$/i, "名称必须有a-z、0-9、下划线组成");
        // bValid = bValid && checkRegexp(city, /^[a-z]([0-9a-z])+$/i, "城市必须有a-z、0-9、下划线组成");

        return bValid;
    }
    
    function submitData() {
        // var data = new FormData($("#featureCon"));
        var data = new FormData(document.querySelector("form"));
        data.append("geometry", geoStr);

        console.log(data.get("infoType"));
        // for (var index in data) {
        //     console.log(data.get(index))
        // }

        $.ajax({
            url: '/Feature/save2',
            type: "POST",
            data: data,//必要
            // dataType:"json",
            // contentType:"application/json",
            //请求成功完成后要执行的方法
            success: function (response) {
                alert(response);
            },
            error: function (err) {
                alert("执行失败");
            }
        })

    }

    /**
     * 绑定修改单选框改变事件
     */
    $('#modify').on('change', function () {
        console.log(this.checked);
        if (this.checked) {
            // 开始修改
            $('#delete').prop("checked",false);
        }
    });

    /**
     * 绑定删除单选框改变事件
     */
    $('#delete').on('change', function () {
        console.log(this.checked);
        if (this.checked) {
            // 开始删除
            $('#modify').prop("checked", false);
        }
    });

    var selectType = null;
    $('#selectFea').on('change', function () {
        selectType = $('#selectFea option:selected')[0].value;
        console.log(selectType);
        // 开始选择
    });






    

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


