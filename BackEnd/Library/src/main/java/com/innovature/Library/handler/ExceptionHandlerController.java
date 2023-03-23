package com.innovature.Library.handler;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus.Series;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.web.bind.annotation.ResponseStatus;


import com.innovature.Library.exception.PreconditionFailedException;
import com.innovature.Library.exception.ConflictException;
import com.innovature.Library.exception.expectationFailedException;
import com.innovature.Library.security.util.InvalidTokenException;
import com.innovature.Library.exception.GatewayTimeoutException;
import com.innovature.Library.exception.NotAcceptableException;

import javax.validation.ConstraintViolation;

import java.util.List;
import java.util.stream.Collectors;


@ControllerAdvice
public class ExceptionHandlerController {
 
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDto> handleException(MethodArgumentNotValidException ex) {

        ErrorDto dto = new ErrorDto(HttpStatus.BAD_REQUEST, "Validation error");

        dto.setDetailedMessages(ex.getBindingResult().getAllErrors().stream()
            .map(err -> err.unwrap(ConstraintViolation.class))
            .map(err -> String.format("field='%s'message= %s", err.getPropertyPath(), err.getMessage()))
            .collect(Collectors.toList()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);

    }

    @Data
    public static class ErrorDto {

        private final int status;
        private final String error;
        private final String message;
        private List<String> detailedMessages;

        public ErrorDto(HttpStatus httpStatus, String message) {
            status = httpStatus.value();
            error = httpStatus.getReasonPhrase();
            this.message = message;
        }

    }

 

    @Data
    public static class ErrorDto1 {

        private final int status;
        private final String error;
        private final String message;
        private final Series series;
     

        public ErrorDto1(HttpStatus httpStatus, String message) {
            status = httpStatus.value();
            error = httpStatus.getReasonPhrase();
            this.message = message;
            series=httpStatus.series();


        }

    }


    @ExceptionHandler(PreconditionFailedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorDto1> handlePreconditionFailedException(PreconditionFailedException ex) {

        
        var msg=ex.getMessage();
        ErrorDto1 dto = new ErrorDto1(HttpStatus.PRECONDITION_FAILED,msg);   
        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(dto);

    }


    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorDto1> ConflictException(ConflictException ex) {
        var msg=ex.getMessage();
        ErrorDto1 dto = new ErrorDto1(HttpStatus.CONFLICT,msg);      
        return ResponseEntity.status(HttpStatus.CONFLICT).body(dto);

    }

  
    @ExceptionHandler(expectationFailedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorDto1> expectationFailedException(expectationFailedException ex) {
        var msg=ex.getMessage();
        ErrorDto1 dto = new ErrorDto1(HttpStatus.EXPECTATION_FAILED, msg);      
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(dto);

    }

    @ExceptionHandler(GatewayTimeoutException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorDto1> gatewayTimeoutException(GatewayTimeoutException ex) {
        var msg=ex.getMessage();
        ErrorDto1 dto = new ErrorDto1(HttpStatus.GATEWAY_TIMEOUT, msg);      
        return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body(dto);

    }

    @ExceptionHandler(NotAcceptableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorDto1> notAcceptableException(NotAcceptableException ex) {
        var msg=ex.getMessage();
        ErrorDto1 dto = new ErrorDto1(HttpStatus.NOT_ACCEPTABLE, msg);      
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(dto);
    }


    @ExceptionHandler(InvalidTokenException.class)
    //@ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorDto1> invalidToken(InvalidTokenException ex) {
        // System.out.println("----------------------------------");
        var msg=ex.getMessage();
        ErrorDto1 dto = new ErrorDto1(HttpStatus.FORBIDDEN, msg);      
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(dto);
    }







}