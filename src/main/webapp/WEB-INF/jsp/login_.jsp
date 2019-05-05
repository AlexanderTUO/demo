<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/5/5
  Time: 10:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>登录</title>

    <%--引入bootstrapcss--%>
    <link rel="stylesheet" href="/lib/bootstrap-3.3.7-dist/css/bootstrap.css">
    <link rel="stylesheet" href="/css/copy/login_.css">
</head>
<body>
    <div class="parent">
    </div>
        <div id="form_div">
            <form class="form-horizontal">
                <div class="form-group has-error">
                    <div class="col-md-offset-4 col-md-7">
                        <label id="errorMsg" class="control-label" style="display: none">请输入用户名!!!</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 col-md-offset-1 control-label" for="username">用户名</label>
                    <div class="col-md-7">
                        <input id="username" class="form-control" type="text" placeholder="请输入用户名" maxlength="30" autocomplete="off">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 col-md-offset-1  control-label" for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                    <div class="col-md-7">
                        <input id="password" class="form-control" type="password" placeholder="请输入密码" maxlength="20" autocomplete="off">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 col-md-offset-1  control-label" for="kaptcha">验证码</label>
                    <div class="col-md-7">
                        <input id="kaptcha" class="form-control" type="text" placeholder="请输入验证码" maxlength="4" autocomplete="off">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-4 col-md-8">
                        <img alt="验证码" id="imgObj" src="/kaptcha.jpg">
                        <a href="#" onclick="changeImg()">换一张</a>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-4 col-md-6">
                        <div class="checkbox"><label><input type="checkbox">记住密码</label></div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-4 col-md-6">
                        <button type="submit" class="btn btn-default btn-block" onclick="form_submit()">登录</button>
                    </div>
                </div>
            </form>
        </div>


<%--引入jquery库--%>
<script type="text/javascript" src="/lib/jquery-3.3.1.min.js"></script>
<%--引入bootstrap库--%>
<script type="text/javascript" src="/lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
<script type="text/javascript" src="/js/copy/login_.js"></script>
</body>
</html>
