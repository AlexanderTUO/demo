package com.example.blog.controller;

import com.example.blog.model.Item;
import com.example.blog.model.ItemQuery;
import com.example.blog.model.ItemQueryBean;
import com.example.blog.model.PageModule;
import com.example.blog.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
//@RequestMapping("/jqGrid/")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @RequestMapping("enterGrid")
    public String jqGrid (){
        return "jqGrid";
    }

    @RequestMapping("page")
    @ResponseBody
    public PageModule<Item> getJqGrid(
            @RequestParam("page")Integer pageNum,
            @RequestParam("rows") Integer pageSize
            ,HttpSession session){


        ItemQueryBean itemQueryBean = (ItemQueryBean)session.getAttribute("itemQueryBean") ;

        int totalRows = itemService.getTotalRows(itemQueryBean);

        ItemQuery itemQuery = new ItemQuery();
        itemQuery.setLimit((pageNum-1)*pageSize);
        itemQuery.setOffset(pageSize);
        if (itemQueryBean!=null){
            itemQuery.setDriverName(itemQueryBean.getDriverName());
        }


        System.out.println(234234);
        List<Item> list = itemService.findItems(itemQuery);


        PageModule<Item> pageModule = new PageModule<Item>();
        pageModule.setPage(pageNum);
        pageModule.setRecords(totalRows);
        pageModule.setPageSize(pageSize);
        pageModule.total(totalRows,pageSize);
        System.out.println(pageModule.getTotal());
        pageModule.setRows(list);
        return  pageModule;
    }

    @RequestMapping("search")
    @ResponseBody
    public String search(ItemQueryBean itemQueryBean, HttpSession session){
        session.setAttribute("itemQueryBean", itemQueryBean);
        return null;
    }
}
