package com.example.blog.mapper.mysql;

import com.example.blog.model.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int add(User user);
    User findOne(User user);
}