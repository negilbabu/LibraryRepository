package com.innovature.Library.controller;

import java.util.Random;

import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovature.Library.form.ChangePasswordForm;
import com.innovature.Library.form.EmailForm;
import com.innovature.Library.form.OtpForm;
import com.innovature.Library.repository.EmailRepository;
import com.innovature.Library.service.EmailService;
import javax.validation.Valid;

import com.innovature.Library.entity.Email;
import com.innovature.Library.entity.User;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.exception.GatewayTimeoutException;
import com.innovature.Library.exception.NotAcceptableException;
import com.innovature.Library.exception.PreconditionFailedException;
import com.innovature.Library.exception.expectationFailedException;
import com.innovature.Library.repository.UserRepository;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/emailsentotp")
    public ResponseEntity sendOtpEmail(@Valid @RequestBody EmailForm form) {
   
            User user = userRepository.findByEmailId(form.getSentto());
      
            if (user != null) {

                Random random = new Random();
                int otp = 100000 + random.nextInt(900000);
                Email otp2 = new Email();
                otp2.setOtp(otp);
                otp2.setEmail(form.getSentto());

                LocalTime myObj = LocalTime.now();
                LocalTime exp = myObj;
                otp2.setExpiry(exp);

                var email = form.getSentto();
                Email email2 = emailRepository.findByEmail(email);

                if (email2 != null) {
                    email2.setOtp(otp);
                    email2.setExpiry(exp);
                    emailRepository.save(email2);
                } else
                    emailRepository.save(otp2);

                boolean result = this.emailService.sendEmail("OTP Verification",
                        "Your OTP to change your password is \t" + otp + "\t use it to create a new password. OTP will EXPIRE after 3 MINUTES. Thank you",
                        form.getSentto());

            if(result){
                return new ResponseEntity(null, HttpStatus.ACCEPTED);
            }
            else{
              String message = String.format("UNABLE TO PROCESS OTP GENERATION");
             return ResponseEntity
            .unprocessableEntity()
            .body(message);
    
            }
         
        }
        else
        {
            throw new PreconditionFailedException("user email is not  registered");
        }
        

       }

   

    @PostMapping("verify")
    public ResponseEntity add(@Valid @RequestBody OtpForm form) {
    
        ResponseEntity result = emailService.add(form);

            if (result.getStatusCodeValue() == 202) {
                return new ResponseEntity(HttpStatus.ACCEPTED);

            } else if (result.getStatusCodeValue() == 504) {
               
                throw new GatewayTimeoutException("OTP VALIDITY EXPIRED ");
            }

            else
                throw new NotAcceptableException("OTP VERIFICATION FAILED");
    }

    @PostMapping("verifyPassword")
    public ResponseEntity addPassword(@Valid @RequestBody ChangePasswordForm form) {

        var psd = form.getNewPassword();
        var npsd = form.getCnewPassword();

         if (!psd.equals(npsd)) {
            throw new expectationFailedException("PASSWORD - MISSMATCH");
        
        } else {

            boolean result = emailService.addPassword(form);
            if (result) {
                return new ResponseEntity(null, HttpStatus.ACCEPTED);
            } else {
                throw new BadRequestException("PASSWORD CHANGE FAILED");
          
            }
        }

    }



}
