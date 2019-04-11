window.onload = function (ev) {
    console.log('我来了');
    var drawing = document.getElementById("drawing");
    if (drawing.getContext) {
        var context = drawing.getContext("2d");

        // 设置阴影
        context.shadowColor = 'rgba(0,0,0,0.5)';
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.shadowBlur = 0;

        // 设置渐变
        var gradient = context.createLinearGradient(10, 10, 60, 60);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "red");

        // // 取得图像的数据URI
        // var imgURI = drawing.toDataURL("image/png");
        //
        // // 显示图像
        // var image = document.createElement("img");
        // image.src = imgURI;
        // document.body.appendChild(image);

        // context.fillStyle = "#0000ff";
        // context.strokeStyle = 'red';

        // 绘制矩形
        // context.fillStyle = "#ff0000";
        context.fillStyle = gradient;
        context.fillRect(10, 10, 50, 50);

        // context.fillStyle = "rgba(0,0,255,0.5)";
        var gradient2 = context.createRadialGradient(55, 55, 5, 55, 55, 30);
        gradient2.addColorStop(0, "white");
        gradient2.addColorStop(1, "blue");
        context.fillStyle = gradient2;
        context.fillRect(30, 30, 50, 50);


        // context.clearRect(40, 40, 10, 10);
    }

    /********canvas2********/

    var drawing2 = document.getElementById("drawing2");
    var ctx2 = drawing2.getContext("2d");

    // 绘制时钟
    ctx2.beginPath();

    // 绘制外圆
    ctx2.arc(100, 100, 90, 0, 2 * Math.PI, false);

    // 绘制内圆
    ctx2.moveTo(185, 100);
    ctx2.arc(100, 100, 85, 0, 2 * Math.PI, false);

    // ctx2.rotate(1);
    //变换原点
    ctx2.translate(100, 100);

    // 旋转表针
    ctx2.rotate(Math.PI/4);

    // 变换原点前
    // // 绘制时针
    // ctx2.moveTo(100, 100);
    // ctx2.lineTo(100, 28);
    //
    // // 绘制分针
    // ctx2.moveTo(100, 100);
    // ctx2.lineTo(38, 100);

    // 变换原点后，时针，分针
    ctx2.moveTo(0, 0);
    ctx2.lineTo(0,-72);

    ctx2.moveTo(0, 0);
    ctx2.lineTo(-62, 0);



    ctx2.stroke();

    // 绘制数字
    ctx2.font = "10px Arial";
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";

    ctx2.fillText("12", 0, -78);


    /********canvas3********/
    var drawing3 = document.getElementById("drawing3");
    var ctx3 = drawing3.getContext('2d');

    ctx3.fillStyle = '#ff0000';
    ctx3.save();

    ctx3.fillStyle = '#00ff00';
    ctx3.translate(100, 100);
    ctx3.save();

    ctx3.fillStyle = '#0000ff';
    ctx3.fillRect(0, 0, 100, 200);

    ctx3.restore();
    ctx3.fillRect(10, 10, 100, 200);

    ctx3.restore();
    ctx3.fillRect(0, 0, 100, 200);


    /********canvas4********/
    var drawing4 = document.getElementById("drawing4");
    var ctx4 = drawing4.getContext('2d');

    var image = document.images[0];
    // image.width(20);
    // image.height(20);
    // ctx4.drawImage(image, 10, 10);

    // ctx4.drawImage(image, 100, 100, 20, 20);

    // ctx4.drawImage(image, 0, 0, 50, 50,100,100,50,50);

    // 模式
    var pattern = ctx4.createPattern(image, "repeat");

    // 绘制矩形
    ctx4.fillStyle = pattern;
    ctx4.fillRect(0, 0, 150, 150);

    /********canvas5********/
    var drawing5 = document.getElementById("drawing5");
    var gl = drawing5.getContext("experimental-webgl",{alpha:false});

    if (gl) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 设置视口
        gl.viewport(0, 0, drawing5.width/2, drawing5.height/2);

        // 创建缓冲区
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0.5, 1]), gl.STATIC_DRAW);
    }



}