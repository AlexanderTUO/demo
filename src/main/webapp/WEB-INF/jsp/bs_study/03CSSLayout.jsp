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
    <title>template</title>

    <%--引入bootstrapcss--%>
    <link rel="stylesheet" href="/lib/bootstrap-3.3.7-dist/css/bootstrap.css">
</head>
<body>
    <p class="h3">验证提示状态</p>
    <div class="form-group has-warning">
        <label class="control-label" for="inputWarning">输入长度不够！</label>
        <input type="text" class="form-control" id="inputWarning" >
    </div>
    <div class="form-group has-error">
        <label class="control-label" for="inputError">输入内容不合法！！</label>
        <input id="inputError" type="text" class="form-control">
    </div>
    <div class="form-group has-success has-feedback">
        <label class="control-label" for="inputSuccess">输入内容是对嘞！</label>
        <input id="inputSuccess" type="text" class="form-control">
        <span class="glyphicon glyphicon-ok form-control-feedback"></span>
    </div>

    <p class="h3">禁用状态</p>
    <button class="btn btn-default" disabled>disabled属性</button>
    <button class="btn btn-default disabled">disabled样式，不禁默认行为</button>


    <%--引入jquery库--%>
    <script type="text/javascript" src="/lib/jquery-3.3.1.min.js"></script>
    <%--引入bootstrap库--%>
    <script type="text/javascript" src="/lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
</body>
</html>
