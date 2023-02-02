package com.innovature.Library.service;

import java.util.Collection;


import org.springframework.data.domain.Page;
import org.springframework.validation.Errors;

import com.innovature.Library.entity.User;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.form.LoginForm;
import com.innovature.Library.form.UserForm;
import com.innovature.Library.view.LoginView;
import com.innovature.Library.view.UserView;


public interface UserService {

    UserView add(UserForm form);

    UserView currentUser();

    LoginView login(LoginForm form) throws BadRequestException;

    LoginView refresh(String refreshToken) throws BadRequestException;

    UserView updates(Integer userId, UserForm form);

    void deletes(Integer userId);

    Collection getUserById(Integer userId);

    Collection<User> listAll();

    UserView edit(Integer userId, UserForm form);

    Collection<User> viewProfile(Integer userId);

    Page<User> getAllUser(Integer pageNo, Integer pageSize, String sortBy,Integer direction);

}
