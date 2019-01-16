package com.example.blog.controller;


import com.example.blog.service.StorageFileNotFoundException;
import com.example.blog.service.StorageService;
import org.apache.commons.io.IOUtils;
import org.gdal.gdal.gdal;
import org.gdal.ogr.DataSource;
import org.gdal.ogr.Driver;
import org.gdal.ogr.ogr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.stream.Collectors;

@Controller
public class FileUploadController {

    private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/")
    public String listUploadedFiles(Model model) throws IOException {

        model.addAttribute("files", storageService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "serveFile", path.getFileName().toString()).build().toString())
                .collect(Collectors.toList()));

        return "uploadForm";
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes,
                                   HttpServletRequest request) {
        String type = request.getParameter("type");
        storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");
//        创建保存文件的文件夹
        String savePath = "E:\\temp";
//        String type = "GeoJSON";
        createFolder(savePath,"temp");

//        已保存文件的路径全名
        String sourcePath = savePath + "\\temp\\" + file.getOriginalFilename();
//        转换文件的路径全名
        String transferPath = savePath + "\\" + type + "\\" + file.getOriginalFilename();


        InputStream input = null;
        OutputStream out = null;
        try {
            input = file.getInputStream();
            out = new FileOutputStream(sourcePath);
            IOUtils.copy(input, out);

//            BufferedWriter writer = new BufferedWriter(new FileWriter(new File(file.toString())));
//            writer.flush();
//            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        createFolder(savePath,type);
        dataTransfer("D:\\Tools\\GIS\\Data\\kml\\xj_jq.kml",type,"D:\\Tools\\GIS\\Data\\test\\xj_jq4.shp");
//        dataTransfer(sourcePath,type,transferPath);

        return "redirect:/";
    }

    private void createFolder(String savePath,String type) {
        File dir = new File(savePath+"\\"+type+"\\");
        if (!dir.exists()) {
            dir.mkdir();
        }
        if (dir.isDirectory()) {
            String[] list = dir.list();
            for (int index = 0; index < list.length; index++) {
                System.out.println(list[index]);
            }
        }
    }

    private void dataTransfer(String source, String type, String output) {
        ogr.RegisterAll();
        gdal.SetConfigOption("GDAL_FILENAME_IS_UTF8", "No");
        gdal.SetConfigOption("SHAPE_ENCODING", "");

        DataSource dataSource = ogr.Open(source, 0);
        if (dataSource == null) {
            System.out.println("加载数据源失败！");
            return;
        }
        System.out.println("加载数据源成功！");

        Driver driver = ogr.GetDriverByName(type);

        if (driver == null) {
            System.out.println("加载驱动失败！");
            return;
        }
        System.out.println("加载驱动成功！");

        driver.CopyDataSource(dataSource, output);

        System.out.println("数据转换成功");
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
