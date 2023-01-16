package com.innovature.Library.repository;

import java.util.Collection;

import org.springframework.data.repository.Repository;

import com.innovature.Library.entity.Email;


public interface EmailRepository extends Repository<Email,Integer> {

    void deleteAll();

    Email save(Email email);

    Collection<Email>findAll();

    Email findByEmail(String email);

}
