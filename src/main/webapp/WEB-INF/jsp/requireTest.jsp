<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/3/18
  Time: 16:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>require.js</title>
    <script type="text/javascript" src="js/require.js"></script>
    <%--全局配置--%>
    <script data-main="" src=""></script>
    <script type="text/javascript">
        require.config({//模块重命名
            'paths':{
                'jquery': ["http://libs.baidu.com/jquery/2.0.3/jquery",'js/jquery-3.3.1.min.js']
            }
        })

        // 不遵守amd规范的js引入
        require.config({
            shim:{
                'underscore': {
                    exports: "_"
                },
                'jquery.form': ['jquery']
            }
        })

        require(['jquery','js/requireTest'],function ($,_) {
            $(function () {
                alert('jquery');
                // _.each([1, 2, 3], alert);
            })
        });

    </script>
</head>
<body>
    <span>body</span>
</body>
</html>
