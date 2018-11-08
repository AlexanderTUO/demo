package com.example.blog.model;

import lombok.Data;

import java.io.Serializable;

public class JqGridQueryBase implements Serializable {
    private static final long serialVersionUID = -2849625318773684220L;

    /** 当前页面 */
    private int               page;
    /** 查询字段值 */
    private String            search;
    /** 排序字段和排序方式如：username/asc */
    private String            sidx;
    private String            sord;

    /** 分页信息:总页数 */
    private int               total;
    /** 总记录数 */
    private int               records;
    /** 页面大小 */
    private int               pageSize;

    public void total(int records,int pageSize){
        if(records%pageSize == 0){
            this.total = records/pageSize;
        }
        this.total = records/pageSize+1;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getSidx() {
        return sidx;
    }

    public void setSidx(String sidx) {
        this.sidx = sidx;
    }

    public String getSord() {
        return sord;
    }

    public void setSord(String sord) {
        this.sord = sord;
    }

    public int getTotal() {

        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getRecords() {
        return records;
    }

    public void setRecords(int records) {
        this.records = records;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
}
