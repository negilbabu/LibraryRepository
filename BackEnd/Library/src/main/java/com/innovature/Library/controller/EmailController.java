package com.innovature.Library.controller;

import javax.security.auth.Subject;
import javax.validation.Valid;

// import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovature.Library.form.BorrowForm;
import com.innovature.Library.form.EmailForm;
import com.innovature.Library.service.BorrowService;
import com.innovature.Library.service.EmailService;
import com.innovature.Library.view.BorrowDetailView;


@RestController
@RequestMapping("/email")
public class EmailController {

    // @Autowired
    // private EmailService emailService;

    @Autowired
    private BorrowService service;
 
    @PostMapping("emailsent/{userId}")
    public String sendMail(@PathVariable("userId") Integer userId) {
        System.out.println(userId);
        this.service.sendMail(userId,
        "Due date expired",
        "Please return the books"
        );
        return "message sent";
        // return service.sendMail(userId);
    }


}