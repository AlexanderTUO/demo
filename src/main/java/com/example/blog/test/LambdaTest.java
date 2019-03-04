package com.example.blog.test;

import com.example.blog.entity.XZQ;
import com.example.blog.model.User;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @Author: tyk
 * @Date: 2019/3/4 14:05
 * @Description:Lambda表达式，闭包，允许把函数作为一个方法的参数
 */
public class LambdaTest {
    public static void main(String[] args){
//    1.List To Map <==> Map To List
        List<User> userList = new ArrayList<>();
        XZQ xzq = new XZQ();
        xzq.setId("1");
        userList.add(new User(1,"3张三","123",xzq));
        userList.add(new User(2,"1李四","1234",xzq));
        userList.add(new User(3,"2王五","12345",xzq));

        Map<Integer, User> userMap = userList.stream().collect(Collectors.toMap(User::getId, Function.identity()));
        Map<Integer, User> userMap1 = userList.stream().collect(Collectors.toMap((User::getId), user -> user));

        System.out.println("----------传统方式遍历map");
        for (Map.Entry<Integer, User> entry : userMap.entrySet()) {
            System.out.println("id : " + entry.getKey() + " user : " + entry.getValue().getName());
        }

        System.out.println("----------1.List To Map <==> Map To List");
        userMap.forEach((id,user)->{
            System.out.println("id:"+id+",user:"+user.getName());
        });

        userList.forEach(user -> {
            System.out.println(user.getName());
        });


        User newUser = new User(1, "张三", "123");
        if (userList.contains(newUser)) {
            System.out.println("该用户已存在");
        }

//        2.List To Set <==> Set To List
        List<User> userListValues = new ArrayList<>(userMap.values());
        List<Integer> userListKeys = new ArrayList<>(userMap.keySet());

//        3.List与Set之间的相互转换
        Set<User> listToSet = new HashSet<>(userList);
        List<User> setToList = new ArrayList<>(listToSet);

//        4.Set与Map之间的转换与List相似
//        5.List对象排序
        userList.sort(Comparator.comparing(User::getName));

//        6.stream中filter功能
        List<User> filterResult = userList.stream().filter(user ->StringUtils.pathEquals(user.getName(),"3张三")).collect(Collectors.toList());
        filterResult.stream().forEach(user -> {
            System.out.println(user.getName());
        });
        System.out.println("----------6.stream中的stream功能:");
        filterResult.stream().forEach(user -> {
            System.out.println(user.getName());
        });

//        7.stream中map功能

        List<User> mapResult = userList.stream().map(user -> {
            user.setName("China"+user.getName());
            return user;
        }).collect(Collectors.toList());
        System.out.println("----------7.stream中的map功能:");
        mapResult.stream().forEach(user -> {
            System.out.println(user.getName());
        });

//        8.stream中map和filter功能混合

        List<User> mapAndFilter = userList.stream().filter(user -> StringUtils.pathEquals("China3张三",user.getName())).map(user -> {
            user.setName("liba"+user.getName());
            return user;
        }).collect(Collectors.toList());
        System.out.println("----------8.stream中map和filter功能混合:");
        mapAndFilter.stream().forEach(user -> {
            System.out.println(user.getName());
        });


        System.out.println("结束");
    }

}

