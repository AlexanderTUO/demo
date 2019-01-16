<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/1/14
  Time: 15:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>格式转换</title>
    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <%--<script>--%>
        <%--$(function () {--%>
            <%--var formData = new FormData();--%>
            <%--var name = $("input").val();--%>
            <%--formData.append("file",$("#inputFile")[0].files[0]);--%>
            <%--formData.append("name",name);--%>
            <%--formData--%>
            <%--$.ajax({--%>
                <%--url : "/transferFormat",--%>
                <%--type : 'POST',--%>
                <%--data : formData,--%>
                <%--// 告诉jQuery不要去处理发送的数据--%>
                <%--processData : false,--%>
                <%--// 告诉jQuery不要去设置Content-Type请求头--%>
                <%--contentType : false,--%>
                <%--beforeSend:function(){--%>
                    <%--console.log("正在进行，请稍候");--%>
                <%--},--%>
                <%--success : function(responseStr) {--%>
                    <%--if(responseStr.status===0){--%>
                        <%--console.log("成功"+responseStr);--%>
                    <%--}else{--%>
                        <%--console.log("失败");--%>
                    <%--}--%>
                <%--},--%>
                <%--error : function(responseStr) {--%>
                    <%--console.log("error");--%>
                <%--}--%>
            <%--});--%>

            <%--function getObjectURL(file) {--%>
                <%--var url = null--%>
                <%--if (window.createObjectURL != undefined) { // basic--%>
                    <%--url=window.createObjectURL(file)--%>
                <%--}else if(window.URL!=undefined){ // mozilla(firefox)--%>
                    <%--url=window.URL.createObjectURL(file)--%>
                <%--} else if(window.webkitURL!=undefined){ // webkit or chrome--%>
                    <%--url=window.webkitURL.createObjectURL(file)--%>
                <%--}--%>
                <%--return url  ;--%>
            <%--}--%>
            <%--$("#inputFile").change(function(){--%>
                <%--var objUrl=getObjectURL(this.files[0]);--%>
                <%--console.log(objUrl);--%>
                <%--alert($("#inputFile").val());--%>
                <%--var size=this.files[0].size;--%>
                <%--if(size>=1024000*10){--%>
                    <%--// bottomTip("图片超过10M了哦",0);--%>
                    <%--alert("图片超过10M了哦");--%>
                <%--}--%>
                <%--else{--%>
                    <%--if(objUrl){--%>
                        <%--$("#xs").attr("src",objUrl);--%>
                    <%--}--%>
                <%--}--%>
            <%--})  ;--%>
        <%--})--%>

    <%--</script>--%>
</head>
<body>
<form action="/" enctype="multipart/form-data" method="post" id="upload">
    <label for="file">输入文件</label>
    <input type="file" id="file" name="file" ><br/><br/>

    <label for="transferFormat">转换格式</label>
    <select id="transferFormat" name="type">
        <option id="ESRI Shapefile">ESRI Shapefile</option>
        <option id="GeoJSON">GeoJSON</option>
        <option id="KML">KML</option>
    </select><br/><br/>

    <button type="submit">转换</button>
    <button type="reset">重置</button>
</form>
</body>
</html>
