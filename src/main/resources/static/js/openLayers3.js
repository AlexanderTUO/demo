//@sourceURL=PersonLocation.js
var window_temp = {
    onbeforeunload: null,
    DEBUG_MODE: false,
    MAPLIST: null,
    MAPLIST_CACHE: {},
    MAP: null,
    MAP_LAYERS: null,
    LAYER: ['basic', 'area', 'device', 'person', 'single', 'building'],
    MAP_CTRLS: null,
    CTRLS: ['scale'],
    CURRID: null,
    FOCUSONCE: false,
    MAPINIT: false,
    MAPMODE: 0,
    HIGHLIGHT_LAYER: null,
    CURRMAP_DATA: null,
    CURRPERMAPID: null,
    SCALE: 0,
    UNIT: 0,
    HISTORY_LAYER: null,
    HISTORY_LAYER_CTL: null,
};
$(function () {
    window_temp.onbeforeunload = function (event) {
        cancelSocketHandler();
        switchMapMode(0);// 还原到正常状态 避免切换页面后出问题
    }
    initOlPlugin();
    //window_temp.DEBUG_MODE = false;
    // 地图列表 用于切换地图使用
    //window_temp.MAPLIST ;
    //window_temp.MAPLIST_CACHE={};
    //window_temp.MAP;// 地图变量
    //window_temp.MAP_LAYERS;// 图层变量
    //window_temp.LAYER=['basic','area','device','person','single'];// 基础 区域 设备 人员
    // 图层
    //window_temp.MAP_CTRLS;// 控制层
    //window_temp.CTRLS=['scale'];// 'fullscr''overview','measure','mapselect'
    //window_temp.CURRID;// 当前追踪人员id
    //window_temp.FOCUSONCE = false;
    //window_temp.MAPINIT = false;

    // 0-正常模式 1-单人实时追踪模式 2-历史轨迹播放模式
    //window_temp.MAPMODE = 0;
    switchMapMode(0);// 还原到正常状态 避免切换页面后出问题
    // 注册socket处理事件
    initSocketHandler();
    // 获取地图列表
    initMapList();
    initAllMapList();
    //initBuildingAndChildMapList();
    initSerchMapData();
    loadMapData(null, true);
    //初始化隐藏tool
    initToolAndList();
    //realdebugList();
    //echart
    //initHighCharts();
    //加x号
    tool.searchInput('#searchIcon');

});

//进行人员和设备之间的的连线
function initPersonConnectDevice(personData) {
    var datalist = personData.dataList
    if (datalist.length > 0) {
        for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].id == window_temp.CURRID) {
                monitorPersonTrace(datalist[i]);
            }
        }
    }
}

function initDsss(dataList) {
    $('#realdebugList').bootstrapTable({
        height: parseInt(getClientHeight() - 93),
        columns: [{
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'fnSn',
            title: '信号源',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'rssi',
            title: '信号强度',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'areaType',
            title: '区域类型',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'areaName',
            title: '区域名称',
            align: 'center',
            valign: 'middle',
        }],
        data: dataList,
        clickToSelect: true,
        pagination: false,
        onClickRow: function (row, element) {
            var feature = window_temp.MAP_LAYERS['line'].getSource().getFeatureById(row.fnSn);
            feature.getStyle().getStroke().setColor("yellow");
            feature.getStyle().getStroke().setWidth(5);
            window_temp.MAP_LAYERS['line'].changed();
        }
    });
}

function initToolAndList() {
    $('.ol-control.layertool').hide();
    $('.ol-control.person').hide();
}

//右侧输入框显示查询列表
function realdebugList(data) {
    if (data && data.rssis.length > 0) {
        var dataList = [];
        if (realdebugList != null || data != undefined) {
            var deviesId = data.id;
            var happenTime = data.happenTime;
            $('#devisId').text(deviesId);
            $('#happenTime').text(happenTime);
            dataList = data.rssis;
        }
        initDsss(dataList);
    }
}

//echart
var chartObj;
var xMaxTime = 10000;
var maxSizePoint = 20;

function putDataToCharts(data) {
    if (data && data.rssis.length > 0) {
        var x = (new Date(data.happenTime)).getTime();
        var chartSeries = chartObj.series;
        for (var i = 0; i < chartSeries.length; i++) {
            if (chartSeries[i].data[chartSeries[i].data.length - 1].x >= x) {
                return;
            }
            for (var j = 0; j < data.rssis.length; j++) {
                if (chartSeries[i].name == data.rssis[j].fnSn) {
                    chartSeries[i].addPoint([x, data.rssis[j].rssi], false, true);
                    break;
                }
            }
            if (chartSeries[i].data.length > 0 && (chartSeries[i].data[chartSeries[i].data.length - 1].x + xMaxTime < x)) {
                chartSeries[i].remove();
                i = i - 1;
            }
        }

        for (var i = 0; i < data.rssis.length; i++) {
            find = false;
            for (var j = 0; j < chartSeries.length; j++) {
                if (data.rssis[i].fnSn == chartSeries[j].name) {
                    find = true;
                    break;
                }
            }
            if (find == false) {
                addSeries(x, data.rssis[i]);
            }
        }
        chartObj.redraw();

    }
}
function addSeries(x, series) {
    chartObj.addSeries({
        name: series.fnSn,
        data: (function() {
            // generate an array of random data
            var data3 = [];

            for (var i = -1*(maxSizePoint -1); i < 0; i++) {
                data3.push({
                    x: x + i * 1000,
                    y: null
                });
            }
            data3.push({
                x:x,
                y:series.rssi
            });
            return data3;
        })()
    });
}

function initHighCharts() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    $('#container').highcharts({
        chart: {
            type: 'line',
            animation: Highcharts.svg, // don't animate in old IE
            events: {
                load: function () {
                    chartObj = this;
                }
            }
        },
        title: {
            text: '移动设备RSSI动态走势图'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            title: {
                text: 'RSSI信号强度(DBM)'
            },
            opposite: true,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 0);
            }
        },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        }
    });

    //chartObj.setSize($("#container").width(), getHeight());
}

//function getHeight() {
//    return $(window).height() - $('h1').outerHeight(true) - 300;
//}

function initOlPlugin() {
    /**
     * 图层控制控件
     */
    ol.control.layerTool = function (opt) {
        var options = opt || {};
        var me = this;
        me.closeClass = "unshow";
        me.layer = opt.layer;
//    me.element_ = goog.dom.createDom('DIV','layertool ol-unselectable ol-control tool' );
        me.element_ = document.createElement('div');
        me.element_.className = 'layertool ol-unselectable ol-control tool';
        me.remove = function () {
            $(me.element_).remove();
        }
        ol.control.Control.call(me, {
            element: me.element_,
            target: options.target
        });
        me.display = function (show) {
            if (show) {
                $(me.element_).find("button").removeClass(me.closeClass);
                me.layer.setVisible(true);
            } else {
                $(me.element_).find("button").addClass(me.closeClass);
                me.layer.setVisible(false);
                window_temp.MAP.removeOverlay();
            }
        }
    };
    ol.inherits(ol.control.layerTool, ol.control.Control);

    /* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 地图切换工具↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
    ol.control.mapSelectTool = function (opt_options) {
        var options = opt_options || {};
        var ele = document.createElement("div");
        ele.className = "mapselectbutton";
        ele.id = "mapselectbutton";
        ele.title = '';
        this.changeName = function (name) {
            if (window_temp.MAPLIST && window_temp.MAPLIST.length > 1) {
                $(ele).html(name + " <i class='glyphicon glyphicon-menu-down' style='margin-left:20px;'></i>")
                    .attr("title", name);
                $("#mapquickSearch").val("");
                $("#currentMapName").text(name);
            } else {
                $(ele).html(name).attr("title", name);
            }
        }
        $(ele).on('click', function () {
            if ($('#mapselect').is(":hidden")) {
                $('#mapselect').slideDown({speed: 'fast'});
                $('#showMap').show();
                $(".hisqueclose").on('click', function () {
                    $(ele).click();
                });//绑定关闭按钮事件
            } else {
                $('#mapselect').slideUp({speed: 'fast'});
                $('#showMap').hide();
            }
        });
        $(ele).on('blur', function () {
            $('#mapselect').slideUp();
        });
        //var element = goog.dom.createDom('DIV','mapselecttool ol-unselectable' ,[ele]);
        var element = document.createElement('div');
        element.className = 'mapselecttool ol-unselectable';
        element.appendChild(ele);
        this.reelementmove = function () {
            $(element).remove();
        }
        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });
    };
    ol.inherits(ol.control.mapSelectTool, ol.control.Control);
}

// 模式切换处理函数
function switchMapMode(mode) {
    var keyMode;
    keyMode = window_temp.MAPMODE * 10 + mode * 1;
    switch (keyMode) {
        case 0:// 正常模式 到正常模式
            hidePopup();
            hidePopup('areapopup');
            if (window_temp.HIGHLIGHT_LAYER) {// 高亮图层初始化
                window_temp.HIGHLIGHT_LAYER.unlight();
            }
            break;
        case 1:// 正常模式 进单人追踪模式
            //window_temp.MAP_LAYERS['person'].display(true);
            window_temp.FOCUSONCE = true;
            if (window_temp.HIGHLIGHT_LAYER) {// 高亮图层初始化
                window_temp.HIGHLIGHT_LAYER.unlight();
            }
            break;
        case 11:// 切换追踪
            window_temp.FOCUSONCE = true;
            if (window_temp.HIGHLIGHT_LAYER) {// 高亮图层初始化
                window_temp.HIGHLIGHT_LAYER.unlight();
            }
            break;
        case 10:// 单人追踪 返回正常模式
            window_temp.MAP_LAYERS['single'].layer.getSource().getSource().clear();
            window_temp.CURRID = null;
            hidePopup();
            // pullEvent('{type:1010}');
            if (window_temp.HIGHLIGHT_LAYER) {// 高亮图层初始化
                window_temp.HIGHLIGHT_LAYER.unlight();
            }
            break;
        case 2:// 正常模式进 轨迹播放模式
            // pullEvent('{type:1002}');
            break;
        case 20:// 轨迹播放 返回正常模式
            // pullEvent('{type:1001,param:'+$("#currentMapId").val()+'}');//'
            // '{type:10012}'
            break;
    }
    window_temp.MAPMODE = mode;
}

/**
 * 单个人员追踪
 */
var datamapid
function monitorPersonTrace(data) {
    datamapid=data.mapId
    var currMapId = $('#currentMapId').val();
    if(data.mapId !=currMapId){
        //window_temp.MAP_LAYERS['line'].getSource().clear();
        switchMap(data.mapId);
        $('#showEchartAndList').show()
        $('.searchClear').show()

    }
    window_temp.MAP_LAYERS['line'].getSource().clear();
    var rersonDaX = data.x;
    var rersonDaY = data.y;
    var deviceData = data.rssis;
    //画人员
    var pointfeature = new ol.Feature(new ol.geom.Point([rersonDaX, rersonDaY]));
    pointfeature.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 4,
                stroke: new ol.style.Stroke({
                    color: '#fff'
                }),
                fill: new ol.style.Fill({
                    color: '#12ff02'
                })
            })
        })
    )
    window_temp.MAP_LAYERS['line'].getSource().addFeature(pointfeature);
    //定义数组：不同信号强度显示不同的颜色
    function getStyleByLevel(rssi) {
        var colors = ["#00FF00", "#FFFF00", "#FF0000", "#0000EE"];//高 中 低 默认
        var range = [-100, -50, 50, 100];//,-40,-20,0,20];
        var ind = _.findIndex(range, function (item) {
            return rssi <= item;
        });
        if (ind == -1) {
            ind = 0;
        }
        //var width = Math.abs((100 + rssi)) / 25;
        return new ol.style.Style({
            stroke: new ol.style.Stroke({color: colors[ind], width: 3}),
            text: new ol.style.Text({
                text: rssi + "",
                stroke: new ol.style.Stroke({width: 1, color: 'rgba(255, 255, 255, 1)'}),
                font: "16px sans-serif",
                fill: new ol.style.Fill({color: 'rgba(255, 255, 255, 1)'}),
                stroke: new ol.style.Stroke({
                    color: "#fff",
                    width: 3
                }),
            })
        });
    }

    //循环划线
    for (var i = 0; i < deviceData.length; i++) {
        var feature = new ol.Feature({
            geometry: new ol.geom.LineString([[deviceData[i].longitude, deviceData[i].latitude], [rersonDaX, rersonDaY]])
        });
        feature.set('featureType', 'line');
        var rssiArr = [];
        rssiArr.push(data.rssis[i].rssi)
        feature.setStyle(getStyleByLevel(rssiArr))
        feature.setId(data.rssis[i].fnSn);
        //var lineName = data.rssis[i].rssi;
        //feature.set('lineName', lineName);
        window_temp.MAP_LAYERS['line'].getSource().addFeature(feature);
    }
    realdebugList(data);
    putDataToCharts(data);

}

