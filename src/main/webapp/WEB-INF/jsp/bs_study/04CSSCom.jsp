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
            <a class="btn btn-default" href="#"><span class="glyphicon glyphicon-align-center">私密档案</span></a>
            <a class="btn btn-default" href="#"><span class="glyphicon glyphicon-align-right">我的书籍</span></a>
            <div class="btn-group">
                <a class="btn btn-default " data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-align-justify">GIS功能</span></a>
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

    <%--引入jquery库--%>
    <script type="text/javascript" src="/lib/jquery-3.3.1.min.js"></script>
    <%--引入bootstrap库--%>
    <script type="text/javascript" src="/lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
</body>
</html>
