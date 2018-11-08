package com.example.blog.model;

import lombok.Data;

@Data
public class LearnResouce {
    private String author ;
    private String title;
    private String url;

    public LearnResouce(String author, String title, String url) {
        this.author = author;
        this.title = title;
        this.url = url;
    }

    public LearnResouce() {
    }
}
