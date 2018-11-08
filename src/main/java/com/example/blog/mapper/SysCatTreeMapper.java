package com.example.blog.mapper;

import com.example.blog.entity.SysCatTree;
import com.example.blog.model.Item;
import com.example.blog.model.ItemQuery;
import com.example.blog.model.ItemQueryBean;

import java.util.List;

public interface SysCatTreeMapper {
    List<SysCatTree> findTrees(ItemQuery itemQuery);
}
