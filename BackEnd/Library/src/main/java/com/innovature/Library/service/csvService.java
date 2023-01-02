package com.innovature.Library.service;


import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.innovature.Library.entity.csvUpload;
import com.innovature.Library.csv_helper.csvHelper;
import com.innovature.Library.repository.csvRepository;

@Service
public class csvService {

    @Autowired
    csvRepository repository;
    



    public void save(MultipartFile file){
        try{
            List<csvUpload>csvTest=csvHelper.csvToDb(file.getInputStream());
            repository.saveAll(csvTest);
        }catch(IOException e){
            throw new RuntimeException("fail to store csv data"+e.getMessage());
        }
    }

    public ByteArrayInputStream load(){
        List<csvUpload> csvTest=repository.findAll();
        ByteArrayInputStream in=csvHelper.loadFromdb(csvTest);
        return in;
    }

    public List<csvUpload>getAll(){
        return repository.findAll();
    }

}
