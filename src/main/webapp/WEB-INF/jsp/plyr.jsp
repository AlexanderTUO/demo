<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/3/28
  Time: 15:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>简单的html5影音视频播放器代码</title>

    <!-- 加入  -->
    <link rel="stylesheet" href="/lib/plyr/plyr.css">
    <!-- 加入  -->
    <script src="/lib/plyr/plyr.js"></script>
    <style>
        body{background-color: #262626}
        .m{ margin-left: auto; margin-right: auto; width: 640px; margin-top: 100px; }

    </style>

</head>

<!-- 加入  -->
<div class="m">
    <video controls data-plyr-config='{ "title": "Example Title" }'>
        <!-- <source src="http://www.jplayer.org/video/m4v/Incredibles_Teaser.m4v" type="video/mp4"> -->
        <%--<source src="/video/bfsp.mp4" type="video/mp4">--%>
        <source src="/video/cxy.mp4" type="video/mp4">
        <%--E:\Courses\gisbase2\trunk\src\main\resources\static\video\bfsp.mp4--%>
        <%--E:\XJ\xjbf\trunk\src\ocp_gwc_web\src\main\webapp\static\video\bfsp.mp4--%>

        <%--<source src="E:/XJ/bfsp.mp4" type="video/mp4">--%>

        <!-- <source src="path/to/video.webm" type="video/webm">-->
        <!-- Captions are optional -->
    </video>
    <script type="text/javascript" src="/js/plyrJs.js"></script>
    <%--<script>plyr.setup();</script>--%>
</div>
<!-- 结束  -->
<div style="text-align:center;margin:50px 0; font:normal 14px/24px 'MicroSoft YaHei';color:#ffffff">
    <p>适适用浏览器：360、FireFox、Chrome、Opera、傲游、搜狗、世界之窗. 不支持Safari、IE8及以下浏览器。</p>
    <p>来源：<a href="http://www.lanrenzhijia.com/" target="_blank">懒人素材</a></p>
</div>
</body>
</html>
