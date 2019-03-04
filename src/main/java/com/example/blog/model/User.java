package com.example.blog.model;

import com.example.blog.entity.XZQ;
import lombok.Data;

@Data
public class User {
    private Integer id;
    private String name;
    private String password;

    private XZQ xzq;

    public User() {
    }

    public User(Integer id, String name, String password, XZQ xzq) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.xzq = xzq;
    }

    public User(Integer id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}
