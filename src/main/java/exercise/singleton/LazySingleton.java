package exercise.singleton;

/**
 * @Author: tyk
 * @Date: 2019/3/25 09:50
 * @Description:懒汉单例,
 * 优点：使用时才加载
 * 缺点：非线程安全
 *
 */
public class LazySingleton {
    private static LazySingleton ourInstance ;

    public static LazySingleton getInstance() {
        if (ourInstance == null) {
            ourInstance = new LazySingleton();
        }
        return ourInstance;
    }

    private LazySingleton() {
    }
}
