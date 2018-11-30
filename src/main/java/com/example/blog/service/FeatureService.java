package com.example.blog.service;

import com.example.blog.entity.FeatureEntity;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/11/22 09:20
 * @Description:
 */
public interface FeatureService {
    void saveFeature(FeatureEntity featureEntity) ;
    List<FeatureEntity> list();

    void deleteFeature(String regId);

}
