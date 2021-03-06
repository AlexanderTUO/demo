package com.example.blog.geotools;

import com.example.blog.Util.StringUtil;
import org.gdal.gdal.gdal;
import org.gdal.ogr.DataSource;
import org.gdal.ogr.Driver;
import org.gdal.ogr.ogr;
import org.geotools.swing.data.JFileDataStoreChooser;

import javax.swing.filechooser.FileFilter;
import javax.swing.filechooser.FileSystemView;
import java.io.File;

/**
 * @Author: tyk
 * @Date: 2019/3/22 15:53
 * @Description: 数据格式转化shp、KML、geojson
 */
public class DataConverter {
    public static void  DataConverter(File input,File output,String type){

    }

    public static void main(String[] args){
        ogr.RegisterAll();
        //支持中文路径
        gdal.SetConfigOption("GDAL_FILENAME_IS_UTF8","YES");
        //支持中文字段
        gdal.SetConfigOption("SHAPE_ENCODING","CP936");

//        打开选择文件对话框，获取转换文件
        String[] formats = {"shp","kml","geojson"};
        File inputFile = JFileDataStoreChooser.showOpenFile(formats,new File("D:\\Tools\\GIS\\Data"),null);
        FileSystemView fileSystemView = FileSystemView.getFileSystemView();


        if (inputFile==null) {
            return;
        }
        String input = inputFile.getAbsolutePath();
        System.out.println("输入文件："+input);


        DataSource dataSource = ogr.Open(input, 0);
        if (dataSource == null) {
            System.out.println("加载数据源失败！");
            return;
        }
        System.out.println("加载数据源成功！");


//        打开关闭文件对话框，获取转换后的文件，根据后缀获取转换类型
//        String output = input.substring(0, input.length() - 4)+".kml";
        JFileDataStoreChooser chooser = new JFileDataStoreChooser(formats);
        chooser.setDialogTitle("Data Convention");
        chooser.setSelectedFile(new File(input.split(",")[0]));
        int returnVal = chooser.showSaveDialog(null);

        if (returnVal != JFileDataStoreChooser.APPROVE_OPTION) {
            System.exit(0);
        }

        File outputFile = chooser.getSelectedFile();
        FileFilter filter = chooser.getFileFilter();

        if (outputFile == null) {
            return;
        }
        String suffix = StringUtil.cutString(filter.getDescription(),'.',')');

//        String type = output.split("\\.")[1];

        String type = null;
        switch (suffix) {
            case "kml":
                type = "KML";
                break;
            case "shp":
                type = "ESRI Shapefile";
                break;
            case "geojson":
                type = "GeoJSON";
                break;
        }

        String path = outputFile.getAbsolutePath();
        if (path.indexOf('.')!=-1) {
            path = path.split("\\.")[0];
        }

        String output = path+"."+ suffix;

//        if (newFile.equals(csvFile)) {
//            System.out.println("can't replace "+csvFile);
//            System.exit(0);
//        }


//        进行转换
        Driver driver = ogr.GetDriverByName(type);

        if (driver == null) {
            System.out.println("加载驱动失败！");
            return;
        }
        System.out.println("加载驱动成功！");
        driver.CopyDataSource(dataSource, output);

        System.out.println("数据转换成功");

    }
}