/**
 * 处理后台推送消息 人员定位信息
 */
function monitorPositionData(data) {
    if (window_temp.MAPMODE == 1) {
        if (data.id == window_temp.CURRID) {
            monitorPersonTrace(data);
        }
    }
    if (!$(".layertool.person>button").hasClass("unshow")) {// 未隐藏
        if (data && data.mapId == $("#currentMapId").val() && window_temp.MAP_LAYERS && window_temp.MAP_LAYERS['person']) {
            var feature = window_temp.MAP_LAYERS['person'].layer.getSource().getSource().getFeatureById(data.id);
            if (feature) {
                window_temp.MAP_LAYERS['person'].layer.getSource().getSource().removeFeature(feature);
            }
            if (data.locationType == 2) {
                return;
            }
            var person = new ol.Feature(new ol.geom.Point([data.x, data.y]));
            person.setId(data.id);
            // person.setStyle(new ol.style.Style({image:new
            // ol.style.Icon({src:'../../../resources/image/phone_online.png'})}));
            person.setProperties(data);
            window_temp.MAP_LAYERS['person'].layer.getSource().getSource().addFeature(person);
        }
    }
}

function clearPositionData(data) {
    if (data && data.mapId == $("#currentMapId").val()) {
        // 清除人员图层
        if (window_temp.MAP_LAYERS && window_temp.MAP_LAYERS['person']) {
            var feature = window_temp.MAP_LAYERS['person'].layer.getSource().getSource().getFeatureById(data.id);
            if (feature) {
                window_temp.MAP_LAYERS['person'].layer.getSource().getSource().removeFeature(feature);
            }
        }
        // 清除单人跟踪图层
        if (data.id == window_temp.CURRID) {
            data.status = -1;
            monitorPersonTrace(data);
        }
    }
}

function mapStaticsInfo(data) {
    if (data[$("#currentMapId").val()]) {
        monitorTotalInfo(data[$("#currentMapId").val()].type);
        mapAreaStaticsInfo(data[$("#currentMapId").val()].area);
    }
}

/**
 * 处理后台推送消息 统计信息
 */
function monitorTotalInfo(data) {
    if (data) {
        $(".statistic .all").html(data.all.length).data("persons", data.all);
        $(".statistic .normalArea").html(data.normalArea.length).data("persons", data.normalArea);
        $(".statistic .powerArea").html(data.powerArea.length).data("persons", data.powerArea);
        $(".statistic .restrictArea").html(data.restrictArea.length).data("persons", data.restrictArea);
    }
}

/**
 * 区域人数统计实时响应函数
 */
function mapAreaStaticsInfo(data) {
    if (window_temp.MAPMODE == 2) {// 历史轨迹播放

    } else {
        if (data) {// 区域统计信息
            for (var key in data) {
                var feature = getFeatureById('area', key);
                //$(".statistic").data(key,data[key]);
                if (feature) {// 存在指定的区域
                    var zoom = window_temp.MAP.getView().getZoom();// window_temp.MAP.get("suitzoom")
                    var disptxt = '';
                    // if( zoom >= window_temp.MAP.get("suitzoom")){
                    if (data[key]) {
                        disptxt = data[key].length + "人";
                    } else {
                        disptxt = "0人";
                    }
                    // }
                    feature.set('person', data[key]);
                    feature.getStyle().getText().text_ = disptxt;
                }
            }
            if (window_temp.MAP_LAYERS && window_temp.MAP_LAYERS['area']) {
                window_temp.MAP_LAYERS['area'].layer.changed();// 刷新区域图层
            }
        }
    }
}

/**
 * 建筑人数统计实时响应函数
 */
function buildingInfo(data) {
    if (window_temp.MAPMODE == 2) {// 历史轨迹播放

    } else {
        if (data && data[$("#currentMapId").val()]) {// 建筑统计信息
            var buildingData = data[$("#currentMapId").val()];
            for (var key in buildingData) {
                var feature = getFeatureById('building', key);
                //$(".statistic").data(key,data[key]);
                if (feature) {// 存在指定的区域
                    var zoom = window_temp.MAP.getView().getZoom();// window_temp.MAP.get("suitzoom")
                    var disptxt = '';
                    if (zoom >= window_temp.MAP.get("suitzoom")) {
                        if (buildingData[key]) {
                            var buildMapData = buildingData[key];
                            var total = 0;
                            for (var ky in buildMapData) {
                                total = total + buildMapData[ky].count;
                            }
                            disptxt = total + "人";
                        } else {
                            disptxt = "0人";
                        }
                    }
                    feature.set('building', buildingData[key]);
                    //feature.getStyle().getText().text_ = disptxt;
                }
            }
            if (window_temp.MAP_LAYERS && window_temp.MAP_LAYERS['building']) {
                window_temp.MAP_LAYERS['building'].layer.changed();// 刷新区域图层
            }
        }
    }
}

/**
 * 高亮元素
 */
var highLightLayer = function (opts) {
    var me = this;
    me.intval;
    me.featureStyle;
    me.opts_ = opts || {};
    me.switchFlag = false;
    me.style = me.opts_.style;
    me.source = new ol.source.Vector({wrapX: false});
    me.currid;
    me.currFeature;
    me.lightStyle = {
        'stroke': '#FFFFFF',
        'fill': 'rgba(255,255,255,0.4)'
    }
    me.layer = new ol.layer.Vector({// 图层引用
        source: me.source
    });
    me.highLightFeature = function (feature, id, speed) {
        if (me.currid != id) {
            me.unlight();
            me.currid = id;
        } else {
            if (me.intval) {
                return;
            }
        }
        if (feature) {
            me.currFeature = feature;
            me.featureStyle = {}
            me.featureStyle['stroke'] = me.currFeature.getStyle().getStroke().getColor();
            if (me.currFeature.getStyle().getFill()) {
                me.featureStyle['fill'] = me.currFeature.getStyle().getFill().getColor();
            }
            me.layer.setVisible(true);
            me.intval = setInterval(function () {
                me.layer.getSource().clear();
                if (me.switchFlag = !me.switchFlag) {
                    me.currFeature.getStyle().getStroke().setColor(me.lightStyle['stroke']);
                    if (me.currFeature.getStyle().getFill())
                        me.currFeature.getStyle().getFill().setColor(me.lightStyle['fill']);
                } else {
                    me.currFeature.getStyle().getStroke().setColor(me.featureStyle['stroke']);
                    if (me.currFeature.getStyle().getFill())
                        me.currFeature.getStyle().getFill().setColor(me.featureStyle['fill']);
                }
                me.layer.getSource().addFeatures([me.currFeature]);
            }, speed || 200);
        }
    }
    me.unlight = function () {
        if (me.currFeature) {
            me.currFeature.getStyle().getStroke().setColor(me.featureStyle['stroke']);
            if (me.currFeature.getStyle().getFill())
                me.currFeature.getStyle().getFill().setColor(me.featureStyle['fill']);
        }
        me.currFeature = null;
        me.featureStyle = null;
        me.layer.setVisible(false);
        me.layer.getSource().clear();
        me.switchFlag = false;
        clearInterval(me.intval);
        me.intval = null;
    }
}

