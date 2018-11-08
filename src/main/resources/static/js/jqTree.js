    var testdata = [{
        id: '1',
        text: '系统设置',
        nodes: [{
            id: '11',
            text: '编码管理',
            nodes: [{
                id: '111',
                text: '自动管理',
                nodes: [{
                    id: '1111',
                    text: '手动管理',
                    nodes: [{
                        id: '11111',
                        text: '底层管理',
                    }]
                }]
            }]
        }]
    }, {
        id: '2',
        text: '基础数据',
        nodes: [{
            id: '21',
            text: '基础特征'
        }, {
            id: '22',
            text: '特征管理'
        }]
    }];

    // $(function () {
    //     $("#ul_tree").jqtree({
    //         url:'getTreeNode',
    //         // data: testdata,
    //         param: { },
    //         onBeforeLoad: function (param) {
    //         },
    //         onLoadSuccess: function (data) {
    //         },
    //         onClickNode: function (selector) {
    //         }
    //     });
    // });
    $(function () {
        $("#ul_tree").jqtree({
            url: "getTrees",
            // data: testdata,
            param: { },
            onBeforeLoad: function (param) {
            },
            onLoadSuccess: function (data) {
            },
            onClickNode: function (selector) {
                // alert(selector.text())
            }
        });
    });