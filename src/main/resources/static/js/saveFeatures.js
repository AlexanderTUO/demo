$(document).ready(function () {
    //初始化osm地图
    var view = new ol.View({
        projection: ol.proj.get('EPSG:3785'),
        zoom: 2,
        center:[0,0]
    })
    var map = new ol.Map({
        target: 'map',
        layer: null,
        view: view
    });

    var OSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    })

    map.addLayer(OSM);

    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        fill:new ol.style.Fill({
            color: 'rgba(255,255,255,0.2)'
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill:new ol.style.Fill({
                color: '#ffcc33',
            })
        })
    })

    // 添加矢量
    var pointFeatures = new ol.Feature(new ol.geom.Point([0,0]));
    var lineFeatures = new ol.Feature(new ol.geom.LineString([[-1e7,1e6],[-1e6,3e6]]));
    var polygonFeatures = new ol.Feature(new ol.geom.Polygon([[[-3e6,-1e6],[-3e6,1e6],[-1e6,1e6],[-1e6,-1e6],[-3e6,-1e6]]]));

    var source = new ol.source.Vector({
        features:[pointFeatures,lineFeatures,polygonFeatures]
    })
    var vectorLayer = new ol.layer.Vector({
        source: source,
        style: style
    })
    map.addLayer(vectorLayer);


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
    addInteraction();

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
            geoStr = coordinates[0].join(';');
        } else {
            geoStr = coordinates.join(';')
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
    
    $("#query").click(function () {
        $.ajax({
            url: '/Feature/query',
            type: "get",
            success:function (data) {
                
            }
        })
    })
})
