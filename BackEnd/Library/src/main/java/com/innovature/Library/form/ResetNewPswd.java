package com.innovature.Library.form;
import javax.validation.constraints.NotBlank;

import com.innovature.Library.form.validaton.Password;

public class ResetNewPswd {

    @NotBlank(message="New password cannot be null") 
     @Password
     private String newPassword;

     @NotBlank(message="Confirm password cannot be null") 
     @Password
     private String cnewPassword;
 
 
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
