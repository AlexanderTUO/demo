package com.example.blog.controller;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.ProcessEngines;

public class HelloWorld {
    public static void main(String[] args) {
/*    	 ProcessEngineConfiguration processEngine=ProcessEngineConfiguration.createStandaloneProcessEngineConfiguration();
 		processEngine.setJdbcDriver("com.mysql.jdbc.Driver");
 		processEngine.setJdbcUrl("jdbc:mysql://localhost:3306/activiti");
 		processEngine.setJdbcUsername("root");
 		processEngine.setJdbcPassword("");


 		processEngine.setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);

 		ProcessEngine buildPRocessEngine=processEngine.buildProcessEngine();*/


        ProcessEngine processEngines= ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("activiti.cfg.xml")
                .buildProcessEngine();
        System.out.println("================"+processEngines);


        /** 部署流程定义*/
        ProcessEngine  processEngine= ProcessEngines.getDefaultProcessEngine();
    	/*  Deployment deployment= processEngine.getRepositoryService()//与流程定义与部署对象相关的service
                                 .createDeployment()
                                 .name("HelloWorld入门程序")//创建一个部署对象
                                 .addClasspathResource("MyLeave.bpmn")//从classpath资源中加载，一次只能加载一个文件
                                 .addClasspathResource("ActivitiHelloWorld.png")
                                 .deploy();//完成部署
             System.out.println("部署ID:"+deployment.getId());
             System.out.println("部署名字："+deployment.getName());*/



        /**启动流程实例*/
             /*  String processDefinitionKey="ActivitiHelloWorld";
       ProcessInstance pi=processEngines.getRuntimeService()//与正在 执行流程实例和执行对象相关的service
       	                        .startProcessInstanceByKey(processDefinitionKey);//使用流程定义的key启动流程实例
       	System.out.println("流程实例ID："+pi.getId());
       	System.out.println("流程定义ID："+pi.getProcessDefinitionId());*/


        /**查询当前人的个人任务*/

   	/*String assigine="张三";
        	List<Task> list=processEngine.getTaskService()
        	.createTaskQuery()
        	.taskAssignee(assigine)
        	.list();

        	if(list!=null&&list.size()>0){
        		for(Task task:list){
        		System.out.println("任务ID:"+task.getId());
        		System.out.println("任务名称："+task.getName());
        		System.out.println("任务的创建时间："+task.getCreateTime());
        		System.out.println("任务的创建人:"+task.getAssignee());
        		System.out.println("流程实例ID"+task.getParentTaskId());
        		System.out.println("执行对象ID"+task.getExecutionId());
        		System.out.println("流程定义ID"+task.getProcessDefinitionId());

        		}
        	}
        */


        /**完成我的任务*/
        String taskId="302";
        processEngine.getTaskService()
                .complete(taskId);
        System.out.println("完成任务：任务ID:"+taskId);

    }
}
