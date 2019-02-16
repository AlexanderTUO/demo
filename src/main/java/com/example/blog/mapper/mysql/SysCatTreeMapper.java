package com.example.blog.mapper.mysql;

import com.example.blog.entity.SysCatTree;
import com.example.blog.model.Item;
import com.example.blog.model.ItemQuery;
import com.example.blog.model.ItemQueryBean;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface SysCatTreeMapper {
    List<SysCatTree> findTrees(ItemQuery itemQuery);
}
