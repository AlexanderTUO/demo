    // layers、target、view是地图最基本的部分，是必需的
    var view = new ol.View({
        // center: [0, 0],
        // zoom:2
        projection: 'EPSG:4326',
        center: [115, 37],
        zoom: 6
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


    var london = new ol.proj.fromLonLat([-0.12755, 51.507222]);//伦敦的坐标

    //移动到伦敦，移动时是有动画的
    // view.animate({
    //     center:london
    // })

    //3秒后隐藏 layer2 显示 layer1
    setTimeout(function () {
        layer1.setVisible(true);
        layer2.setVisible(false);
    }, 3000);

    //轨迹回放
    // var polyline = [
    //     'hldhx@lnau`BCG_EaC??cFjAwDjF??uBlKMd@}@z@??aC^yk@z_@se@b[wFdE??wFfE}N',
    //     'fIoGxB_I\\gG}@eHoCyTmPqGaBaHOoD\\??yVrGotA|N??o[N_STiwAtEmHGeHcAkiA}^',
    //     'aMyBiHOkFNoI`CcVvM??gG^gF_@iJwC??eCcA]OoL}DwFyCaCgCcCwDcGwHsSoX??wI_E',
    //     'kUFmq@hBiOqBgTwS??iYse@gYq\\cp@ce@{vA}s@csJqaE}{@iRaqE{lBeRoIwd@_T{]_',
    //     'Ngn@{PmhEwaA{SeF_u@kQuyAw]wQeEgtAsZ}LiCarAkVwI}D??_}RcjEinPspDwSqCgs@',
    //     'sPua@_OkXaMeT_Nwk@ob@gV}TiYs[uTwXoNmT{Uyb@wNg]{Nqa@oDgNeJu_@_G}YsFw]k',
    //     'DuZyDmm@i_@uyIJe~@jCg|@nGiv@zUi_BfNqaAvIow@dEed@dCcf@r@qz@Egs@{Acu@mC',
    //     'um@yIey@gGig@cK_m@aSku@qRil@we@{mAeTej@}Tkz@cLgr@aHko@qOmcEaJw~C{w@ka',
    //     'i@qBchBq@kmBS{kDnBscBnFu_Dbc@_~QHeU`IuyDrC_}@bByp@fCyoA?qMbD}{AIkeAgB',
    //     'k_A_A{UsDke@gFej@qH{o@qGgb@qH{`@mMgm@uQus@kL{_@yOmd@ymBgwE}x@ouBwtA__',
    //     'DuhEgaKuWct@gp@cnBii@mlBa_@}|Asj@qrCg^eaC}L{dAaJ_aAiOyjByH{nAuYu`GsAw',
    //     'Xyn@ywMyOyqD{_@cfIcDe}@y@aeBJmwA`CkiAbFkhBlTgdDdPyiB`W}xDnSa}DbJyhCrX',
    //     'itAhT}x@bE}Z_@qW_Kwv@qKaaAiBgXvIm}A~JovAxCqW~WanB`XewBbK{_A`K}fBvAmi@',
    //     'xBycBeCauBoF}}@qJioAww@gjHaPopA_NurAyJku@uGmi@cDs[eRaiBkQstAsQkcByNma',
    //     'CsK_uBcJgbEw@gkB_@ypEqDoqSm@eZcDwjBoGw`BoMegBaU_`Ce_@_uBqb@ytBwkFqiT_',
    //     'fAqfEwe@mfCka@_eC_UmlB}MmaBeWkkDeHwqAoX}~DcBsZmLcxBqOwqE_DkyAuJmrJ\\o',
    //     '~CfIewG|YibQxBssB?es@qGciA}RorAoVajA_nAodD{[y`AgPqp@mKwr@ms@umEaW{dAm',
    //     'b@umAw|@ojBwzDaaJsmBwbEgdCsrFqhAihDquAi`Fux@}_Dui@_eB_u@guCuyAuiHukA_',
    //     'lKszAu|OmaA{wKm}@clHs_A_rEahCssKo\\sgBsSglAqk@yvDcS_wAyTwpBmPc|BwZknF',
    //     'oFscB_GsaDiZmyMyLgtHgQonHqT{hKaPg}Dqq@m~Hym@c`EuiBudIabB{hF{pWifx@snA',
    //     'w`GkFyVqf@y~BkoAi}Lel@wtc@}`@oaXi_C}pZsi@eqGsSuqJ|Lqeb@e]kgPcaAu}SkDw',
    //     'zGhn@gjYh\\qlNZovJieBqja@ed@siO{[ol\\kCmjMe\\isHorCmec@uLebB}EqiBaCg}',
    //     '@m@qwHrT_vFps@kkI`uAszIrpHuzYxx@e{Crw@kpDhN{wBtQarDy@knFgP_yCu\\wyCwy',
    //     'A{kHo~@omEoYmoDaEcPiuAosDagD}rO{{AsyEihCayFilLaiUqm@_bAumFo}DgqA_uByi',
    //     '@swC~AkzDlhA}xEvcBa}Cxk@ql@`rAo|@~bBq{@``Bye@djDww@z_C_cAtn@ye@nfC_eC',
    //     '|gGahH~s@w}@``Fi~FpnAooC|u@wlEaEedRlYkrPvKerBfYs}Arg@m}AtrCkzElw@gjBb',
    //     'h@woBhR{gCwGkgCc[wtCuOapAcFoh@uBy[yBgr@c@iq@o@wvEv@sp@`FajBfCaq@fIipA',
    //     'dy@ewJlUc`ExGuaBdEmbBpBssArAuqBBg}@s@g{AkB{bBif@_bYmC}r@kDgm@sPq_BuJ_',
    //     's@{X_{AsK_d@eM{d@wVgx@oWcu@??aDmOkNia@wFoSmDyMyCkPiBePwAob@XcQ|@oNdCo',
    //     'SfFwXhEmOnLi\\lbAulB`X_d@|k@au@bc@oc@bqC}{BhwDgcD`l@ed@??bL{G|a@eTje@',
    //     'oS~]cLr~Bgh@|b@}Jv}EieAlv@sPluD{z@nzA_]`|KchCtd@sPvb@wSb{@ko@f`RooQ~e',
    //     '[upZbuIolI|gFafFzu@iq@nMmJ|OeJn^{Qjh@yQhc@uJ~j@iGdd@kAp~BkBxO{@|QsAfY',
    //     'gEtYiGd]}Jpd@wRhVoNzNeK`j@ce@vgK}cJnSoSzQkVvUm^rSgc@`Uql@xIq\\vIgg@~k',
    //     'Dyq[nIir@jNoq@xNwc@fYik@tk@su@neB}uBhqEesFjoGeyHtCoD|D}Ed|@ctAbIuOzqB',
    //     '_}D~NgY`\\um@v[gm@v{Cw`G`w@o{AdjAwzBh{C}`Gpp@ypAxn@}mAfz@{bBbNia@??jI',
    //     'ab@`CuOlC}YnAcV`@_^m@aeB}@yk@YuTuBg^uCkZiGk\\yGeY}Lu_@oOsZiTe[uWi[sl@',
    //     'mo@soAauAsrBgzBqgAglAyd@ig@asAcyAklA}qAwHkGi{@s~@goAmsAyDeEirB_{B}IsJ',
    //     'uEeFymAssAkdAmhAyTcVkFeEoKiH}l@kp@wg@sj@ku@ey@uh@kj@}EsFmG}Jk^_r@_f@m',
    //     '~@ym@yjA??a@cFd@kBrCgDbAUnAcBhAyAdk@et@??kF}D??OL'
    //   ].join('');

    var routeCoords = [];

    for (var i = 0; i <=800; i++) {
        routeCoords.push([115, 37 + 0.005 * i]);
    }

    var route = new ol.geom.LineString(routeCoords);

    // var route = new ol.format.Polyline({
    //     factor: 1e6
    // }).readGeometry(polyline, {
    //     dataProjection: 'EPSG:4326',
    //     featureProjection: 'EPSG:3857'
    // });

    // var routeCoords = route.getCoordinates();
    var routeLength = routeCoords.length;

    var routeFeature = new ol.Feature({
        type: 'route',
        geometry: route
    })

    var geoMarker = new ol.Feature({
        type: 'geoMarker',
        geometry: new ol.geom.Point(routeCoords[0])
    })
    var startMarker = new ol.Feature({
        type: 'icon',
        geometry: new ol.geom.Point(routeCoords[0])
    })
    var endMarker = new ol.Feature({
        type: 'icon',
        geometry: new ol.geom.Point(routeCoords[routeLength - 1])
    })

    var styles = {
        'route':new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 6,
                color: [237, 212, 0, 0.8]
            })
        }),
        'icon':new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                scale: 0.3,
                src: 'images/circle.png'
            })
        }),
        'geoMarker':new ol.style.Style({
            image:new ol.style.Icon({
                anchor: [0.5, 0.5],
                scale: 0.2,
                src: 'images/air.png'
            })
        })
    }

    var animating = false;
    var speed, now;
    var startButton = document.getElementById('start-animation');

    var vectorLayer=new ol.layer.Vector({
        source: new ol.source.Vector({
            features:[routeFeature, geoMarker, startMarker, endMarker]
        }),
        style:function (feature) {
            if (animating && feature.get('type') === 'geoMarker') {
                return null;
            }
            return styles[feature.get('type')];
        }
    })

    //设置地图
    var map = new ol.Map({
        loadTilesWhileAnimating: true,
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
            // 使用 ArcGIS 图片服务器
            // new ol.layer.Image({
            //     source: new ol.source.ImageArcGISRest({
            //         ratio:1,
            //         params: {},
            //         url:'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer'
            //     })
            // })
            // 使用 ArcGIS 瓦片服务器
            // new ol.layer.Tile({
            //     source: new ol.source.TileArcGISRest({
            //         ratio:1,
            //         params: {},
            //         url:'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer'
            //     })
            // }),
        ],
        // layer: [layer1, layer2],//必应地图
        // layers: [vectorLayer],//矢量图层

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

    $('#speed').on('change', function () {
        speed = $('#speed').val();
    });

    var traversed = 0; //走过的路程
    var elapsedTime = 0;//用过的时间
    var retime = 0; //保存上次运动所用的时间

    var moveFeature = function (event) {
        var frameState = event.frameState;

        if (animating) {
            if (retime == 0) {
                elapsedTime = frameState.time - now;
            } else {
                elapsedTime = frameState.time - retime;
            }
            retime = frameState.time;

            //计算路程
            var index = Math.round(speed * elapsedTime / 1000);
            traversed += index;

            //完成，结束
            if (traversed >= routeLength) {
                stopAnimation(true);
                return;
            }
        }
    };

    function startAnimation() {
        if (animating) {
            stopAnimation(false);
        } else {
            animating = true;
            now = new Date().getTime();
            startButton.textContent = '取消';
            // hide geoMarker
            geoMarker.setStyle(null);
            // just in case you pan somewhere else
            map.getView().setCenter(map.getView().getCenter());
            map.on('postcompose', moveFeature);
            map.render();
        }
    }


    /**
     * @param {boolean} ended end of animation.
     */
    function stopAnimation(ended) {
        animating = false;
        startButton.textContent = '开始';

        traversed = 0;
        elapsedTime = 0;
        retime = 0;
        // if animation cancelled set the marker at the beginning
        var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
        /** @type {ol.geom.Point} */ (geoMarker.getGeometry())
            .setCoordinates(coord);
        //remove listener
        map.un('postcompose', moveFeature);
    }

    startButton.addEventListener('click', startAnimation, false);


