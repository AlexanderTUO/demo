<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/11/30
  Time: 15:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>日期</title>
    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <script>
        $(function () {
            // 对Date的扩展，将 Date 转化为指定格式的String
            // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
            // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
            // 例子：
            // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
            // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
            Date.prototype.Format = function(fmt)
            { //author: meizz
                var o = {
                    "M+" : this.getMonth()+1,                 //月份
                    "d+" : this.getDate(),                    //日
                    "h+" : this.getHours(),                   //小时
                    "m+" : this.getMinutes(),                 //分
                    "s+" : this.getSeconds(),                 //秒
                    "q+" : Math.floor((this.getMonth()+3)/3), //季度
                    "S"  : this.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            }
            // 当天
            var systemDate = new Date();
            var curDay = systemDate.Format("yyyy-MM-dd");
            $('#curDay').val(curDay);

            systemDate.setDate(1);
            var firstDay = systemDate.Format("yyyy-MM-dd");
            $('#firstDay').val(firstDay);

            var currentMonth = systemDate.getMonth();
            var nextMonth = ++currentMonth;
            var nextMonthFirstDay = new Date(systemDate.getFullYear(), nextMonth, 1);
            var oneDay = 24 * 60 * 60 * 1000;
            var end = new Date(nextMonthFirstDay - oneDay);

            var lastDay = end.Format("yyyy-MM-dd");
            $('#lastDay').val(lastDay);


        })


    </script>
</head>
<body>
    <div class="container">
        <label for="firstDay">本月第一天：</label>
        <input id="firstDay"/><br/>

        <label>本月当天：</label>
        <input id="curDay"/><br/>

        <label for="lastDay">本月最后一天：</label>
        <input id="lastDay"/><br/>


    </div>
</body>
</html>
