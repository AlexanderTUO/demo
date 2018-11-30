package com.example.blog.controller;

import com.example.blog.entity.FeatureEntity;
import com.example.blog.model.FeatureQuery;
import com.example.blog.service.FeatureService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public String saveFeature(@RequestBody FeatureQuery featureQuery) {
        FeatureEntity featureEntity = new FeatureEntity();
        BeanUtils.copyProperties(featureQuery,featureEntity);
        String attrData = featureQuery.getAttr();
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

    @RequestMapping("delete/{regId}")
    @ResponseBody
    public String deleteFeature(@PathVariable String regId) {
        List<FeatureEntity> list = featureService.list();
        return "删除成功";
    }



}
