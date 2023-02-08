package com.innovature.Library.form;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
public class EmailForm {

    @Email
    @NotBlank(message="email id cannot be null") 
    public String sentto;

    public String getSentto() {
        return sentto;
    }

    public void setSentto(String sentto) {
        this.sentto = sentto;
    }
}
