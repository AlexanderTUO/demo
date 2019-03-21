package com.example.blog.test;

import org.geotools.data.CachingFeatureSource;
import org.geotools.data.FileDataStore;
import org.geotools.data.FileDataStoreFinder;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.map.FeatureLayer;
import org.geotools.map.Layer;
import org.geotools.map.MapContent;
import org.geotools.styling.SLD;
import org.geotools.styling.Style;
import org.geotools.swing.JMapFrame;
import org.geotools.swing.data.JFileDataStoreChooser;

import java.io.File;
import java.io.IOException;
import java.util.Collections;

/**
 * @Author: tyk
 * @Date: 2019/3/21 15:48
 * @Description:
 */
public class GeotoolsTest {
    public static void main(String[] args){
        File file = JFileDataStoreChooser.showOpenFile("shp", null);
        if (file == null) {
            return;
        }
        System.out.println(file);

        try {
            FileDataStore fileDataStore = FileDataStoreFinder.getDataStore(file);
            SimpleFeatureSource featureSource = fileDataStore.getFeatureSource();

            // CachingFeatureSource is deprecated as experimental (not yet production ready)
            CachingFeatureSource cache = new CachingFeatureSource(featureSource);

            MapContent mapContent = new MapContent();
            mapContent.setTitle("quickStart");

            Style style = SLD.createSimpleStyle(featureSource.getSchema());
            Layer layer = new FeatureLayer(featureSource, style);
            mapContent.addLayer(layer);

            JMapFrame.showMap(mapContent);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
