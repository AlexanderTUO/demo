// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import GeoJSON from 'ol/format/GeoJSON';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// import {fromLonLat} from 'ol/proj';
// import OSM from 'ol/source/OSM';
// import VectorSource from 'ol/source/Vector';
// import LinearRing from 'ol/geom/LinearRing';
// import {Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon} from 'ol/geom';

// import jstslib from "../lib/jstslib/jstslib";
$(function () {
    var source = new ol.source.Vector();
    fetch('data/roads-seoul.geojson').then(function(response) {
        return response.json();
    }).then(function(json) {
        var format = new ol.format.GeoJSON();
        var features = format.readFeatures(json, {featureProjection: 'EPSG:3857'});

        // var parser = new jstslib.io.OL3Parser();
        var parser = new jsts.io.OL3Parser();
        parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon,
            ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon);

        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            // convert the OpenLayers geometry to a JSTS geometry
            var jstsGeom = parser.read(feature.getGeometry());

            // create a buffer of 40 meters around each line
            var buffered = jstsGeom.buffer(40);

            // convert back from JSTS and replace the geometry on the feature
            feature.setGeometry(parser.write(buffered));
        }

        source.addFeatures(features);
    });

    var circle = new ol.Feature({
        geometry: new ol.geom.Circle([103.12660217285156, 30.611343383789062], 0.07)
    });

    var circle2 = new ol.Feature({
        geometry: new ol.geom.Circle([103.24195861816406, 30.39093017578125], 0.07)
    });

    var xjPolygon = new ol.Feature({
        geometry: new ol.geom.Polygon([[[103.4088134765625, 30.476074218750004], [103.32229614257812, 30.47744750976563], [103.33877563476562, 30.602416992187504], [103.48434448242188, 30.607910156250004], [103.4088134765625, 30.476074218750004]]])
    });

    var bxjPolygon = new ol.Feature({
        geometry: new ol.geom.Polygon([[[104.28523063659668, 30.23317337036133],[103.4088134765625, 30.476074218750004], [104.28093910217285, 30.231628417968754], [104.28042411804199, 30.227165222167972], [104.27853584289551, 30.222358703613285], [104.27750587463379, 30.220298767089847], [104.2781925201416, 30.216865539550785], [104.27132606506348, 30.21171569824219], [104.26480293273926, 30.21549224853516], [104.26377296447754, 30.218410491943363], [104.27046775817871, 30.231628417968754], [104.26806449890137, 30.236606597900394], [104.25965309143066, 30.23866653442383], [104.25845146179199, 30.24347305297852], [104.2536449432373, 30.247764587402347], [104.24283027648926, 30.249996185302738], [104.23836708068848, 30.24742126464844], [104.23699378967285, 30.25068283081055], [104.24300193786621, 30.25566101074219], [104.24368858337402, 30.259094238281254], [104.25004005432129, 30.259265899658207], [104.2558765411377, 30.26046752929688], [104.25965309143066, 30.270080566406254], [104.26377296447754, 30.278491973876957], [104.25793647766113, 30.282783508300785], [104.24901008605957, 30.283813476562504], [104.23596382141113, 30.28141021728516], [104.22978401184082, 30.274715423583988], [104.22823905944824, 30.27986526489258], [104.2339038848877, 30.29016494750977], [104.23579216003418, 30.296001434326175], [104.23956871032715, 30.302696228027347], [104.24471855163574, 30.304927825927738], [104.24695014953613, 30.307331085205078], [104.25004005432129, 30.31848907470703], [104.24969673156738, 30.323467254638672], [104.24592018127441, 30.326557159423828], [104.24798011779785, 30.328102111816406], [104.25810813903809, 30.326557159423828], [104.26119804382324, 30.3277587890625], [104.26497459411621, 30.32878875732422], [104.26823616027832, 30.325355529785156], [104.27716255187988, 30.315227508544922], [104.28454399108887, 30.305442810058594], [104.28814888000488, 30.30303955078125], [104.29312705993652, 30.302696228027344], [104.29879188537598, 30.298404693603516], [104.29930686950684, 30.293598175048828], [104.29913520812988, 30.28484344482422], [104.2998218536377, 30.279006958007812], [104.29638862609863, 30.276260375976562], [104.29347038269043, 30.273513793945312], [104.29295539855957, 30.27059555053711], [104.29261207580566, 30.267333984375], [104.29244041442871, 30.264759063720703], [104.2946720123291, 30.260639190673828], [104.29862022399902, 30.256519317626953], [104.29587364196777, 30.25531768798828], [104.29312705993652, 30.256004333496094], [104.29106712341309, 30.252399444580078], [104.29055213928223, 30.24913787841797], [104.29278373718262, 30.250511169433594], [104.29776191711426, 30.250167846679688], [104.30085182189941, 30.248966217041016], [104.29879188537598, 30.246906280517578], [104.29518699645996, 30.246906280517578], [104.2920970916748, 30.244674682617188], [104.28900718688965, 30.23935317993164], [104.28969383239746, 30.23660659790039], [104.29072380065918, 30.234031677246094], [104.28952217102051, 30.231800079345703], [104.28746223449707, 30.231971740722656], [104.28523063659668, 30.23317337036133]]])
    });

    var parser = new jsts.io.OL3Parser();
    parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon,
        ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon);

    // var circleG = parser.read(circle.getGeometry());
    // var circle2G = parser.read(circle2.getGeometry());
    var xjPolygonG = parser.read(xjPolygon.getGeometry());
    var bxjPolygonG = parser.read(bxjPolygon.getGeometry());

    console.log(xjPolygonG.intersects(bxjPolygonG));

    source.addFeature(circle);
    source.addFeature(circle2);
    source.addFeature(xjPolygon);
    source.addFeature(bxjPolygon);

    var vectorLayer = new ol.layer.Vector({
        source: source
    });

    var rasterLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var map = new ol.Map({
        layers: [rasterLayer, vectorLayer],
        target: document.getElementById('map'),
        view: new ol.View({
            // center: ol.proj.fromLonLat([126.979293, 37.528787]),
            projection: ol.proj.get('EPSG:4326'),
            zoom: 10,
            center: [104.068, 30.664]
        })
    });
})
