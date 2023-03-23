package com.innovature.Library.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovature.Library.form.LoginForm;
import com.innovature.Library.service.UserService;
import com.innovature.Library.view.LoginView;
import com.innovature.Library.view.UserView;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping
    public UserView currentUser() {
        return userService.currentUser();
    }

    @PostMapping
    public LoginView login(@Valid @RequestBody LoginForm form) {
        return userService.login(form);
    }

    @PutMapping
    public LoginView refresh(@RequestBody String refreshToken) {
        return userService.refresh(refreshToken);
    }

}
