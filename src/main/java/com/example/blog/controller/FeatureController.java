package com.example.blog.controller;

import com.example.blog.entity.FeatureEntity;
import com.example.blog.model.Feature;
import com.example.blog.service.FeatureService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/11/22 09:20
 * @Description:
 */
@Controller
@RequestMapping("/Feature/")
public class FeatureController {

    @Autowired
    public FeatureService featureService;

    @RequestMapping(value = {"save", "save"}, method = RequestMethod.POST)
    @ResponseBody
    public String saveFeature(@RequestBody Feature feature) {
        FeatureEntity featureEntity = new FeatureEntity();
        BeanUtils.copyProperties(feature,featureEntity);
        String attrData = feature.getAttr();
        String attr[] = attrData.split(",");
        String name = attr[0];
        String city = attr[1];
        featureEntity.setName(name);
        featureEntity.setCity(city);

        featureService.saveFeature(featureEntity);
        return "success";
    }

    @RequestMapping(value = {"query", "query"}, method = RequestMethod.GET)
    @ResponseBody
    public List<FeatureEntity> queryFeatures() {
        List<FeatureEntity> list = featureService.list();
        return list;
    }

}
