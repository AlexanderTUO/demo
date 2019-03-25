package exercise.singleton;

/**
 * @Author: tyk
 * @Date: 2019/3/25 11:04
 * @Description:静态内部加载
 * 优点：使用时再加载，具有懒汉模式特点
 * 优点：线程安全
 */
public class InnerSingleton {
    //    private static InnerSingleton ourInstance = new InnerSingleton();
    private static class SingletonHolder {
        private static InnerSingleton ourInstance = new InnerSingleton();
    }

    public static InnerSingleton getInstance() {
        return SingletonHolder.ourInstance;
    }

    private InnerSingleton() {
    }
}
