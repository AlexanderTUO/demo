<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018\11\13 0013
  Time: 23:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>

    <link rel="stylesheet" type="text/css" href="openLayers-5.3.0/ol.css"/>
    <script src="openLayers-5.3.0/ol.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/jquery-3.3.1.min.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<div id="map" style="width: 100%;height: 500px;"></div>

<label for="speed">
    speed: 
    <input id="speed" type="range" min="10" max="999" step="10" value="60">

</label>

<button id="start-animation">开始</button>
<input id="add" type="checkbox" value="add" />新增
<script type="text/javascript">
    var drawedFeature = null;

    var routeCoords = [];

    for(var i = 0;i <= 800; i++){
        routeCoords.push([115, 37+0.005*i]);
    }

    var map = new ol.Map({
        loadTilesWhileAnimating: true,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'map',
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [115, 37],
            zoom: 6
        })
    });

    //保存绘制线的图层
    var lineLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2
            })
        })
    });

    map.addLayer(lineLayer);
    //交互
    var drawInteraction = new ol.interaction.Draw({
        type: 'LineString',
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        }),
        source: lineLayer.getSource()
    });


    //添加图层和交互到map

    // map.addInteraction(drawInteraction);
    drawInteraction.on('drawend', function(e) {
        // 绘制结束时暂存绘制的feature
        drawedFeature = e.featureQuery;
        routeCoords = e.featureQuery.getGeometry().getCoordinates();
        animation();
    });


    $('#add').change(function() {
        if (this.checked) {
            // 勾选新增复选框时，添加绘制的Interaction
            map.removeInteraction(drawInteraction);
            map.addInteraction(drawInteraction);
        } else {
            // 取消勾选新增复选框时，移出绘制的Interaction，删除已经绘制的feature
            map.removeInteraction(drawInteraction);
            if (lineLayer) {
                lineLayer.getSource().removeFeature(drawedFeature);
            }
            lineLayer = null;
        }
    });




    // debugger
    var animation = function () {
        var route = new ol.geom.LineString(routeCoords);
        var routeLength = routeCoords.length;

        var routeFeature = new ol.Feature({
            type: 'route',
            geometry: route
        });
        var geoMarker = new ol.Feature({
            type: 'geoMarker',
            geometry: new ol.geom.Point(routeCoords[0])
        });
        var startMarker = new ol.Feature({
            type: 'icon',
            geometry: new ol.geom.Point(routeCoords[0])
        });
        var endMarker = new ol.Feature({
            type: 'icon',
            geometry: new ol.geom.Point(routeCoords[routeLength - 1])
        });

        // var circle = new ol.geom.Point({
        //     style: new ol.style.Style({
        //         image: new ol.style.Circle({
        //             radius: 0,
        //             stroke: new ol.style.Stroke({
        //                 color: 'red',
        //                 size: 1
        //             })
        //         })
        //     })
        // });

        var styles = {
            'route': new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 6, color: [237, 212, 0, 0.8]
                })
            }),
            'icon': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    scale: 0.3,
                    src: 'images/p.png'
                })
            }),
            // 'geoMarker': new ol.style.Style({
            //     image: new ol.style.Icon({
            //         anchor: [0.5, 0.5],
            //         scale: 1,
            //         src: 'images/car.png'
            //     })
            // })
            'geoMarker': new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 20,
                    fill: new ol.style.Fill({color: 'black'}),
                    stroke: new  ol.style.Stroke({
                        color: 'white', width: 2
                    })
                })
            })
        };

        var animating = false;
        var speed, now;
        var startButton = document.getElementById('start-animation');

        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [routeFeature, geoMarker, startMarker, endMarker]
            }),
            style: function(featureQuery) {
                // hide geoMarker if animation is active
                if (animating && featureQuery.get('type') === 'geoMarker') {
                    return null;
                }
                return styles[featureQuery.get('type')];
            }
        });

        map.addLayer(vectorLayer);


        $("#speed").on('change',function(){
            speed = $("#speed").val();
        })

        var  traversed = 0;//走过的路程
        var elapsedTime = 0; //用过的时间
        var  retime = 0; //保存上次运动所用的时间
        var moveFeature = function(event) {
            var vectorContext = event.vectorContext;
            var frameState = event.frameState;

            if (animating) {
                if(retime == 0){
                    elapsedTime = frameState.time - now;
                }else{

                    elapsedTime = frameState.time - retime;
                }
                retime = frameState.time ;


                //计算路程
                var index = Math.round(speed * elapsedTime / 1000);
                traversed += index;
                //完成 ， 结束
                if (traversed >= routeLength) {
                    stopAnimation(true);
                    return;
                }
                //设置车的位置
                var currentPoint = new ol.geom.Point(routeCoords[traversed]);
                var featureQuery = new Feature(currentPoint);
                vectorContext.drawFeature(featureQuery, styles.geoMarker);
                geoMarker.setGeometry(currentPoint);
            }
            map.render();
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
    }
    animation();
</script>
</body>
</html>
