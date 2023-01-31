package com.innovature.Library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovature.Library.entity.csvUpload;

@Repository
public interface csvRepository extends JpaRepository<csvUpload, Integer> {

}
