<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018\10\7 0007
  Time: 10:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>jqTreeDemo</title>
    <!-- jqGrid组件基础样式包-必要 -->
    <link rel="stylesheet" href="jqtree/css/jqtree.css" />
    <!-- jquery插件包-必要 -->
    <!-- 这个是所有jquery插件的基础，首先第一个引入 -->
    <script type="text/javascript" src="js/jquery-1.7.1.js"></script>

    <!-- jqGrid插件包-必要 -->
    <script type="text/javascript" src="jqgrid/js/jquery.jqTree.src.js"></script>

    <!-- 本页面初始化用到的js包，创建jqGrid的代码就在里面 -->
    <script type="text/javascript" src="js/jqTree.js"></script>
</head>
<body>
    <div class="tree well">
        <ul id="ul_tree">
        </ul>
    </div>
</body>
</html>
