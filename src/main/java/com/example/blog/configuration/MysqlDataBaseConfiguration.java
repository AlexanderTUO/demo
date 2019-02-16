package com.example.blog.configuration;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ConfigurationProperties(prefix = "mysql.datasource")
@MapperScan(basePackages = "com.example.blog.mapper.mysql",
        sqlSessionFactoryRef = "mysqlSession")
@PropertySource("classpath:application.yml")
public class MysqlDataBaseConfiguration extends DaoConfigurationBase {

    @Bean("mysqlSession")
    @Primary
    public SqlSessionFactory getSqlSessionFactory() throws Exception {
        return super.sqlSessionFactory();
    }
}
