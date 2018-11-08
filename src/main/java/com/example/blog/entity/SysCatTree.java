package com.example.blog.entity;

import lombok.Data;

import java.util.List;

//定义相应的树形机构类
@Data
public class SysCatTree implements java.io.Serializable{

    private static final long serialVersionUID = 3118551510633166045L;

    /** 分类ID*/
    private String catId;
    /** 分类ID -catId别名*/
    private String id;

    /** 01-国民经济行业分类*/
    private String catKind;

    /** 分类名称*/
    private String catName;
    /** 分类名称 -catName别名*/
    private String label;

    /** 父类ID*/
    private String parentId;

    /** 行业编码*/
    private String catCode;
    /** 子类*/
    private List<SysCatTree> nodes;

    public void setCatId(String catId) {
        this.catId = catId;
        this.id = catId;
    }

    public String getCatName() {
        return catName;
    }
    public void setCatName(String catName) {
        this.catName = catName;
        this.label = catName;
    }
    //...省略get/set方法

}