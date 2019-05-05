function changeImg() {
    var imgObj = $("#imgObj");
    var src = imgObj.attr("src");
    var url = "/kaptcha.jpg?t=" + $.now();
    imgObj.attr("src", url);
}


function form_submit() {
    var username = $("#username").val(),
        password = $("#password").val(),
        kaptcha = $("#kaptcha").val();

    var showError = function (msg) {
        $("#errorMsg").css("display", "inline").html(msg);
    };

    if (username.length <= 0) {
        showError("请输入用户名！！！");
        return;
    }
    if (password.length <= 0) {
        showError("请输入密码！！！");
        return;
    }
    if (kaptcha.length < 4) {
        showError("验证码为4位！！！");
        return;
    }

    // $.ajax({
    //     async: false,
    //     type: "POST",
    //     data:{
    //         username:username,
    //         password:password,
    //         kaptcha: kaptcha,
    //         contentType: "application/x-www-form-urlencode;charset=utf-8",
    //         url: "sys/login",
    //         success:function (result) {
    //
    //         },
    //         error:function () {
    //
    //         }
    //
    //     },
    // });
}

$("input").focus(function () {
    $("#errorMsg").css("display", "none");
})