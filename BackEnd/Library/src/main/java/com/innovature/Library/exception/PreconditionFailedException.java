package com.innovature.Library.exception;
import org.springframework.web.bind.annotation.ResponseStatus;


import org.springframework.http.HttpStatus;;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PreconditionFailedException extends RuntimeException{

    public PreconditionFailedException(String reason){
        super(reason);

    }
   
    
}
