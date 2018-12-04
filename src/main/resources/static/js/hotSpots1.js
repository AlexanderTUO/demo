$(document).ready(function () {
    var flashFeature;  //热区要素
    var preFeature;  //前一个热区要素
    var flag = false; //是否是同一个要素的标识
    var feature; //当前鼠标选中要素
    var draw; //绘制对象
    var geoStr = null; // 当前绘制图形的坐标串
    var currentFeature = null; //当前绘制的几何要素

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
    var vectStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.5)'
        }),
        stroke: new ol.style.Stroke({
            color: '#0099ff',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#0099ff'
            })
        })
    });

    //矢量数据源
    var vectSource = new ol.source.Vector({
    });
    //矢量图层
    var vectLayer = new ol.layer.Vector({
        source: vectSource,
        style: vectStyle,
        opacity: 0.5
    });

    // 高德地图
    var gaodeMapLayer = new ol.layer.Tile({
        source:new ol.source.XYZ({
            url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });

    //矢量数据源（热区）
    var hotSpotsSource = new ol.source.Vector({
    });
    //矢量图层（热区）
    var hotSpotsLayer = new ol.layer.Vector({
        source: hotSpotsSource,
        style: flashStyle,
        opacity: 1
    });

    var map = new ol.Map({
        layers: [
            gaodeMapLayer,
            vectLayer,  //矢量要素图层
            hotSpotsLayer  //热区绘制图层
        ],
        target: 'map', //地图容器div的ID
        view: new ol.View({
            center: [104.068, 30.664],
            projection: ol.proj.get('EPSG:4326'),
            // center: [12733048, 3571638], //地图初始中心点
            minZoom: 2,
            zoom: 10
        })
    });

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


    /**
     * 通过后台查询热区要素
     */
    function selectRegData() {
        $.ajax({
            url: '/Feature/query',
            type: "get",
            success: function (data) {
                preFeature = null;
                flag = false;
                hotSpotsSource.clear();
                hotSpotsLayer.setVisible(true);
                vectSource.clear();
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
                        vectSource.addFeature(polygon);
                    }
                }

                map.on('pointermove', pointermoveFun, this);
            }
        })
    }

    /**
     * 显示热区查询请求回调函数
     * @param {json} data 查询返回的数据
     */
    function showRegCallBack(data) {
        preFeature = null;
        flag = false;  //还原要素判断标识
        hotSpotsSource.clear(); //清空绘图层数据源
        hotSpotsLayer.setVisible(true); //显示绘图层
        vectSource.clear(); //清空矢量图层数据源

        var resultData = data.obj; //查询结果json数组
        $.each(resultData, function (i, item) {
            //解析结果集中的几何字符串，并转换为多边形的几何数组
            var polyCoords = item.geometry.split(";");
            var coordinates = new Array();
            coordinates[0] = new Array();
            for (var i = 0; i < polyCoords.length; i++) {
                coordinates[0][i] = polyCoords[i].split(",");
            }
            //创建一个新的要素，并添加到数据源中
            var feature = new ol.Feature({
                geometry: new ol.geom.Polygon(coordinates),
                name: item.name,
                id: item.ID
            });
            vectSource.addFeature(feature);
        });
        // map.on('pointermove', pointermoveFun,this); //添加鼠标移动事件监听，捕获要素时添加热区功能
    }

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
                hotSpotsLayer.setVisible(true);
                //控制添加热区要素的标识（默认为false）
                if (preFeature != null) {
                    if (preFeature === feature) {
                        flag = true; //当前鼠标选中要素与前一个选中要素相同
                    }
                    else {

                        flag = false; //当前鼠标选中要素不是前一个选中要素
                        hotSpotsSource.removeFeature(preFeature); //将前一个热区要素移除
                        preFeature = feature; //更新前一个热区要素对象
                    }
                }
                //如果当前选中要素与之前选中要素不同，在热区绘制层添加当前要素
                if (!flag) {
                    $(element).popover('destroy'); //销毁popup
                    flashFeature = feature; //当前热区要素
                    flashFeature.setStyle(flashStyle); //设置要素样式
                    hotSpotsSource.addFeature(flashFeature); //添加要素
                    hotSpotsLayer.setVisible(true); //显示热区图层
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
                hotSpotsSource.clear(); //清空热区图层数据源
                flashFeature = null; //置空热区要素
                $(element).popover('destroy'); //销毁popup
                hotSpotsLayer.setVisible(false); //隐藏热区图层
            }
        }
        else {
            $(element).popover('destroy'); //销毁popup
            hotSpotsLayer.setVisible(false); //隐藏热区图层
        }
    }


    /**
     * 绘制结束事件的回调函数，
     * @param {ol.interaction.DrawEvent} evt 绘制结束事件
     */
    function drawEndCallBack(e) {
        map.removeInteraction(draw); //移除绘制控件

        var geoType = "Polygon"; //绘制图形类型
        $("#dialog-confirm").dialog("open"); //打开属性信息设置对话框
        currentFeature = e.feature; //当前绘制的要素
        var geo = currentFeature.getGeometry(); //获取要素的几何信息
        var coordinates = geo.getCoordinates(); //获取几何坐标
        //将几何坐标拼接为字符串
        if (geoType == "Polygon") {
            geoStr = coordinates[0].join('],[');
            geoStr = "[[[" + geoStr + "]]]";
        }
        else {
            geoStr = coordinates.join(";");
        }
    }

    /**
     * 提交数据到后台保存
     * @param {string} geoData 区几何数据
     * @param {string} attData 区属性数据
     */
    function saveData( geoData, attData) {
        var geoType = "Polygon"; //绘制图形类型
        var data = {
            attr: attData,
            geometry: geoStr,
            type:geoType
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

    /**
     * 将绘制的几何数据与对话框设置的属性数据提交到后台处理
     */
    function submitData() {
        var name = $("#name").val(); //名称
        var city = $("#city").val(); //所属城市
        var attData = name + "," + city;

        if (geoStr != null) {
            saveData(geoStr, attData); //将数据提交到后台处理（保存到数据库中）
            currentFeature = null;  //置空当前绘制的几何要素
            geoStr = null; //置空当前绘制图形的geoStr
        }
        else {
            alert("未得到绘制图形几何信息！");
            vectLayer.getSource().removeFeature(currentFeature); //删除当前绘制图形
        }
    }

    // 初始化绘制热区要素信息设置对话框
    $("#dialog-confirm").dialog(
        {
            modal: true,  // 创建模式对话框
            autoOpen: false, //默认隐藏对话框
            //对话框打开时默认设置
            open: function (event, ui) {
                $(".ui-dialog-titlebar-close", $(this).parent()).hide(); //隐藏默认的关闭按钮
            },
            //对话框功能按钮
            buttons: {
                "提交": function () {
                    submitData(); //提交几何与属性信息到后台处理
                    $(this).dialog('close'); //关闭对话框

                },
                "取消": function () {
                    $(this).dialog('close'); //关闭对话框
                    vectLayer.getSource().removeFeature(currentFeature); //删除当前绘制图形
                }
            }
        });


    /**
     * 鼠标单击事件监听处理函数
     */
    function singleclickFun(e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        //当前鼠标位置选中要素
        var feature = map.forEachFeatureAtPixel(e.pixel,
            function (feature, layer) {
                return feature;
            });
        //如果当前存在热区要素
        if (feature) {
            $("#dialog-delete").dialog("open"); //打开删除要素设置对话框
            currentFeature = feature; //当前绘制的要素
        }
    }
    /**
     * 通过后台删除热区要素
     */
    function deleteData(feature) {
        var regId = feature.get('id');
        $.ajax({
            url: '/Feature/delete/'+regId,
            type: "GET",
            success: function (data) {
                alert(data);
                selectRegData();
            },
            error:function () {
                alert('删除失败');
            }
        })
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
                    deleteData(currentFeature);  //通过后台删除数据库中的热区要素数据并同时删除前端绘图
                    $(this).dialog('close'); //关闭对话框
                },
                "取消": function () {
                    $(this).dialog('close'); //关闭对话框

                }
            }
        });


    /**
     * 【显示热区】功能按钮处理函数
     */
    document.getElementById('showReg').onclick = function () {
        map.un('pointermove', pointermoveFun, this); //移除鼠标移动事件监听
        selectRegData(); //通过后台查询热区要素显示并实现热区功能
    };

    /**
     * 【绘制热区】功能按钮处理函数
     */
    document.getElementById('drawReg').onclick = function () {
        map.removeInteraction(draw); //移除绘制控件
        map.un('singleclick', singleclickFun, this); //移除鼠标单击事件监听

        //实例化交互绘制类对象并添加到地图容器中
        draw = new ol.interaction.Draw({
            source: vectLayer.getSource(), //绘制层数据源
            type: /** @type {ol.geom.GeometryType} */"Polygon"  //几何图形类型
        });
        map.addInteraction(draw);
        //添加绘制结束事件监听，在绘制结束后保存信息到数据库
        draw.on('drawend', drawEndCallBack, this);
    };

    /**
     * 【删除热区】功能按钮处理函数
     */
    document.getElementById('deleteReg').onclick = function () {
        map.un('pointermove', pointermoveFun, this); //移除鼠标移动事件监听

        map.un('singleclick', singleclickFun, this); //移除鼠标单击事件监听
        map.on('singleclick', singleclickFun, this); //添加鼠标单击事件监听
    };
})


