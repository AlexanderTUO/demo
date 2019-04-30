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

    @RequestMapping("03CSSLayout")
    public String bs_study_03CSSLayout() {
        return "bs_study/03CSSLayout";
    }

    @RequestMapping("04CSSCom")
    public String bs_study_04CSSCom() {
        return "bs_study/04CSSCom";
    }

    @RequestMapping("05JSplugins")
    public String bs_study_05JSplugins() {
        return "bs_study/05JSplugins";
    }

    @RequestMapping("06extent")
    public String bs_study_06extent() {
        return "bs_study/06extent";
    }

    @RequestMapping("exercise1")
    public String exercise1() {
        return "bs_study/exercise1";
    }

    @RequestMapping("exercise2")
    public String exercise2() {
        return "bs_study/exercise2";
    }

}
