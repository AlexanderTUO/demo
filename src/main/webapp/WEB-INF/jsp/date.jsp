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
    <link type="text/css" href="lib/jquery-ui.css">
    <link rel="stylesheet" href="http://jqueryui.com/resources/demos/style.css">

    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="lib/jquery-ui.js"></script>
    <script>
        $(function () {
            // 对Date的扩展，将 Date 转化为指定格式的String
            // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
            // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
            // 例子：
            // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
            // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
            // 时间格式化
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

            /**
             * 当月的天数问题
             */
            function monthData() {
                // 当天
                var monthData = new Date();
                var curDay = monthData.Format("yyyy-MM-dd");
                // var curDay = monthData.Format("yyyy/MM/dd");
                $('#curDay').val(curDay);

                // 第一天
                monthData.setDate(1);
                var firstDay = monthData.Format("yyyy-MM-dd");
                $('#firstDay').val(firstDay);

                // 最后一天
                var currentMonth = monthData.getMonth();
                var nextMonth = ++currentMonth;
                var nextMonthFirstDay = new Date(monthData.getFullYear(), nextMonth, 1);
                var oneDay = 24 * 60 * 60 * 1000;
                var end = new Date(nextMonthFirstDay - oneDay);

                var lastDay = end.Format("yyyy-MM-dd");
                $('#lastDay').val(lastDay);
            }

            monthData();


            /**
             * 本周天数问题
             */
            function weekDate() {
                var weekDate = new Date();
                var curWeekDate = weekDate.Format("yyyy-MM-dd");
                $("#curWeekDay").val(curWeekDate);

                // 本周第一天
                var day = weekDate.getDay() == 0 ? 7 : weekDate.getDay();

                weekDate.setDate(weekDate.getDate() - day+1);
                var firstWeekDay = weekDate.Format("yyyy-MMM-dd");
                $("#firstWeekDay").val(firstWeekDay);

                // 本周最后一天
                // var day2 = 7-weekDate.getDay()==7 ? 0 : 7-weekDate.getDay();
                weekDate.setDate(weekDate.getDate()+6);
                var lastWeekDay = weekDate.Format("yyyy-MMM-dd");
                $("#lastWeekDay").val(lastWeekDay);
            }
            weekDate();

            /**
             * datepicker初始化
             */
            function datepickerInit() {
                var startDate = $('#startDate').datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: "yy-mm-dd"
                })

                var endDate = $('#endDate').datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: "yy-mm-dd"
                })
            }




            datepickerInit();

            /**
             * datepicker测试:计算时间间隔
             */
            $("#submitDp").on('click',function () {
                var startDateStr = $('#startDate').val();
                var endDateStr = $('#endDate').val();

                var startDate = new Date((startDateStr));
                var endDate = new Date(endDateStr);
                console.log(startDate);
                console.log(endDate);

                var interval = endDate.getTime() - startDate.getTime();
                var days = interval / (1000 * 24 * 3600);
                $('#interval').val(days);
                console.log(days);
            })

        })


    </script>
</head>
<body>
    <div class="container">
        <h2>当周天数问题</h2>
        <label for="firstWeekDay">当周第一天：</label>
        <input id="firstWeekDay"/><br/>

        <label>当周当天：</label>
        <input id="curWeekDay"/><br/>

        <label for="lastWeekDay">当周最后一天：</label>
        <input id="lastWeekDay"/><br/>

        <h2>本月天数问题</h2>
        <label for="firstDay">本月第一天：</label>
        <input id="firstDay"/><br/>

        <label>本月当天：</label>
        <input id="curDay"/><br/>

        <label for="lastDay">本月最后一天：</label>
        <input id="lastDay"/><br/>

    </div>
    <div>
        <h2>当周天数问题</h2>
        <label for="startDate">起始时间：</label>
        <input id="startDate"/><br/>
        <label for="endDate">终止时间：</label>
        <input id="endDate"/><br/>
        <label for="interval">时间间隔：</label>
        <input id="interval"/><br/>
        <input type="button" id="submitDp" value="计算"/><br/>
    </div>
</body>
</html>
