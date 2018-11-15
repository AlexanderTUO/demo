package com.example.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OpenLayersController {
    @RequestMapping("toOpenLayers")
    public String toOpenLayers() {
        return "openLayers";
    }

    @RequestMapping("toOpenLayers2")
    public String toOpenLayers2() {
        return "openLayers2";
    }

    @RequestMapping("toOpenLayers3")
    public String toOpenLayers3() {
        return "openLayers3";
    }

    @RequestMapping("ol_gaode")
    public String ol_gaode() {
        return "ol_gaode";
    }

    @RequestMapping("track")
    public String track() {
        return "track";
    }

    @RequestMapping("track2")
    public String track2() {
        return "track2";
    }

    @RequestMapping("wfs")
    public String wfs() {
        return "wfs";
    }
}
