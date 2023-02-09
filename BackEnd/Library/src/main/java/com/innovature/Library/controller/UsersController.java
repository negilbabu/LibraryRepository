
package com.innovature.Library.controller;

import java.security.Principal;
import java.util.Collection;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.innovature.Library.entity.User;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.exception.NotAcceptableException;
import com.innovature.Library.exception.expectationFailedException;
import com.innovature.Library.form.UserForm;
import com.innovature.Library.security.util.SecurityUtil;
import com.innovature.Library.service.UserService;
import com.innovature.Library.view.UserView;
import com.innovature.Library.form.ResetNewPswd;
import com.innovature.Library.form.ResetPasswordForm;
import com.innovature.Library.form.EditProfileForm;
import com.innovature.Library.form.EmailForm;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity add(@Valid @RequestBody EmailForm form
    ) {
        ResponseEntity result =   userService.add(form);

        if(result.getStatusCodeValue()==202){
            return new ResponseEntity(HttpStatus.ACCEPTED);
        }
        else{
            throw new BadRequestException(" VERIFICATION FAILED");
        }

    }
    @PostMapping("/register")
    public UserView register(@Valid @RequestBody UserForm form
    ) {
        System.out.println("-0-=-++++++++++++++++++--------------"+form.getEmail());
        return userService.register(form);
    }

    @PutMapping
    public UserView edit(@Valid @RequestBody EditProfileForm form) {
        return userService.edit(SecurityUtil.getCurrentUserId(), form);
    }

    @GetMapping
    public Collection<User> list(Principal p) {
        return userService.listAll();
    }

    @GetMapping("/viewProfile")
    public Collection<User> viewProfile() {
        return userService.viewProfile(SecurityUtil.getCurrentUserId());
    }

    @GetMapping("/admin/viewProfile/")
    public Collection<User> viewAdminProfile() {
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

    @GetMapping("/admin/{userId}")
    public Collection getUserById(
            @PathVariable("userId") Integer userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/admin/pagenated/")
    public ResponseEntity<Page<User>> getAllBooks(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "role") String sortBy,
            @RequestParam(defaultValue = "1") Integer direction) {
        Page<User> list = userService.getAllUser(pageNo - 1, pageSize, sortBy, direction);
        return new ResponseEntity<Page<User>>(list, new HttpHeaders(),
                HttpStatus.OK);

    }

    @PostMapping("/verify/oldPassword")
    public ResponseEntity validatePassword(@Valid @RequestBody ResetPasswordForm form) {


            boolean result = userService.validatePassword(form);
            if (result) {
                return new ResponseEntity(null, HttpStatus.ACCEPTED);
            } else {
                throw new BadRequestException("PASSWORD VERIFICATION FAILED");
          
            }

    }

    @PostMapping("/reset/Password")
    public ResponseEntity changePassword(@Valid @RequestBody ResetNewPswd form) {

var psd=form.getNewPassword();
var cpsd=form.getCnewPassword();

if (!psd.equals(cpsd)) {
    throw new expectationFailedException("PASSWORD - MISSMATCH");

} else {

    boolean result = userService.addPassword(form);
    if (result) {
        return new ResponseEntity(null, HttpStatus.ACCEPTED);
    } else {
        throw new BadRequestException("PASSWORD CHANGE FAILED");
  
    }
}
    

  

    }


}
