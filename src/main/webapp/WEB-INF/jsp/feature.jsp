<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/11/21
  Time: 9:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>矢量操作</title>

    <script type="text/javascript" src="lib/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="openLayers-5.3.0/ol.css" type="text/css" />
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
    <script src="openLayers-5.3.0/ol.js" type="text/javascript" charset="utf-8"></script>

    <script src="https://unpkg.com/jsts@2.0.2/dist/jsts.min.js"></script>

    <script src="lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <link rel="stylesheet" href="lib/bootstrap-3.3.7-dist/css/bootstrap.css">

    <script type="text/javascript" src="lib/jquery-ui.js"></script>

    <script type="text/javascript" src="js/feature.js"></script>

    <link rel="stylesheet" href="css/feature.css">
    <link rel="stylesheet" href="http://jqueryui.com/resources/demos/style.css">

    <link href="lib/datatable/jquery.dataTables.css" rel="stylesheet">
    <script type="text/javascript" src="lib/datatable/jquery.dataTables.js"></script>
</head>
<body>

<div class="logoImg"></div>
<div class="containerBack" id="coverLayer"></div>
<div class="frontPic" id="frontPic">矢量操作</div>
<div class="closeDiv">
    <div class="closeImg" id="closeFea"></div>
</div>
<div class="applyContainer" id="Feature">
    <ul>
        <li id="displayFea"><label>显示：</label>
            <input type="checkbox" id="allSelect" value="4">全选
            <input type="checkbox" id="allNotSelect" value="5">全不选<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="checkbox" id="pointCh" value="1">点
            <input type="checkbox" id="lineStringCh" value="2">线
            <input type="checkbox" id="polygonCh" value="3">面
            <input type="checkbox" id="circleCh" value="4">圆
        </li>
        <li id="addFea"><label>绘制：</label>
            <input type="checkbox" id="add">
            <input type="radio" id="pointRa" name="add" value="1" checked>点
            <input type="radio" id="lineStringRa" name="add" value="2">线
            <input type="radio" id="polygonRa" name="add" value="3">面
            <input type="radio" id="circleRa" name="add" value="4">圆
        </li>
        <li id="modifyFea"><label>修改：</label>
            <input type="checkbox" id="modify">
            <input type="button" id="modifyBtnSave" value="保存">
            <input type="button" id="modifyBtnCancel" value="取消">
        </li>
        <li id="deleteFea"><label>删除：</label>
            <input type="checkbox" id="delete">
        </li>
        <li id="selectFea"><label for="selection">选择：</label>
            <input type="checkbox" id="selectionChe">
            <select id="selection">
                <option id="pointSel" class="" value="1" selected>点选</option>
                <option id="boxSel" class="" value="2">框选</option>
                <option id="circleSel" class="" value="3">圆选</option>
                <option id="polygonSel" class="" value="4">多边形选</option>
            </select>
        </li>
    </ul>
</div>
<div id="map">
    <div id="popup" title="我是气泡" class="ol-popup">
        <div id="popup-closer" class="ol-popup-closer"></div>
        <div id="popup-content"></div>
    </div>
</div>

<div id="dialog-form" title="绘制要素" style="height: 425px;">
    <p class="validateTips">所有表单字段都是必填的。</p>
    <form id="featureCon">
        <fieldset>
            <label for="type">几何类型</label>
            <input type="text" name="type" id="type" class="text ui-widget-content ui-corner-all">
            <label for="infoType">信息类型</label>
            <input type="text" name="infoType" id="infoType" class="text ui-widget-content ui-corner-all">
            <label for="name">名称</label>
            <input type="text" name="name" id="name" class="text ui-widget-content ui-corner-all">
            <label for="name">省市</label>
            <input type="text" name="city" id="city" class="text ui-widget-content ui-corner-all">
        </fieldset>
    </form>
</div>

<div id="dialog-delete" title="删除要素">
    <p>确定要删除吗？</p>
</div>

<div id="dialog-modify" title="修改要素">
    <p>确定要修改吗？</p>
</div>

<div id="dialog-display" title="所选要素" style="width: 500px;height: 500px">
    <table id="d1">
        <%--<tr>--%>
            <%--<thead>--%>
            <%--<td></td>--%>
            <%--<td></td>--%>
            <%--<td></td>--%>
            <%--</thead>--%>
        <%--</tr>--%>
    </table>
</div>

<div id="menu" >
    <label>几何图形类型：&nbsp;</label>
    <select id="geoType">
        <option value="Point">点</option>
        <option value="LineString">线</option>
        <option value="Polygon">面</option>
    </select>
    <input type="button" value="清空" id="empty">
    <input type="button" value="查询" id="query">

    <label class="title" > 热区功能：</label>
    <button id="showReg" class="btn" title="加载热区后请用鼠标移动到热区范围显示其信息">显示热区</button>
    <button id="drawReg" class="btn" title="单击绘制热区按钮后请用鼠标在地图上绘制热区">绘制热区</button>
    <button id="deleteReg" class="btn" title="单击删除热区按钮后请用鼠标在地图上选中删除要素操作">删除热区</button>
    <span id="info">没有要素被选中</span>
</div>
<%--<div id="dialog-confirm" title="图形属性信息设置">--%>
    <%--<label >图形类型（GeoType）：</label>--%>
    <%--<select id="geoType">--%>
        <%--<option value="Point" selected="selected" disabled="disabled">点</option>--%>
        <%--<option value="LineString" disabled="disabled">线</option>--%>
        <%--<option value="Polygon" disabled="disabled">多边形</option>--%>
    <%--</select><br/>--%>
    <%--<label >信息类别（infoType）：</label>--%>
    <%--<select id="infoType">--%>
        <%--<option value="Point" selected="selected" disabled="disabled">兴趣点</option>--%>
        <%--<option value="LineString" disabled="disabled">道路线</option>--%>
        <%--<option value="Polygon" disabled="disabled">高校区域</option>--%>
    <%--</select><br/>--%>
    <%--<label>名称（name）：<input id='name' type="text" value=""></label><br/>--%>
    <%--<label>省市（city）：<input id='city' type="text" value=""></label>--%>
<%--</div>--%>
<%--<div id="dialog-delete" title="删除热区要素确认">--%>
    <%--<label>请确认是否删除该要素</label><br />--%>
<%--</div>--%>


</body>
</html>
