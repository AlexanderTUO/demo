<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/4/11
  Time: 16:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>14Form</title>
    <script type="text/javascript" src="js/js_study/14Form.js"></script>
</head>
<body>
    <form id="myForm" name="myForm">
        用户名<input type="text" id="username" autofocus value="12" maxlength="3" ><br/>
        密码<input type="text" id="password" maxlength="3"><br/>
        确认密码<input type="text" id="password2" maxlength="3"><br/>
        <input type="reset" name="reset" value="重置">
        <input type="submit" name="submit" value="提交"><br/>
    </form>
</body>
</html>
