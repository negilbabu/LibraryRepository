package com.innovature.Library.repository;

import java.util.Collection;

import org.springframework.data.repository.Repository;

import com.innovature.Library.entity.Email;
import com.innovature.Library.entity.User;

public interface EmailRepository extends Repository<Email, Integer> {

    void deleteAll();

    Email save(Email email);

    Collection<Email> findAll();

    Email findByEmail(String email);

    // Email findByEmail(Email email);

    // Email findByEmail(User email);

}
