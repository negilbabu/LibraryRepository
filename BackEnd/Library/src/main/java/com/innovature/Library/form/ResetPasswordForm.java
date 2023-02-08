package com.innovature.Library.form;
import javax.validation.constraints.NotBlank;

import com.innovature.Library.form.validaton.Password;

public class ResetPasswordForm {

    // @NotBlank
    // private String email;
    @NotBlank(message="Old password cannot be null") 
    @Password
    private String oldPassword;

    // @Password
    private String newPassword;

    // @Password
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
  
  
  
    // public String getEmail() {
    //     return email;
    // }
    // public void setEmail(String email) {
    //     this.email = email;
    // }
    public String getOldPassword() {
        return oldPassword;
    }
    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    
}















































// User user = userRepository.findById(SecurityUtil.getCurrentUserId());
        

// System.out.println("----------------------------------------"+user.getEmail());

// if ( (!passwordEncoder.matches(form.getOldPassword(), user.getPassword()))){
//    throw new expectationFailedException("Incorrect Password ");
// }
// else
// {       

//     Random random = new Random();
//     int otp = 100000 + random.nextInt(900000);




//     SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//     simpleMailMessage.setFrom("testnegspam@gmail.com");
//     simpleMailMessage.setTo(user.getEmail());
//     simpleMailMessage.setSubject("Books are due");
//     simpleMailMessage.setText(
//             "Please return the book '" );

//     this.mailSender.send(simpleMailMessage);
    // return false;
// }


// }