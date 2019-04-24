(function ($, window) {

    // var _ = function () {
    //
    //     }
    //
    //     - function () {
    //        _.view = function () {
    //
    //        }
    //     }();
    
    
    
    // 建立构造函数CC
    function  CC(opts) {
        // 在构造函数中配置属性
        var me = this;  //将常用的全局变量存入局部变量中

        // 配置各种模式的属性
        me.conf = {

            test: {

            },
            //追踪模式
            monitor: {
                //起点坐标
                p: [104.068, 30.664],//成都
                //波动系数
                set_num: 0.05,
                //线的样式
                line_style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width: 3,
                        color: "red",
                        lineDash: [10, 10]
                    })
                }),
                //刷新时间
                time: 2000
            },

            //监控模式
            all_monitor: {
                //刷新时间
                time: 200
            },

            //历史轨迹
            history: {
                //运动标识
                move_key: false,
                //刷新时间
                time: 200
            },

            //编辑模式
            fence: {
                //模式 1：有数据 2：无数据 3：编辑模式
                mode: 2,
                icon: {
                    icon_1: {
                        icon_1: {type: 'icon', src: 'track2/img/1.png'},
                        icon_2: {type: 'icon', src: 'track2/img/2.png'},
                        icon_3: {type: 'icon', src: 'track2/img/3.png'},
                        icon_4: {type: 'icon', src: 'track2/img/4.png'},
                        icon_5: {type: 'icon', src: 'track2/img/5.png'},
                        icon_6: {type: 'icon', src: 'track2/img/6.png'},
                        icon_7: {type: 'icon', src: 'track2/img/7.png'},
                        icon_8: {type: 'icon', src: 'track2/img/8.png'},
                        icon_9: {type: 'icon', src: 'track2/img/9.png'},
                        icon_10: {type: 'icon', src: 'track2/img/10.png'},
                        icon_11: {type: 'icon', src: 'track2/img/11.png'},
                        icon_12: {type: 'icon', src: 'track2/img/12.png'},
                        icon_13: {type: 'icon', src: 'track2/img/13.png'},
                        icon_14: {type: 'icon', src: 'track2/img/14.png'},
                        icon_15: {type: 'icon', src: 'track2/img/15.png'},
                        icon_16: {type: 'icon', src: 'track2/img/16.png'},
                        car: {type: 'icon', src: 'track2/img/car.png'},
                        user: {type: 'icon', src: 'track2/img/user.png'},
                        Point: {type: 'Point', src: 'track2/img/Point.png'},
                        LineString: {type: 'LineString', src: 'track2/img/LineString.png'},
                        Circle: {type: 'Circle', src: 'track2/img/Circle.png'},
                        Polygon: {type: 'Polygon', src: 'track2/img/Polygon.png'},
                    },
                    //选择绘制模式的id
                    type_id: '',
                    //选择绘制的模式
                    type: null,
                    //选择类型后的样式
                    style: {
                        //图标样式
                        icon: null,
                        Point: new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 20,
                                stroke: new ol.style.Stroke({
                                    color: 'rgb(18,150,219)'
                                }),
                                fill: new ol.style.Fill({
                                    color: 'rgb(18,150,219)'
                                })
                            })
                        }),
                        LineString: new ol.style.Style({
                            // 线
                            stroke: new ol.style.Stroke({
                                color: 'rgb(212,35,122)',
                                width: 5
                            }),
                            // 绘制的那个标记
                            image: new ol.style.Circle({
                                radius: 5,
                                stroke: new ol.style.Stroke({
                                    color: 'rgb(212,35,122)'
                                }),
                                fill: new ol.style.Fill({
                                    color: 'rgba(255,255,255,0.6)'
                                })
                            }),
                        }),
                        Circle: new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(0,0,0,0.1)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: 'rgb(212,35,122)',
                                width: 5
                            }),
                            image: new ol.style.Circle({
                                radius: 5,
                                stroke: new ol.style.Stroke({
                                    color: 'rgb(212,35,122)'
                                }),
                                fill: new ol.style.Fill({
                                    color: 'rgba(255,255,255,0.6)'
                                })
                            })
                        }),
                        Polygon: new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(0,0,0,0.1)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: 'rgb(212,35,122)',
                                width: 5
                            }),
                            image: new ol.style.Circle({
                                radius: 5,
                                stroke: new ol.style.Stroke({
                                    color: 'rgb(212,35,122)'
                                }),
                                fill: new ol.style.Fill({
                                    color: 'rgba(255,255,255,0.6)'
                                })
                            })
                        })
                    }

                },

            },

            center: [104.068, 30.664],//成都

            //地图相关属性
            MAP:{
                token: "lr5PCQfPZC5RwidnOolkLCeM-foDYCeyhh7IfyhsMLW5alYROy-ck6GU6vNenzAw",
                url: "http://www.scgis.net.cn/iMap/iMapServer/DefaultRest/services/newtianditudlg/",
                layer:{
                    //谷歌影像层
                    google_layer: new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}' //影像图
                        }),
                        zIndex: 100
                    }),
                    //谷歌注记层
                    annotation_layer: new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}' //影像图
                        })
                    }),
                    //天地图
                    tianditu_layer:new ol.layer.Tile({
                        source:new ol.source.scgisTile({
                            token: "lr5PCQfPZC5RwidnOolkLCeM-foDYCeyhh7IfyhsMLW5alYROy-ck6GU6vNenzAw",
                            // url: "http://www.scgis.net.cn/imap/iMapServer/DefaultRest/services/SCTileMap/"
                            url:'http://www.scgis.net.cn/iMap/iMapServer/DefaultRest/services/newtianditudlg/'
                            // url:'http://www.scgis.net.cn/iMap/iMapServer/DefaultRest/services/newtianditudom/'
                        }),

                    }),
                    test_layer :new ol.layer.Vector({
                        source:new ol.source.Vector({
                            features:[
                                new ol.Feature({
                                    // geometry: ol.geom.Point(me.conf.center),
                                    geometry: new ol.geom.Point([104.068, 30.664]),

                                })
                            ]
                        }),
                        zIndex: 102,
                        style:new ol.style.Style({
                            image:new ol.style.Icon({
                                src: "images/air3.png",
                                // rotation: Math.PI*1/4
                                rotation:Math.PI*6/6-Math.atan2(0,1)
                            })
                        })
                    })


                },
                controls_extend: new ol.control.defaults({
                    attribution: true
                }).extend([
                    new ol.control.FullScreen(),
                    new ol.control.MousePosition(),
                    new ol.control.OverviewMap(),
                    new ol.control.ScaleLine({
                        units: 'metric'
                    }),
                    new ol.control.ZoomSlider(),
                    new ol.control.ZoomToExtent(),
                    new ol.control.Attribution(),
                ])
            }
        };

        //配置各种模式的相关对象，如图层，定时器等
        me.all_obj ={

            //全局模式
            key:null,

            test: {
                // 方向
                layer: null
            },

            //追踪模式
            monitor: {
                layer: null,
                //数据层
                data_c: null,
                //marker
                p_data: null,

                //定时器标识
                timer: null,
                //刷新标识
                key: true
            },

            //监控模式
            all_monitor: {
                layer: null,
                //数据层
                data_c: null,
                //marker
                p_data: null,

                //定时器标识
                timer: null,
                //刷新标识
                key: true
            },

            //历史轨迹
            history: {
                layer: null,
                //数据层
                data_c: null,
                //marker
                p_data: null,
            },

            //编辑模式
            fence:{
                layer: null,
                //数据层
                data_c: null,
                //绘画工具
                draw_tool: null,
                //编辑模式
                modify_tool: null
            }
        }


    }
    // 在原型中配置方法（公用）
    CC.prototype = {
        //定义初始化方法
        init:function () {
            //匿名函数的执行环境具有全局性，this指向window对象
            var me = this;
            me._bind();
            me._init();//可以调用,后面fn将值赋给me
        },
        // 定义私有方法,_表示“私有”
        _bind:function () {
            var me = this;
            var fn = {
                _init: function () {
                    // me._test_init();
                    me._map()
                    me._nav();
                },
                _nav: function () {
                    var key = null;
                    //给菜单绑定点击事件
                    $("#nav").on("click",".item",function (e) {

                        console.log("currentTarget" + e.currentTarget);
                        console.log("Target" + e.target);
                        //若上个模式为轨迹回放，则提示：等待结束
                        if (me.all_obj.key==3&&me.conf.history.move_key) {
                            alert("请等待轨迹回放结束！");
                            return;
                        }
                        //class中含ac代表运行的菜单项
                        if (!$(e.currentTarget).hasClass(".ac")) {
                            // $
                            $("#nav>.item").removeClass("ac");
                            $(e.currentTarget).addClass("ac");
                        }

                        key = $(e.currentTarget).attr("key");

                        //清除上个模式
                        me._nav_mode_clear();

                        // 进入模式选择
                        setTimeout(function () {
                            me._nav_mode(key);
                        }, 500);
                    })

                    // 初始时模式
                    me._nav_mode($("#nav>.item").attr("ac"));
                },

                // 模式清除
                _nav_mode_clear: function () {
                    switch (me.all_obj.key) {
                        case null:
                            break;
                        case "1":
                            console.log('_clear_monitor');
                            me._monitor_clear();
                            break;
                        case "2":
                            console.log('_clear_all_m');
                            me._all_m_clear();
                            break;
                        case "3":
                            console.log('_clear_history');
                            me._history_clear();
                            break;
                        case "4":
                            console.log('_clear_fence');
                            me._fence_clear();
                            break;
                        default:
                            break;
                    }
                },

                //模式选择
                _nav_mode: function (key) {
                    switch (key) {
                        case "1":
                            me._monitor();
                            break;
                        case "2":
                            me._all_m();
                            break;
                        case "3":
                            me._history();
                            break;
                        case "4":
                            me._fence();
                            break;
                        default:
                            break;
                    }
                    me.all_obj.key = key;
                },

                //============最优视角
                //图最优

                _map_fit: function (data_c) {

                    //获取整个容器中所有元素的最大最小经纬度，存入数组
                    var point_arr = [];
                    data_c.getFeatures().forEach(function (ele) {
                        point_arr.push(_one(ele.getGeometry()));
                    });

                    var fit_arr = point_arr[0];
                    point_arr.forEach(function (point) {
                        if (point[0] < fit_arr[0]) {
                            fit_arr[0] = point[0];
                        }
                        if (point[1] < fit_arr[1]) {
                            fit_arr[1] = point[1];
                        }
                        if (point[2] > fit_arr[2]) {
                            fit_arr[2] = point[2];
                        }
                        if (point[3] > fit_arr[3]) {
                            fit_arr[3] = point[3];
                        }
                    });

                    if (data_c.getFeatures().length == 0) {
                        return;
                    }else if (data_c.getFeatures().length == 1) {//一层Feature
                        me.map.getView().centerOn(
                            [fit_arr[0], fit_arr[1]],
                            me.map.getSize(),
                            [$(document).width() / 2, $(document).height() / 2]
                        );
                        me.map.getView().setZoom(12);
                    } else {//多层Feature
                        me.map.getView().fit(
                            fit_arr,
                            {
                                size: me.map.getSize(),
                                padding: [100, 100, 100, 100],
                                constrainResolution: false
                            }
                        )
                    }

                    /**
                     * 找出要素的最大最小经纬度
                     * @param geo
                     * @returns {*}
                     * @private
                     */
                    function _one(geo) {
                        var coor = geo.getCoordinates(),
                            type = geo.getType(),
                            one_p;

                        switch (type) {
                            case "Point":
                                one_p = [coor[0], coor[1], coor[0], coor[1]];
                                break;
                            case "Polygon":
                                var line_data = coor[0];
                                one_p = [line_data[0][0], line_data[0][1], line_data[0][0], line_data[0][1]];
                                line_data.forEach(function (point) {
                                    if (point[0] < one_p[0]) {
                                        one_p[0] = point[0];
                                    }
                                    if (point[1] < one_p[1]) {
                                        one_p[1] = point[1];
                                    }
                                    if (point[0] > one_p[2]) {
                                        one_p[2] = point[0];
                                    }
                                    if (point[1] > one_p[3]) {
                                        one_p[3] = point[1];
                                    }
                                });
                                break;
                            case "LineString":
                                one_p = [coor[0][0], coor[0][1], coor[0][0], coor[0][1]];
                                coor.forEach(function (point) {
                                    if (point[0] < one_p[0]) {
                                        one_p[0] = point[0];
                                    }
                                    if (point[1] < one_p[1]) {
                                        one_p[1] = point[1];
                                    }
                                    if (point[0] > one_p[2]) {
                                        one_p[2] = point[0];
                                    }
                                    if (point[1] > one_p[3]) {
                                        one_p[3] = point[1];
                                    }
                                });
                                break;
                            case "Circle":
                                var center = geo.getCenter();
                                one_p = [center[0], center[1], center[0], center[1]];
                                break;
                            default:
                                alert("包含错误的几何类型！");
                                break;
                        }

                        // if (type === "Point") {
                        //     one_p = [coor[0], coor[1], coor[0], coor[1]];
                        // }else if (type === "Polygon") {
                        //     var line_data = coor[0];
                        //     one_p = [line_data[0][0], line_data[0][1], line_data[0][0], line_data[0][1]];
                        //     line_data.forEach(function (point) {
                        //         if (point[0] < one_p[0]) {
                        //             one_p[0] = point[0];
                        //         }
                        //         if (point[1] < one_p[1]) {
                        //             one_p[1] = point[1];
                        //         }
                        //         if (point[0] > one_p[2]) {
                        //             one_p[2] = point[0];
                        //         }
                        //         if (point[0] > one_p[3]) {
                        //             one_p[3] = point[0];
                        //         }
                        //     });
                        // }else if (type === "LineString") {
                        //     one_p = [coor[0][0], coor[0][1], coor[0][0], coor[0][1]];
                        //     coor.forEach(function (point) {
                        //         if (point[0] < one_p[0]) {
                        //             one_p[0] = point[0];
                        //         }
                        //         if (point[1] < one_p[1]) {
                        //             one_p[1] = point[1];
                        //         }
                        //         if (point[0] > one_p[2]) {
                        //             one_p[2] = point[0];
                        //         }
                        //         if (point[0] > one_p[3]) {
                        //             one_p[3] = point[0];
                        //         }
                        //     });
                        // }else if (type === "Circle") {
                        //     var center = geo.getCenter();
                        //     one_p = [center[0], center[1], center[0], center[1]];
                        // }
                        return one_p;
                    }

                    //遍历数组，得到最大最小经纬度

                    //根据所含元素类型（点线面），设置对应的视图范围

                },
                // 转向角度设置
                _map_p_rotation: function (new_p, old_p) {
                    // return Math.atan2(old_p[1] - new_p[1], old_p[0] - new_p[0]);

                    var pi_90 = Math.atan2(1, 0);
                    // 当前点的PI值
                    var pi_ac = Math.atan2(new_p[1] - old_p[1], new_p[0] - old_p[0]);

                    return pi_90 - pi_ac;
                },

                //==============================各模式的实现
                /****************实时监控****************/
                _monitor: function () {
                    me._monitor_set();
                    me._monitor_layer();
                    me._monitor_p();
                    me._monitor_init();
                },
                //初始化参数
                _monitor_set: function () {
                    me.all_obj.monitor.key = true;
                },
                //层数据
                _monitor_layer: function () {

                    me.all_obj.monitor.layer = new ol.layer.Vector();

                    me.all_obj.monitor.data_c = new ol.source.Vector();

                    me.all_obj.monitor.layer.setSource(me.all_obj.monitor.data_c);

                    me.map.addLayer(me.all_obj.monitor.layer);
                },
                //创建点
                _monitor_p: function () {
                    var p_data = new ol.Feature({
                        geometry: new ol.geom.Point(me.conf.monitor.p)
                    });

                    p_data.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            src: "images/air2.png",
                            anchor: [0.5, 0.5],
                            rotateWithView: true,
                            scale: 1

                        }),
                        text: new ol.style.Text({
                            //对齐方式
                            textAlign: "center",

                            //基准线
                            textBaseLine: "middle",
                            offsetY: -30,

                            //字体
                            font: "normal 16px 黑体",
                            //内容
                            text: "name:tyk",


                            //内容填充
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,255,1)'
                            }),
                            padding: [5, 5, 5, 5],

                            //背景填充
                            backgroundFill: new ol.style.Fill({
                                color: 'rgba(0,0,255,0.6)'
                            })


                        })
                    }));

                    me.all_obj.monitor.data_c.addFeature(p_data);

                    me.all_obj.monitor.p_data = p_data;

                    // 视角调优
                    me._map_fit(me.all_obj.monitor.data_c);
                },

                //开始追踪
                _monitor_init: function () {
                    var old_p = null,
                        new_p = [0, 0];

                    old_p = me.all_obj.monitor.p_data.getGeometry().flatCoordinates;
                    //造数据
                    if (Math.random() > 0.5) {
                        new_p[0] = old_p[0] + Math.random() * me.conf.monitor.set_num;
                    } else {
                        new_p[0] = old_p[0] - Math.random() * me.conf.monitor.set_num;
                    }


                    if (Math.random() > 0.5) {
                        new_p[1] = old_p[1] + Math.random() * me.conf.monitor.set_num;
                    } else {
                        new_p[1] = old_p[1] - Math.random() * me.conf.monitor.set_num;
                    }



                    //使用定时器实时追踪数据
                    me.all_obj.monitor.timer = setTimeout(function () {


                        if (me.all_obj.monitor.key) {
                            //调整图片方向
                            me.all_obj.monitor.p_data.setGeometry(new ol.geom.Point(new_p));

                            me.all_obj.monitor.p_data.getStyle().getImage().setRotation(me._map_p_rotation(new_p, old_p));
                            //绘制路线
                            me._monitor_init_line(new_p, old_p);

                            //由于使用的是setTimeOut定时器，所以得给定条件嵌套调用
                            me._monitor_init();

                            console.log('_monitor_init');
                        }

                    }, me.conf.monitor.time);
                },

                //初始化线
                _monitor_init_line: function (new_p, old_p) {
                    var line_data = new ol.Feature({
                        geometry: new ol.geom.LineString([new_p, old_p])
                    });

                    line_data.setStyle(me.conf.monitor.line_style);

                    me.all_obj.monitor.data_c.addFeature(line_data);

                },

                //清除
                _monitor_clear: function () {

                    //清除定时器,关闭开关
                    clearTimeout(me.all_obj.monitor.timer);
                    me.all_obj.monitor.key = false;

                    //清除source
                    me.all_obj.monitor.data_c.clear();

                    //清除layer
                    me.map.removeLayer(me.all_obj.monitor.layer);


                },

                /****************历史轨迹****************/
                _history: function () {
                    me._history_set();
                    me._history_layer();
                    me._history_p();
                    me._history_lines();
                    me._history_set();
                    // 视角调优
                    me._map_fit(me.all_obj.history.data_c);
                },
                _history_set: function () {
                    // me.all_obj.history.key = true;
                    //添加开始按钮，并绑定开始事件
                    $("#tool")
                        .show()
                        .html("<div id='his_s' class='item his_s'>开始</div>")
                        .off()
                        .on("click","#his_s",function (e) {
                            $("#his_s").hide();
                            //打开开关
                            me.conf.history.move_key = true;

                            me._history_start(0);
                        })
                },
                _history_layer: function () {
                    //添加点、线图层
                    me.all_obj.history.layer = new ol.layer.Vector();

                    me.all_obj.history.data_c = new ol.source.Vector();

                    me.all_obj.history.layer.setSource(me.all_obj.history.data_c);

                    me.map.addLayer(me.all_obj.history.layer);
                },
                _history_p: function () {
                    // 定义点feature
                    var p_data = new ol.Feature({
                        geometry: new ol.geom.Point(lines_arr[0])
                    });
                    p_data.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            src: "images/air2.png",
                            anchor: [0.5, 0.5],
                            rotateWithView: true,
                            scale: 1

                        }),
                        text: new ol.style.Text({
                            //对齐方式
                            textAlign: "center",

                            //基准线
                            textBaseLine: "middle",
                            offsetY: -30,

                            //字体
                            font: "normal 16px 黑体",
                            //内容
                            text: "name:tyk",


                            //内容填充
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,255,1)'
                            }),
                            padding: [5, 5, 5, 5],

                            //背景填充
                            backgroundFill: new ol.style.Fill({
                                color: 'rgba(0,0,255,0.6)'
                            })


                        })
                    }));

                    me.all_obj.history.data_c.addFeature(p_data);

                    me.all_obj.history.p_data = p_data;

                },
                _history_lines: function () {
                    // 定义线feature
                    var line_data = new ol.Feature({
                        geometry: new ol.geom.LineString(lines_arr)
                    });

                    line_data.setStyle(new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            width: 3,
                            color: "rgba(255,0,0,0.8)",
                            lineDash: [10, 10]
                        })
                    }))

                    me.all_obj.history.data_c.addFeature(line_data);

                },
                _history_start: function (index) {
                    //设置定时器，定时获取数据
                    setTimeout(function () {
                        //设置条件，当index自增到数组的长度时，停止
                        if (index == lines_arr.length) {
                            //提示用户轨迹回放完毕
                            alert("轨迹回放完毕");
                            //关闭运动开关
                            me.conf.history.move_key = false;

                            //打开开始按钮，以便下次开始
                            $("#his_s").show();

                            return;
                        }
                        var old_p = me.all_obj.history.p_data.getGeometry().flatCoordinates;
                        var new_p = lines_arr[index];
                        //点位随着时间不断变化
                        me.all_obj.history.p_data.setGeometry(new ol.geom.Point(new_p));
                        me.all_obj.history.p_data.getStyle().getImage().setRotation(me._map_p_rotation(new_p, old_p));

                        me._history_start(++index);


                    }, me.conf.history.time);

                },
                _history_clear: function () {
                    //关闭开关

                    //清空source内数据
                    me.all_obj.history.data_c.clear();

                    //清除图层
                    me.map.removeLayer(me.all_obj.history.layer);

                    //隐藏工具栏
                    $("#tool").hide();


                },

                /****************围栏****************/
                _fence: function () {

                },
                _fence_layer: function () {

                },
                //初始化数据
                _fence_init: function () {

                },


                /****************实时监控****************/
                _all_m: function () {
                    me._all_m_set();
                    me._all_m_layer();
                    me._all_m_init();
                    me._map_fit(me.all_obj.all_monitor.data_c);
                },
                _all_m_set: function () {
                    me.all_obj.all_monitor.key = true;
                },
                _all_m_layer: function () {
                    me.all_obj.all_monitor.layer = new ol.layer.Vector();

                    me.all_obj.all_monitor.data_c = new ol.source.Vector();

                    me.all_obj.all_monitor.layer.setSource(me.all_obj.all_monitor.data_c);

                    me.map.addLayer(me.all_obj.all_monitor.layer);
                },
                //开始监控
                _all_m_init: function () {
                    //从后台获取数据
                    // ps_arr = ps_arr;

                    ps_arr.forEach(function (ele) {
                        if (Math.random() > 0.5) {
                            ele.state = 1;
                        } else {
                            ele.state = 0;
                        }
                    })

                    ps_arr.forEach(function (ele) {
                        me._all_m_init_marker(ele);
                    });

                    me.all_obj.all_monitor.timer = setTimeout(function () {

                        //监控marker的动态变化
                        if (me.all_obj.all_monitor.key) {

                            console.log('_all_monitor');
                            me.all_obj.all_monitor.data_c.clear();
                            me._all_m_init();
                        }

                    }, me.conf.all_monitor.time);

                },
                //添加点
                _all_m_init_marker: function (point) {

                    var p_data = new ol.Feature({
                        geometry: new ol.geom.Point(point.lonlat)
                    });
                    p_data.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            src: point.state==1?"track2/img/icon_1.png":"track2/img/icon_0.png",
                            // 注意这个，竟然是比例 左上[0,0]  左下[0,1]  右下[1，1]
                            anchor: [0.5, 1],
                            // 这个直接就可以控制大小了
                            scale: 0.5
                        }),
                        text: new ol.style.Text({
                            // 对其方式
                            textAlign: 'center',
                            // 基准线
                            textBaseline: 'middle',
                            offsetY: -70,
                            // 文字样式
                            font: 'normal 16px 黑体',
                            // 文本内容
                            text: point.name,
                            // 文本填充样式
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,255,1)'
                            }),
                            padding: [5, 15, 5, 15],
                            backgroundFill: new ol.style.Fill({
                                color: 'rgba(0,0,0,0.6)'
                            }),
                        })
                    }));

                    me.all_obj.all_monitor.data_c.addFeature(p_data);

                    me.all_obj.all_monitor.p_data = p_data;

                },
                //添加容器
                _all_m_clear: function () {
                    //清除定时器，关闭开关
                    clearTimeout(me.all_obj.all_monitor.timer);
                    me.all_obj.all_monitor.key = false;

                    //清除source
                    me.all_obj.all_monitor.data_c.clear();

                    //移除图层
                    me.map.removeLayer(me.all_obj.all_monitor.layer);
                },

                /****************地图****************/
                _map: function () {
                    me.map = new ol.Map({
                        target: "map",
                        layers: [
                            // 创建一个使用Open Street Map地图源的瓦片图层
                            // new ol.layer.Tile({ source: new ol.source.OSM() })
                            // new ol.layer.Tile({
                            //     source: new ol.source.XYZ({
                            //         url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
                            //     })
                            // })

                            // me.conf.MAP.layer.google_layer,
                            // me.conf.MAP.layer.test_layer,
                            me.conf.MAP.layer.annotation_layer

                            // me.all_obj.test.layer
                            // me.conf.MAP.layer.tianditu_layer


                        ],
                        controls: me.conf.MAP.controls_extend,
                        view: new ol.View({
                            zoom: 12,
                            projection: "EPSG:4326",
                            center: [104.068, 30.664],//成都
                        })
                    });
                }

            };

            //将fn中定义的方法赋给me
            for(var k in fn) {
                me[k] = fn[k];
            }

        }
    };

    window.CC = CC;
})(jQuery, window);