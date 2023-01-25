package com.innovature.Library.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.innovature.Library.entity.Email;


public interface EmailRepository extends Repository<Email,Integer> {

    void deleteAll();

    Email save(Email email);

    Collection<Email>findAll();

    Email findByEmail(String email);

    // @Query(value = "SELECT * FROM email WHERE email=?",nativeQuery = true)
    // Email findByEmailId(String email);
    
    // @Modifying
    // @Transactional
    // @Query(value = "INSERT INTO email(email,otp) VALUES(email=?1,otp=?2) ON DUPLICATE KEY UPDATE otp =123123",nativeQuery = true)
    // void findByEmailId(String email, Email otp2);




//     INSERT INTO table (key,col1) VALUES (1,2)
// INSERT INTO email(email,otp) VALUES("negilbabu2030@gmail.com",111111) ON DUPLICATE KEY UPDATE otp = 100000;
//   ON DUPLICATE KEY UPDATE col1 = 2;
}
