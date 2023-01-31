package com.innovature.Library.exception;

import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.CONFLICT;

public class ConflictException extends ResponseStatusException  {

    public ConflictException(){
        super(CONFLICT);

    }
    public ConflictException(String reason){
        super(CONFLICT,reason);
    }

    public ConflictException(String reason,Throwable cause){
        super(CONFLICT,reason,cause);
    }
    
}
