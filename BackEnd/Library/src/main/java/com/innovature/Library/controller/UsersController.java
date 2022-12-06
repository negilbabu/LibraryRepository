/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.innovature.Library.controller;

import java.security.Principal;
import java.util.Collection;

// import java.util.Collection;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovature.Library.entity.User;
// import com.innovature.Library.entity.User;
import com.innovature.Library.form.UserForm;
import com.innovature.Library.security.util.SecurityUtil;
import com.innovature.Library.service.UserService;
import com.innovature.Library.view.UserView;

/**
 *
 * @author nirmal
 */
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserService userService;

    @PostMapping
    public UserView add(@Valid @RequestBody UserForm form) {
        return userService.add(form);
    }

    @PutMapping
    public UserView edit(@Valid @RequestBody UserForm form) {
        return userService.edit(SecurityUtil.getCurrentUserId(),form);
    }

    @GetMapping
    public Collection<User> list(Principal p) {
        return userService.listAll();
    }
    
    @GetMapping("/viewProfile")
    public Collection<User> viewProfile(){
        return userService.viewProfile(SecurityUtil.getCurrentUserId());
    }

    @PutMapping("/{userId}")
    public UserView updates(
            @PathVariable("userId") Integer userId,
            @Valid @RequestBody UserForm form) {
        return userService.updates(userId, form);
    }

    @DeleteMapping("/{userId}")
    public void deletes(
            @PathVariable("userId") Integer userId) {
        userService.deletes(userId);
    }

   

    // @GetMapping
    // public Collection<User> list1() {
    //     return userService.list();
    // }

    


}
