package com.innovature.Library.service.impl;

import com.innovature.Library.entity.Email;
import com.innovature.Library.entity.User;
import com.innovature.Library.form.OtpForm;
import com.innovature.Library.repository.EmailRepository;
import com.innovature.Library.repository.UserRepository;
import com.innovature.Library.service.EmailService;


import java.util.Properties;




import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
   
    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;
   
   
    @Override
    public boolean add(OtpForm form){
        System.out.println("----------------------------");
        Email otp=emailRepository.findByEmail(form.getEmail());
        User user=userRepository.findByEmailId(form.getEmail());
        System.out.println(form.getEmail());
        // System.out.println(form.getOtp());
        System.out.println(otp);
        if ((form.getOtp().equals(otp.getOtp()))) {
            System.out.println("----------inside if of otp ==-------");

            if (form.getNewPassword().equals(form.getCnewPassword()))
                       
            {
                System.out.println("----------inside if of passwrd ==-------");
                user.setPassword(passwordEncoder.encode(form.getNewPassword()));
                userRepository.save(user);
                return true;
            } 
            return false;
            

        }
        else{
            return false;
        }
    }
   
   
   
   
   
   
   
   
   
   
   
    @Override
    public boolean sendEmail(String subject, String message, String to)
    {

        User user=userRepository.findByEmailId(to);
            if(user!=null){

                boolean s=false;
                String senderEmail="stormhokspam@gmail.com";
                String senderPassword="cyckyhziponehguf";
        
                Properties properties = new Properties();
                properties.put("mail.smtp.auth", "true");
                properties.put("mail.smtp.starttls.enable", "true"); 
                properties.put("mail.smtp.host", "smtp.gmail.com"); 
                properties.put("mail.smtp.port", "587"); // 587 is TLS port number
                Session session = Session.getInstance(properties, new Authenticator()
                {
                    protected PasswordAuthentication getPasswordAuthentication(){
        
                        return new PasswordAuthentication(senderEmail, senderPassword);
                    }
                });


        try {

            MimeMessage msg = new MimeMessage(session); 

            msg.setFrom(new InternetAddress(senderEmail));

            msg.addRecipient(Message.RecipientType.TO, new InternetAddress(to)); 

            msg.setSubject(subject); 
            msg.setText(message); 
            Transport.send(msg); 

            s = true; 

        }catch(Exception e){

        }
        return s;                
            }

        else{
            return (Boolean) null;
        }
       

         
    }








}