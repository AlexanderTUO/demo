package com.example.blog.test;

import java.io.File;

/**
 * @Author: tyk
 * @Date: 2019/1/15 15:36
 * @Description:
 */
public class FileTest {

    public static void main(String[] args){
        String savePath = "E:\\temp";
        createFolder(savePath,"GeoJSON");
    }

    private static void createFolder(String savePath,String type) {
        File dir = new File(savePath+"\\"+type+"\\");
        if (!dir.exists()) {
            dir.mkdir();
        }
        if (dir.isDirectory()) {
            String[] list = dir.list();
            for (int index = 0; index < list.length; index++) {
                System.out.println(list[index]);
            }
        }
    }
}
