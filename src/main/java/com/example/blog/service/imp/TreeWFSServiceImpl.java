package com.example.blog.service.imp;

import com.example.blog.entity.TreeWFS;
import com.example.blog.mapper.mysql.TreeWFSMapper;
import com.example.blog.service.TreeWFSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2019/2/20 10:47
 * @Description:
 */
@Service
public class TreeWFSServiceImpl implements TreeWFSService {

    @Autowired
    TreeWFSMapper treeWFSMapper;



    @Override
    public List<TreeWFS> getTreeWFS() {
        return treeWFSMapper.getTreeWFS();
    }

}
