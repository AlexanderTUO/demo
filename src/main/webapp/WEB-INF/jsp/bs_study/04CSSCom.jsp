<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/4/26
  Time: 10:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>04CSSCom</title>

    <%--引入bootstrapcss--%>
    <link rel="stylesheet" href="/lib/bootstrap-3.3.7-dist/css/bootstrap.css">
</head>
<body>
    <a class="h4" href="/bs/01base">返回首页</a>
    <p class="h3">小图标</p>
    <i class="glyphicon glyphicon-ok"></i><br>
    <span class="glyphicon glyphicon-ok"></span>

    <div class="btn-toolbar">
        <div class="btn-group">
            <a class="btn btn-default" href="#"><span class="glyphicon glyphicon-align-left">首页</span></a>
            <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-align-left">首页</span></button>
            <a class="btn btn-default" href="#"><span class="glyphicon glyphicon-align-center">私密档案</span></a>
            <div class="btn-group dropup">
                <button class="btn btn-default" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-align-right">我的书籍</span><span class="caret"></span></button>
                <ul class="dropdown-menu">
                    <li class=""><a href="#">JavaScript高级程序设计</a></li>
                    <li class=""><a href="#">深入理解Bootstrap</a></li>
                    <li class=""><a href="#">Java核心思想</a></li>
                </ul>
            </div>
            <div class="btn-group">
                <a class="btn btn-default "href="#"><span class="glyphicon glyphicon-align-justify">GIS功能</span></a>
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">&nbsp;<span class="caret"></span></button>
                <ul class="dropdown-menu">
                    <li class=""><a href="#">单点追踪</a></li>
                    <li class=""><a href="#">实时监控</a></li>
                    <li class=""><a href="#">历史轨迹</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="btn-group">
        <a class="btn btn-default btn-primary"><span class="glyphicon glyphicon-user"></span>User</a>
        <a class="btn btn-default btn-primary" data-toggle="dropdown" href="#">
            <span class="caret"></span>&nbsp;
        </a>
        <ul class="dropdown-menu">
            <li class="active"><a class=""><span class="glyphicon glyphicon-pencil"></span>Edit</a></li>
            <li class="disabled"><a class=""><span class="glyphicon glyphicon-trash"></span>Delete</a></li>
            <li><a class=""><span class="glyphicon glyphicon-ban-circle"></span>Ban</a></li>
            <li class="divider"></li>
            <li><a href="">Make admin</a></li>
        </ul>
    </div>

    <ul class="nav nav-pills nav-stacked">
        <li class="active"><a class=""><span class="glyphicon glyphicon-home"></span>Home</a></li>
        <li><a class=""><span class="glyphicon glyphicon-book"></span>Library</a></li>
        <li><a class=""><span class="glyphicon glyphicon-pencil"></span>Applications</a></li>
    </ul>

    <div class="control-group">
        <div class="controls">
            <div class="input-group">
                  <span class="input-group-addon">
                <span class="glyphicon glyphicon-envelope"></span>
            </span>
                <input class="col col-lg-2 form-control" type="text" id="ds">
            </div>
        </div>
    </div>

    <%--addon基本用法--%>
    <div class="input-group">
        <span class="input-group-addon">$</span>
        <input type="text" class="form-control">
        <span class="input-group-addon">.00</span>
    </div>

    <%--复选框和单选框作为addon--%>
    <div class="row">
        <div class="col-md-3">
            <div class="input-group">
                <span class="input-group-addon"><input type="checkbox"></span>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-3">
            <div class="input-group">
                <span class="input-group-addon"><input type="radio"></span>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>

    <%--按钮作为addon--%>
    <div class="row">
        <div class="col-md-3">
            <div class="input-group">
                <span class="input-group-btn"><button class="btn btn-default">按钮</button></span>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>

    <%--下拉菜单作为addon--%>
    <div class=""></div>

    <%--分段按钮作为addon--%>
    <div class="row">
        <div class="col-md-4">
            <div class="input-group">
                <div class="input-group-btn">
                    <button class="btn btn-default">按钮A</button>
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">&nbsp;<span class="caret"></span><span class="sr-only">切换下拉菜单</span></button>
                    <button class="btn btn-default">按钮B</button>
                    <button class="btn btn-default">按钮C</button>
                    <ul class="dropdown-menu">
                        <li class=""><a href="#">单点追踪</a></li>
                        <li class=""><a href="#">实时监控</a></li>
                        <li class=""><a href="#">历史轨迹</a></li>
                    </ul>
                </div>
                <input class="form-control" type="text">
            </div>
        </div>
    </div>

    <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
            <a class="navbar-brand">Brand</a>
        </div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">active</a></li>
            <li><a href="#">link</a></li>
            <li class="disabled"><a href="#">disabled</a></li>
            <li><a href="#">link</a></li>
        </ul>
        <button class="btn btn-default navbar-btn" type="submit">ul按钮</button>
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="请输入搜素内容">
            </div>
            <button class="btn btn-default" type="submit">搜索</button>
        </form>
        <form class="navbar-form navbar-right" role="search">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="请输入搜素内容">
            </div>
            <button class="btn btn-default" type="submit">再搜索一次</button>
        </form>
    </nav>

    <%--面包屑导航--%>
    <ul class="breadcrumb">
        <li><a href="#">首页</a></li>
        <li><a href="#">第二级</a></li>
        <li class="active">第三级</li>
    </ul>

    <%--徽章--%>
    <a href="#">收到消息<span class="badge"></span></a>

    <div class="row">
        <div class="col-md-3">
            <a href="#" class="thumbnail">
                <image src="/images/scean3.jpg" alt="我是图片"></image>
            </a>
        </div>
    </div>

    <%--警告框--%>
    <div class="alert alert-warning alert-dismissable col-md-4 ">
        <button class="close" type="button" data-dismiss="alert">x</button>
        <strong>Warning!</strong>
        <p>
            好好看看，别整错了
            <a href="#">百度一下，你就知道</a>
        </p>
    </div>

    <%--列表组--%>
    <div class="col-md-2">
        <ul class="list-group">
            <li class="list-group-item"><span class="badge">10</span><span class="badge">10</span>111</li>
            <li class="list-group-item">222</li>
            <li class="list-group-item">333</li>
            <li class="list-group-item">444</li>
        </ul>
    </div>

    <%--面板--%>
    <div class="panel panel-default col-md-2">
        <div class="panel-body">
            这里是面板内容
        </div>
    </div>







    <%--引入jquery库--%>
    <script type="text/javascript" src="/lib/jquery-3.3.1.min.js"></script>
    <%--引入bootstrap库--%>
    <script type="text/javascript" src="/lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
</body>
</html>
