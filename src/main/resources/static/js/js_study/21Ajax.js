window.onload = function (ev) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange',function (ev1) {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                console.log(xhr.responseText);

                var header = xhr.getResponseHeader("myHeader");
                var headers = xhr.getAllResponseHeaders();

                console.log('结束了');
            } else {
                console.log('请求不成功：' + xhr.status);
            }
        }
    },false)

    // xhr.onprogress = function (ev1) {
    //     var status = document.getElementById("status");
    //     if (ev1.lengthComputable) {
    //         console.log(ev1.position / ev1.totalSize);
    //     }
    // }
    xhr.open('get', "/data/example.txt", true);
    // 设置自定义头部信息
    xhr.setRequestHeader("myHeader", "myValue");

    xhr.send(null);


}