<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/4/24
  Time: 16:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>BS基础</title>

    <%--引入bootstrapcss--%>
    <link rel="stylesheet" href="/lib/bootstrap-3.3.7-dist/css/bootstrap.css">
</head>
<body style="background-color: silver">
    <h1>hello world!</h1>
    <div class="alert">
        <button type="button" class="close" data-dismiss="alert">X</button>
        <strong>警告！</strong>你输入的内容不合法
    </div>
    <div class="btn-group">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            我的书籍 <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
            <li><a href="#">JavaScript</a></li>
            <li><a href="#">C1</a></li>
            <li><a href="#">c2</a></li>
            <li><a href="#">c3</a></li>
            <li class="divider"></li>
            <li><a href="#">深入理解Bootstrap</a></li>
        </ul>
    </div>

    <ul class="nav nav-tabs" id="myTab">
        <li class="active"><a data-toggle="tab" href="#home">首页</a></li>
        <li class=""><a data-toggle="tab" href="#profile">个人资料</a></li>
        <li class="dropdown">
            <a data-toggle="dropdown" href="#" class="dropdown-toggle">我的书籍<b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a href="#book1" data-toggle="tab">JavaScript高级程序设计</a></li>
                <li><a href="#book2" data-toggle="tab">深入理解Bootstrap</a></li>
                <li><a href="#book3" data-toggle="tab">Java核心思想</a></li>
                <li><a href="#book4" data-toggle="tab">Openlayers源码分析</a></li>
            </ul>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div id="home" class="tab-pane fade active in"><p>单击首页时，显示该区域</p></div>
        <div id="profile" class="tab-pane fade"><p>单击个人资料时，显示该区域</p></div>
        <div id="book1" class="tab-pane fade"><p>单击JavaScript高级程序设计时，显示该区域</p></div>
        <div id="book2" class="tab-pane fade"><p>单击深入理解Bootstrap时，显示该区域</p></div>
        <div id="book3" class="tab-pane fade"><p>单击Java核心思想时，显示该区域</p></div>
        <div id="book4" class="tab-pane fade"><p>单击Openlayers源码分析时，显示该区域</p></div>
    </div>

    <p class="text-left">JavaScript</p>
    <p class="text-center">JavaScript</p>
    <p class="text-right">JavaScript</p>
    <p class="text-justify">JavaScript</p>

    <abbr title="JavaScript高级程序设计是一本好书">JavaScript</abbr>
    <abbr title="JavaScript高级程序设计是一本好书" class="initialism">JavaScript</abbr>

    <address>
        <strong>tyk</strong><br>
        <a href="#">baidu.com</a>
    </address>

    <blockquote class="pull-right">
        <p>冰冻三尺，非一日之寒</p>
        <small>出自 <cite title="论语·述而">论语</cite></small>
    </blockquote>

    <code>我是代码</code>

    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>图书名称</th>
                <th>出版社</th>
                <th>作者</th>
            </tr>
        </thead>
        <tbody>
            <tr class="active">
                <td>JavaScript高级程序设计</td>
                <td>机械工业出版社</td>
                <td>Nicholas</td>
            </tr>
            <tr class="success">
                <td>深入理解Bootstrap</td>
                <td>人民邮电出版社</td>
                <td>老王</td>
            </tr>
            <tr class="danger">
                <td>Java核心思想</td>
                <td>搞忘了</td>
                <td>乱写的</td>
            </tr>
        </tbody>
    </table>

    <form class="form-inline">
        <formset>
            <legend>用户登录</legend>
            <div class="form-group">
                <label>登录账户</label>
                <input type="email" class="form-control" placeholder="请输入你的用户名或email">
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" class="form-control" placeholder="请输入你的密码">
            </div>
            <div class="form-group">
                <label><input type="checkbox">记住密码</label>
            </div>
            <button type="submit" class="btn btn-default">登录</button>
        </formset>
    </form>


    <%--引入jquery库--%>
    <script type="text/javascript" src="/lib/jquery-3.3.1.min.js"></script>
    <%--引入bootstrap库--%>
    <script type="text/javascript" src="/lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
</body>
</html>
