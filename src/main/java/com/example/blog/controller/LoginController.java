package com.example.blog.controller;

import com.example.blog.Util.StringUtil;
import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
    @ResponseBody
    public Map<String,Object> login(HttpServletRequest request, Model model) {
        Map map = new HashMap();
        String msg = "";
        //获取前台数据
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String kaptcha = request.getParameter("kaptcha");

        //校验验证码
        if (request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY) == null) {
            msg = "验证码已失效";
            map.put("msg", msg);
            return map;
        }
        String kaptchaPre = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
        if (StringUtils.isBlank(kaptcha)||!kaptchaPre.equalsIgnoreCase(kaptcha)) {
            msg = "验证码不正确";
            map.put("msg", msg);
            return map;
        }

        //校验用户名
        if (StringUtils.isBlank(username)) {
            msg = "用户名不能为空";
            map.put("msg", msg);
            return map;
        }
        //校验用户密码
        if (StringUtils.isBlank(password)) {
            msg = "密码不能为空";
            map.put("msg", msg);
            return map;
        }
        return map;
    }
}
