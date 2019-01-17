package com.example.blog.test;

import org.gdal.gdal.gdal;
import org.gdal.ogr.DataSource;
import org.gdal.ogr.Driver;
import org.gdal.ogr.ogr;

import java.util.Vector;

public class Gdal {
    public static void main(String[] args) {
        dataTransfer();
    }

    private static void dataTransfer() {
        ogr.RegisterAll();
        //支持中文路径
        gdal.SetConfigOption("GDAL_FILENAME_IS_UTF8","YES");
        //支持中文字段
        gdal.SetConfigOption("SHAPE_ENCODING","CP936");
//        String strVectorFile = "D:\\Tools\\GIS\\Data\\test\\testSC.shp";
        String strVectorFile = "D:\\Tools\\GIS\\Data\\geoJSON\\510100.geojson";
//        String strVectorFile = "D:\\Tools\\GIS\\Data\\kml\\xj_jq.kml";
//        String strVectorFile = "D:\\Tools\\GIS\\Data\\kml\\xj_jq.kml";
        DataSource dataSource = ogr.Open(strVectorFile, 0);
        if (dataSource == null) {
            System.out.println("加载数据源失败！");
            return;
        }
        System.out.println("加载数据源成功！");

//        Driver driver = ogr.GetDriverByName("GeoJSON");
        Driver driver = ogr.GetDriverByName("KML");
//        Driver driver = ogr.GetDriverByName("ESRI Shapefile");

        if (driver == null) {
            System.out.println("加载驱动失败！");
            return;
        }
        System.out.println("加载驱动成功！");

//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\testSC.geojson");
//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\testSC.kml");//有乱码

//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\testSC2.kml");//有乱码
//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\testSC2.shp");

//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\xj_jq.geojson");
//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\shp\\510100.shp");
        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\kml\\510100.kml");


        System.out.println("数据转换成功");
    }


}
