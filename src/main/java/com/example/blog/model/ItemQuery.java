package com.example.blog.model;

import lombok.Data;

import java.util.Date;
@Data
public class ItemQuery {
    private String driverName;
    private String driverNumber;//驾驶证号
    private Integer sex;//性别
    private String mobile;//电话号码
    private Date birthDate;//出生日期

    private Integer limit;
    private Integer offset;
}
