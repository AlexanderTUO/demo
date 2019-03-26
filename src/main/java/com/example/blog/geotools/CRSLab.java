package com.example.blog.geotools;

import org.geotools.data.*;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.geotools.geometry.jts.JTS;
import org.geotools.map.FeatureLayer;
import org.geotools.map.Layer;
import org.geotools.map.MapContent;
import org.geotools.referencing.CRS;
import org.geotools.styling.SLD;
import org.geotools.styling.Style;
import org.geotools.swing.JMapFrame;
import org.geotools.swing.JProgressWindow;
import org.geotools.swing.action.SafeAction;
import org.geotools.swing.data.JFileDataStoreChooser;
import org.geotools.util.ProgressListener;
import org.locationtech.jts.geom.Geometry;
import org.opengis.feature.Feature;
import org.opengis.feature.FeatureVisitor;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.opengis.referencing.operation.MathTransform;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

//featureSource.getFeatures().features().next().getAttributes()获取元素
/**
 * @Author: tyk
 * @Date: 2019/3/25 14:23
 * @Description:
 */
public class CRSLab {
    private File sourceFile;
    private SimpleFeatureSource featureSource;
    private MapContent mapContent;
    public static void main(String[] args) throws Exception {
        CRSLab crsLab = new CRSLab();
        crsLab.displayShapefile();
    }

    public void displayShapefile() throws IOException {
        sourceFile = JFileDataStoreChooser.showOpenFile("shp", null);
        if (sourceFile == null) {
            return;
        }
        FileDataStore dataStore = FileDataStoreFinder.getDataStore(sourceFile);
        featureSource = dataStore.getFeatureSource();

//        新建mapcontent
        mapContent = new MapContent();
        Style style = SLD.createSimpleStyle(featureSource.getSchema());
        Layer layer = new FeatureLayer(featureSource, style);
        mapContent.layers().add(layer);

//        创建mapFrame
        JMapFrame mapFrame = new JMapFrame(mapContent);
        mapFrame.enableToolBar(true);
        mapFrame.enableStatusBar(true);

        JToolBar toolBar = mapFrame.getToolBar();
        toolBar.addSeparator();
        toolBar.add(new JButton(new ValidateGeometryAction()));
        toolBar.add(new JButton(new ExportShapefileAction()));

        mapFrame.setSize(800, 600);
        mapFrame.setVisible(true);
    }

    class ValidateGeometryAction extends SafeAction {
        ValidateGeometryAction() {
            super("Validate geometry");
            putValue(Action.SHORT_DESCRIPTION, "Check each geometry");
        }
        @Override
        public void action(ActionEvent actionEvent) throws Throwable {
//            触发的行为
            int numvalid = validateFeatureGeometry(null);
            String msg;
            if (numvalid == 0) {
                msg = "All geometries is valid";
            } else {
                msg = "Invalid geometries :" + numvalid;
            }
            JOptionPane.showMessageDialog(null,msg,"Geometry results",JOptionPane.INFORMATION_MESSAGE);
        }

