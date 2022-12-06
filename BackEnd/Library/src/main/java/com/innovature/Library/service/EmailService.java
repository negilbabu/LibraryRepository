package com.innovature.Library.service;

public interface EmailService {
    boolean sendEmail(String subject, String message, String sentto);
    // boolean sendOtpEmail(String subject, String message, String sentto);
}
