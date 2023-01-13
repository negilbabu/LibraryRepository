package com.innovature.Library.form;

import javax.validation.constraints.Email;

public class EmailForm {

    @Email
    public String sentto;

    public String getSentto() {
        return sentto;
    }

    public void setSentto(String sentto) {
        this.sentto = sentto;
    }
}
