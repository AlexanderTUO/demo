$(document).ready(function () {
    var flashFeature;
    var preFeature;
    var flag = false;
    var feature;
    var draw;
    var geoStr = null;
    var currentFeature = null;

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

    //绘制热区的样式
    var flashStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 102, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#cc3300',
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

    // 矢量数据源
    var VectorSource = new ol.source.Vector({
    })

    // 矢量图层
    var vectorLayer = new ol.layer.Vector({
        style: style,
        opacity: 0.5
    })
    vectorLayer.setSource(VectorSource);
    map.addLayer(vectorLayer);


    // 矢量数据源（热区）
    var hotSpotSource =new ol.source.Vector({
    })
    // 矢量图层（热区）
    var hotSpotLayer = new ol.layer.Vector({
        style: flashStyle,
        source: hotSpotSource,
        opacity: 1
    })
    map.addLayer(hotSpotLayer)

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
        map.addInteraction(draw);
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
            geoStr = coordinates.join(',');
            geoStr = "[" + geoStr + "]";
        } else if (geoType == "LineString") {
            geoStr = coordinates.join('],[');
            geoStr = "[[" + geoStr + "]]";
        } else {
            geoStr = coordinates[0].join('],[');
            geoStr = "[[[" + geoStr + "]]]";
        }
    }

    /**
     * 在地图容器中创建一个Overlay
     */
    var element = document.getElementById('popup');
    var popup = new ol.Overlay(/** @type {olx.OverlayOptions} */({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    }));
    map.addOverlay(popup);




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
            //请求成功完成后要执行的方法
            success: function (response) {
                alert(response);
            },
            error: function (err) {
                alert("执行失败");
            }
        });
    }

    function selectReg() {
        $.ajax({
            url: '/Feature/query',
            type: "get",
            success: function (data) {
                preFeature = null;
                flag = false;
                hotSpotSource.clear();
                hotSpotLayer.setVisible(true);
                VectorSource.clear();
                for (var index = 0; index < data.length; index++) {
                    var coordinate = JSON.parse(data[index].geometry);
                    // var coordinate1 = eval("("+coordinate+")");

                    // if (data[index].type == "Point") {
                    //     var point = new ol.Feature(new ol.geom.Point(coordinate));
                    //     querySource.addFeature(point);
                    // }
                    // else if (data[index].type == "LineString") {
                    //     var lineString = new ol.Feature(new ol.geom.LineString(coordinate));
                    //     querySource.addFeature(lineString);
                    // }
                    if (data[index].type == "Polygon") {
                        var polygon = new ol.Feature({
                            geometry: new ol.geom.Polygon(coordinate),
                            name: data[index].name,
                            id: data[index].id
                        });
                        VectorSource.addFeature(polygon);
                    }
                }

                map.on('pointermove',pointermoveFun,this)
            }
        })
    }

