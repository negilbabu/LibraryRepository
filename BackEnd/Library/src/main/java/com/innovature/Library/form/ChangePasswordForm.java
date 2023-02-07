package com.innovature.Library.form;


import javax.validation.constraints.NotBlank;
import com.innovature.Library.form.validaton.Password;

public class ChangePasswordForm {
    @NotBlank
    private String email;
    @NotBlank(message="new password cannot be null") 
    @Password
    private String newPassword;

    @NotBlank(message="confirm new password cannot be null") 
    @Password
    private String cnewPassword;


      
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
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
