package com.innovature.Library.form;
import javax.validation.constraints.NotBlank;
import com.innovature.Library.form.validaton.Password;
import javax.validation.constraints.Pattern;
public class OtpForm {
    private String email;

    @NotBlank
    @Pattern(regexp="[0-9]+",message="length must be 10") 
    private Integer otp;
    @Password
    private String newPassword;
    @Password
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
