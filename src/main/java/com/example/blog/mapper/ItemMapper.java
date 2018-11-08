package com.example.blog.mapper;

import com.example.blog.model.Item;
import com.example.blog.model.ItemQuery;
import com.example.blog.model.ItemQueryBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ItemMapper {
    List<Item> findItems(ItemQuery itemQuery);

    int getTotalRows(ItemQueryBean itemQueryBean);
}
