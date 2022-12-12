/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.innovature.Library.repository;

import java.util.Collection;
import java.util.Optional;
import org.springframework.data.repository.Repository;

import com.innovature.Library.entity.User;

/**
 *
 * @author nirmal
 */
public interface UserRepository extends Repository<User, Integer> {

    User findById(Integer userId);

    Optional<User> findByUserIdAndPassword(Integer userId, String password);

    Optional<User> findByEmail(String email);

    User save(User user);
    void delete(User user);
    
    Collection<User> findAll();

    Collection<User> findByUserId(Integer userId);
    

  //  User findById(User userId);
}
