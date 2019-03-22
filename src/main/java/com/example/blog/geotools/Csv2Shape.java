package com.example.blog.geotools;

import org.geotools.data.DataUtilities;
import org.geotools.data.DefaultTransaction;
import org.geotools.data.Transaction;
import org.geotools.data.collection.ListFeatureCollection;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.data.simple.SimpleFeatureStore;
import org.geotools.data.store.ContentFeatureSource;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.geometry.jts.JTSFactoryFinder;
import org.geotools.swing.data.JFileDataStoreChooser;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;

import javax.swing.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: tyk
 * @Date: 2019/3/22 11:10
 * @Description:
 */
public class Csv2Shape {
    public static void main(String[] args) throws Exception  {
        // Set cross-platform look & feel for compatability
        UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());

        File file = JFileDataStoreChooser.showOpenFile("csv", null);
        if (file == null) {
            return;
        }

        /*
         * We use the DataUtilities class to create a FeatureType that will describe the data in our
         * shapefile.
         *
         * See also the createFeatureType method below for another, more flexible approach.
         */
        final SimpleFeatureType TYPE =
                DataUtilities.createType(
                        "Location",
                        "the_geom:Point:srid=4326,"
                                + // <- the geometry attribute: Point type
                                "name:String,"
                                + // <- a String attribute
                                "number:Integer" // a number attribute
                );
        System.out.println("TYPE:" + TYPE);

//        创建矢量
        List<SimpleFeature> features = new ArrayList<>();
        GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();
        SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(TYPE);

//        从文件中读取数据装入list
        BufferedReader reader = new BufferedReader(new FileReader(file));
        String line = reader.readLine();
        System.out.println("首行：" + line);

        for (line = reader.readLine(); line != null; line = reader.readLine()) {
            if (line.trim().length() > 0) {
                String[] field = line.split(",");
                Double lat = Double.parseDouble(field[0]);
                Double lon = Double.parseDouble(field[1]);
                String city = field[2].trim();
                Integer number = Integer.parseInt(field[3].trim());

                Point point = geometryFactory.createPoint(new Coordinate(lat, lon));

                featureBuilder.add(point);
                featureBuilder.add(city);
                featureBuilder.add(number);

                SimpleFeature feature = featureBuilder.buildFeature(null);
                features.add(feature);
            }
        }

//        创建shp保存feature
        File newShapeFile = getNewShapeFile(file);
        ShapefileDataStoreFactory dataStoreFactory = new ShapefileDataStoreFactory();
        Map<String, Serializable> parms = new HashMap<>();
        parms.put("url", newShapeFile.toURI().toURL());
        parms.put("create spatial index", Boolean.TRUE);
        ShapefileDataStore shapefileDataStore = (ShapefileDataStore) dataStoreFactory.createDataStore(parms);

        shapefileDataStore.createSchema(TYPE);

//        将feature写入shp中
        Transaction transaction = new DefaultTransaction("create");
        String typeName = shapefileDataStore.getTypeNames()[0];
        SimpleFeatureSource simpleFeatureSource = shapefileDataStore.getFeatureSource(typeName);
        SimpleFeatureType SHAPE_TYPE = ((ContentFeatureSource) simpleFeatureSource).getSchema();

        System.out.println(SHAPE_TYPE);
        if (simpleFeatureSource instanceof SimpleFeatureStore) {
            SimpleFeatureStore featureStore = (SimpleFeatureStore) simpleFeatureSource;

            SimpleFeatureCollection collection = new ListFeatureCollection(TYPE, features);

            featureStore.setTransaction(transaction);

            try {
                featureStore.addFeatures(collection);
                transaction.commit();
            } catch (Exception ex) {
                ex.printStackTrace();
                transaction.rollback();
            } finally {
                transaction.close();
            }
            System.exit(0);
        } else {
            System.out.println(typeName+"does not support read/write access");
            System.exit(1);
        }

    }

    /**
     * 新建shp文件
     * @param csvFile
     * @return
     */
    private static File getNewShapeFile(File csvFile) {
        String path = csvFile.getAbsolutePath();
        String newPath = path.substring(0, path.length() - 4)+".shp";

        JFileDataStoreChooser chooser = new JFileDataStoreChooser("shp");
        chooser.setDialogTitle("Save shapefile");
        chooser.setSelectedFile(new File(newPath));

        int returnVal = chooser.showSaveDialog(null);

        if (returnVal != JFileDataStoreChooser.APPROVE_OPTION) {
            System.exit(0);
        }
        File newFile = chooser.getSelectedFile();
        if (newFile.equals(csvFile)) {
            System.out.println("can't replace "+csvFile);
            System.exit(0);
        }
        return newFile;
    }

}
