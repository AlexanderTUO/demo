package com.example.blog.mapper.mysql;

import com.example.blog.entity.FeatureEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/11/22 09:23
 * @Description:
 */
@Mapper
public interface FeatureMapper {
    void saveFeature(FeatureEntity featureEntity);

    List<FeatureEntity> listFeatures();

    void deleteFeature(@Param("regId") String regId);

    void updateFeature(FeatureEntity featureEntity) ;
}
