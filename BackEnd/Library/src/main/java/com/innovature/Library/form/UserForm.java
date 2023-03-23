
package com.innovature.Library.form;

import java.util.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.innovature.Library.form.validaton.Password;
import com.innovature.Library.json.Json.DateFormat;


public class UserForm {

    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    
    // @NotBlank
    @DateFormat
    private Date dob;

    @NotBlank
    @Size(max = 255)
    private String address;

    @NotBlank
    @Size(min = 10,max = 11)
    @Pattern(regexp="[0-9]+",message="length must be 10")  
    private String phone;

    private Integer role;

    @NotBlank
    @Size(max = 255)
    @Email
    private String email;

    @Password
    private String password;
    
    @NotNull(message="OTP cannot be null") 
    private Integer otp;
  
    public Integer getOtp() {
        return otp;
    }

    public void setOtp(Integer otp) {
        this.otp = otp;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
     
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
