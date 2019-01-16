package com.example.blog.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * @Author: tyk
 * @Date: 2019/1/14 15:33
 * @Description:
 */
@Controller
public class DataFormatController {
    @RequestMapping("/transferFormat")
    @ResponseBody
    public String transferFormat(@RequestParam MultipartFile inputFile
//                               @RequestParam("transferFormat") String transferFormat,
//                               @RequestParam("outputFile") String outputFile,
//                               HttpServletRequest request,
//                               HttpServletResponse response
    ) {
        if (!inputFile.isEmpty()) {
            try {
                System.out.println(inputFile.getOriginalFilename());
                BufferedOutputStream outputStream = new BufferedOutputStream(
                        new FileOutputStream(new File(inputFile.getOriginalFilename()))
                );
                outputStream.write(inputFile.getBytes());
                outputStream.flush();
                outputStream.close();
            } catch (Exception e) {
                return "上传失败";
            }
            return "上传成功";
        } else {
            return "上传失败，文件为空！";
        }
    }

//    @Autowired
//    private FileUploadService fileUploadService;


}