// 绑定查询按钮
    $("#showReg").click(function () {
        map.un('pointermove',pointermoveFun,this)
        selectReg();
    })



    // 鼠标移动监听事件
    // function pointermoveFun(e) {
    //     var pixel = map.getEventPixel(e.originalEvent);
    //     var hit = map.hasFeatureAtPixel(pixel);
    //     map.getTargetElement().style.cursor = hit ? "point" : '';
    //     if (hit) {
    //         var feature = map.forEachFeatureAtPixel(e.pixel,
    //             function (feature, layer) {
    //                 return feature;
    //             });
    //         // 如果要素存在
    //         if (feature) {
    //             hotSpotLayer.setVisible(true);
    //             // 如果选中要素与先前要素相同
    //             if (preFeature != null) {
    //                 if (preFeature === feature) {
    //                     flag = true;
    //                 } else {
    //                     flag = false;
    //                     hotSpotSource.removeFeature(preFeature);
    //                     preFeature = feature;
    //                 }
    //             }
    //             // 如果选中要素与先前要素不同
    //             if (!flag) {
    //                 $(element).popover('destroy');
    //                 flashFeature = feature;
    //                 flashFeature.setStyle(flashStyle);
    //                 hotSpotSource.addFeature(flashFeature);
    //                 hotSpotLayer.setVisible(true);
    //                 preFeature = flashFeature;
    //             }
    //
    //             // 弹出pop显示信息
    //             popup.setPosition(e.coordinate);
    //             $(element).popover({
    //                 placement: 'top',
    //                 html: true,
    //                 content: feature.get('name')
    //             });
    //             $(element).css('width', '120px');
    //             $(element).popover('show');
    //         } else {
    //             hotSpotSource.clear();
    //             flashFeature = null;
    //             $(element).popover('destroy');
    //             hotSpotLayer.setVisible(false);
    //         }
    //     } else {
    //         $(element).popover('destroy');
    //         hotSpotLayer.setVisible(false);
    //     }
    //
    // }
    /**
     * 鼠标移动事件监听处理函数（添加热区功能）
     */
    function pointermoveFun(e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';//改变鼠标光标状态

        if (hit) {
            //当前鼠标位置选中要素
            var feature = map.forEachFeatureAtPixel(e.pixel,
                function (feature, layer) {
                    return feature;
                });
            //如果当前存在热区要素                   
            if (feature) {
                //显示热区图层
                hotSpotLayer.setVisible(true);
                //控制添加热区要素的标识（默认为false）
                if (preFeature != null) {
                    if (preFeature === feature) {
                        flag = true; //当前鼠标选中要素与前一个选中要素相同
                    }
                    else {

                        flag = false; //当前鼠标选中要素不是前一个选中要素
                        hotSpotSource.removeFeature(preFeature); //将前一个热区要素移除
                        preFeature = feature; //更新前一个热区要素对象
                    }
                }
                //如果当前选中要素与之前选中要素不同，在热区绘制层添加当前要素
                if (!flag) {
                    $(element).popover('destroy'); //销毁popup
                    flashFeature = feature; //当前热区要素
                    flashFeature.setStyle(flashStyle); //设置要素样式
                    hotSpotSource.addFeature(flashFeature); //添加要素
                    hotSpotLayer.setVisible(true); //显示热区图层
                    preFeature = flashFeature; //更新前一个热区要素对象                           
                }
                //弹出popup显示热区信息
                popup.setPosition(e.coordinate); //设置popup的位置
                $(element).popover({
                    placement: 'top',
                    html: true,
                    content: feature.get('name')
                });
                $(element).css("width", "120px");
                $(element).popover('show'); //显示popup

            }
            else {
                hotSpotSource.clear(); //清空热区图层数据源
                flashFeature = null; //置空热区要素
                $(element).popover('destroy'); //销毁popup
                hotSpotLayer.setVisible(false); //隐藏热区图层
            }
        }
        else {
            $(element).popover('destroy'); //销毁popup
            hotSpotLayer.setVisible(false); //隐藏热区图层
        }
    }
    // 单击事件
    function singleclickFun(e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? "point" : '';

        var feature = map.forEachFeatureAtPixel(e.pixel,
            function (feature, layer) {
                return feature;
            })
        if (!feature) {
            $("#dialog-delete").dialog("open");
            currentFeature = feature;
        }
    }

    // 初始化删除要素信息设置对话框
    $("#dialog-delete").dialog(
        {
            modal: true,  // 创建模式对话框
            autoOpen: false, //默认隐藏对话框
            //对话框打开时默认设置
            open: function (event, ui) {
                $(".ui-dialog-titlebar-close", $(this).parent()).hide(); //隐藏默认的关闭按钮
            },
            //对话框功能按钮
            buttons: {
                "删除": function () {
                    deleteReg(currentFeature);  //通过后台删除数据库中的热区要素数据并同时删除前端绘图
                    $(this).dialog('close'); //关闭对话框
                },
                "取消": function () {
                    $(this).dialog('close'); //关闭对话框

                }
            }
        });

    function deleteReg(feature) {
        debugger;
        var regId = feature.get('id');
        $().ajax({
            url: 'feature/delete'+regId,
            type: "get",
            success: function (data) {
                alert(data);
            },
            error:function () {
                alert('删除失败');
            }
        })
    }

    /**
     * 【删除热区】功能按钮处理函数
     */
    document.getElementById('deleteReg').onclick = function () {
        map.un('pointermove', pointermoveFun, this); //移除鼠标移动事件监听

        map.un('singleclick', singleclickFun, this); //移除鼠标单击事件监听
        map.on('singleclick', singleclickFun, this); //添加鼠标单击事件监听
    };

    /**
     * 【绘制热区】功能按钮处理函数
     */
    document.getElementById('drawReg').onclick = function () {
        map.removeInteraction(draw); //移除绘制控件
        map.un('singleclick', singleclickFun, this); //移除鼠标单击事件监听

        //实例化交互绘制类对象并添加到地图容器中
        draw = new ol.interaction.Draw({
            source: vectorLayer.getSource(), //绘制层数据源
            type: /** @type {ol.geom.GeometryType} */"Polygon"  //几何图形类型
        });
        map.addInteraction(draw);
        //添加绘制结束事件监听，在绘制结束后保存信息到数据库
        draw.on('drawend', drawAndCallBack, this);
    };
})


