<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>template</title>

    <%--引入bootstrapcss--%>
    <link rel="stylesheet" href="/lib/bootstrap-3.3.7-dist/css/bootstrap.css">
    <link rel="stylesheet" href="/css/bs/exercise1.css">

</head>
<body>
    <%--左边导航区域--%>
    <div class="col-md-3">
        <nav class="navbar navbar-default" role="navigation">
            <div class="navbar-brand">
                <image src="/images/air.png"></image>
            </div>

            <ul class="nav navbar-nav">
                <li><a href="#">门店</a></li>
                <li><a href="#">我的账户</a></li>
                <li><a href="#">菜单</a></li>
                <%--<li  class="navbar-right"><a href="#"><span class="glyphicon glyphicon-align-justify"></span></a>--%>
                <%--</li>--%>
            </ul>
            <form class="navbar-form navbar-right" role="search">
                <%--<button class="btn btn-default" type="submit">再搜索一次</button>--%>
                <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-align-justify"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">门店</a></li>
                        <li><a href="#">星享俱乐部</a></li>
                        <li><a href="#">菜单</a></li>
                        <li class="divider"></li>
                        <li><a href="#">移动应用</a></li>
                        <li><a href="#">礼卡</a></li>
                        <li><a href="#">帮助中心</a></li>
                        <li class="divider"></li>
                        <li><a href="#"><span class="glyphicon glyphicon-user">登录</span></a>
                            <a href="#" class="btn btn-default">注册</a>
                        </li>
                    </ul>
            </form>
        </nav>
        <%--导航条内容--%>

        <div class="container">
            <div id="stores">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-map-marker"></span>四川 成都 高新区<span class="caret"> </span></a>
                <ul class="dropdown-menu col-md-12">
                    <li class="">
                        <p class="h5">当前定位</p>
                        <p class="h5">四川 成都 高新区</p>
                    </li>
                    <li>
                        选择其他
                        <ul class="breadcrumb">
                            <li><a href="#">省份</a></li>
                            <li><a href="#">城市</a></li>
                            <li><a href="#">县区</a></li>
                            </li>
                        </ul>
                    </li>
                </ul>
                <%--<div class="form-group">--%>
                    <%--<input class="form-control">--%>
                    <%--<button class="form-control">筛选</button>--%>
                <%--</div>--%>
                <div class="row">
                    <div class="col-md-3">
                        <div class="input-group">
                            <input type="text" class="form-control">
                            <span class="input-group-btn"><button class="btn btn-default">筛选</button></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <%--右边内容区--%>
    <div class="col-md-9">d</div>




<%--引入jquery库--%>
<script type="text/javascript" src="/lib/jquery-3.3.1.min.js"></script>
<%--引入bootstrap库--%>
<script type="text/javascript" src="/lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
</body>
</html>
