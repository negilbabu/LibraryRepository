package com.innovature.Library.service;

import com.innovature.Library.form.OtpForm;

public interface EmailService {
    boolean sendEmail(String subject, String message, String sentto);
    // boolean sendOtpEmail(String subject, String message, String sentto);

    boolean add(OtpForm form);


}
