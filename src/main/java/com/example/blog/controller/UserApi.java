package com.example.blog.controller;

import com.example.blog.model.User;
import com.example.blog.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserApi {

    private UserService userService;

    @Autowired
    public UserApi (UserService userService){
        this.userService = userService;
    }

    @RequestMapping(path = "/add")
    public Object add(@RequestBody User user){
        System.out.println("试试git");
        System.out.println("试试push");
        System.out.println("再来");
        System.out.println("sad");
        System.out.println("试试冲突");

        if (userService.findByName(user.getName())!=null){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("message","用户名已被使用");
            return jsonObject;
        }
        return userService.add(user);
    }

}
