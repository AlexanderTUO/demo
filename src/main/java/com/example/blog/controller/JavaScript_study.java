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

    @RequestMapping("15Canvas")
    public String js_study_15Canvas() {
        return "js_study/15Canvas";
    }

}
