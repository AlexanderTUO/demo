package com.example.blog.model;

import lombok.Data;

/**
 * @Author: tyk
 * @Date: 2018/11/21 11:11
 * @Description:
 */
@Data
public class FeatureQuery {
    private String type;
    private String attr;
    private String geometry;
}
