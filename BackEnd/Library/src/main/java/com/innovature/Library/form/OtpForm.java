package com.innovature.Library.form;
import javax.validation.constraints.NotBlank;

public class OtpForm {
    private String email;

    @NotBlank
    private Integer otp;
    private String newPassword;
    private String cnewPassword;


    
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
    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
    public String getCnewPassword() {
        return cnewPassword;
    }
    public void setCnewPassword(String cnewPassword) {
        this.cnewPassword = cnewPassword;
    }

    
}
