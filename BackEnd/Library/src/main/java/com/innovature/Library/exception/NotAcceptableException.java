package com.innovature.Library.exception;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE;;

public class NotAcceptableException extends ResponseStatusException  {

    public NotAcceptableException(){
        super(NOT_ACCEPTABLE);

    }
    public NotAcceptableException(String reason){
        super(NOT_ACCEPTABLE,reason);
    }

    public NotAcceptableException(String reason,Throwable cause){
        super(NOT_ACCEPTABLE,reason,cause);
    }
    
}