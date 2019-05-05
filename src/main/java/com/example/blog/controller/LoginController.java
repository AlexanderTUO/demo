package com.example.blog.controller;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;

/**
 * @Author: tyk
 * @Date: 2019/5/5 15:21
 * @Description:
 */
@Controller
public class LoginController {

    @Autowired
    private Producer producer;


    @RequestMapping(value = "/kaptcha.jpg",method = RequestMethod.GET)
    public void changeImg(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Cache-Control","no-store,no-cache");
        response.setContentType("image/jpeg");

        HttpSession session = request.getSession();
//        获取验证码
        String text = producer.createText();
        session.setAttribute(Constants.KAPTCHA_SESSION_KEY,text);
        BufferedImage image = producer.createImage(text);

        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image, "jpg", out);
        IOUtils.closeQuietly(out);
    }

    @RequestMapping("sys/login")
    public String login(HttpServletRequest request, Model model) {
        return null;
    }
}
