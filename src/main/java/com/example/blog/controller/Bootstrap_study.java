package com.example.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: tyk
 * @Date: 2019/4/24 16:15
 * @Description:
 */
@Controller
@RequestMapping("bs/")
public class Bootstrap_study {
    @RequestMapping("01base")
    public String bs_study_01base() {
        return "bs_study/01base";
    }

}
