$(function () {
    var map = new ol.Map({
        target: 'map',
        layer: null,
        view: new ol.View({
            projection: ol.proj.get('EPSG:3785'),
            zoom: 2,
            center:[0,0]
        })
    });
    var typeSelect = document.getElementById('type');
    var draw;
    var source = new ol.source.Vector();
    var vectorLayer = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255,255,255,0.2)'
            }),
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })

        })
    });

    map.addLayer(vectorLayer);

    //根据选择类型进行交互绘制
    function addInteraction() {

    }

    typeSelect.onchange = function (ev) {
        map.removeInteraction(draw);
        addInteraction();
    }
})