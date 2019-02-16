package com.example.blog.mapper.postgresql;

import com.example.blog.entity.XZQ;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PostMapper {
//    @Select("SELECT * FROM \"510100\" WHERE gid=#{pk} ")
    XZQ getXZQ(@Param("pk") int pk);
}