/**
 * 高亮显示区域
 */
function highlight(type, id, speed) {
    if (!window_temp.HIGHLIGHT_LAYER) {
        window_temp.HIGHLIGHT_LAYER = new highLightLayer();
        window_temp.MAP.addLayer(window_temp.HIGHLIGHT_LAYER.layer);
    }
    if (id) {
        var feature = getFeatureById(type, id);
        if (feature) {
            window_temp.HIGHLIGHT_LAYER.highLightFeature(feature, id, speed);
            if (window_temp.FOCUSONCE) {
                window_temp.FOCUSONCE = !window_temp.FOCUSONCE;
                focusTo(feature.getGeometry().getFirstCoordinate(), -1);
            }
        } else {
            window_temp.HIGHLIGHT_LAYER.unlight();
        }
    } else {
        window_temp.HIGHLIGHT_LAYER.unlight();
    }
}

/**
 * 获取指定图层 指定id元素 layer 包括缓存的 area-设备图层 person-人员定位图层 device-设备图层 basic-基础图层
 * val查询值 key查询键 返回openlayer 对象feature
 */
function getFeatureById(layer, val, key) {
    if (window_temp.MAP_LAYERS && window_temp.MAP_LAYERS[layer]) {
        var features = window_temp.MAP_LAYERS[layer].layer.getSource().getFeatures();
        if (!val) {
            return features;
        } else {
            for (var i in features) {
                if (features[i].get(key || "id") == val) {
                    return features[i];
                } else if (layer == 'person' && features[i].get("features")) {
                    var subFeatures = features[i].get("features");
                    for (var k in subFeatures) {
                        if (subFeatures[k].get(key || "id") == val) {
                            return subFeatures[k];
                        }
                    }
                }
            }
        }
    }
}

/**
 * 获取地图列表
 */
function initMapList() {
    $.ajax({
        url: getBaseURL() + 'personlocation/findAllMap',
        async: false,  // 同步
        type: 'GET',   // 请求类型
        cache: false,  // 不缓存
        dataType: 'json',
        success: function (data) {
            if (data && data.length > 0) {
                window_temp.MAPLIST = data;
                var html = '';
                var mapid, mapname;
                var currentMapId = $("#currentMapId").val();
                if (currentMapId && currentMapId != '' && currentMapId != 'null') {// 页面初始化指定显示mapid
                    mapid = currentMapId;
                } else {// 未指定限制默认列表第一个地图
                    mapid = data[0].id;
                    mapname = data[0].name;
                    $("#currentMapId").val(mapid);
                }
                for (var i in data) {
                    if (data[i].id && data[i].id == mapid) {
                        mapname = data[i].name;
                        $("#currentMapName").text(mapname);
                    }
                    html += '<li class="selectmap " title="' + data[i].name
                        + '" onclick="switchMap(\'' + data[i].id + '\',\'' + data[i].name + '\')">' + data[i].name + ' </li>';
                }
                $('#maplist').html(html);
            } else {
                /*BootstrapDialog.show({title: '系统提示',message: '未发现可加载的地图数据',
                 buttons: [{
                 label: '确定',
                 action: function(dialogItself){
                 dialogItself.close();
                 }
                 }]});*/
                showInfo("未发现可加载的地图数据!", null, null);
            }
        },
        error: function (e) {
            /*BootstrapDialog.show({title: '系统提示',message: '数据加载异常',
             buttons: [{
             label: '确定',
             action: function(dialogItself){
             dialogItself.close();
             }
             }]});*/
            showInfo("数据加载异常!", null, null);
        }
    });
    // initMapSelect();
}

/**
 * 获取地图列表
 */
function initAllMapList() {
    $.ajax({
        url: getBaseURL() + 'personlocation/findAlldMapAndFirstWord',
        async: false,  // 同步
        type: 'GET',   // 请求类型
        cache: false,  // 不缓存
        dataType: 'json',
        success: function (data) {
            if (data.message) {
                var firstWordList = data.firstWordList;
                var mapList = data.mapList;

                //拼接地图首字
                if (firstWordList && firstWordList.length > 0) {
                    var firsthtml = '';
                    for (var i in firstWordList) {
                        firsthtml += '<a style="PADDING-BOTTOM: 1px; MARGIN: 4px 4px;display: inline-block;" href="javascript:scrollToLocation(\'' + firstWordList[i].toLocaleUpperCase() + '\')">' + firstWordList[i].toLocaleUpperCase() + '</a>';
                    }
                    $('#firstWord').html(firsthtml);
                }
                //拼接地图列表
                if (mapList && mapList.length > 0) {
                    var maphtml = '<table>';
                    var lastFirstWord = '';
                    var lastBuildName = '';
                    for (var j in mapList) {
                        if (mapList[j].name.slice(0, 1).toLocaleUpperCase() != lastFirstWord) {
                            lastFirstWord = mapList[j].name.slice(0, 1).toLocaleUpperCase();
                            lastBuildName = mapList[j].name;
                            if (maphtml != '<table>') {
                                maphtml += "</td></tr>";
                            }
                            maphtml += "<tr><td style='vertical-align: top; padding: 0 14px 0 7px; font-size: 15px;'>" + lastFirstWord + "</td>";
                            maphtml += "<td style='white-space: nowrap;vertical-align: top; padding-top: 3px; padding-right: 8px;'>" + mapList[j].name + ":</td><td style='padding-top: 3px; vertical-align: top;'>";
                            maphtml += getMapHrefHtml(mapList[j]);
                        } else {
                            if (mapList[j].name != lastBuildName) {
                                lastBuildName = mapList[j].name;
                                maphtml += "</td></tr>";
                                maphtml += "<tr><td style='vertical-align: top; padding: 0 14px 0 7px; font-size: 15px;'></td>";
                                maphtml += "<td style='white-space: nowrap;vertical-align: top; padding-top: 3px; padding-right: 8px;'>" + mapList[j].name + ":</td><td style='padding-top: 3px; vertical-align: top;'>";
                                maphtml += getMapHrefHtml(mapList[j]);
                            } else {
                                maphtml += getMapHrefHtml(mapList[j]);
                            }
                        }
                    }
                    if (maphtml != '<table>') {
                        maphtml += "</td></tr></table>";
                    } else {
                        maphtml += "</table>";
                    }
                    $('#buildingMap').html(maphtml);
                }
            }
        },
        error: function (e) {
            /*BootstrapDialog.show({title: '系统提示',message: '数据加载异常',
             buttons: [{
             label: '确定',
             action: function(dialogItself){
             dialogItself.close();
             }
             }]});*/
            showInfo("数据加载异常!", null, null);
        }
    });
}

function getMapHrefHtml(map) {
    if (map.name) {
        return "<a style='line-height: 18px;display: inline-block;margin-right: 9px;' href='javascript:switchMap(" + map.id + ",&quot;" + map.name + "&quot;)' >" + map.name + "</a>";
    } else {
        return '';
    }
}

/**
 * 加载初始化指定地图
 */
function loadMapData(mapid) {
    var mapid = mapid || $("#currentMapId").val();
    if (!mapid || '' == mapid || 'null' == mapid) {
        // alert("未发现地图数据!");
        return false;
    }
    hidePopup('areapopup');
    if (!window_temp.MAPLIST_CACHE[mapid]) {
        var loadFlag = false;
        // 请求所有地图数据Map、LAYER、ELEMENT
        $.ajax({
            url: getBaseURL() + 'personlocation/findMapData/' + mapid,
            async: false,  // 同步
            type: 'GET',   // 请求类型
            cache: false,  // 不缓存
            dataType: 'json',
            success: function (data) {
                // 解析数据
                if (data && data.data) {// 通过缓存表取得的数据
                    data = data.data;
                }
                window_temp.CURRMAP_DATA = data;
                var currentMapName = data.map.name;
                $("#currentMapName").text(currentMapName);
                if (data && data['map'] && data['layer']) {
                    initMap(data);// 初始化地图
                    loadFlag = true;
                    window_temp.MAPLIST_CACHE[mapid] = data;
                } else {
                    /*BootstrapDialog.show({title: '系统提示',message: '地图数据不存在或加载不完整',
                     buttons: [{
                     label: '确定',
                     action: function(dialogItself){
                     dialogItself.close();
                     }
                     }]});*/
                    showInfo("地图数据不存在或加载不完整!", null, null);
                }
            },
            error: function (e) {
                /*BootstrapDialog.show({title: '系统提示',message: '数据加载异常',
                 buttons: [{
                 label: '确定',
                 action: function(dialogItself){
                 dialogItself.close();
                 }
                 }]});*/
                showInfo("数据加载异常!", null, null);
                window_temp.CURRMAP_DATA = null;
            }
        });
    } else {
        initMap(window_temp.MAPLIST_CACHE[mapid]);// 初始化地图
        loadFlag = true;
    }
    return loadFlag;
}

