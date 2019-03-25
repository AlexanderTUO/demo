package exercise.singleton;

/**
 * @Author: tyk
 * @Date: 2019/3/25 09:50
 * @Description:饿汉单例模式
 *  构造器私有private，geiInstance获取实例
 */
public class HungarySingleton {
    private static HungarySingleton ourInstance = new HungarySingleton();

    public static HungarySingleton getInstance() {

        return ourInstance;
    }

    private HungarySingleton() {
    }
}
