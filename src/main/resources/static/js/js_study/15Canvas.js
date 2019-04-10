window.onload = function (ev) {
    console.log('我来了');
    var drawing = document.getElementById("drawing");
    if (drawing.getContext) {
        var context = drawing.getContext("2d");

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
        context.fillStyle = "#ff0000";
        context.fillRect(10, 10, 50, 50);

        context.fillStyle = "rgba(0,0,255,0.5)";
        context.fillRect(30, 30, 50, 50);

        context.clearRect(40, 40, 10, 10);
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
    var ctx3 = drawing2.getContext('2d');
    ctx3.fillStyle = '#ff0000';
    ctx3.save();

    


}