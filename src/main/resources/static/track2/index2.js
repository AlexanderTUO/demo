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
            //追踪模式
            monitor: {
                //起点坐标
                p: [],
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
                time: 200
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

            center: [],

            //地图相关属性
            MAP:{
                token: "lr5PCQfPZC5RwidnOolkLCeM-foDYCeyhh7IfyhsMLW5alYROy-ck6GU6vNenzAw",
                url: "http://www.scgis.net.cn/iMap/iMapServer/DefaultRest/services/newtianditudlg/",
                layer:{
                    //谷歌影像层
                    google_layer: new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}' //影像图
                        })
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
                            // url:'http://www.scgis.net.cn/iMap/iMapServer/DefaultRest/services/newtianditudlg/'
                            url:'http://www.scgis.net.cn/iMap/iMapServer/DefaultRest/services/newtianditudom/'
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
                    me._map()
                    me._nav();
                },
                _nav: function () {
                    //给菜单绑定点击事件
                    $("#nav").on("click",".item",function (e) {

                        console.log("currentTarget" + e.currentTarget);
                        console.log("Target" + e.target);
                        //若上个模式为轨迹回放，则提示：等待结束
                        if (me.conf.all_obj.key===3&&me.conf.all_obj.all_monitor.key) {
                            alert("请等待轨迹回放结束！");
                            return;
                        }
                        //class中含ac代表运行的菜单项
                        if (!e.currentTarget.hasClass(".ac")) {
                            // $
                            $("#nav>.item").removeClass("ac");
                            $(e.currentTarget).addClass("ac");
                        }

                        var key = $(e.currentTarget).attr("key");

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

                },

                //模式选择
                _nav_mode: function (key) {

                },

                //============最优视角
                //图最优
                _map_fit: function (data_c) {

                },
                //转向角度设置
                _map_p_rotation: function (new_p, old_p) {

                },

                //==============================各模式的实现
                /****************实时监控****************/
                _monitor: function () {

                },
                //初始化参数
                _monitor_set: function () {

                },
                //层数据
                _monitor_layer: function () {

                },
                //创建点
                _monitor_p: function () {

                },

                //开始追踪
                _monitor_init: function () {

                },

                //初始化线
                _monitor_init_line: function (new_p, old_p) {

                },

                //清除
                _monitor_clear: function () {

                },

                /****************历史轨迹****************/
                _history: function () {

                },
                _history_set: function () {

                },
                _history_layer: function () {

                },
                _history_p: function () {

                },
                _history_lines: function () {

                },
                _history_start: function () {

                },
                _history_clear: function () {

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

                },
                _all_m_set: function () {

                },
                _all_m_layer: function () {

                },
                //所有点的初始化
                _all_m_init: function () {

                },
                //添加点
                _all_m_init_marker: function () {

                },
                //添加容器
                _all_m_clear: function () {

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

                            me.conf.MAP.layer.tianditu_layer

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