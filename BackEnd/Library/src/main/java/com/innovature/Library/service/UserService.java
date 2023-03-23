package com.innovature.Library.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collection;


import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import com.innovature.Library.entity.User;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.form.EditProfileForm;
import com.innovature.Library.form.EmailForm;
import com.innovature.Library.form.LoginForm;
import com.innovature.Library.form.ResetNewPswd;
import com.innovature.Library.form.ResetPasswordForm;
import com.innovature.Library.form.UserForm;
import com.innovature.Library.form.googleForm;
import com.innovature.Library.view.LoginView;
import com.innovature.Library.view.UserView;


public interface UserService {

    ResponseEntity add(EmailForm form);

    UserView register(UserForm form);

    UserView currentUser();

    LoginView login(LoginForm form) throws BadRequestException;

    LoginView refresh(String refreshToken) throws BadRequestException;

    UserView updates(Integer userId, UserForm form);

    void deletes(Integer userId);

    Collection getUserById(Integer userId);

    Collection<User> listAll();

    UserView edit(Integer userId, EditProfileForm form);

    Collection<User> viewProfile(Integer userId);

    Page<User> getAllUser(Integer pageNo, Integer pageSize, String sortBy,Integer direction);

    boolean validatePassword(ResetPasswordForm form);

    boolean addPassword(ResetNewPswd form);

    // boolean googleSignIn(String idToken) throws GeneralSecurityException, IOException;

    // boolean googleSignIn(googleForm form) throws GeneralSecurityException, IOException;

    LoginView googleSignIn1(googleForm form) throws BadRequestException, GeneralSecurityException, IOException;


    Collection<User> chatList(Integer sender);

    Collection<User> getAllUserBykeyword(String key);
}