function initMap(data) {
    mapData = data['map'];// 基本信息
    layerData = data['layer'];// 图层信息
    fnsData = data['fns'];// 设备图层的FN信息 -单拎出来了
    buildingData = data['building'];

    // 初始化openlayer地图
    initOlMap(mapData);

    // 初始化业务图层LAYER,ELEMENT
    // wxh
    initPersonLayer();
    initSingleLayer();
    initAreaLayer(layerData);
    initDeviceLayer(fnsData, mapData);
    initBuildingLayer(buildingData);
    //创建一个线图层
    var lineLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: []
        })
    });
    window_temp.MAP_LAYERS['line'] = lineLayer;
    lineLayer.setZIndex(6);
    window_temp.MAP.addLayer(lineLayer);

    // 初始化地图控件
    initMapTool();
    // toolRefresh();
    window_temp.MAP_CTRLS['mapselect'].changeName(mapData.name);
    if (window_temp.MAP_LAYERS['device'] != undefined) {
        window_temp.MAP_LAYERS['device'].display(false);
    }
    $(".ol-attribution").remove();
}

function initAreaLayer(layerData, map) {
    if (layerData && layerData.length > 0) {
        var pointLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: []
            })
        });
        window_temp.MAP.addLayer(pointLayer);
        for (var i = 0; i < layerData.length; i++) {
            var ele = layerData[i];
            var areaFeature;
            if (ele.shapeType == "Circle") {
                var center = JSON.parse(ele.coordinate.split("@")[0]);
                var radius = ele.coordinate.split("@")[1] * 1;
                areaFeature = new ol.Feature({
                    geometry: new ol.geom.Circle(center, radius, "XY")
                });
            } else {
                areaFeature = new ol.Feature({
                    geometry: new ol.geom.Polygon([JSON.parse(ele.coordinate)])
                });
            }
            areaFeature.setStyle(JDMapVar.getAreaStyle(ele.areaTypeId));
            areaFeature.setProperties(ele);
            areaFeature.set('featureType', 'area');
            pointLayer.getSource().addFeature(areaFeature);
        }
        var tool = addLayer(pointLayer, {name: "区域图层"});// 将图层显示/隐藏热纳入控制
        window_temp.MAP.addControl(tool);
    } else {
        console.log("device data  is null");
    }
}

function initDeviceLayer(data, map) {
    //var lineArr = [];
    if (data && data.length > 0) {
        var deviceLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: []
            })
        });
        window_temp.MAP.addLayer(deviceLayer);
        for (var i in data) {
            var feature = new ol.Feature(new ol.geom.Point([data[i].longitude, data[i].latitude]));
            feature.setStyle(
                // new ol.style.Style({ image:new
                // ol.style.Icon({src:'../resources/image/FN_btn.png'}) })
                function (resolution) {
                    // var zoom =
                    // window_temp.SPIRIT_CURROMAP.getMap().getView().getZoom();//window_temp.MAP.get("suitzoom")
                    var zoom = window_temp.MAP.getView().getZoom();// window_temp.MAP.get("suitzoom")
                    if (zoom >= window_temp.MAP.get("suitzoom")) {// window_temp.SPIRIT_CURROMAP.getMap().get("suitzoom")){
                        return [new ol.style.Style({image: new ol.style.Icon({src: getBaseURL() + 'resources/image/mic_station_btn.png'})})];
                    } else {
                        return [new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 3,
                                stroke: new ol.style.Stroke({color: '#fff'}), fill: new ol.style.Fill({color: '#00f'})
                            })
                        })];
                    }
                }
            );
            feature.setProperties(data[i]);

            feature.set('featureType', 'device');
            deviceLayer.getSource().addFeature(feature);
            // window_temp.SPIRIT_CURROMAP.getLayer('device').getSource().addFeature(feature);
        }
        //var feature1 = new ol.Feature({
        //   geometry:new ol.geom.LineString(lineArr)
        //});
        //deviceLayer.getSource().addFeature(feature1);
        //var tool = addLayer(deviceLayer, {name: "设备图层"});// 将图层显示/隐藏热纳入控制
        //window_temp.MAP.addControl(tool);
    }
}

function initBuildingLayer(data) {
    if (data && data.length > 0) {
        var buildingLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: []
            })
        });
        window_temp.MAP.addLayer(buildingLayer);
        for (var i in data) {
            var feature = new ol.Feature(new ol.geom.Point([data[i].mapX, data[i].mapY]));
            feature.setStyle(
//             new ol.style.Style({image:new ol.style.Icon({src:getBaseURL()+'resources/image/building.png'}),
//                text:new ol.style.Text({text:"0人", font: "16px sans-serif", stroke: new ol.style.Stroke({width: 1})})
//             })
                function (resolution) {
                    var zoom = window_temp.MAP.getView().getZoom();// window.MAP.get("suitzoom")
                    if (zoom >= window_temp.MAP.get("suitzoom")) {
                        return [new ol.style.Style({
                            image: new ol.style.Icon({src: getBaseURL() + 'resources/image/building.png'}),
                            text: new ol.style.Text({
                                text: /*"0人"*/"",
                                font: "16px sans-serif",
                                stroke: new ol.style.Stroke({width: 1})
                            })
                        })];
                    } else {
                        return [new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 5,
                                stroke: new ol.style.Stroke({color: '#fff'}),
                                fill: new ol.style.Fill({color: '#ff0000'})
                            }),
                            text: new ol.style.Text({
                                text: "",
                                font: "16px sans-serif"
                            })
                        })];
                    }
                }
            );
            feature.setProperties(data[i]);
            feature.set('featureType', 'building');
            buildingLayer.getSource().addFeature(feature);
            // window_temp.SPIRIT_CURROMAP.getLayer('device').getSource().addFeature(feature);
        }
        var tool = addLayer(buildingLayer, {name: "建筑图层"});// 将图层显示/隐藏热纳入控制
        window_temp.MAP.addControl(tool);
    }
}

/**
 * 初始化地图核心组件
 */
function initOlMap(mapdata) {
    var projection = new ol.proj.Projection({
        code: 'EPSG:4326',// ||mapdata.code,
        extent: [mapdata.minX, mapdata.minY, mapdata.maxX, mapdata.maxY],
        units: mapdata.unit
    });

    var view = new ol.View({
        center: [mapdata.cx, mapdata.cy],
        projection: projection,
        zoom: mapdata.zoom,
        maxZoom: mapdata.maxZoom,
        minZoom: mapdata.minZoom,
        zoomFactor: 1.2
    });
    /* $("#map").html(''); */
    window_temp.SCALE = mapdata.scale;
    window_temp.UNIT = mapdata.unit;
    if (window_temp.MAP) {
        window_temp.MAPINIT = true;
        // 已存在
        clearMap();// 清空现有图层
        window_temp.MAP.setView(view);
        thisSvgResover(mapdata, view);
        window_temp.MAP.changed();
    } else {// 不存在新创建
        window_temp.MAP = new ol.Map({
            target: 'map',
            view: view,
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ]),
        });
        thisSvgResover(mapdata, view);
    }
    window_temp.MAP.setProperties({
        "suitzoom": mapdata.zoom || 5,
        "recenter": [mapdata.cx || mapdata.minX + ((mapdata.maxX - mapdata.minX) / 2),
            mapdata.cy || mapdata.minY + ((mapdata.maxY - mapdata.minY) / 2)]
    });
}

function thisSvgResover(data, view) {
    var layer = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: getBaseURL() + "module/uploads/" + data.mapUrl,
            projection: view.getProjection(),
            imageExtent: [data.minX, data.minY, data.maxX, data.maxY]
        })
    });
    layer.setZIndex(0);
    // wxh
    var tool = addLayer(layer, {name: "basic"});// 将图层显示/隐藏热纳入控制
    window_temp.MAP.addLayer(layer);
}


// 清除地图图层 控制器数据 停止定位信息处理
function clearMap() {
    for (var i in window_temp.LAYER) {// 删除图层
        if (window_temp.MAP_LAYERS[window_temp.LAYER[i]]) {
            window_temp.MAP.removeLayer(window_temp.MAP_LAYERS[window_temp.LAYER[i]].layer);
            window_temp.MAP_LAYERS[window_temp.LAYER[i]].remove();
        }
    }
    for (var i in window_temp.CTRLS) {// 删除图层
        window_temp.MAP.removeControl(window_temp.MAP_CTRLS[window_temp.CTRLS[i]]);
    }
    // window_temp.MAP_CTRLS['mapselect'].remove();

    window_temp.MAP_LAYERS = null;// 图层置空
    // window_temp.MAP_CTRLS = null;//地图控制器置空
}

