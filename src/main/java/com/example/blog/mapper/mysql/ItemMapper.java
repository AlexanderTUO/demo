package com.example.blog.mapper.mysql;

import com.example.blog.model.Item;
import com.example.blog.model.ItemQuery;
import com.example.blog.model.ItemQueryBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface ItemMapper {
    List<Item> findItems(ItemQuery itemQuery);

    int getTotalRows(ItemQueryBean itemQueryBean);
}
