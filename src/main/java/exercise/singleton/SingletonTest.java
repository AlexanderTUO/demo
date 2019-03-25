package exercise.singleton;

import org.junit.Test;
import org.springframework.web.servlet.HandlerInterceptor;

import static org.junit.Assert.assertEquals;

/**
 * @Author: tyk
 * @Date: 2019/3/25 09:54
 * @Description:单例模式测试
 */
public class SingletonTest {
    @Test
    public void testLazy() {
        LazySingleton lazySingleton1 = LazySingleton.getInstance();
        LazySingleton lazySingleton2 = LazySingleton.getInstance();
        assertEquals("懒汉模式测试：",lazySingleton1,lazySingleton2);
    }

    @Test
    public void hungaryLazy() {
        HungarySingleton hungarySingleton1 = HungarySingleton.getInstance();
        HungarySingleton hungarySingleton2 = HungarySingleton.getInstance();
        assertEquals("饿汉模式测试：",hungarySingleton1,hungarySingleton2);
    }
}