// 获取当前区域人员列表
function currSearchList(id) {
    var datas = ['all'];
    var array = [];
    if (id) {
        datas = [id];
    } else {
        var result = null;
        $.ajax({
            url: getBaseURL() + 'personlocation/onlinePerson',
            async: false,  // 同步
            type: 'POST',      // 请求类型
            cache: false,  // 缓存
            dataType: 'json',
            success: function (data) {
                result = data;
                window_temp.PERSON_DATA = data;
                if (!data || data.length == 0) {
                    /*BootstrapDialog.show({
                     title: '系统提示',
                     message: '当前无在线人员!',
                     buttons: [{
                     label: '确定',
                     action: function(dialogItself){
                     dialogItself.close();
                     $(".quickSearch").removeClass("canclear");
                     hidePopup();
                     if(window_temp.MAPMODE!=0){
                     switchMapMode(0);
                     }
                     $("#personquickSearch").val(null);
                     }
                     }]
                     });*/

                    showInfo("当前无在线人员!", null, null);
                    $(".quickSearch").removeClass("canclear");
                    hidePopup();
                    if (window_temp.MAPMODE != 0) {
                        switchMapMode(0);
                    }
                    $("#personquickSearch").val(null);
                }
            },
            error: function (e) {
                console.error('在线人员信息加载失败-' + e.description);
            }
        });
        return result;
        // return data = $("#all").data("persons");
    }
    var content = '';
    for (var k in datas) {
        var data = $("#" + datas[k]).data("persons");
        if (data && data.length > 0) {
            for (var i in data) {
                content += "<li class='" + datas[k] + "-front' x='" + data[i].x + "' y='" + data[i].y + "' nameAlphabet='" + data[i].nameAlphabet + "' id='" +
                    data[i].id + "'>" + "<i class='glyphicon glyphicon-map-marker'></i> " + data[i].name + "(" + data[i].id + ")" + data[i].officeName + "</li>";
            }
        }
    }
    return content;
}

// 统计信息事件绑定
function listPersonArea(id) {
    $(".personlist")
        .val(id)
        .removeClass("normal")
        .removeClass("power")
        .removeClass("restrict")
        .addClass(id);
    var data = $("#" + id).data("persons");
    var content = "<ul >";
    var data = currSearchList(id);
    if (data != '') {
        content += data;
    } else {
        content += '<span>此区域没有人员</span>';
    }
    content += '</ul>';
    $(".personinfo").html(content);
}

// 在指定位置显示popup提示信息
// location popup显示在地图的坐标位置
// content 内容
// popid 标识
// dispPos 显示在元素的相对位置
function showPopup(loc, content, popid, dispPos) {
    popid = popid || "popup";
    var popup = window_temp.MAP.getOverlayById(popid);
    if (!popup) {
        var ele = document.createElement("div");
        ele.className = "popup";
        ele.id = popid;
        popup = new ol.Overlay({
            element: ele,
            positioning: dispPos || 'bottom-left',
            stopEvent: true,
            id: popid
        });
        window_temp.MAP.addOverlay(popup);
    }
    popup.setPosition(loc);
    popup.setVisible(true);
    var element = $('#' + popid)
    if (content) {
        $(element).html(content);
    }
    if ($(element).html()) {
        $(element).show();// slideDown('fast');
    }
}
// 隐藏指定的popup
function hidePopup(popid, keepContent) {
    popid = popid || "popup";
    if (window_temp.MAP) {
        var popup = window_temp.MAP.getOverlayById(popid);
        if (popup) {
            popup.setVisible(false);
            $("#" + popid).hide()
            if (!keepContent) {
                $("#" + popid).html(null);
            }
        }
    }
}

/**
 * 聚焦地图指定位置 按指定缩放比例
 */
function focusTo(location, zoomTo) {
    var zoom = zoomTo || (window_temp.MAP.get("suitzoom") * 1);
    var duration = 500;
    var pan = ol.animation.pan({
        duration: duration,
        source: /** @type {ol.Coordinate} */ (window_temp.MAP.getView().getCenter()),
    });
    var zooma = ol.animation.zoom({
        duration: duration,
        resolution: 1 * window_temp.MAP.getView().getResolution()
    });
    if (-1 == zoom) {
        zoom = window_temp.MAP.get("suitzoom") * 1;
        window_temp.MAP.beforeRender(pan);
    } else {
        window_temp.MAP.beforeRender(zooma, pan);
    }
    window_temp.MAP.getView().setCenter(location);
    window_temp.MAP.getView().setZoom(zoom);
}

// 工具条显示隐藏按钮
function toolToggle() {
    if ($(this).hasClass("arrow_up")) {
        $(this).removeClass("arrow_up");
        $(this).addClass("arrow_down");
        $(".ol-control, .maptool, .tool").each(function (e) {
            if (!$(this).hasClass("arrow_down") && !$(this).hasClass("person") && !$(this).hasClass("area") && !$(this).hasClass("device") && !$(this).hasClass("building")) {
                $(this).addClass("hide");
            }
        });
        $('.ol-control.layertool').hide();
        $('.ol-control.person').hide();
    } else {
        $(this).removeClass("arrow_down");
        $(this).addClass("arrow_up");
        $(".ol-control, .maptool, .tool").each(function (e) {
            $(this).show().removeClass("hide");
        });
        window_temp.MAP_CTRLS.measure.renderOver = true;
    }
}

// 地图放大按钮事件
function toolMapZoomIn() {
    var view = window_temp.MAP.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
}
// 地图缩小按钮事件
function toolMapZoomOut() {
    var view = window_temp.MAP.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
}

// 还原地图位置和缩放比例
function toolRefresh() {
    var center = window_temp.MAP.get("recenter");
    var zoom = window_temp.MAP.get("suitzoom");
    var duration = 1500;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: duration,
        source: /** @type {ol.Coordinate} */ (window_temp.MAP.getView().getCenter()),
        start: start
    });
    var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 1.1 * window_temp.MAP.getView().getResolution(),
        start: start
    });
    var zooma = ol.animation.zoom({
        duration: duration,
        resolution: 1 * window_temp.MAP.getView().getResolution(),
        start: start
    });
    window_temp.MAP.beforeRender(bounce, pan, zooma);
    window_temp.MAP.getView().setCenter(center);
    window_temp.MAP.getView().setZoom(zoom);
}

// 保存地图缩放比例和中心位置布局
function toolLayout() {
    var params = {
        mapid: $("#currentMapId").val(),
        zoom: window_temp.MAP.getView().getZoom(),
        center: window_temp.MAP.getView().getCenter()
    };
    $.ajax({
        url: getBaseURL() + 'personlocation/maplayout',
        async: true,   // 异步
        type: 'POST',      // 请求类型
        cache: false,  // 缓存
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: function (data) {
            // BootstrapDialog.show({title: '系统提示',message: '数据已保存'});
            if (window_temp.MAPLIST_CACHE && window_temp.MAPLIST_CACHE[$("#currentMapId").val()]) {
                var center = window_temp.MAP.getView().getCenter();
                var zoom = window_temp.MAP.getView().getZoom();
                window_temp.MAPLIST_CACHE[$("#currentMapId").val()].map.cx = center[0];
                window_temp.MAPLIST_CACHE[$("#currentMapId").val()].map.cy = center[1];
                window_temp.MAPLIST_CACHE[$("#currentMapId").val()].map.zoom = zoom;
            }
            /*BootstrapDialog.show({
             title: '系统提示',
             message: '数据已保存!',
             buttons: [{
             label: '确定',
             action: function(dialogItself){
             dialogItself.close();
             }
             }]
             });*/
            showInfo("数据已保存!", null, null);
            return;
        },
        error: function (e) {
            // BootstrapDialog.show({title: '系统提示',message: '数据保存失败'});
            /*BootstrapDialog.show({
             title: '系统提示',
             message: '数据保存失败!',
             buttons: [{
             label: '确定',
             action: function(dialogItself){
             dialogItself.close();
             }
             }]
             });*/
            showInfo("数据保存失败!", null, null);
            return;
        }
    });
    window_temp.MAP.setProperties({"suitzoom": params.zoom || 10});
    window_temp.MAP.setProperties({"recenter": params.center || [0, 0]});
}

//初始化所查询的所有地图数据
function initSerchMapData() {
    mapQuickSearch('mapquickSearch', '/sncp/mapManager/selectAllMap', {}, mapNameSearchSelected);
}

function mapNameSearchSelected(item) {
    var id = item.split('(')[0];
    var name = item.split("(")[1].split(")")[0];
    switchMap(id, name);
}

function mapQuickSearch(controlerId, url, params, callback) {
    mapSearch = new QuickSearch({
        initEle: false,
        input: $("#" + controlerId)[0],
        dataurl: url,
        dataparams: params,
        hintSize: 20,
        hintUpdater: function (item) {// 选中后输入框内容
            item = JSON.parse(item);
            var data = item.id + "(" + item.name + ")";
            return data;
        },
        hintDisplayText: function (item) {// 列表显示格式
            try {
                item = JSON.parse(item);
                var modal = "(" + item.name + ")";
                return modal;
            } catch (e) {
                return item;
            }
        },
        hintAfterSelect: function (item) {// 选择项目后回调函数
            callback(item);
        }
    }).show();
}

function scrollToLocation(id) {
    var mainContainer = $('#buildingMap'),
        scrollToContainer = mainContainer.find('td:contains("' + id + '")');//滚动到<div id="buildingMap">中Id名为id的最后一个span处
    mainContainer.animate({
        scrollTop: scrollToContainer.offset().top - mainContainer.offset().top + mainContainer.scrollTop()
    }, 1000);//2秒滑动到指定位置
}

