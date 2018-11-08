package com.example.blog.test;

import org.activiti.engine.*;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.junit.Test;

import java.io.InputStream;
import java.util.List;
import java.util.zip.ZipInputStream;

public class ActivityTest {
    //通过activiti.cfg.xml获取流程引擎
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    /**
     * 发布流程
     * 发布流程后，流程文件会保存到数据库中
     */
    @Test
    public void deployFlow(){
        RepositoryService repositoryService = processEngine.getRepositoryService();

        //获取在classpath下的流程文件
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("myleave.zip");
        ZipInputStream zipInputStream = new ZipInputStream(in);
        //使用deploy方法发布流程
        repositoryService.createDeployment()
                .addZipInputStream(zipInputStream)
                .name("Myleave")
                .deploy();
    }

    @Test
    public void queryProcdef(){
        RepositoryService repositoryService = processEngine.getRepositoryService();
        //创建查询对象
        ProcessDefinitionQuery query = repositoryService.createProcessDefinitionQuery();
        //添加查询条件
        query.processDefinitionKey("myProcess_1");//通过key获取
        // .processDefinitionName("My process")//通过name获取
        // .orderByProcessDefinitionId()//根据ID排序
        //执行查询获取流程定义明细
        List<ProcessDefinition> pds = query.list();
        for (ProcessDefinition pd : pds) {
            System.out.println("ID:"+pd.getId()+",NAME:"+pd.getName()+",KEY:"+pd.getKey()+",VERSION:"+pd.getVersion()+",RESOURCE_NAME:"+pd.getResourceName()+",DGRM_RESOURCE_NAME:"+pd.getDiagramResourceName());
        }
    }

    /**
     * 发布流程
     */
    @Test
    public void startFlow(){

        RuntimeService runtimeService = processEngine.getRuntimeService();
        /**
         * 启动请假单流程  并获取流程实例
         * 因为该请假单流程可以会启动多个所以每启动一个请假单流程都会在数据库中插入一条新版本的流程数据
         * 通过key启动的流程就是当前key下最新版本的流程
         *
         */
        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("myProcess_1");
        System.out.println("id:"+processInstance.getId()+",activitiId:"+processInstance.getActivityId());
    }

    /**
     * 查看任务
     */
    @Test
    public void queryTask(){
        //获取任务服务对象
        TaskService taskService = processEngine.getTaskService();
        //根据接受人获取该用户的任务
        List<Task> tasks = taskService.createTaskQuery()
                .taskAssignee("张三")
                .list();
        for (Task task : tasks) {
            System.out.println("ID:"+task.getId()+",姓名:"+task.getName()+",接收人:"+task.getAssignee()+",开始时间:"+task.getCreateTime());
        }
    }

    @Test
    public void startTask(){
        TaskService taskService = processEngine.getTaskService();
        //taskId 就是查询任务中的 ID
        String taskId = "204";
        //完成请假申请任务
        taskService.complete(taskId );
    }

    /**
     * 查看任务
     */
    @Test
    public void queryTask2(){
        //获取任务服务对象
        TaskService taskService = processEngine.getTaskService();
        //根据接受人获取该用户的任务
        List<Task> tasks = taskService.createTaskQuery()
                .taskAssignee("老板")
                .list();
        for (Task task : tasks) {
            System.out.println("ID:"+task.getId()+",姓名:"+task.getName()+",接收人:"+task.getAssignee()+",开始时间:"+task.getCreateTime());
        }
    }

    @Test
    public void startTask2(){
        TaskService taskService = processEngine.getTaskService();
        //taskId 就是查询任务中的 ID
        String taskId = "302";
        //完成请假申请任务
        taskService.complete(taskId );
    }
}
