package com.example.blog.controller;

import com.example.blog.entity.SysCatTree;
import com.example.blog.entity.TreeWFS;
import com.example.blog.model.ItemQuery;
import com.example.blog.model.Tree;
import com.example.blog.service.TreeService;
import com.example.blog.service.TreeWFSService;
import lombok.experimental.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
//@RequestMapping("/tree/")
public class TreeController {


    @Autowired
    TreeService treeService;

    @Autowired
    TreeWFSService treeWFSService;

    @RequestMapping("EnterTree")
    public String getTrees(){
        return "jqTree";
    }

    @RequestMapping("EnterJsTree")
    public String getJsTrees(){
        return "jstree";
    }

    @RequestMapping("getTreeNode")
    @ResponseBody
    public List<Tree> GetTreeData(){
        List object = getNode(1);
        return object;
    }

    public List<Tree> getNode(int iNum){
        List<Tree> lstRes = new ArrayList<>();
        if (iNum > 5)
        {
            return lstRes;
        }
        for (int i = 1; i < 3; i++)
        {
            Tree oNode = new Tree();
            oNode.setId(i);
            oNode.setText(iNum + "级节点" + i );
            oNode.setNodes(getNode(iNum + 1));
            lstRes.add(oNode);
        }
        return lstRes;
    }
//    查询返回树结构数据
    @RequestMapping("getTrees")
    @ResponseBody
    public List<SysCatTree> getTrees2(){
        ItemQuery itemQuery = new ItemQuery();
        List<SysCatTree> list = treeService.findTrees(itemQuery);
        return list;
    }
    //    查询返回普通对象结构数据
    @RequestMapping("getList")
    @ResponseBody
    public  List<SysCatTree> getList(){
        ItemQuery itemQuery = new ItemQuery();
        List<SysCatTree> list = treeService.findList(itemQuery);
        return list;
    }

    @RequestMapping("getTreeWFS")
    @ResponseBody
    public  List<TreeWFS> getTreeWFS(){
        List<TreeWFS> list = treeWFSService.getTreeWFS();
        return list;
    }




}
