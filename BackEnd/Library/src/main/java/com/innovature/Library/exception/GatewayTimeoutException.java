package com.innovature.Library.exception;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.GATEWAY_TIMEOUT;;

public class GatewayTimeoutException extends ResponseStatusException{
    
    public GatewayTimeoutException(String reason){
        super(GATEWAY_TIMEOUT,reason);
    }
}
