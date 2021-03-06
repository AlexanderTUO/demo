package com.example.blog.entity;

import lombok.Data;

/**
 * @Author: tyk
 * @Date: 2018/11/21 11:11
 * @Description:
 */
@Data
public class FeatureEntity {
    private String id;
    private String name;
    private String city;
    private String type;
    private String infoType;
    private String geometry;
    private Double radius;

    private Integer grid;

}
