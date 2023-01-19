package com.innovature.Library.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.innovature.Library.form.EmailForm;
import com.innovature.Library.form.OtpForm;
import com.innovature.Library.repository.EmailRepository;
import com.innovature.Library.service.BorrowService;
import com.innovature.Library.service.EmailService;



import com.innovature.Library.entity.Email;
import com.innovature.Library.entity.User;
import com.innovature.Library.repository.UserRepository;


// tgsrhyrsrthr
@RestController
@RequestMapping("/email")
public class EmailController {

 
    @Autowired
    private BorrowService service;

   
    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private UserRepository userRepository;
 

    //to send mail to due expired users
    @PostMapping("emailsent/{userId}")
    public String sendMail(@PathVariable("userId") Integer userId) {
        this.service.sendMail(userId,
        "Due date expired",
        "Please return the books"
        );
        return "message sent";
        
    }


    @PostMapping("/emailsentotp")
    public ResponseEntity<?>sendOtpEmail(@RequestBody EmailForm form){


        User user=userRepository.findByEmailId(form.getSentto());
             if(user!=null){
                emailRepository.deleteAll();
                Random random = new Random();
                int otp = 100000 + random.nextInt(900000);
                Email otp2= new Email();
                otp2.setOtp(otp);
                otp2.setEmail(form.getSentto());
                
                emailRepository.save(otp2);
                boolean result = this.emailService.sendEmail("OTP Verification","Your OTP to change your password is \t"+ otp +"\tuse it to create a new password.", form.getSentto());
                // "OTP Verification", "Your OTP to change your password is "+"otp"+"use it to create a new password."
                if(result){
                    return  ResponseEntity.ok("Email Sent!");
                }else{
                    return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email not sent.");
                }
            }
            else{
                return null;
            }

    
    }




    @PostMapping("verify")
    public boolean add(@RequestBody OtpForm form){

        return emailService.add(form);
    }


}
