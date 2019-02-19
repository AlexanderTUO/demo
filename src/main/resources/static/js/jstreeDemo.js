$(function () {
    // $("#jstreeDemo").jstree({
    //     "core" : {
    //         // expand_selected_onload: true,//默认全部展开
    //         "themes" : {
    //             "variant" : "large"
    //         },
    //         // 'data':{
    //         //     'url': "getTrees",
    //         //     "dataType" : "json", // needed only if you do not supply JSON headers
    //         // }
    //         'data' : [
    //             { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
    //             { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
    //             { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
    //             { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
    //         ]
    //
    //     },
    //     // "checkbox" : {
    //     //     "keep_selected_style" : false
    //     // },
    //     // "plugins" : [ "wholerow", "checkbox" ]
    //
    //
    // });
    var jsonstr="[]";
    var jsonarray = eval('('+jsonstr+')');
    $("#jstreeDemo").jstree({
        "core" : {
            "themes" : {
                "responsive": false		                }, 		                // so that create works
                "check_callback" : true,
            'data' : function (obj, callback) {
                $.ajax({
                    type: "GET",
                    url:"getTrees",
                    dataType:"json",
                    async: false,
                    success:function(result) {
                        var arrays= result;
                        for(var i=0 ; i<arrays.length; i++){
                            console.log(arrays[i])
                            var arr = {
                                "id":arrays[i].id,
                                "parent":arrays[i].parent,
                                "text":arrays[i].text,
                                "open": true
                            }
                            jsonarray.push(arr);
                            if (arrays[i].children && arrays[i].children.length > 0) {
                                traverseTree(arrays[i]);
                            }
                        }
                    }
                });
                callback.call(this, jsonarray);
            }
            },
        "types" : {
            "default" : {
                "icon" : "glyphicon glyphicon-flash"
            },
            "file" : {
                "icon" : "glyphicon glyphicon-ok"
            }		            },
        "state" : { "key" : "demo2" },
        "plugins" : [ "dnd", "state", "types","checkbox","wholerow" ]
    });

    function traverseTree(node){
        if (!node) {
            return;
        }
        // traverseNode(node);
        if (node.children && node.children.length > 0) {
            for (var i = 0; i < node.children.length; i++) {
                console.log(node[i])
                var arr = {
                    "id":node.children[i].id,
                    "parent":node.children[i].parent,
                    "text":node.children[i].text,
                }
                jsonarray.push(arr);
                traverseTree(node.children[i]);
            }
        }
    }
})