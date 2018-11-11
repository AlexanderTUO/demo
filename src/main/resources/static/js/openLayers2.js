// layers、target、view是地图最基本的部分，是必需的
var view = new ol.View({
    center: [0, 0],
    zoom:2
});
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    loadTileWhileAnimating:true,//默认false
    view:view
    // view: new ol.View({
    //     center: ol.proj.fromLonLat([37.41, 8.82]),
    //     zoom: 4
    // })
});
var london = new ol.proj.fromLonLat([-0.12755, 51.507222]);//伦敦的坐标

//移动到伦敦，移动时是有动画的
view.animate({
    center:london
})