// layers、target、view是地图最基本的部分，是必需的
var view = new ol.View({
    center: [0, 0],
    zoom:2
});

// 使用必应地图
var layer1 = new ol.layer.Tile({
    visible:false,//默认true
    preload:Infinity,//正无穷大
    source:new ol.source.BingMaps({
        key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',//必填、key要自己去申请哦
        imagerySet:"road"//必填，可选值：Road、Aerial、AerialWithLabels、collinsBart、ordnanceSurvey
    })
});
var layer2 = new ol.layer.Tile({
    source:new ol.source.BingMaps({
        key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',//必填、key要自己去申请哦
        imagerySet:"AerialWithLabels"//必填，可选值：Road、Aerial、AerialWithLabels、collinsBart、ordnanceSurvey
    })
});

//vector图层
var vectorLayer = new ol.layer.Vector({
    source:new ol.source.Vector({
        url: 'gisData/geojson/countries.geojson',
        format: new ol.format.GeoJSON()
    })
})



var attribution = new ol.control.Attribution();//这是版权控件

var FullScreen = new ol.control.FullScreen();//这是全屏控件

var map = new ol.Map({
    target: 'map',
    // layers: [
    //     new ol.layer.Tile({
    //         source: new ol.source.OSM()
    //     }),
    //     // 使用 ArcGIS 图片服务器
    //     // new ol.layer.Image({
    //     //     source: new ol.source.ImageArcGISRest({
    //     //         ratio:1,
    //     //         params: {},
    //     //         url:'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer'
    //     //     })
    //     // })
    //     // 使用 ArcGIS 瓦片服务器
    //     new ol.layer.Tile({
    //         source: new ol.source.TileArcGISRest({
    //             ratio:1,
    //             params: {},
    //             url:'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer'
    //         })
    //     }),
    // ],
    // layer: [layer1, layer2],//必应地图
    layers: [vectorLayer],//矢量图层

    loadTileWhileAnimating:true,//默认false
    view:view,

    controls: [attribution, FullScreen],//如果不设置 controls ，地图会默认设置(没有看到效果喃)
    // interactions: [//交互
    //     new ol.interaction.Select(),//选择
    //
    //     new ol.interaction.DragBox({//画框
    //         condition: ol.events.condition.platformModifierKeyOnly
    //     })
    // ]

});
var london = new ol.proj.fromLonLat([-0.12755, 51.507222]);//伦敦的坐标

//移动到伦敦，移动时是有动画的
view.animate({
    center:london
})

//3秒后隐藏 layer2 显示 layer1
setTimeout(function () {
    layer1.setVisible(true);
    layer2.setVisible(false);
}, 3000);