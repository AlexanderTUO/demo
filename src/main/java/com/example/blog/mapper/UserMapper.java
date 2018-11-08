package com.example.blog.mapper;

import com.example.blog.model.User;

public interface UserMapper {
    int add(User user);
    User findOne(User user);
}