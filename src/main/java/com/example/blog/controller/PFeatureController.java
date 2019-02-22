package com.example.blog.controller;

import com.example.blog.entity.FeatureEntity;
import com.example.blog.model.FeatureQuery;
import com.example.blog.service.FeatureService;
import com.example.blog.service.PFeatureService;
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
@RequestMapping("/PFeature/")
public class PFeatureController {

    @Autowired
    public PFeatureService pfeatureService;


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

        pfeatureService.saveFeature(featureEntity);
        return "success";
    }

//    @RequestMapping(value = {"query", "query"}, method = RequestMethod.GET)
//    @ResponseBody
//    public List<FeatureEntity> queryFeatures() {
//        List<FeatureEntity> list = featureService.list();
//        return list;
//    }

    @RequestMapping(value = "delete/{regId}")
    @ResponseBody
    public String deleteFeature(@PathVariable("regId") String regId) {
        pfeatureService.deleteFeature(regId);
        return "删除成功";
    }

    @RequestMapping(value = {"save2", "save2"}, method = RequestMethod.POST)
    @ResponseBody
    public String saveFeature2(@RequestBody FeatureEntity featureEntity) {

        pfeatureService.saveFeature(featureEntity);
        return "success";
    }

    @RequestMapping(value = {"updateFeature", "updateFeature"}, method = RequestMethod.POST)
    @ResponseBody
    public String updateFeature(@RequestBody FeatureEntity featureEntity) {
        pfeatureService.updateFeature(featureEntity);
        return "success";
    }


    @RequestMapping(value = "postinfo", method = RequestMethod.GET)
    @ResponseBody
    public String getpqinfo() {
        String name =  pfeatureService.getXZQ(1).getName();
        return name;
    }

}
