/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.innovature.Library.repository;

import java.util.Collection;
import java.util.Optional;
import org.springframework.data.repository.Repository;
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import com.innovature.Library.entity.Email;
import com.innovature.Library.entity.User;

public interface UserRepository extends Repository<User, Integer> {

    User findById(Integer userId);

    Optional<User> findByUserIdAndPassword(Integer userId, String password);

    Optional<User> findByEmail(String email);

    // User findByEmail(String email);

    // HttpStatus save(User user);

    User save(User user);

    void delete(User user);

    Collection<User> findAll();

    Collection<User> findByUserId(Integer userId);

    public Page<User> findAll(Pageable paging);

    User findEmailByUserId(Integer userId);

    // Email findEmailByUserId(Integer userId);

    public boolean existsByEmail(String email);

    @Query(value = "select * from user where role=2", nativeQuery = true)
    public Page<User> findAUser(Pageable paging);

    @Query(value = "SELECT * FROM user WHERE email=?", nativeQuery = true)
    User findByEmailId(String email);

    @Query(value = "SELECT * FROM user WHERE email=?", nativeQuery = true)
    boolean findByEmails(String email);


    @Query(value = "select * from user where user_id in(select receiver from msg where receiver=?1  or sender=?1)", nativeQuery = true)
   Collection <User> findByReceiverId(Integer sender );
}
