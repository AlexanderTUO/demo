package com.example.blog.configuration;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ConfigurationProperties(prefix = "postgresql.datasource")
@MapperScan(basePackages = "com.example.blog.mapper.postgresql",
        sqlSessionFactoryRef = "postgresqlSession")
@PropertySource("classpath:application.yml")
public class PostgresqlDataBaseConfiguration extends DaoConfigurationBase {

    @Bean("postgresqlSession")
    public SqlSessionFactory getSqlSessionFactory() throws Exception {
        return super.sqlSessionFactory();
    }
}
