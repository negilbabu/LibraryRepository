package com.innovature.Library.form;

import javax.validation.constraints.NotBlank;

public class googleForm {
   
    @NotBlank
    public String idToken;

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

   
    
    
}