function quickSearch() {
    $(".statistic >span").removeClass("active");
    $(".personlist").hide().val('');
    $(".perlistclose").unbind('click');
    $("#personquickSearch").typeahead({// 姓名手机号姓名拼音自动提示
        source: function (query, process) {
            var results = _.map(currSearchList(), function (item) {
                return JSON.stringify(item);
            });
            process(results);
        },
        autoSelect: true,
        items: 10,// 选择列表最多显示条目数
        updater: function (item) {// 选中后输入框内容
            item = JSON.parse(item);
            return item.name + "(" + item.id + ")";
        },
        displayText: function (item) {// 列表显示格式
            try {
                item = JSON.parse(item);
                return item.name + "(" + item.id + "," + item.nameAlphabet + ")";
            } catch (e) {
                return item;
            }
        },
        afterSelect: function (item) {// 选择项目后回调函数
            if (item) {
                var val = item.split('(')[1].replace(")", '');
                window_temp.CURRID = val;
                /*if (val != window_temp.CURRID) {// 追踪换人
                 window_temp.CURRID = val;
                 switchMapMode(1);
                 }*/
            }
        }
    });
    $("#personquickSearch").on('click', function (e) {// 清除追踪

        if (e.offsetX > 180) {
            $(".quickSearch").removeClass("canclear");
            e.preventDefault();
            hidePopup();
            if (window_temp.MAPMODE != 0) {
                switchMapMode(0);
            }
            $(this).val(null);
        }
    }).on('change', function (e) {

        if ($(this).val() == '' || $(this).val() == null) {
            e.preventDefault();
            hidePopup();
            if (window_temp.MAPMODE != 0) {
                switchMapMode(0);
            }
            window_temp.CURRID = null;
            window_temp.MAP_LAYERS['line'].getSource().clear();
            $('#devisId').text("");
            $('#happenTime').text("");
            $(".quickSearch").removeClass("canclear");
            $('#showEchartAndList').hide();
            $('#realdebugList').bootstrapTable('destroy');
        } else {
            $(".quickSearch").addClass("canclear");
            $('#showEchartAndList').show();
            initHighCharts();
            $('.searchClear').show()
        }

    }).on('mousemove', function (e) {
        if (e.offsetX > 180) {
            $(this).css("cursor", "pointer");
        } else {
            $(this).css("cursor", "auto");
        }
    }).on('blur', function () {
        //$('#showEchartAndList').hide();
    });
    $('.searchImg').on('click', function () {
        $('#showEchartAndList').hide();

    })
}

function initMapTool() {
    if (!window_temp.MAPINIT) {
        // 添加自定义业务操作工具栏
        var btns = [
            // 工具条显示隐藏控制钮
            {
                id: "toolbar-tool",
                tagName: 'li',
                className: 'arrow_down ctl',
                title: "工具栏",
                trigger: 'click',
                callback: toolToggle
            },
            // 地图放大按钮
            {id: "toolbar-zoomin", className: 'zoomin tool', title: '放大', trigger: 'click', callback: toolMapZoomIn},
            // 地图缩小按钮
            {id: "toolbar-zoomout", className: 'zoomout tool', title: '缩小', trigger: 'click', callback: toolMapZoomOut},
            // 地图还原位置和缩放比例
            {id: "toobar-refresh", className: 'refresh tool', title: '还原', trigger: 'click', callback: toolRefresh},
            /*// 地图位置和缩放比例保存
             {id:"toobar-layout",className:'layout tool',title:'地图视图保存',trigger:'click',callback:toolLayout},*/
            // 历史轨迹控制按钮
            {
                id: "toolbar-history",
                className: 'history tool',
                title: '轨迹回放',
                trigger: 'click',
                callback: toolHistoryPlay
            }
        ];
        for (var i in btns) {
            addBusinessTool({btns: btns[i]});// btns:btns
        }
        // 统计信息点击事件绑定
        $(".statistic >span").each(function () {
            $(this).on("click", function () {
                var id = $(this).attr("id");
                var listid = $(".personlist").val();
                var active = $(this).hasClass("active");
                if (id == listid) {
                    if (active) {
                        $(this).removeClass("active");
                        $(".personlist").hide().val('');
                        $(".perlistclose").unbind('click');
                        hidePopup();
                    }
                } else {// 不同区域
                    $(".searchBtn").removeClass("active");
                    /* $("#personquickSearch").animate({width:'-180px'}, "300"); */
                    /* $(".quickSearch").hide(); */

                    var data = $(this).data("persons");
                    if (!active) {
                        $(this).addClass("active");
                    }
                    $(".personlist").show();
                    $(".perlistclose").on('click', function () {
                        $(".personlist").hide();
                        $(".personlist >.personinfo").html('');
                    })
                    listPersonArea(id);
                }
            });
        })
        // 快速搜索按钮绑定事件
        $(".quickSearch").on('mouseover', quickSearch);
    }

    // 添加地图操作控件：导航、比例、测距、鹰眼
    addControls();

    $(".maptool.overview.tool>button").attr("title", "缩略图");
    $(".maptool.measure.tool>button").attr("title", "测距");

    if (!window_temp.MAPINIT) {
        $(".maptool>button").each(function () {
            if (!$(this).hasClass("zoomin")
                && !$(this).hasClass("zoomout")
                && !$(this).hasClass("layout")
                && !$(this).hasClass("refresh")) {
                $(this).on('click', function () {
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                    } else {
                        $(this).addClass("active");
                    }
                });
            }
        });
        $(".maptool.tool").each(function (e) {
            $(this).hide();
        });

        $(".ol-zoom, .ol-zoomslider").remove();
        // 添加地图元素事件
        addMapElementEvent();
    }
}


/**
 * 初始化基础图层和基础业务图层
 */
function initOneLayer(data) {// 绘制一个图层
    if (data.type === 'fns') {
        var features = convertToFeature(data);
        if (window_temp.MAP_LAYERS['device']) {
            if (features) {
                window_temp.MAP_LAYERS['device'].layer.getSource().addFeatures(features);
            }
        }
    } else {
        var features = convertToFeature(data);
        var layer = new ol.layer.Vector({source: new ol.source.Vector({})});
        layer.getSource().addFeatures(features);
        // layer.setProperties({"layerType":data})
        window_temp.MAP.addLayer(layer);
        var tool = addLayer(layer, data);// 将图层显示/隐藏热纳入控制
        window_temp.MAP.addControl(tool);
        /*
         * if(data.type==2){//业务图层 if(data.name!='校正图层'){ var tool =
         * addLayer(layer, data);//将图层显示/隐藏热纳入控制 window_temp.MAP.addControl(tool); }
         * }else if(data.type==1){//基础图层 var tool = addLayer(layer,
         * {name:"basic"});//将图层显示/隐藏热纳入控制 }
         */
    }
}

/**
 * 初始化人员定位图层
 */
function initPersonLayer() {
    var styleCache = {};
    var personlayer = new ol.layer.Vector({
        source: new ol.source.Cluster({
            distance: 10,
            source: new ol.source.Vector({})
        }),
        style: function (feature, resolution) {
            var size = feature.get('features').length;
            var style = styleCache[size];
            if (!style) {
                if (size == 1) {
                    style = [new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            stroke: new ol.style.Stroke({
                                color: '#fff'
                            }),
                            fill: new ol.style.Fill({
                                color: '#7FFF00'
                            })
                        })
                    })];
                } else {
                    style = [new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            stroke: new ol.style.Stroke({
                                color: '#fff'
                            }),
                            fill: new ol.style.Fill({
                                color: '#3399CC'
                            })
                        }),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: '#fff'
                            })
                        })
                    })];
                }
            } else {
                if (size == 1) {
                    var zoom = window_temp.MAP.getView().getZoom();// window_temp.MAP.get("suitzoom")
                    if (zoom >= window_temp.MAP.get("suitzoom")) {
                        style = [new ol.style.Style({image: new ol.style.Icon({src: '/sncp/resources/image/person_single.png'})})];
                    } else {
                        style = [new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 5,
                                stroke: new ol.style.Stroke({
                                    color: '#fff'
                                }),
                                fill: new ol.style.Fill({
                                    color: '#7FFF00'
                                })
                            })
                        })];
                    }
                }
            }
            styleCache[size] = style;
            return style;
        }
    });
    window_temp.MAP.addLayer(personlayer);
    var tool = addLayer(personlayer, {name: '人员图层'});// 将图层显示/隐藏热纳入控制
    window_temp.MAP.addControl(tool);
}

/**
 * 初始化单人跟踪图层
 */
function initSingleLayer() {
    var styleCache = {};
    var singlelayer = new ol.layer.Vector({
        source: new ol.source.Cluster({
            distance: 10,
            source: new ol.source.Vector({})
        }),
        style: function (feature, resolution) {
            var size = feature.get('features').length;
            var style = styleCache[size];
            if (!style) {
                if (size == 1) {
                    style = [new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            stroke: new ol.style.Stroke({
                                color: '#fff'
                            }),
                            fill: new ol.style.Fill({
                                color: '#7FFF00'
                            })
                        })
                    })];
                } else {
                    style = [new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            stroke: new ol.style.Stroke({
                                color: '#fff'
                            }),
                            fill: new ol.style.Fill({
                                color: '#3399CC'
                            })
                        }),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: '#fff'
                            })
                        })
                    })];
                }
            } else {
                if (size == 1) {
                    var zoom = window_temp.MAP.getView().getZoom();// window_temp.MAP.get("suitzoom")
                    if (zoom >= window_temp.MAP.get("suitzoom")) {
                        style = [new ol.style.Style({image: new ol.style.Icon({src: '/sncp/resources/image/person_single.png'})})];
                    } else {
                        style = [new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 5,
                                stroke: new ol.style.Stroke({
                                    color: '#fff'
                                }),
                                fill: new ol.style.Fill({
                                    color: '#7FFF00'
                                })
                            })
                        })];
                    }
                }
            }
            styleCache[size] = style;
            return style;
        }
    });
    window_temp.MAP.addLayer(singlelayer);
    addLayer(singlelayer, {name: 'single'});
}

/**
 * 私有处理元素数据为openlayers元素
 */
