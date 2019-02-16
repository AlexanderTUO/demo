package com.example.blog.service.imp;

import com.example.blog.entity.FeatureEntity;
import com.example.blog.entity.XZQ;
import com.example.blog.mapper.mysql.FeatureMapper;
import com.example.blog.mapper.postgresql.PostMapper;
import com.example.blog.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/11/22 09:20
 * @Description:
 */
@Service
public class FeatureServiceImp implements FeatureService {

    @Autowired
    public FeatureMapper featureMapper;

    @Autowired
    public PostMapper postMapper;

    @Override
    public void saveFeature(FeatureEntity featureEntity) {
        featureMapper.saveFeature(featureEntity);
    }

    @Override
    public List<FeatureEntity> list() {
        List<FeatureEntity> list = featureMapper.listFeatures();
        return list;
    }

    @Override
    public void deleteFeature(String regId) {
        featureMapper.deleteFeature(regId);
    }

    @Override
    public void updateFeature(FeatureEntity featureEntity) {
        featureMapper.updateFeature(featureEntity);
    }

    public XZQ getXZQ(int id) {
        XZQ xzq = postMapper.getXZQ(id);
        return postMapper.getXZQ(id);
    }
}
