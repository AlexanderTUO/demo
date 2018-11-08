$(function(){
	//页面加载完成之后执行
	pageInit();
});
function pageInit(){
	//创建jqGrid组件
	var jgGrid = jQuery("#list2").jqGrid(
			{
				url : 'page',//组件创建完成之后请求数据的url
				// url : 'data/JSONData.json',//组件创建完成之后请求数据的url
				datatype : "json",//请求数据返回的类型。可选json,xml,txt
				colNames : [ 'driverName', 'driverNumber', 'sex', 'mobile', 'birthDate' ],//jqGrid的列显示名字
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'driverName',index : 'driverName',width : 55,},
				             {name : 'driverNumber',index : 'driverNumber',width : 90},
				             {name : 'sex',index : 'sex',width : 100},
				             {name : 'mobile',index : 'mobile',width : 80,align : "right"},
				             {name : 'birthDate',index : 'birthDate',width : 80,align : "right"},



							// {name : 'total',index : 'total',width : 80,align : "right",sortable : true},
				            //  {name : 'note',index : 'note',width : 150,sortable : true},
                    /**                                *  改列显示编辑、保存、重置按钮，在编辑操作会用到                                */


				           ],
				rowNum : 10,//一页显示多少条
				rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
				jsonReader:{
					root:"rows",
					page:"page",
					total:"total",
					records:"records",
					repeatitems:false,
					id:"id"
				},
				pager : '#pager2',//表格页脚的占位符(一般是div)的id
				sortname : 'id',//初始化的时候排序的字段
				sortorder : "desc",//排序方式,可选desc,asc
				mtype : "post",//向后台请求数据的ajax的类型。可选post,get
				viewrecords : true,
				caption : "JSON Example"//表格的标题名字
			});
	/*创建jqGrid的操作按钮容器*/
	/*可以控制界面上增删改查的按钮是否显示*/
	jQuery("#list2").jqGrid('navGrid', '#pager2',
		{edit : true,add : true,del : true,search:true},
		{},{},{},{multipleSearch:true})

	// // 自定义按钮
	// .navButtonAdd('#pager2',{
	// 	caption:"",buttonicon:"ui-icon-circle-plus",onClickButton:function () {
	// 		addRows();
    //     },
	// 	position:"first"
	// })
	//
	// .navButtonAdd('#pager2',{
	// 	caption:"",buttonicon:"ui-icon-trash",onClickButton:function () {
	// 		removeRows();
	// 	},
	// 	position:"first"
	// })
	//
	// .navButtonAdd('#pager2',{
	// 	caption:"",buttonicon:"ui-icon-circle-plus",onClickButton:function () {
	// 		addRows();
	// 	},
	// 	position:"first"
	// })
	// jQuery("#grid_id").jqGrid({
	// 	pager:'#gridpager'
	// })
	function addRows(){
		$("list2").jqGrid('editGridRow',"new",{

		})
	}




	jQuery("#geta1").click(function () {
		var id = $("#list2").jqGrid("getGridParam","selrow");
		if (id){
			var ret = $("#list2").jqGrid("getRowData",id);
			alert("id="+ret.id+"	invdate="+ret.invdate);
		}else {
			alert("Please select Row")
		}
    })

	$("#deletea2").click(function () {
		var su = $("#list2").jqGrid("delRowData",2);
		if (su){
			alert("delete success")
		}else {
			alert("delete fail")
		}
    })

	$("#updatea3").click(function () {
		var su = $("#list2").jqGrid("setRowData",3,{
			amount:"666",
			tax:"66",
			total:"6666",
			note:"我被改了"
		})
        if (su){
            alert("update success")
        }else {
            alert("update fail")
        }
    })

	$("#adda4").click(function () {
		var datarow = {
            id : "99",
            invdate : "2007-09-01",
            name : "test3",
            note : "note3",
            amount : "400.00",
            tax : "30.00",
            total : "430.00"
		}
		var su = $("#list2").jqGrid("addRowData",110,datarow);
        if (su){
            alert("add success")
        }else {
            alert("add fail")
        }
    })

	$("#search").click(function () {
		var $driverName = $("#driverName").val();
		$.getJSON("search",{
            driverName:$driverName
		},function (data) {
            jgGrid.trigger("reloadGrid");
        })
    })
}