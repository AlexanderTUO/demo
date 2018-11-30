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

    // 鼠标移动监听事件
    function pointermoveFun(e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? "point" : '';
        if (hit) {
            var feature = map.forEachFeatureAtPixel(e.pixel,
                function (feature, layer) {
                    return feature;
                });
            // 如果要素存在
            if (feature) {
                hotSpotLayer.setVisible(true);
                // 如果选中要素与先前要素相同
                if (preFeature != null) {
                    if (preFeature === feature) {
                        flag = true;
                    } else {
                        flag = false;
                        hotSpotSource.removeFeature(preFeature);
                        preFeature = feature;
                    }
                }
                // 如果选中要素与先前要素不同
                if (!flag) {
                    $(element).popover('destroy');
                    flashFeature = feature;
                    flashFeature.setStyle(flashStyle);
                    hotSpotSource.addFeature(flashFeature);
                    hotSpotLayer.setVisible(true);
                    preFeature = flashFeature;
                }

                // 弹出pop显示信息
                popup.setPosition(e.coordinate);
                $(element).popover({
                    placement: 'top',
                    html: true,
                    content: feature.get('name')
                });
                $(element).css('width', '120px');
                $(element).popover('show');
            } else {
                hotSpotSource.clear();
                flashFeature = null;
                $(element).popover('destroy');
                hotSpotLayer.setVisible(false);
            }
        } else {
            $(element).popover('destroy');
            hotSpotLayer.setVisible(false);
        }

    }
})


