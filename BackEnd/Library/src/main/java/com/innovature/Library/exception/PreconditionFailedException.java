package com.innovature.Library.exception;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.PRECONDITION_FAILED;;


public class PreconditionFailedException extends ResponseStatusException{

    public PreconditionFailedException(){
        super(PRECONDITION_FAILED);

    }
    public PreconditionFailedException(String reason){
        super(PRECONDITION_FAILED,reason);

    }
    public PreconditionFailedException(String reason,Throwable cause){
        super(PRECONDITION_FAILED,reason,cause);

    }
   
    
}
