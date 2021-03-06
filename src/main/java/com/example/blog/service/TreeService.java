package com.example.blog.service;

import com.example.blog.entity.SysCatTree;
import com.example.blog.mapper.mysql.SysCatTreeMapper;
import com.example.blog.model.ItemQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TreeService {
    @Autowired
    private SysCatTreeMapper sysCatTreeMapper;

    public List findTrees(ItemQuery itemQuery){
        List items = sysCatTreeMapper.findTrees(itemQuery);
        List trees = createTree(items,"#");
        return trees;
    }

    private static List<SysCatTree> createTree(List<SysCatTree> menuList, String parentId) {
        List<SysCatTree> childMenu = new ArrayList<>();
        for (SysCatTree catTree : menuList) {
            if (parentId.equals(catTree.getParent())) {
                List<SysCatTree> c_node = createTree(menuList, catTree.getId());
                catTree.setChildren(c_node);
                childMenu.add(catTree);
            }
        }
        return childMenu;
    }


    public List findList(ItemQuery itemQuery){
        List items = sysCatTreeMapper.findTrees(itemQuery);
        return items;
    }
}
