package com.innovature.Library.controller;

import java.sql.Date;
import java.util.Calendar;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.time.LocalTime;

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
                // emailRepository.deleteAll();
                Random random = new Random();
                int otp = 100000 + random.nextInt(900000);
                Email otp2= new Email();
                otp2.setOtp(otp);
                otp2.setEmail(form.getSentto());      

                LocalTime myObj = LocalTime.now();
                LocalTime exp=myObj.plusMinutes(1);
                System.out.println("here############====>>>"+exp);
                otp2.setExpiry(exp);

                
                var email=form.getSentto();
                
                // emailRepository.save(otp2);
                // emailRepository.findByEmailId(email,otp2);
              
               Email email2= emailRepository.findByEmail(email);
               if(email2!=null){
               email2.setOtp(otp); 
               email2.setExpiry(exp);   
               emailRepository.save(email2);
               }
               else
               emailRepository.save(otp2);
            
                boolean result = this.emailService.sendEmail("OTP Verification","Your OTP to change your password is \t"+ otp +"\tuse it to create a new password.", form.getSentto());
                // "OTP Verification", "Your OTP to change your password is "+"otp"+"use it to create a new password."
                if(result){
                    return  new ResponseEntity(null,HttpStatus.ACCEPTED);
                }
                else{
                    return new ResponseEntity(null,HttpStatus.BAD_REQUEST);
                }
            }
            else{
                return new ResponseEntity(null,HttpStatus.NOT_ACCEPTABLE);

            }

    
    }




    @PostMapping("verify")
    public ResponseEntity add(@RequestBody OtpForm form){

        boolean result = emailService.add(form);
        if(result)
        {
            return new ResponseEntity(null,HttpStatus.ACCEPTED);
        }
        else
        {
            return new ResponseEntity(null,HttpStatus.BAD_REQUEST);
        }
    }


}
