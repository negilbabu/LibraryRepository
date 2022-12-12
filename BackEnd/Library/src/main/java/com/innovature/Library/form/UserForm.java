/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.innovature.Library.form;

import java.util.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.innovature.Library.form.validaton.Password;
import com.innovature.Library.json.Json.DateFormat;

/**
 *
 * @author nirmal
 */
public class UserForm {

    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    
    @DateFormat
    private Date dob;

    @NotBlank
    @Size(min = 1)
    private String address;

    @NotBlank
    @Size(min = 5)
    private String phone;

    @NotBlank
    @Size(max = 255)
    @Email
    private String email;
    @Password
    private String password;
  
    //@NotBlank
    //private int role;

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

    // public int getRole() {
    //     return role;
    // }

    // public void setRole(int role) {
    //     this.role = role;
    // }

    
    
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
