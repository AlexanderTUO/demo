package com.example.blog.mapper;

import com.example.blog.entity.FeatureEntity;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/11/22 09:23
 * @Description:
 */

public interface FeatureMapper {
    void saveFeature(FeatureEntity featureEntity);

    List<FeatureEntity> listFeatures();
}
