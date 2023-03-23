package com.innovature.Library.service;

import org.springframework.http.ResponseEntity;

import com.innovature.Library.form.ChangePasswordForm;
import com.innovature.Library.form.OtpForm;


public interface EmailService {
    boolean sendEmail(String subject, String message, String sentto);

    ResponseEntity add(OtpForm form);

    boolean addPassword(ChangePasswordForm form);

}
