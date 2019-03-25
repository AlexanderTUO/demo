package com.example.blog.Util;



/**
 * @Author: tyk
 * @Date: 2019/3/25 11:43
 * @Description:自定义字符串工具
 */
public class StringUtil {
    public static String cutString(String target, char str1, char str2) {
        int index1 = target.lastIndexOf(str1);
        int index2 = target.lastIndexOf(str2);
        String substring = target.substring(index1 + 1, index2);
        System.out.println(substring);
        return substring;
    }
    public static void main(String[] args){
        StringUtil.cutString(".sdfs)", '.', ')');

    }
}
