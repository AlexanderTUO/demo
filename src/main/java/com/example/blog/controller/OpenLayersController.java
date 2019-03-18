package com.example.blog.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OpenLayersController {
    Logger logger = LoggerFactory.getLogger("");
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

    @RequestMapping("track_ex")
    public String track_ex() {
        return "track_ex";
    }

    @RequestMapping("track2")
    public String track2() {
        return "track2";
    }

    @RequestMapping("wfs")
    public String wfs() {
        return "wfs";
    }

    @RequestMapping("wfs2")
    public String wfs2() {
        return "wfs2";
    }

    @RequestMapping("markerAnimation")
    public String markerAnimation() {
        return "markerAnimation";
    }

    @RequestMapping("interaction")
    public String interaction() {
        return "interaction";
    }

    @RequestMapping("modifyFeatures")
    public String modifyFeatures() {
        return "modifyFeatures";
    }

    @RequestMapping("saveFeatures")
    public String saveFeatures() {
        return "saveFeatures";
    }

    @RequestMapping("hotSpots")
    public String hotSpots() {
        return "hotSpots";
    }

    @RequestMapping("hotSpots1")
    public String hotSpots1() {
        return "hotSpots1";
    }

    @RequestMapping("date")
    public String date() {
        return "date";
    }

    @RequestMapping("kml")
    public String kml() {
        return "kml";
    }

    @RequestMapping("mapEcharts")
    public String mapEcharts() {
        return "mapEcharts";
    }

    @RequestMapping("dataformat")
    public String dataformat() {
        return "dataformat";
    }

    @RequestMapping("uploadForm")
    public String uploadForm() {
        return "uploadForm";
    }

    @RequestMapping("feature")
    public String feature() {
        return "feature";
    }

    @RequestMapping("formdata")
    public String formdata() {
        return "formdata";
    }

    @RequestMapping("jsts")
    public String jsts() {
        return "jsts";
    }

    @RequestMapping("featureWfs")
    public String featureWfs() {
        logger.trace("日志输出 trace");
        logger.debug("日志输出 debug");
        logger.info("日志输出 info");
        logger.warn("日志输出 warn");
        logger.error("日志输出 error");
        return "featureWfs";
    }

    @RequestMapping("jstree")
    public String jstree() {
        return "jstree";
    }

    @RequestMapping("gaodemap")
    public String gaodemap() {
        return "gaodemap";
    }

    @RequestMapping("login")
    public String login() {
        return "login";
    }

    @RequestMapping("requireTest")
    public String requireTest() {
        return "requireTest";
    }
}
