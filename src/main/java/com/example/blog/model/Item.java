package com.example.blog.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Item {
//    private Integer id;
//    private Integer invdate;
//    private String name;
//    private Double amount;
//    private Double tax;
//    private Double total;
//    private String note;
    private String driverId;//驾驶员ID
    private String driverName;//姓名
    private String driverNumber;//驾驶证号
    private Integer sex;//性别
    private String mobile;//电话号码
    private Date birthDate;//出生日期
    private Date firstGetLiceseDate;//初次领证时间
    private Integer carType;//准驾车型
    private Date driverLicenseStartDate;//驾照有效期（起）
    private Date driverLicenseEndDate;//驾照有效期（止）
    private Date hireDate;//入职时间
    private Integer status;//员工状态 0：空闲、1：值班、2：出车、3	：休息
    private String mark;//备注
    private String deptId;
    private String picPath;//驾驶证图片
    private List<String> picPathIds;
    private String deptName;//所属部门名字
    private Integer warnNum; //预警状态 {0：已经过期，1：即将过期}

    private Integer totalScore ;//总评分
    private Integer scoreCount ;//评分次数
}
