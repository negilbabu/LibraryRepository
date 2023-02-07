package com.innovature.Library.form;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class OtpForm {

    @NotBlank
    private String email;

    @NotNull(message="OTP cannot be null") 
    private Integer otp;



    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Integer getOtp() {
        return otp;
    }
    public void setOtp(Integer otp) {
        this.otp = otp;
    }

    
}
