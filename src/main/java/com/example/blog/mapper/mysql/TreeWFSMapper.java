package com.example.blog.mapper.mysql;

import com.example.blog.entity.TreeWFS;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2019/2/20 10:46
 * @Description:
 */
@Mapper
public interface TreeWFSMapper {
    List<TreeWFS> getTreeWFS();
}
