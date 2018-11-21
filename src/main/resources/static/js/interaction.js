$(function () {

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
    /**
     * 用户更改绘制类型触发的事件
     * @param ev 更改事件
     */
    typeSelect.onchange = function (ev) {
        map.removeInteraction(draw);
        addInteraction();
    }

    //根据选择类型进行交互绘制
    function addInteraction() {
        var value = typeSelect.value;
        if (value !== 'None') {
            if (source == null) {
                source = new ol.source.Vector({
                    wrapX: false
                });
                vectorLayer.setSource(source);
            }
            var geometryFunction, maxPoints;
            if (value === 'Square') {
                value = 'Circle';
                geometryFunction = new ol.interaction.Draw.createRegularPolygon(4);
            }else if (value === 'Box') {
                value = 'LineString';
                maxPoints = 2;
                geometryFunction = function (coordinates, geometry) {
                    if (!geometry) {
                        geometry = new ol.geom.Polygon(null);
                    }
                    var start = coordinates[0];
                    var end = coordinates[1];
                    geometry.setCoordinates([
                        [start, [start[0], end[1]], end, [end[0], start[1]], start]
                    ]);
                    return geometry;
                }
            }
            draw = new ol.interaction.Draw({
                source: source,
                type: value,
                geometryFunction: geometryFunction,
                maxPoints: maxPoints,
            });
            map.addInteraction(draw);
        }else{
            source = null;
            vectorLayer.setSource(source);
        }
    }


})