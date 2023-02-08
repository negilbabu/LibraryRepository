package com.innovature.Library.service.impl;

import com.innovature.Library.entity.Email;
import com.innovature.Library.entity.User;
import com.innovature.Library.form.ChangePasswordForm;
import com.innovature.Library.form.OtpForm;
import com.innovature.Library.repository.EmailRepository;
import com.innovature.Library.repository.UserRepository;
import com.innovature.Library.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Properties;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.Session;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

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
    public ResponseEntity add(OtpForm form) {

        Email otp = emailRepository.findByEmail(form.getEmail());

        LocalTime myObj = LocalTime.now();

        var exp = otp.getExpiry().until(myObj, ChronoUnit.SECONDS);

        if ((form.getOtp().equals(otp.getOtp()))) {

            if (exp < 181) {

                return new ResponseEntity(null, HttpStatus.ACCEPTED);

            }
            // otp expiry
            return new ResponseEntity(null, HttpStatus.GATEWAY_TIMEOUT);

        }
        return new ResponseEntity(null, HttpStatus.NOT_ACCEPTABLE);
    }

    @Override
    public boolean addPassword(ChangePasswordForm form) {

        User user = userRepository.findByEmailId(form.getEmail());

        if (form.getNewPassword().equals(form.getCnewPassword()))

        {

            user.setPassword(passwordEncoder.encode(form.getNewPassword()));
            userRepository.save(user);
            return true;
        }
        return false;

    }

    @Override
    public boolean sendEmail(String subject, String message, String to) {

        User user = userRepository.findByEmailId(to);
        if (user != null) {

            boolean s = false;
            String senderEmail = "stormhokspam@gmail.com";
            String senderPassword = "cyckyhziponehguf";

            Properties properties = new Properties();
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.starttls.enable", "true");
            properties.put("mail.smtp.host", "smtp.gmail.com");
            properties.put("mail.smtp.port", "587"); // 587 is TLS port number
            Session session = Session.getInstance(properties, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {

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

            } catch (Exception e) {

            }
            return s;
        }

        else {
            return (Boolean) null;
        }

    }

}