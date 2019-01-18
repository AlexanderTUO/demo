<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/1/18
  Time: 15:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>formdata</title>
    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <script>
        $(function () {
            $("#submit2").on('click',function () {
                var data = new FormData(document.querySelector("form"));
                console.log(data.get("geoType"));
            })
        })

    </script>
</head>
<body>
<form id="featureCon">
    <fieldset>
        <label for="geoType">几何类型</label>
        <input type="text" name="geoType" id="geoType" >
        <label for="infoType">信息类型</label>
        <input type="text" name="infoType" id="infoType">
        <label for="name">名称</label>
        <input type="text" name="name" id="name" >
        <label for="name">省市</label>
        <input type="text" name="city" id="city" >
        <input type="button" name="city" value="提交" id="submit2" >
    </fieldset>
</form>
</body>
</html>
