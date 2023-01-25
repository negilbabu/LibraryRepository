package com.innovature.Library.entity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Email {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer otpId;


    private String email;
    
    private Integer otp;


    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Integer getOtpId() {
        return otpId;
    }
    public void setOtpId(Integer otpId) {
        this.otpId = otpId;
    }
    public Integer getOtp() {
        return otp;
    }
    public void setOtp(Integer otp) {
        this.otp = otp;
    }


    
}
