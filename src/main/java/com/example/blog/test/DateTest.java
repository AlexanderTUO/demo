package com.example.blog.test;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @Author: tyk
 * @Date: 2019/3/7 10:47
 * @Description:
 */
public class DateTest {
    public static void main(String[] args){
        Date now = new Date();
        Date now2 = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
//        date转String
        String now2str = dateFormat.format(now);
        System.out.println("---------Date");
        System.out.println("Date:"+now);
        System.out.println("Date转String:"+now2str);
        System.out.println("date比较equals：" + now.equals(now2));
        System.out.println("date比较compareTo：" + now.compareTo(now2));
        System.out.println("date转相对时间：" + now.getTime());
        System.out.println("相对时间转date：" + new Date(now.getTime()));

//        Calendar转String
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);//年
        int month = calendar.get(calendar.MONTH)+1;//月
        int date = calendar.get(calendar.DAY_OF_MONTH);//日
        int hour = calendar.get(calendar.HOUR_OF_DAY);//时
        int minute = calendar.get(calendar.MINUTE);//分
        int second = calendar.get(calendar.SECOND);//秒
        int day = calendar.get(Calendar.DAY_OF_WEEK);//星期

        System.out.println("\n---------Calendar：");
        System.out.println(year+"年"+month+"月"+date+"日 "+hour+"时"+minute+"分"+second+"秒 "+"星期"+day);
        System.out.println("calendar转相对时间：" + calendar.getTimeInMillis());
//        System.out.println("相对时间转calendar:" + Calendar.getInstance().setTimeInMillis(calendar.getTimeInMillis()));

        String cal2str = dateFormat.format(calendar.getTime());
        System.out.println("Calendar:"+calendar);
        System.out.println("Calendar转String:"+cal2str);

//        String转date
        Date str2Date = null;
        str2Date = dateFormat.parse(now2str, new ParsePosition(0));
        System.out.println("\n---------String:");
        System.out.println("String转Date:"+str2Date);

    }
}
