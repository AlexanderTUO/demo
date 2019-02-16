package com.example.blog.service;

import com.example.blog.mapper.mysql.UserMapper;
import com.example.blog.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserMapper userMapper;

    @Autowired
    public UserService (UserMapper userMapper){
        this.userMapper = userMapper;
    }

    public User add(User user){
        userMapper.add(user);
        return findById(user.getId());
    }

    public User findById(int id){
        User user = new User();
        user.setId(id);
        return userMapper.findOne(user);
    }

    public User findByName(String name){
        User user = new User();
        user.setName(name);
        return userMapper.findOne(user);
    }
}
