package com.example.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JavaScript_study {
    @RequestMapping("jsStudy")
    public String jsStudy() {
        return "jsStudy";
    }

    @RequestMapping("08BOM")
    public String js_study_08BOM() {
        return "js_study/08BOM";
    }

    @RequestMapping("10DOM")
    public String js_study_10DOM() {
        return "js_study/10DOM";
    }

    @RequestMapping("13Event")
    public String js_study_13Event() {
        return "js_study/13Event";
    }

    @RequestMapping("14Form")
    public String js_study_14Form() {
        return "js_study/14Form";
    }

    @RequestMapping("15Canvas")
    public String js_study_15Canvas() {
        return "js_study/15Canvas";
    }

    @RequestMapping("16HTML5")
    public String js_study_16HTML5() {
        return "js_study/16HTML5";
    }

    @RequestMapping("20JSON")
    public String js_study_20JSON() {
        return "js_study/20JSON";
    }

    @RequestMapping("21Ajax")
    public String js_study_21Ajax() {
        return "js_study/21Ajax";
    }


}
