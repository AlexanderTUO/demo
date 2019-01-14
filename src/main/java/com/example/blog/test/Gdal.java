package com.example.blog.test;

import org.gdal.gdal.gdal;
import org.gdal.ogr.DataSource;
import org.gdal.ogr.Driver;
import org.gdal.ogr.ogr;

import java.util.Vector;

public class Gdal {
    public static void main(String[] args) {
        ogr.RegisterAll();
        gdal.SetConfigOption("GDAL_FILENAME_IS_UTF8", "No");
        gdal.SetConfigOption("SHAPE_ENCODING", "");
//        String strVectorFile = "D:\\Tools\\GIS\\Data\\test\\testSC.shp";
//        String strVectorFile = "D:\\Tools\\GIS\\Data\\test\\testSC.geojson";
//        String strVectorFile = "D:\\Tools\\GIS\\Data\\kml\\xj_jq.kml";
        String strVectorFile = "D:\\Tools\\GIS\\Data\\kml\\xj_jq.kml";
        DataSource dataSource = ogr.Open(strVectorFile, 0);
        if (dataSource == null) {
            System.out.println("加载数据源失败！");
            return;
        }
        System.out.println("加载数据源成功！");

//        Driver driver = ogr.GetDriverByName("GeoJSON");
//        Driver driver = ogr.GetDriverByName("KML");
        Driver driver = ogr.GetDriverByName("ESRI Shapefile");

        if (driver == null) {
            System.out.println("加载驱动失败！");
            return;
        }
        Vector vector = new Vector();
        System.out.println("加载驱动成功！");

//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\testSC.geojson");
//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\testSC.kml");//有乱码

//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\testSC2.kml");//有乱码
//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\testSC2.shp");

//        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\xj_jq.geojson");
        driver.CopyDataSource(dataSource, "D:\\Tools\\GIS\\Data\\test\\xj_jq2.shp");


        System.out.println("数据转换成功");
    }

    public void DataFormat(String filepath,String fileName,String driverName,
                           String outputPath,String outputFileName) {


    }



}
