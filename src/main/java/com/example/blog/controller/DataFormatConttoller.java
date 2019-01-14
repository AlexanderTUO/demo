package com.example.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: tyk
 * @Date: 2019/1/14 15:33
 * @Description:
 */
@Controller
public class DataFormatConttoller {
    @RequestMapping("transferFormat")
    public void transferFormat(@RequestParam("inputFile") String inputFile,
                               @RequestParam("transferFormat") String transferFormat,
                               @RequestParam("outputFile") String outputFile,
                               HttpServletRequest request,
                               HttpServletResponse response) {
        System.out.println("进来了");
    }

}
