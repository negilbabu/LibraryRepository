package com.innovature.Library.form;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.persistence.Column;

public class MsgForm {


    @NotBlank
    @Size(max = 5000)  
    private String content;

    @Column(name = "receiver", nullable = false)
    private Integer receiver;



    

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getReceiver() {
        return receiver;
    }

    public void setReceiver(Integer receiver) {
        this.receiver = receiver;
    }

    

  

    
}
