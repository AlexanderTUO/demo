<%@ page contentType="text/html;charset=UTF-8"%>
<html lang="cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- jqGrid组件基础样式包-必要 -->
    <link rel="stylesheet" href="jqgrid/css/ui.jqgrid.css" />

    <!-- jqGrid主题包-非必要 -->
    <!-- 在jqgrid/css/css这个目录下还有其他的主题包，可以尝试更换看效果 -->
    <link rel="stylesheet" href="jqgrid/css/css/redmond/jquery-ui-1.8.16.custom.css" />

    <!-- jquery插件包-必要 -->
    <!-- 这个是所有jquery插件的基础，首先第一个引入 -->
    <script type="text/javascript" src="js/jquery-1.7.1.js"></script>

    <!-- jqGrid插件包-必要 -->
    <script type="text/javascript" src="jqgrid/js/jquery.jqGrid.src.js"></script>

    <!-- jqGrid插件的多语言包-非必要 -->
    <!-- 在jqgrid/js/i18n下还有其他的多语言包，可以尝试更换看效果 -->
    <script type="text/javascript" src="jqgrid/js/i18n/grid.locale-cn.js"></script>
    <title>http://blog.mn886.net/jqGrid</title>

    <!-- 本页面初始化用到的js包，创建jqGrid的代码就在里面 -->
    <script type="text/javascript" src="js/jqgrid.js"></script>
</head>
<body>
<div class="content-pager">
    <input type="text" name="driverName" class="" id="driverName">
    <BUTTON TYPE="button" CLASS="btn-default " id="search">搜索</BUTTON>
    <table id="list2"></table>
    <%--导航条--%>
    <div id="pager2"></div>
</div>
<br>
<a href="#" id="geta1">Get data from selected row</a>
<br />
<a href="#" id="deletea2">Delete row 2</a>
<br />
<a href="#" id="updatea3">Update amounts in row 1</a>
<br />
<a href="#" id="adda4">Add row with id 99</a>
<br>
以上为创建jqGrid的简单例子。想了解全功能api，<a href="http://blog.mn886.net/jqGrid">http://blog.mn886.net/jqGrid</a>
</body>
</html>