function convertToFeature(data) {
    var features = new Array();
    var busiType = data.type;// 图层业务类型
    if (busiType === 'fns') {
        /*
         * data = data.data; if(data){ var feature ;//元素临时变量 for(var i in data){
         * feature = new ol.Feature(new ol.geom.Point([data[i].x,data[i].y]));
         * feature.setStyle( //new ol.style.Style({ image:new
         * ol.style.Icon({src:'../resources/image/FN_btn.png'}) })
         * function(resolution){ var zoom =
         * window_temp.MAP.getView().getZoom();//window_temp.MAP.get("suitzoom") if( zoom >=
         * window_temp.MAP.get("suitzoom")){ return [new ol.style.Style({image:new
         * ol.style.Icon({src:'../resources/image/FN_btn.png'})})]; }else{
         * return [new ol.style.Style({ image: new ol.style.Circle({ radius: 3,
         * stroke: new ol.style.Stroke({color: '#fff'}),fill: new
         * ol.style.Fill({color: '#00f'}) }) })]; } } );
         * feature.setProperties(data[i]); feature.set('type','fn');
         * features.push(feature); } }
         */
        return features;
    } else {
        if (data.elements && data.elements.length > 0) {
            for (var i in data.elements) {
                var ele = data.elements[i];
                var feature = new ol.Feature({
                    geometry: new ol.geom.Polygon([JSON.parse(ele.coordinate)])
                });
                // daFeature.setStyle(JDMapVar.getAreaStyle(data.areaTypeId,"0"));
                // daFeature.set("name",data.name);
                features.push(feature);

                /*
                 * var ele = data.elements[i]; var eleType ;
                 * if(busiType==2){//业务图层元素
                 * if(ele.busiObj&&ele.busiObj.busiType){ eleType =
                 * ele.busiObj.busiType; }else{ console.log("data error"); }
                 * }else if(busiType==1){//基础图层元素 eleType =ele.type;//1-点 } var
                 * type = busiType*10+eleType;//业务图层类型和元素类型 var feature
                 * ;//元素临时变量 switch(type){ //业务元素类 case 21://区域 feature = new
                 * ol.Feature(new
                 * ol.geom.Polygon(convert(ele.coordinate,'Polygon'))); var
                 * colors = ['#f35958','#eeb559','#53cda8']; var rgbcor =
                 * ['rgba(243,89,88,0.3)','rgba(238,181,89,0.3)','rgba(83,205,168,0.3)'];//限制区,功率区,非限制区
                 * feature.setStyle( new ol.style.Style({ stroke: new
                 * ol.style.Stroke({color:colors[ele.busiObj.type*1-1],
                 * width:2}), fill: new ol.style.Fill({color:
                 * rgbcor[ele.busiObj.type*1-1]}), text: new ol.style.Text({
                 * text:"0人", offsetY:28, scale:1.4, fill: new ol.style.Fill({
                 * color: "#fff"//colors[ele.busiObj.type*1-1] }), stroke: new
                 * ol.style.Stroke({color:"#fff",//colors[ele.busiObj.type*1-1]
                 * width:1}), }) })); break; case 22://标志物 feature = new
                 * ol.Feature(new
                 * ol.geom.Point(convert(ele.coordinate,'Point'))); break; case
                 * 23://CC feature = new ol.Feature(new
                 * ol.geom.Point(convert(ele.coordinate,'Point')));
                 * //feature.setStyle(new ol.style.Style({image:new
                 * ol.style.Icon({src:'../resources/image/cc.png'})}));
                 * feature.setStyle(function(resolution){ var zoom =
                 * window_temp.MAP.getView().getZoom();//window_temp.MAP.get("suitzoom")
                 * if( zoom >= window_temp.MAP.get("suitzoom")){ return [new
                 * ol.style.Style({image:new
                 * ol.style.Icon({src:'../resources/image/CC_btn.png'})})];
                 * }else{ return [new ol.style.Style({ image: new
                 * ol.style.Circle({ radius: 6, stroke: new
                 * ol.style.Stroke({color: '#fff'}),fill: new
                 * ol.style.Fill({color: '#fff'}) }) })]; } }); break; case
                 * 24://LINE feature = new ol.Feature(new
                 * ol.geom.LineString(convert(ele.coordinate,'LineString'),'XY')) ;
                 * feature.setStyle(new ol.style.Style({ stroke: new
                 * ol.style.Stroke({ color: '#FFFFFF',//'rgba(220,200,220,0.8)'
                 * width:2 }) })); break; case 25://微基站 feature = new
                 * ol.Feature(new
                 * ol.geom.Point(convert(ele.coordinate,'Point')));
                 * feature.setStyle(function(resolution){ var zoom =
                 * window_temp.MAP.getView().getZoom();//window_temp.MAP.get("suitzoom")
                 * if( zoom >= window_temp.MAP.get("suitzoom")){ return [new
                 * ol.style.Style({image:new
                 * ol.style.Icon({src:'../resources/image/mic_station_btn.png'})})];
                 * }else{ return [new ol.style.Style({ image: new
                 * ol.style.Circle({ radius: 4, stroke: new
                 * ol.style.Stroke({color: '#fff',width:2}),fill: new
                 * ol.style.Fill({color: '#0ff'}) }) })]; } }); break; //基础图层元素
                 * case 11://点 feature = new ol.Feature(new
                 * ol.geom.Point(convert(ele.coordinate,'Point'))); break; case
                 * 12://线 feature = new ol.Feature(new
                 * ol.geom.LineString(convert(ele.coordinate,'LineString'),'XY'));
                 * feature.setStyle(new ol.style.Style({ stroke: new
                 * ol.style.Stroke({ color: '#5e9ce2'//'rgba(220,200,220,0.8)' })
                 * })); break; case 13://多边形 break;
                 *
                 * default: break; } if(feature){ if(busiType==2){//业务元素 添加业务属性
                 * feature.setProperties(ele.busiObj); } features.push(feature); }
                 */
            }
        }
        return features;
    }
}

/**
 * 转换坐标
 */
function convert(coodinates, type) {
    var result = [];
    for (var pos in coodinates) {
        result.push([coodinates[pos].x, coodinates[pos].y]);
    }
    if (type == 'Polygon') {
        return [result];
    } else if (type == "LineString") {
        return result;
    } else if (type == "Point") {
        return result[0];
    }
}

/**
 * 添加地图基础控件
 */
function addControls() {

    if (!window_temp.MAP_CTRLS) {
        window_temp.MAP_CTRLS = {};
    }
    /*
     * //缩放滑块控制器 var zoomslider = new ol.control.ZoomSlider();
     * window_temp.MAP.addControl(zoomslider);
     */

    // 比例尺控制器
    var scaleControl = new ol.control.Scale({scale: window_temp.SCALE, unit: window_temp.UNIT});
    window_temp.MAP.addControl(scaleControl);
    window_temp.MAP_CTRLS['scale'] = scaleControl;

    if (!window_temp.MAPINIT) {
        // 地图选择控制器
        mapselectControl = new ol.control.mapSelectTool();
        window_temp.MAP.addControl(mapselectControl);
        window_temp.MAP_CTRLS['mapselect'] = mapselectControl;
        //window_temp.MAP.getLayers()[0].
        //url: getBaseURL()+"module/uploads/"+data.mapUrl,
        //imageExtent: [data.minX,data.minY,data.maxX,data.maxY]
        /*var layer_temp = new ol.layer.Layer({
         source:new ol.source.ImageStatic({
         projection:window_temp.MAP.getView().getProjection(),
         url: getBaseURL()+"module/uploads/",
         imageExtent: [1,1,1,1]
         }),
         zIndex:1
         });*/
        // 缩略图控制器（1.1开放）
//    console.log(window_temp.MAP_LAYERS['basic'].layer);
//    var overviewmapControl =new ol.control.OverviewMap({
//       className: 'maptool overview tool ol-overviewmap ol-custom-overviewmap',// '',
//       layers: [window_temp.MAP_LAYERS['area'].layer],//[window_temp.MAP_LAYERS['basic'].layer],// window_temp.MAP.getLayers(),
//       collapseLabel: ' ',// '\u00BB',
//       label: ' ',// '\u00AB',
//       collapsed: true
//    });
//    window_temp.MAP.addControl(overviewmapControl);
//    window_temp.MAP_CTRLS['overview']=overviewmapControl;
        // 测量控制器
        var measureControl = new ol.control.Measure({
            tipLabel: '测距',
            scale: window_temp.SCALE,
            unit: window_temp.UNIT,
            className: 'maptool measure tool',
            label: ' ',
            collapseLabel: ' ',
            openLabel: ' ',
            zIndex: 6
        });
        window_temp.MAP.addControl(measureControl);
        window_temp.MAP_CTRLS.measure = measureControl;
        measureControl.renderOver = false;
    } else {
        window_temp.MAP_CTRLS.measure.scale_ = window_temp.SCALE;
        window_temp.MAP_CTRLS.measure.unit_ = window_temp.UNIT;
        window_temp.MAP_CTRLS.measure.renderOver = false;
//    window_temp.MAP_CTRLS.overview.ovmap_.getLayers().forEach(function(e,a,i){
//       window_temp.MAP_CTRLS.overview.ovmap_.removeLayer(e);
//    })
//    window_temp.MAP_CTRLS.overview.ovmap_.addLayer(window_temp.MAP_LAYERS['basic'].layer);
//    window_temp.MAP_CTRLS.overview.changed();
    }


    /*
     * var drawControl = new ol.control.Draw({tipLabel: '区域查询',
     * callback:areaSearch,className:'maptool area tool',label:'
     * ',collapseLabel:' ',openLabel:' '}); window_temp.MAP.addControl(drawControl);
     */

    /*
     * //全屏控制器 var fullscreenControl = new ol.control.FullScreen({tipLabel:
     * '全屏',className:'maptool fullscr tool',label:' ',collapseLabel:'
     * ',openLabel:' '}); window_temp.MAP.addControl(fullscreenControl);
     */

    if (window_temp.DEBUG_MODE) {
        if (!window_temp.MOUSE_CTRL) {
            window_temp.MOUSE_CTRL = new ol.control.MousePosition({
                coordinateFormat: function (coordinate) {
                    return ol.coordinate.format(coordinate,
                        "X:{x},Y:{y},Zoom:" + window_temp.MAP.getView().getZoom()
                        , 2);
                },
                className: 'custom-mouse-position',
                target: document.getElementById("locinfo"),
                undefinedHTML: ''
            });
            window_temp.MAP.addControl(window_temp.MOUSE_CTRL);
        }
    }

}

