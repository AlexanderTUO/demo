// $(document).ready(function () {
$(function () {
    var flashFeature;
    var preFeature;
    var flag = false;
    var feature;
    var draw;
    var geoStr = "";
    var currentFeature = null;
    var opeaType = null;
    var jstree = null;
    var styleTree = null;

    //要素绘制类型
    var addFeaType = null;

    var drawedFeature = null;

    // 编辑类型（普通/WFS）
    var choice = null;


    var myMap = {};
    // 初始化地图
    initMap();



    initTree();

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
        // myMap.kmlLayer = new ol.layer.Vector({
        //     source: new ol.source.Vector({
        //         url: "data/510100.kml",
        //         format: new ol.format.KML(),
        //     }),
        //     style: flashStyle,
        //     zIndex: 99
        // });

        // geoserver发布地图
        myMap.geoserverLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                // url: 'http://localhost:8888/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=nyc_roads:testsc&outputFormat=application/json&srsname=EPSG:4326',
                url: 'http://localhost:8888/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=chengdu:cdxzq&outputFormat=application/json&srsname=EPSG:4326',
                format: new ol.format.GeoJSON(),
            }),
            // style: flashStyle,
            zIndex: 99
        });

        myMap.wmsLayer = new ol.layer.Tile({
            source:new ol.source.TileWMS({
                // url: 'http://localhost:8888/geoserver/chengdu/wms?service=WMS&version=1.1.0&request=GetMap&layers=chengdu%3Acdxzq&bbox=102.987342834473%2C30.0897579193115%2C104.890800476074%2C31.4338436126709&width=768&height=542&srs=EPSG%3A404000&format=application/openlayers'
                // url:'http://localhost:8888/geoserver/chengdu/wms?service=WMS&version=1.1.0&request=GetMap&layers=chengdu%3AchengduGroup&bbox=102.987342834473%2C30.0897579193115%2C104.890800476074%2C31.4338436126709&width=768&height=542&srs=EPSG%3A4326&format=application/openlayers'
                url:'http://localhost:8888/geoserver/chengdu/wms?service=WMS&version=1.1.0&request=GetMap&layers=chengdu%3A510100s4&bbox=102.987342834473%2C30.0897579193115%2C104.890800476074%2C31.4338436126709&width=768&height=542&srs=EPSG%3A4326&format=application/openlayers'
            })
        })


        myMap.map = new ol.Map({
            target: 'map',
            layer: null,
            view: view
        });


        // myMap.map.addLayer(myMap.geoserverLayer);
        // myMap.map.addLayer(myMap.kmlLayer);
        myMap.map.addLayer(myMap.gaodeMapLayer);
        myMap.map.addLayer(myMap.wmsLayer);

        if (myMap.pointLayer == null) {
            myMap.pointLayer = new ol.layer.Vector({
                source: new ol.source.Vector(),
                style:createStyle("1"),
            })
            myMap.map.addLayer(myMap.pointLayer);
        }

        if (myMap.lineStringLayer == null) {
            myMap.lineStringLayer = new ol.layer.Vector({
                source: new ol.source.Vector(),
                style: createStyle("2"),
            });
            myMap.map.addLayer(myMap.lineStringLayer);
        }

        if (myMap.polygonLayer == null) {
            myMap.polygonLayer = new ol.layer.Vector({
                source: new ol.source.Vector(),
                style:createStyle("3")
            });
            myMap.map.addLayer(myMap.polygonLayer);
        }

        if (myMap.circleLayer == null) {
            myMap.circleLayer = new ol.layer.Vector({
                source: new ol.source.Vector(),
                style:createStyle("4")
            });
            myMap.map.addLayer(myMap.circleLayer);
        }
        // 从后台获取要素
        displayFeatures();
    }

    function initTree() {
        /*******后台普通结构数据******/
        jstree = $("#jstree").jstree({
            "core" : {
                "themes" : {
                    "variant" : "large"
                },
                // 'data':{
                //     'url': "getTreeWFS",
                //     "dataType" : "json", // needed only if you do not supply JSON headers
                // }
            'data' : function (obj, callback) {
                $.ajax({
                    type: "GET",
                    url:"getTreeWFS",
                    dataType:"json",
                    async: false,
                    success:function(result) {
                        var data = [];
                        // traverseTree1(result);
                        // for(var item in result){
                        //     data.push({
                        //         "id":item.id,
                        //         "parent":item.parent,
                        //         "text":item.text,
                        //         "state": true
                        //     })
                        // }
                        for (var i = 0; i < result.length; i++) {
                            data.push({
                                "id":result[i].id,
                                "parent":result[i].parent,
                                "text":result[i].text,
                                "state": {
                                    selected: false,
                                    opened: true
                                },
                                "type": result[i].type,
                                "geoType": result[i].geoType,
                                "layerName":result[i].layerName
                            })
                        }
                        callback.call(this, data);
                    }
                });

            // }
                },
            },
            "checkbox" : {
                "keep_selected_style" : true,
                "three_state": true//
            },
            "plugins" : [ "checkbox" ]
        });



        jstree.on('changed.jstree', function (e, data){
            // if (data.action == "deselect_node") {
            //     data.instance.get_node(data.node).set_state("selected", false);
            // }data.node.state.selected

            // var i, j, r = [];
            // for(i = 0, j = data.selected.length; i < j; i++) {
            //     // r.push(data.instance.get_node(data.selected[i]).text);
            //     var node = data.instance.get_node(data.selected[i]).original;
            //     if (node.type == "layer") {
            //         myMap[node.layerName].setVisible(node.state.selected);
            //     }
            // }

            if (data.action == "model" || data.action == "ready") {
                return;
            }
            handleLayer(data.node);
        })


        function handleLayer(data) {
            if (data.original.type == "layer") {
                myMap[data.original.layerName].setVisible(data.state.selected);
            }
            var children = data.children;
            children.forEach(function (index, value) {
                var child = jstree.jstree().get_node(index);
                handleLayer(child);
            })
        }

        styleTree = $("#styleTree").jstree({
            "core" : {
                "themes" : {
                    "variant" : "large"
                },
                // 'data':{
                //     'url': "getTreeWFS",
                //     "dataType" : "json", // needed only if you do not supply JSON headers
                // }
                'data' : function (obj, callback) {
                    $.ajax({
                        type: "GET",
                        url:"getTreeWFS",
                        dataType:"json",
                        async: false,
                        success:function(result) {
                            var data = [];
                            for (var i = 0; i < result.length; i++) {
                                data.push({
                                    "id":result[i].id,
                                    "parent":result[i].parent,
                                    "text":result[i].text,
                                    "state": {
                                        selected: false,
                                        opened: true
                                    },
                                    "type": result[i].type,
                                    "geoType": result[i].geoType,
                                    "layerName":result[i].layerName,
                                    "icon": '/images/toolbar/marker.png'
                                })
                            }
                            callback.call(this, data);
                        }
                    });

                    // }
                },
            },
            "checkbox" : {
                "keep_selected_style" : true,
                "three_state": true//
            },
            "plugins" : [ "checkbox" ]
        });

        styleTree.on('changed.jstree', function (e, data){
            var i, j;
            for(i = 0, j = data.selected.length; i < j; i++) {
                // addFeaType = data.instance.get_node(data.selected[i]).text;
                addFeaType = data.selected[i];
            }
        })

    }
    
    function createStyle(type) {
        switch (type) {
            case "1":
                return new ol.style.Style({
                    image: new ol.style.Icon({
                        src: "images/air.png"
                    }),
                    text:new ol.style.Text({
                        text: "点",
                        scale: "4"
                    })
                });
            case "2":
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width:2,
                        color: "blue"
                    }),
                    text:new ol.style.Text({
                        text: "我是线线"
                    })
                });

            case "3":
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width:2,
                        color: "green"
                    }),
                    fill:new  ol.style.Fill({

                        color: "#D9D8D7"
                    })
                });
            case "4":
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width:2,
                        color: "yellow"
                    }),
                    fill:new  ol.style.Fill({
                        color: "#D9D8D7"
                    })
                });
            default:

        }
    }

    function traverseFeatures(features) {
        for (var i = 0; i < features.length; i++) {
            features[i].set("info", "fea");
        }
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
                            type: "Point",
                            info:data[index]
                        });
                        myMap.pointLayer.getSource().addFeature(point);
                        myMap.pointLayer.setVisible(false);
                    }
                    else if (data[index].type == "LineString") {
                        var lineString = new ol.Feature({
                            geometry: new ol.geom.LineString(coordinate),
                            name: data[index].name,
                            id: data[index].id,
                            type: "LineString",
                            info:data[index]
                        });
                        myMap.lineStringLayer.getSource().addFeature(lineString);
                        myMap.lineStringLayer.setVisible(false);
                    }
                    else if (data[index].type == "Polygon") {
                        var polygon = new ol.Feature({
                            geometry: new ol.geom.Polygon(coordinate),
                            name: data[index].name,
                            id: data[index].id,
                            type: "Polygon",
                            info:data[index]
                        });
                        myMap.polygonLayer.getSource().addFeature(polygon);
                        myMap.polygonLayer.setVisible(false);
                    }
                    else if (data[index].type == "Circle") {
                        var radius = JSON.parse(data[index].radius);

                        var circle = new ol.Feature({
                            geometry: new ol.geom.Circle(coordinate,radius),
                            name: data[index].name,
                            id: data[index].id,
                            type: "Circle",
                            info:data[index]
                        });
                        myMap.circleLayer.getSource().addFeature(circle);
                        myMap.circleLayer.setVisible(false);
                    }
                }

                myMap.map.on('pointermove', pointermoveFun, this);

                /**
                 * 鼠标移动事件监听处理函数
                 */
                function pointermoveFun(e) {
                    var feature = myMap.map.forEachFeatureAtPixel(e.pixel,
                        function (feature, layer) {
                            return feature;
                        });
                    myMap.map.getTargetElement().style.cursor = feature ? 'pointer' : '';//改变鼠标光标状态
                }
            }
        })
    }

    function displayEvent() {
        var checkbox = $('#displayFea :checkbox');
        for (var index = 0; index < checkbox.length; index++) {
            switch (checkbox[index].value) {
                case '1':
                    if (checkbox[index].checked) {
                        myMap.pointLayer.setVisible(true);
                        // $('#allNotSelect').prop('checked', false);
                    } else {
                        myMap.pointLayer.setVisible(false);
                        // $('#allSelect').prop('checked', false);
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
                case '4':
                    if (checkbox[index].checked) {
                        myMap.circleLayer.setVisible(true);
                    } else {
                        myMap.circleLayer.setVisible(false);
                    }
                    break;
                default:
            }
        }
    }

    /**
     * 绑定显示复选框改变事件
     */
    $('#displayFea :checkbox').on('change', function () {
        displayEvent();
    });

    $('#allSelect').on('change', function () {
        if (this.checked) {
            $('#allNotSelect').prop('checked', false);

            $('#pointCh').prop('checked', true);
            $('#lineStringCh').prop('checked', true);
            $('#polygonCh').prop('checked', true);
            $('#circleCh').prop('checked', true);
            displayEvent();
        }
    });

    $('#allNotSelect').on('change', function () {
        if (this.checked) {
            $('#allSelect').prop('checked', false);

            $('#pointCh').prop('checked', false);
            $('#lineStringCh').prop('checked', false);
            $('#polygonCh').prop('checked', false);
            $('#circleCh').prop('checked', false);
            displayEvent();
        }
    });

    var addType = "1";//添加要素的类型,默认为点
    var addDraw = null;
    var currentFeature = null;
    /**
     * 绑定绘制单选框改变事件
     */
    $('#addFea :radio').on('change', function () {
        addFeature();
    });

    /**
     * 绑定添加单选框改变事件
     */
    $('#add').on('change', function () {
        if (this.checked) {
            // 开始修改
            $('#delete').prop("checked", false);
            $('#modify').prop("checked", false);
            $('#selectionChe').prop("checked", false);
            // 开始绘制
            addFeature(addType);
        } else {
            if (addDraw) {
                myMap.map.removeInteraction(addDraw);
            }
        }
    });



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
        }else if (type === '4') {
            return ["Circle",myMap.circleLayer];
        }
    }

    function typeTransferWfs(type) {
        if (type === '11') {
            return ["Point",myMap.pointLayer];
        }else  if (type === '12') {
            return ["LineString",myMap.lineStringLayer];
        }else  if (type === '13') {
            return ["Polygon",myMap.polygonLayer];
        }else if (type === '14') {
            return ["Circle",myMap.circleLayer];
        }
    }

    /**
     * 绘制图形
     * @param geoType 绘制图形的集合类型
     */
    function addFeature() {
        choice = "normal";
        if (!$('#add').prop('checked')) {
            return;
        }
        if (addDraw) {
            myMap.map.removeInteraction(addDraw);
        }
        addType = $('#addFea input:checked')[1].value;
        addDraw = new ol.interaction.Draw({
            source: typeTransfer(addType)[1].getSource(),
            type: typeTransfer(addType)[0]
        })

        myMap.map.addInteraction(addDraw);
        addDraw.on('drawend', drawAndCallBack, this);

    }


    var radiusDo = null;
    function drawAndCallBack(evt) {
        if (choice == "normal") {
            currentFeature = evt.feature;
            var geometry = evt.feature.getGeometry();
            var coordinates = geometry.getCoordinates();

            if (addType === '1') {
                geoStr = coordinates.join(',');
                geoStr = "[" + geoStr + "]";
            } else if (addType === "2") {
                geoStr = coordinates.join('],[');
                geoStr = "[[" + geoStr + "]]";
            } else if (addType === "3") {
                geoStr = coordinates[0].join('],[');
                geoStr = "[[[" + geoStr + "]]]";
            }else if (addType == '4') {
                radiusDo = geometry.getRadius();
                geoStr = geometry.getCenter().join(',');
                geoStr = "[" + geoStr + "]";
            }
        }else if (choice == "WFS") {
            geoStr = "";
            currentFeature = evt.feature;
            var geometry = evt.feature.getGeometry();
            var coordinates = geometry.getCoordinates();
            var coors = coordinates.toString().split(",");

            var i, j;
            for (var i = 0,j =coors.length; i < j; i++) {
                if (i % 2 == 0||i==j-1) {
                    geoStr += coors[i]+" ";
                } else {
                    geoStr += coors[i]+",";
                }
            }
            debugger;
            if (addFeaType === '11') {
                geoStr = "POINT(" + geoStr + ")";
            } else if (addFeaType === "12") {
                geoStr = "LINESTRING(" + geoStr + ")";
            } else if (addFeaType === "13") {
                geoStr = "POLYGON((" + geoStr + "))";
            }else if (addFeaType == '4') {
                radiusDo = geometry.getRadius();
                geoStr = geometry.getCenter().join(',');
                geoStr = "[" + geoStr + "]";
            }
        }
        geoStr = "SRID=4326;" + geoStr;
        drawedFeature = evt.feature;
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
                    // if (choice == "normal") {
                    //     submitData();
                    // }else if (choice == "WFS") {
                    //     submitDataWfs();
                    // }

                    $(this).dialog("close");
                }
            },
            "取消": function () {
                if (addType === '1') {
                    myMap.pointLayer.getSource().removeFeature(currentFeature);
                } else if (addType === "2") {
                    myMap.lineStringLayer.getSource().removeFeature(currentFeature);
                } else if (addType === "3") {
                    myMap.polygonLayer.getSource().removeFeature(currentFeature);
                }else if (addType === "4") {
                    myMap.circleLayer.getSource().removeFeature(currentFeature);
                }
                $(this).dialog("close");
            }
        },
        close:function () {
            $("#dialog-form").removeClass("ui-state-error");
        }
    });

    var name = $("#name"),
        city = $("#city"),
        type = $("#type"),
        infoType = $("#infoType"),
        allFields = $([]).add(name).add(city).add(type).add(infoType),
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
        bValid = bValid && checkLength(type, "type", 1, 16);
        bValid = bValid && checkLength(infoType, "infoType", 1, 16);

        // bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z])+$/i, "名称必须有a-z、0-9、下划线组成");
        // bValid = bValid && checkRegexp(city, /^[a-z]([0-9a-z])+$/i, "城市必须有a-z、0-9、下划线组成");

        return bValid;
    }

    /**
     * 提交保存数据到数据库
     */
    function submitData() {
        // var data = new FormData($("#featureCon"));
        // var data = new FormData(document.querySelector("form"));
        // data.append("geometry", geoStr);
        //
        // console.log(data.get("infoType"));
        // for (var index in data) {
        //     console.log(data.get(index))
        // }

        var data = {
            "name": name.val(),
            "city": city.val(),
            "infoType": infoType.val(),
            "type":type.val(),
            "geometry":geoStr,
            "radius": radiusDo
        };
        var url;
        if (choice == "normal") {
            url = '/Feature/save2';
        }else if (choice == "WFS") {
            url = '/PFeature/save2';
        }

        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),//必要
            dataType:"json",
            contentType:"application/json",
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
     * 提交保存数据到数据库WFS
     */
    function submitDataWfs() {
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
        newFeature.set('name', "自定义");
        newFeature.set('id', '11');
        newFeature.set('gid', 208);
        // newFeature.setGeometry(new ol.geom.MultiLineString([geometry.getCoordinates()]));
        newFeature.setGeometry(new ol.geom.Polygon([[[104.28523063659668,30.23317337036133],[104.28093910217285,30.231628417968754],[104.28042411804199,30.227165222167972],[104.27853584289551,30.222358703613285],[104.27750587463379,30.220298767089847],[104.2781925201416,30.216865539550785],[104.27132606506348,30.21171569824219],[104.26480293273926,30.21549224853516],[104.26377296447754,30.218410491943363],[104.27046775817871,30.231628417968754],[104.26806449890137,30.236606597900394],[104.25965309143066,30.23866653442383],[104.25845146179199,30.24347305297852],[104.2536449432373,30.247764587402347],[104.24283027648926,30.249996185302738],[104.23836708068848,30.24742126464844],[104.23699378967285,30.25068283081055],[104.24300193786621,30.25566101074219],[104.24368858337402,30.259094238281254],[104.25004005432129,30.259265899658207],[104.2558765411377,30.26046752929688],[104.25965309143066,30.270080566406254],[104.26377296447754,30.278491973876957],[104.25793647766113,30.282783508300785],[104.24901008605957,30.283813476562504],[104.23596382141113,30.28141021728516],[104.22978401184082,30.274715423583988],[104.22823905944824,30.27986526489258],[104.2339038848877,30.29016494750977],[104.23579216003418,30.296001434326175],[104.23956871032715,30.302696228027347],[104.24471855163574,30.304927825927738],[104.24695014953613,30.307331085205078],[104.25004005432129,30.31848907470703],[104.24969673156738,30.323467254638672],[104.24592018127441,30.326557159423828],[104.24798011779785,30.328102111816406],[104.25810813903809,30.326557159423828],[104.26119804382324,30.3277587890625],[104.26497459411621,30.32878875732422],[104.26823616027832,30.325355529785156],[104.27716255187988,30.315227508544922],[104.28454399108887,30.305442810058594],[104.28814888000488,30.30303955078125],[104.29312705993652,30.302696228027344],[104.29879188537598,30.298404693603516],[104.29930686950684,30.293598175048828],[104.29913520812988,30.28484344482422],[104.2998218536377,30.279006958007812],[104.29638862609863,30.276260375976562],[104.29347038269043,30.273513793945312],[104.29295539855957,30.27059555053711],[104.29261207580566,30.267333984375],[104.29244041442871,30.264759063720703],[104.2946720123291,30.260639190673828],[104.29862022399902,30.256519317626953],[104.29587364196777,30.25531768798828],[104.29312705993652,30.256004333496094],[104.29106712341309,30.252399444580078],[104.29055213928223,30.24913787841797],[104.29278373718262,30.250511169433594],[104.29776191711426,30.250167846679688],[104.30085182189941,30.248966217041016],[104.29879188537598,30.246906280517578],[104.29518699645996,30.246906280517578],[104.2920970916748,30.244674682617188],[104.28900718688965,30.23935317993164],[104.28969383239746,30.23660659790039],[104.29072380065918,30.234031677246094],[104.28952217102051,30.231800079345703],[104.28746223449707,30.231971740722656],[104.28523063659668,30.23317337036133]]]));
        console.log(new ol.geom.MultiLineString([geometry.getCoordinates()]));
        addWfs([newFeature]);
        // 更新id
        // newId = newId + 1;
        // // 3秒后，自动刷新页面上的feature
        // setTimeout(function() {
        //     drawLayer.getSource().clear();
        //     queryWfs();
        // }, 3000);
    }
    //新增元素
    // 添加到服务器端
    function addWfs(features) {
        var WFSTSerializer = new ol.format.WFS();
        var featObject = WFSTSerializer.writeTransaction(features,
            null, null, {
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

    /**
     * 绑定修改单选框改变事件
     */
    $('#modify').on('change', function () {
        console.log(this.checked);
        if (this.checked) {
            // 开始修改
            opeaType = "modify";
            modifyFea();
            $('#delete').prop("checked", false);
            $('#add').prop("checked", false);
            $('#selectionChe').prop("checked", false);
        } else {
            myMap.map.removeInteraction(selectionInter);
            myMap.map.removeInteraction(modifyInter);
            modifyFeatures = null;
        }
    });

    $('#modifyBtnSave').on('click', function () {
        saveModifyFea();
    });

    $('#modifyBtnCancel').on('click', function () {
        modifyFeatures = null;
    });





    /**
     * 定义修改对话框
     */
    $("#dialog-modify").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        modal: true,
        buttons:{
            "就酱": function () {
                // todo后台保存修改
                displayFeatures();
                $(this).dialog("close");
            },
            "算球": function () {
                $(this).dialog("close");
            }
        }
    });


    var selectionInter = null;
    var modifyInter = null;
    var modifyFeatures = null;
    /**
     * 修改数据保存到数据库
     */
    function modifyFea() {
        selectionInter = new ol.interaction.Select({
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "red",
                    width: 2
                }),
                image: new ol.style.Icon({
                    src: "images/car.png"
                })
            })
        });

        modifyInter = new ol.interaction.Modify({
            style:new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color: "yellow",
                    width: 5
                })
            }),
            features: selectionInter.getFeatures()
        })

        myMap.map.addInteraction(selectionInter);
        myMap.map.addInteraction(modifyInter);
        modifyInter.on('modifyend', function (e) {
            modifyFeatures = e.features;
        });
    }



    function saveModifyFea() {
        if (modifyFeatures && modifyFeatures.getLength() > 0) {
            var modifyFeature = modifyFeatures.item(0).clone();
            var coordinates = modifyFeature.getGeometry().getCoordinates();
            var modifyType = modifyFeature.get("type");
            if (modifyType == 'Point') {
                geoStr = coordinates.join(',');

                geoStr = "[" + geoStr + "]";
            } else if (modifyType == "LineString") {
                geoStr = coordinates.join('],[');
                geoStr = "[[" + geoStr + "]]";
            } else if (modifyType == "Polygon") {
                geoStr = coordinates[0].join('],[');
                geoStr = "[[[" + geoStr + "]]]";
            }else if (modifyType == 'Circle') {
                geoStr = modifyFeature.getGeometry().getCenter().join(',');
                geoStr = "[" + geoStr + "]";
            }

            var data = modifyFeature.get("info");
            data["geometry"] = geoStr;

            $.ajax({
                url: '/Feature/updateFeature',
                type: "POST",
                data: JSON.stringify(data),//必要
                dataType:"json",
                contentType:"application/json",
                //请求成功完成后要执行的方法
                success: function (response) {
                    alert(response);
                },
                error: function (err) {
                    alert("执行失败");
                }
            })
        }
    }

    /**
     * 绑定删除单选框改变事件
     */
    $('#delete').on('change', function () {
        console.log(this.checked);
        if (this.checked) {
            // 开始删除
            opeaType = 'delete';
            $('#modify').prop("checked", false);
            $('#add').prop("checked", false);
            $('#selectionChe').prop("checked", false);

            myMap.map.un('singleclick', singleclickFun, this);
            myMap.map.on('singleclick', singleclickFun, this);
        }
    });

    /**
     * 删除要素
     */
    function deleteFea() {
        var regId = currentFeature.get("id");
        $.ajax({
            url: "/Feature/delete/" + regId,
            type: "get",
            success:function () {
                alert("删除成功！");
            }
        })
    }

    /**
     * 定义删除对话框
     */
    $("#dialog-delete").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        modal: true,
        buttons:{
            "删球": function () {
                // todo后台删除
                deleteFea();
                displayFeatures();
                $(this).dialog("close");
            },
            "算球": function () {
                $(this).dialog("close");
            }
        }
    });



    var selectType = null;
    $('#selectFea').on('change', function () {
        selectType = $('#selectFea option:selected')[0].value;
        selectFea();
        $('#add').prop("checked", false);
        $('#delete').prop("checked", false);
        $('#modify').prop("checked", false);
    });

    /**
     * 实现选择
     */
    var selectedFeatures = null;
    myMap.map.on('singleclick', singleclickFun, this);
    function selectFea() {
        console.log($('#selectionChe').prop('checked'));
        if (!$('#selectionChe').prop('checked')) {
            return;
        }
        opeaType = "select";
        var select = new ol.interaction.Select();
        myMap.map.addInteraction(select);
        selectedFeatures = select.getFeatures();

        myMap.pointLayer.set("type", "vector");
        myMap.lineStringLayer.set("type", "vector");
        myMap.polygonLayer.set("type", "vector");
        myMap.circleLayer.set("type", "vector");
        myMap.geoserverLayer.set("type", "vector");

        switch (selectType) {
           case "1":
               // 弹出显示框
               // displaySelectedFea(selectedFeatures);
               break;
           case "2":
               var dragBox = new ol.interaction.DragBox({
                   // condition: ol.events.condition.platformModifierKeyOnly
               });

               myMap.map.addInteraction(dragBox);

               var features = myMap.geoserverLayer.getSource().getFeatures();
               traverseFeatures(features);

               dragBox.on('boxend', function () {
                   var extent = dragBox.getGeometry().getExtent();
                   var layers = myMap.map.getLayers();
                   console.log(layers.getLength());
                   for (var index = 0; index < layers.getLength(); index++) {
                       if (layers.item(index).get("type")) {
                           console.log("index:" + index);
                           layers.item(index).getSource().forEachFeatureIntersectingExtent(extent, function (feature) {
                               if (feature.get('info')) {
                                   console.log(feature.get('info').name);
                                   selectedFeatures.push(feature);
                               }
                           });
                       }
                   }
                   // 弹出显示框
                   displaySelectedFea(selectedFeatures);
               });

               dragBox.on('boxstart', function () {
                   selectedFeatures.clear();
               });
               break;
           case "3":
               //  var circleDraw = new ol.interaction.Draw({
               //      source: myMap.pointLayer.getSource(),
               //      type: 'Circle',
               //      // condition: ol.events.condition.platformModifierKeyOnly
               //  })
               //  myMap.map.addInteraction(circleDraw);
               //
               // circleDraw.on('drawend',function(evt){
               //     var polygon = evt.feature.getGeometry();
               //     setTimeout(function(){
               //         //如果不设置延迟，范围内要素选中后自动取消选中，具体原因不知道
               //         var center = polygon.getCenter(),
               //             radius = polygon.getRadius(),
               //             extent = polygon.getExtent();
               //         var features = myMap.pointLayer.getSource().getFeaturesInExtent(extent);
               //         //先缩小feature的范围
               //         var str = "";
               //         console.log(features.length);
               //         for(var i=0;i<features.length;i++){
               //             var newCoords = features[i].getGeometry().getCoordinates();
               //             if (!newCoords) {
               //                 continue;
               //             }
               //             console.log(i + ":" + newCoords);
               //             if(pointInsideCircle(newCoords,center,radius)){
               //                 selectedFeatures.push(features[i]);
               //             }
               //         }
               //     },300)
               // })
               //
               // circleDraw.on('drawend',function(evt){
               //     selectedFeatures.clear();
               // })

                var dragBox = new ol.interaction.Draw({
                    source: myMap.pointLayer.getSource(),
                    type: 'Circle',
                    // condition: ol.events.condition.platformModifierKeyOnly
                })

               myMap.map.addInteraction(dragBox);

               dragBox.on('drawend', function (evt) {
                   // var extent = dragBox.getGeometry().getExtent();

                   var extent = evt.feature.getGeometry().getExtent();
                   // var circle = evt.feature.getGeometry();
                   var center = evt.feature.getGeometry().getCenter(),
                       radius = evt.feature.getGeometry().getRadius();

                   var circle = new ol.geom.Circle(center, radius);
                   selectedFeatures.clear();
                   setTimeout(function () {
                       console.log(selectedFeatures);
                       var layers = myMap.map.getLayers();
                       console.log(layers.getLength());
                       for (var index = 0; index < layers.getLength(); index++) {
                           if (layers.item(index).get("type")=="Circle") {
                               console.log("index:" + index);
                               layers.item(index).getSource().forEachFeatureIntersectingExtent(extent, function (feature) {
                                   if (feature.get('info')) {
                                       console.log(feature.get('info').name);
                                       // if (polyIntersectsPoly(circle,feature.getGeometry()) === true){
                                       //     selectedFeatures.push(feature);
                                       // }
                                       if (circleIntersectsPoly(center, radius, feature.getGeometry().getCenter(), feature.getGeometry().getRadius())) {
                                           selectedFeatures.push(feature);
                                       }
                                       // selectedFeatures.push(feature);
                                   }

                               });
                           }
                       }
                       // 弹出显示框
                       displaySelectedFea(selectedFeatures);
                   }, 300);

               });

               dragBox.on('drawstart', function () {
                   selectedFeatures.clear();
               });


               break;
           case "4":
               // var polygonDraw = new ol.interaction.Draw({
               //     source: myMap.pointLayer.getSource(),
               //     type: 'Polygon',
               //     // condition: ol.events.condition.platformModifierKeyOnly
               // })
               //    myMap.map.addInteraction(polygonDraw);
               //
               //    polygonDraw.on('drawend',function(evt){
               //        var polygon = evt.feature.getGeometry();
               //        setTimeout(function(){
               //            //如果不设置延迟，范围内要素选中后自动取消选中，具体原因不知道
               //            var extent = polygon.getExtent();
               //            var features = myMap.pointLayer.getSource().getFeaturesInExtent(extent);
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

               // var dragBox = new ol.interaction.DragBox({
               //     // condition: ol.events.condition.platformModifierKeyOnly
               // });

               var polygonDraw = new ol.interaction.Draw({
                   source: myMap.pointLayer.getSource(),
                   type: 'Polygon',
                   // condition: ol.events.condition.platformModifierKeyOnly
               })

               myMap.map.addInteraction(polygonDraw);

               polygonDraw.on('drawend', function (evt) {
                   // var extent = dragBox.getGeometry().getExtent();

                   var extent = evt.feature.getGeometry().getExtent();
                   var polygon = evt.feature.getGeometry();

                   selectedFeatures.clear();
                   setTimeout(function () {
                       console.log(selectedFeatures);
                       var layers = myMap.map.getLayers();
                       console.log(layers.getLength());
                       for (var index = 0; index < layers.getLength(); index++) {
                           if (layers.item(index).get("type")) {
                               console.log("index:" + index);
                               layers.item(index).getSource().forEachFeatureIntersectingExtent(extent, function (feature) {
                                   if (feature.get('info')) {
                                       console.log(feature.get('info').name);

                                       if (polyIntersectsPoly(polygon,feature.getGeometry()) === true){
                                           selectedFeatures.push(feature);
                                       }
                                   }

                               });
                           }
                       }
                       // 弹出显示框
                       displaySelectedFea(selectedFeatures);
                   }, 300);

               });
               polygonDraw.on('drawstart', function () {
                   selectedFeatures.clear();
               });

               break;
           default:
       }

       // var infoBox = document.getElementById('info');

       selectedFeatures.on(['add','remove'],function () {
           var names = selectedFeatures.getArray().map(function (feature) {
               return feature.get('name');
           });
           // if (names.length > 0) {
           //     infoBox.innerHTML = names.join(',');
           // } else {
           //     infoBox.innerHTML = '没有要素被选中';
           // }
       })
    }

    /**
     * check whether the supplied polygons have any spatial interaction
     * @{ol.geometry.Polygon} polygeomA
     * @{ol.geometry.Polygon} polygeomB
     * @returns {Boolean} true||false
     */
    function polyIntersectsPoly(polygeomA, polygeomB) {
        var geomA = new jsts.io.GeoJSONReader().read(new ol.format.GeoJSON().writeFeatureObject(
            new ol.Feature({
                geometry: polygeomA
            })
            )
        ).geometry;
        var geomB = new jsts.io.GeoJSONReader().read(new ol.format.GeoJSON().writeFeatureObject(
            new ol.Feature({
                geometry: polygeomB
            })
            )
        ).geometry;
        return geomA.intersects(geomB);
    };

    function circleIntersectsPoly(coordinate1,radius1,coordinate2,radius2) {
        var geomA = new jsts.io.GeoJSONReader().read(new ol.format.GeoJSON().writeFeatureObject(
            new ol.Feature({
                // geometry: polygeomA
                geometry: new ol.geom.Circle(coordinate1,radius1),
            })
            )
        ).geometry;
        var geomB = new jsts.io.GeoJSONReader().read(new ol.format.GeoJSON().writeFeatureObject(
            new ol.Feature({
                geometry: new ol.geom.Circle(coordinate2,radius2),
            })
            )
        ).geometry;
        return geomA.intersects(geomB);
    };

    // var linearRing = new ol.geom.LinearRing()

    $('#selectionChe').on('change', function () {
        if (this.checked) {
            // 开始选择
            selectFea();
        }
    });



    $("#dialog-display").dialog({
        autoOpen: false,
        resizable: false,
        height: 500,
        width:500
        // modal: true,
    })

    var featureTable = null;
    function displaySelectedFea(selectedFeatures) {
        // selectedFeatures;

        var featureData1 = new Array();
        for (var index = 0; index < selectedFeatures.getLength(); index++) {
            featureData1.push(selectedFeatures.item(index).get('info'));
        }
        var featureData = [
            ['Trident','Internet Explorer 4.0','Win 95+','4','X'],
            ['Trident','Internet Explorer 5.0','Win 95+','5','C'],
            ['Trident','Internet Explorer 5.5','Win 95+','5.5','A'],
            ['Trident','Internet Explorer 6','Win 98+','6','A'],
            ['Trident','Internet Explorer 7','Win XP SP2+','7','A'],
            ['Trident','AOL browser (AOL desktop)','Win XP','6','A'],
            ['Gecko','Firefox 1.0','Win 98+ / OSX.2+','1.7','A'],
            ['Gecko','Firefox 1.5','Win 98+ / OSX.2+','1.8','A'],
            ['Gecko','Firefox 2.0','Win 98+ / OSX.2+','1.8','A'],
            ['Gecko','Firefox 3.0','Win 2k+ / OSX.3+','1.9','A']
        ];

        if (featureTable == null) {
            featureTable = $('#d1').DataTable({
                autoWidth: true,
                info: false,
                data: featureData1,
                searching: false,
                paging: false,
                columns: [
                    {
                        // width: "20%",
                        targets: 0,
                        data: "id",
                        title: "id",
                        // visible:false
                    },
                    {
                        targets: 1,
                        data: "name",
                        title: "名称",
                    },
                    {
                        targets: 2,
                        data: "city",
                        title: "城市",
                    },
                    {
                        targets: 3,
                        data: "type",
                        title: "类型",
                    },
                    // {
                    //     targets: 4,
                    //     data: "geometry",
                    //     title: "位置",
                    // },
                ],
                "destroy": true,
            });
        } else {
            var currentPage = featureTable.page();  //该行是固定写死的
            featureTable.clear();
            featureTable.rows.add(featureData1);
            featureTable.page(currentPage).draw(false);
            // rainTable.ajax.reload();
        }


        // featureTable = $("#displaySelectedFea1").dataTable({
        //     paging: false,
        //     searching: false,
        //     data: featureData,
        //     columns:[
        //         {title: "id"},
        //         {title: "name"},
        //         {title: "age"},
        //         {title: "age1"},
        //         {title: "age2"}
        //     ]
        //     // serverSide: true,
        //     // autoWidth: false,
        //     // ajax: {
        //     //     url: "/rain/getRainInfo",
        //     //     type: "post",
        //     //     // data: function (d) {
        //     //     //     var from = $("#ssyqfrom1").val()+$("#fromTime").val()+":00:00";
        //     //     //     var to = $("#ssyqfrom2").val()+$("#toTime").val()+":00:00";
        //     //     //
        //     //     //     // var fromTime = $("#fromTime").val();
        //     //     //     // var toTime = $("#toTime").val();
        //     //     //
        //     //     //     var rainfall=getRainfall();
        //     //     //
        //     //     //     d.fromTime = from;//起始时间
        //     //     //     d.toTime = to;//结束时间
        //     //     //
        //     //     //     d.minRain = rainfall[0];//最小雨量
        //     //     //     d.maxRain = rainfall[1];//最大雨量
        //     //     //     // d.minRain = 0;
        //     //     //
        //     //     //     return JSON.stringify(d);
        //     //     // },
        //     //     data: featureData,
        //     //     // dataSrc: ""
        //     //     dataType: "json",
        //     //     contentType: "application/json",
        // });
        $("#dialog-display").dialog("open");

    }

    /**
     * 鼠标单击事件监听处理函数
     */
    function singleclickFun(e) {
        var pixel = myMap.map.getEventPixel(e.originalEvent);
        var hit = myMap.map.hasFeatureAtPixel(pixel);
        myMap.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        //当前鼠标位置选中要素
        var feature = myMap.map.forEachFeatureAtPixel(e.pixel,
            function (feature, layer) {
                return feature;
            });
        //如果当前存在热区要素
        if (feature) {
            if (opeaType === "delete") {
                $("#dialog-delete").dialog("open"); //打开删除要素设置对话框
            }else if (opeaType === "modify") {
                // $("#dialog-modify").dialog("open");
            }
            // else if (opeaType === "select") {
            //     console.log($('#selectionChe').prop('checked'));
            //     if (!$('#selectionChe').prop('checked')) {
            //         return;
            //     }
            //     opeaType = "select";
            //     var select = new ol.interaction.Select();
            //     myMap.map.addInteraction(select);
            //     selectedFeatures = select.getFeatures();
            //
            //     myMap.pointLayer.set("type", "vector");
            //     myMap.lineStringLayer.set("type", "vector");
            //     myMap.polygonLayer.set("type", "vector");
            //
            //     selectedFeatures.push(feature);
            //     displaySelectedFea(selectedFeatures);
            // }

                currentFeature = feature; //当前绘制的要素
        }

    }


    function deleteWfs(features) {
        var WFSTSerializer = new ol.format.WFS();
        var featObject = WFSTSerializer.writeTransaction(null,
            null, features, {
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

    $('#deleteFeaWfs').on('click', function () {
        deleteWfs([selectedFeatures.item(0)]);
    });

    function addFeaWfs() {
        choice = "WFS";
        if (addDraw) {
            myMap.map.removeInteraction(addDraw);
        }
        addDraw = new ol.interaction.Draw({
            source: typeTransferWfs(addFeaType)[1].getSource(),
            type: typeTransferWfs(addFeaType)[0]
        })

        myMap.map.addInteraction(addDraw);
        addDraw.on('drawend', drawAndCallBack, this);
    }

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
    // 选择样式对话框
    $("#dialog-style").dialog({
        autoOpen: false,
        height: 300,
        width:350,
        modal: true,
        buttons:{
            "选择": function () {
                $(this).dialog("close");
                //开始绘制要素
                addFeaWfs();
            },
            "取消": function () {
                $(this).dialog("close");
                addFeaType = null;
            }
        },
        close:function () {
            $("#dialog-style").removeClass("ui-state-error");
        }
    });
    $(".leaflet-draw-edit-add").on("click", function () {
        // 清除选择
        styleTree.jstree('deselect_all');
        // 打开对话框
        $("#dialog-style").dialog('open');
    });


    /*****************************实现多边形选择功能END****************************************/
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

// })


