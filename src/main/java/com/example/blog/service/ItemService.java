package com.example.blog.service;

import com.example.blog.mapper.mysql.ItemMapper;
import com.example.blog.model.ItemQuery;
import com.example.blog.model.ItemQueryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemMapper itemMapper;
    public List findItems(ItemQuery itemQuery){
        return itemMapper.findItems(itemQuery);
    }

    public int getTotalRows(ItemQueryBean itemQueryBean){
        return itemMapper.getTotalRows(itemQueryBean);
    }
}
