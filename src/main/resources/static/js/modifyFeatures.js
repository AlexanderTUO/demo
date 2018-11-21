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

    // 封装一个修改控件
    var Modify = {
        init: function () {
            this.select = new ol.interaction.Select();
            map.addInteraction(this.select);

            this.modify = new ol.interaction.Modify({
                features: this.select.getFeatures()
            });
            map.addInteraction(this.modify);
            // 设置激活状态变更的事件
            this.setEvents();
        },

        setEvents: function () {
            var selectedFeatures = this.select.getFeatures();
            this.select.on('change:active',function () {
                //遍历已选择的要素，返回当前第一个要素（即要移除的要素）
                selectedFeatures.forEach(selectedFeatures.remove,
                    selectedFeatures);
            });
        },
        setActive: function (active) {
            this.select.setActive(active); //激活选择要素控件
            this.modify.setActive(active); //激活修改要素控件

        }
    }
    Modify.init();  //初始化修改控件
    Modify.setActive(true); //激活修改控件

})