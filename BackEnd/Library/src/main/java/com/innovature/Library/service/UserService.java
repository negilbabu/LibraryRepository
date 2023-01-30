/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.innovature.Library.service;

import java.util.Collection;

//import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.validation.Errors;

import com.innovature.Library.entity.User;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.form.LoginForm;
import com.innovature.Library.form.UserForm;
import com.innovature.Library.view.LoginView;
import com.innovature.Library.view.UserView;

/**
 *
 * @author nirmal
 */
public interface UserService {

    UserView add(UserForm form);

    UserView currentUser();

    LoginView login(LoginForm form, Errors errors) throws BadRequestException;

    LoginView refresh(String refreshToken) throws BadRequestException;

    // Collection<User> list();

   // UserView edit(UserForm form);

    UserView updates(Integer userId, UserForm form);

    void deletes(Integer userId);

    Collection getUserById(Integer userId);

    Collection<User> listAll();

   // Collection<User> list();

    UserView edit(Integer userId, UserForm form);

    Collection<User> viewProfile(Integer userId);

    Page<User> getAllUser(Integer pageNo, Integer pageSize, String sortBy,Integer direction);

}
