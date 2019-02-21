package com.example.blog.entity;

import lombok.Data;

/**
 * @Author: tyk
 * @Date: 2019/2/20 10:42
 * @Description:
 */
@Data
public class TreeWFS implements java.io.Serializable{
    private Integer catId;
    private String id;
    private String parent;
    private String text;
    private String type;
    private String geoType;
    private String layerName;
}