        private int validateFeatureGeometry(ProgressListener progress) throws Exception {
            final FeatureCollection featureCollection = featureSource.getFeatures();
//            元素访问器
            class ValidateVisitor implements FeatureVisitor{
                public int numInvalidGeometry = 0;

                @Override
                public void visit(Feature feature) {
                    SimpleFeature simpleFeature= (SimpleFeature) feature;
                    Geometry geometry = (Geometry) simpleFeature.getDefaultGeometry();
                    if (geometry != null && !geometry.isValid()) {
                        numInvalidGeometry++;
                        System.out.println("invalid geometry is"+((SimpleFeature) feature).getID());
                    }
                }
            }
            ValidateVisitor visitor = new ValidateVisitor();
            featureCollection.accepts(visitor,progress);
            return visitor.numInvalidGeometry;
        }
    }

//    class ValidateGeometryAction2 extends SafeAction {
//
//        public ValidateGeometryAction2(String name) {
//            super("Validate geometry 2");
//            putValue(Action.SHORT_DESCRIPTION,"Check each Geometry");
//        }
//
//        @Override
//        public void action(ActionEvent actionEvent) throws Throwable {
//            SwingWorker worker =
//                    new SwingWorker<String, Object>() {
//                        protected String doInBackground() throws Exception {
//                            // For shapefiles with many features its nice to display a progress bar
////                            final JProgressWindow progress = new JProgressWindow(null);
////                            progress.setTitle("Validating feature geometry");
////
////                            int numInvalid = validateFeatureGeometry(progress);
////                            if (numInvalid == 0) {
////                                return "All feature geometries are valid";
////                            } else {
////                                return "Invalid geometries: " + numInvalid;
////                            }
//                            return null;
//                        }
//
//                        protected void done() {
//                            try {
//                                Object result = get();
//                                JOptionPane.showMessageDialog(
//                                        null,
//                                        result,
//                                        "Geometry results",
//                                        JOptionPane.INFORMATION_MESSAGE);
//                                } catch (Exception ignore) {
//                            }
//                        }
//                    };
//            // This statement runs the validation method in a background thread
//            worker.execute();
//            }
//        }
//    }


    class ExportShapefileAction extends SafeAction {
        ExportShapefileAction() {
            super("Export...");
        }

        public void action(ActionEvent event) throws Exception {
            exportToShapefile();
        }

        private void exportToShapefile() throws Exception {
            SimpleFeatureType schema = featureSource.getSchema();

            JFileDataStoreChooser chooser = new JFileDataStoreChooser("shp");
            chooser.setDialogTitle("Save reprojected shapefile");
            chooser.setSaveFile(sourceFile);

            int returnVal = chooser.showSaveDialog(null);
            if (returnVal != JFileDataStoreChooser.APPROVE_OPTION) {
                return;
            }
            File file = chooser.getSelectedFile();
            if (file.equals(sourceFile)) {
                JOptionPane.showMessageDialog(null,"Can't replace "+file);
                return;
            }

//            定义转换前后两个坐标系统
            CoordinateReferenceSystem dataCRS = schema.getCoordinateReferenceSystem();
            CoordinateReferenceSystem worldCRS = mapContent.getCoordinateReferenceSystem();
            boolean lenient = true;
            MathTransform mathTransform = CRS.findMathTransform(dataCRS, worldCRS, lenient);

//            新建shpfile
            DataStoreFactorySpi factory = new ShapefileDataStoreFactory();
            Map<String, Serializable> create = new HashMap<>();
            create.put("url",file.toURI().toURL());
            create.put("create spatial index", Boolean.TRUE);
            DataStore dataStore = factory.createNewDataStore(create);

            SimpleFeatureType simpleFeatureType = SimpleFeatureTypeBuilder.retype(schema, worldCRS);
            dataStore.createSchema(simpleFeatureType);

            String createName = dataStore.getTypeNames()[0];

//            向shp文件中写入内容
            Transaction transaction = new DefaultTransaction("reproject");
            try {
                FeatureWriter<SimpleFeatureType, SimpleFeature> writer = dataStore.getFeatureWriterAppend(createName, transaction);
                SimpleFeatureIterator iterator = featureSource.getFeatures().features();
                while (iterator.hasNext()) {
                    SimpleFeature feature = iterator.next();
                    SimpleFeature copy = writer.next();
                    copy.setAttributes(feature.getAttributes());

                    Geometry geometry1 = (Geometry) feature.getDefaultGeometry();
                    Geometry geometry2 = JTS.transform(geometry1, mathTransform);

                    copy.setDefaultGeometry(geometry2);
                    writer.write();

                }
                transaction.commit();
                JOptionPane.showMessageDialog(null,"Export to shape compeleted!");
            } catch (Exception e) {
                e.printStackTrace();
                transaction.rollback();
                JOptionPane.showMessageDialog(null,"Export to shape failed!");
            }finally {
                transaction.close();
            }


        }
    }
}
