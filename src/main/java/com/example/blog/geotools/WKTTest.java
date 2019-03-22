package com.example.blog.geotools;

import org.geotools.geometry.jts.JTSFactoryFinder;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;


/**
 * @Author: tyk
 * @Date: 2019/3/22 14:21
 * @Description:
 */
public class WKTTest {
    public static Point createPoint1() throws ParseException {
        GeometryFactory factory = JTSFactoryFinder.getGeometryFactory();
        WKTReader reader = new WKTReader(factory);
        Point point = (Point) reader.read("Point(1 1)");
        return point;
    }

    public static Point createPoint2() throws ParseException {
        GeometryFactory factory = JTSFactoryFinder.getGeometryFactory();
        Coordinate coordinate = new Coordinate(1,1);
        Point point = factory.createPoint(coordinate);
        return point;
    }

}
