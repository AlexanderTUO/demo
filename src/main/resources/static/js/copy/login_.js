var  remember = {
    publicKey: "ADSAAD",
    localStorageKey: "REMEMBER_SETTING",
    encryptedPassword: null,
    encryptedPasswordFake: "*****************",
    isFeatureEnabled:function () {
        return typeof localStorage === "object";
    },
    saveRememberSetting:function () {
        if (!this.isFeatureEnabled()) {
            return null;
        }
        var setting = {};
        if (!jQuery("#rememberMe").attr("checked")) {
            setting = {
                remember: false
            };
        } else {
            setting = {
                remember: false,
                username: jQuery("#username").val(),
                password: this.encryptedPassword
            };
        }
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(setting));

    },
    getRememberSetting:function () {
        if (!this.isFeatureEnabled()) {
            return null;
        }
        return JSON.parse(window.localStorage.getItem(this.localStorageKey));
    },
    init:function () {
        var check = jQuery("#rememberMe");
        //判断是否支持localStorage
        if (!this.isFeatureEnabled()) {
            check.prop("checked", false);
            return;
        }

        var that = this;
        //绑定密码改变事件
        jQuery("#password").bind("change",function () {
            var password = jQuery(this).val();
            if (!password) {
                that.encryptedPassword = null;
            } else {
                password = $.md5(password);
                var encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.publicKey);
                that.encryptedPassword = encrypt.encrypt(password);
            }

            //加密
        })

        //从localstorage中取得数据
        var setting = this.getRememberSetting();

        //将保存的数据填充
        if (setting && setting["remember"] == false) {
            check.prop("checked", false);
            return;
        }
        check.prop("checked", true);
        jQuery("#username").val(setting["username"]);
        jQuery("#password").val(this.encryptedPasswordFake);
    }
}

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

    $.ajax({
        async: false,
        type: "POST",
        data:{
            username:username,
            password:password,
            kaptcha: kaptcha,
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        url: "sys/login",
        success:function (result) {
            //登录成功，保存账户密码
            debugger;
        },
        error:function () {
            //登录失败，则提示错误
        }
    });
}

$("input").focus(function () {
    $("#errorMsg").css("display", "none");
})