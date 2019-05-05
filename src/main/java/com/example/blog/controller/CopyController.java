package com.example.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: tyk
 * @Date: 2019/5/5 10:59
 * @Description:
 */
@Controller
public class CopyController {
    @RequestMapping("login_")
    public String login_() {
        return "login_";
    }
}