/**
 * 切换地图
 */
function switchMap(id, value) {
    if (id != $('#currentMapId').val()) {
        $('#currentMapId').val(id);
        window_temp.LOCAL_MAP_LAYERS = {};
        if (window_temp.MAPMODE == 1) {
            $(".quickSearch").removeClass("canclear");
            switchMapMode(0);
            $("#personquickSearch").val("");
        }
        hidePopup();
        window_temp.MAP_LAYERS['person'].layer.getSource().getSource().clear();
        //切换地图隐藏线
        window_temp.MAP_LAYERS['line'].getSource().clear();
        window_temp.CURRID = null;
        $('#showEchartAndList').hide()
        $('#devisId').text("");
        $('#happenTime').text("");
        $('#realdebugList').bootstrapTable('destroy');
        if($('#personquickSearch').val() !=undefined){
            $('.searchImg').show()
        }else {
            $('.searchImg').hide()
        }
        if (!$('#currentMapId').val() || id!=datamapid) {

            $('#personquickSearch').val(null)
            $('#showEchartAndList').hide()
            $('.searchImg').hide()
        }
        loadMapData(id, true);
        /*initOlPlugin();
         initMapTool();*/
    }
    $("#mapquickSearch").val("");
    $('#mapselect').hide();
    $('.ol-control.layertool').hide()
}
/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 地图选择工具↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 地图业务控制工具↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
/**
 * 添加地图业务工具栏
 */
function addBusinessTool(opt) {
    businessTool = function (opt_options) {
        var options = opt_options || {};
//    var element = goog.dom.createDom('DIV',
//          'maptool ol-unselectable ol-control '+opt_options.btns.className);
        var element = document.createElement('div');
        element.className = 'maptool ol-unselectable ol-control ' + opt_options.btns.className;
        var button = createToolbarBtn(options.btns);
        element.appendChild(button);
        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });

    };
    ol.inherits(businessTool, ol.control.Control);
    window_temp.MAP.addControl(new businessTool(opt));
}

function createToolbarBtn(data) {
    var ele = document.createElement("button");
    ele.className = data.className;
    ele.id = data.id;
    ele.title = data.title;
    // ele.innerHTML='';
    $(ele).on(data.trigger, data.callback);
    return ele;
}
/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 地图业务控制工具↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */
/**
 * 添加地图元素tip
 */
function addMapElementEvent() {
    window_temp.MAP.on('pointermove', function (evt) {
        if (evt.dragging || evt.type == 'click') {
            $("#mousepopup").hide();
            return;
        }
        var feature = window_temp.MAP.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });
        if (feature) {
            var content = ''
            if (feature.get("features")) {
                item = feature.get("features");
                for (var i in item) {
                    content += item[i].get("id") + "-" + item[i].get("name") + " ";
                    if (i > 0 && ((i * 1) + 1) % 5 == 0) {
                        content += "</br>";
                    }
                }
            } else {
                if ('area' == feature.get("featureType")) {
                    content = feature.get("name");
                } else if ('line' == feature.get("featureType")) {
                    content = feature.get("lineName");
                } else if ('device' == feature.get("featureType")) {
                    content = feature.get("ip") + '-' + feature.get("deviceId") + '-' + feature.get("wtpSerialNum");
                } else if ('building' == feature.get("featureType")) {
                    var data = feature.get("building");
                    var count = 0;
                    if (data) {
                        for (var i in data) {
                            count = count + data[i].count;
                        }
                    }
                    content = feature.get("name") + '-' + count + '人';
                }
            }

            if (content != '') {
                var coordinate = evt.coordinate;
                coordinate[0] = coordinate[0] + 5;
                coordinate[1] = coordinate[1] + 5;
                showPopup(coordinate, content, 'mousepopup');
            } else {
                hidePopup('mousepopup');
            }
        } else {
            $("#mousepopup").hide().html(null);
        }
    });
    window_temp.MAP.on('click', function (e) {
        if (e.dragging) {
            return;
        }
        var feature = window_temp.MAP.forEachFeatureAtPixel(e.pixel,
            function (feature, layer) {
                return feature;
            });
        if (feature) {
            if (feature.get("featureType") == 'area') {
                hidePopup('buildpopup');
                var data = feature.get("person");//$(".statistic").data(feature.get("id"));
                if (data) {
                    var item = data;
                    var content = '';
                    for (var i in item) {
                        content += item[i].name + '(' + item[i].id + ')&nbsp;&nbsp;';
                        if (i > 0 && ((i * 1) + 1) % 5 == 0) {
                            content += "</br>";
                        }
                    }
                    if (content) {
                        var coordinate = e.coordinate;
                        coordinate[0] = coordinate[0] + 5;
                        coordinate[1] = coordinate[1] + 5;
                        showPopup(coordinate, content, 'mousepopup');
                        //showPopup(feature.getGeometry().getInteriorPoint().getCoordinates(),content,'areapopup');
                    }
                }
            } else if (feature.get("featureType") == 'building') {
                hidePopup('areapopup');
                var data = feature.get("building");
                if (data) {
                    var content = '';
                    for (var i in data) {
                        content += '<a style="cursor: pointer;" onclick="selectBuildingFloor(' + data[i].id + ')">' + data[i].name + '：' + data[i].count + '人</a></br>';
                    }
                    content = '<div>' + content + '</div>';
                    if (content) {
                        showPopup(e.coordinate, content, 'buildpopup');
                    }
                }
            }
        } else {
            hidePopup('areapopup');
            hidePopup('buildpopup');
        }
    });
}

function selectBuildingFloor(mapid) {
    hidePopup('buildpopup');
    switchMap(mapid);
}

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 图层显示控制工具↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */

function addLayer(layer, data, layertype) {
    var typeClass = '';
    var tool = new ol.control.layerTool({layer: layer});
    if (data.name) {
        if (data.name == '设备图层') {
            typeClass = 'device';
            layer.setZIndex(2);
        } else if (data.name == '区域图层') {
            typeClass = 'area'
            layer.setZIndex(1);
        } else if (data.name == '人员图层') {
            typeClass = 'person'
            layer.setZIndex(4);
        } else if (data.name == '建筑图层') {
            typeClass = 'building'
            layer.setZIndex(3);
        } else if (data.name == 'basic') {
            typeClass = "basic";
            layer.setZIndex(0);
        } else if (data.name == 'single') {
            typeClass = "single";
            layer.setZIndex(5);
        }
        if (typeClass != 'basic') {// 基础图层不进行显示控制
            $(tool.element_).addClass(typeClass);
//       var button = goog.dom.createDom('button',{'type': 'button','title': data.name,className:'layertool '+typeClass} , ' ');
            var button = document.createElement('button');//goog.dom.createDom('button',{'type': 'button','title': data.name,className:'layertool '+typeClass} , ' ');
            button.className = 'layertool ' + typeClass;
            button.type = "button";
            button.title = data.name;
            button.addEventListener('click', function () {
                tool.display($(this).hasClass(tool.closeClass));
            }, false);
            $(tool.element_).append(button);
        }
        if (!window_temp.MAP_LAYERS) {
            window_temp.MAP_LAYERS = {};
        }
    }
    window_temp.MAP_LAYERS[typeClass] = tool;
    return tool;
};

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 定位数据接收及处理 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
// 初始化handler注册
function initSocketHandler() {
    window.parent.JDMC.subscribe('NUCLEAR', window.parent.JDMC.MessageType.JD_REQUEST_RSSI, initPersonConnectDevice);
    window.parent.JDMC.subscribe('NUCLEAR', window.parent.JDMC.MessageType.JD_REQUEST_LOCATION_OFF, clearPositionData);
}
function cancelSocketHandler() {
    window.parent.JDMC.unsubscribe('NUCLEAR', window.parent.JDMC.MessageType.JD_REQUEST_RSSI);
    window.parent.JDMC.unsubscribe('NUCLEAR', window.parent.JDMC.MessageType.JD_REQUEST_LOCATION_OFF);
}
/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 定位接收及处理 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */
var segmentLen = 1;
function splitTrace(startx, starty, endx, endy) {
    var points = [];
    var distance = Math.sqrt((startx - endx) * (startx - endx) + (starty - endy) * (starty - endy));
    var segmentCount = Math.floor(distance / segmentLen);
    if (segmentCount < 1) {
        return points;
    }
    var segmentX = segmentLen * Math.abs(startx - endx) / distance;
    var segmentY = segmentLen * Math.abs(starty - endy) / distance;
    for (var i = 1; i < segmentCount + 1; i++) {
        var point = {};
        (startx < endx) ? point.x = startx + segmentX * i : point.x = startx - segmentX * i;
        (starty < endy) ? point.y = starty + segmentY * i : point.y = starty - segmentY * i;
        points.push(point);
    }
    return points;
}

//重新计算表格高度
$(window).resize(function () {
    $('#realdebugList').bootstrapTable('resetView', {height: parseInt(getClientHeight() - 93)});
})