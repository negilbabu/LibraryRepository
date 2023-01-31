package com.innovature.Library.exception;

import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.EXPECTATION_FAILED;

public class expectationFailedException extends ResponseStatusException {
    
public expectationFailedException(){
    super(EXPECTATION_FAILED);
}
public expectationFailedException(String reason){
    super(EXPECTATION_FAILED,reason);
}
public expectationFailedException(String reason,Throwable cause){
    super(EXPECTATION_FAILED,reason,cause);
}



}
