package com.example.blog.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PageModule<T> extends JqGridQueryBase{

    /** 查询返回结果数据 */
    private List<T> rows  = new ArrayList<T>();
}
