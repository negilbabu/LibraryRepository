package com.innovature.Library.handler;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.innovature.Library.exception.PreconditionFailedException;

import javax.validation.ConstraintViolation;

import java.util.HashMap;
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


        // @ExceptionHandler(value = Exception.class)
        // @ResponseBody
        // public ResponseEntity<Object> exceptionHandler(Exception e) {
        //     HashMap<String, Object> msg = new HashMap<>(2);
        //     msg.put("error", HttpStatus.PRECONDITION_FAILED.value());
        //     msg.put("message", "Something went wrong");
        //     return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
        // }

    // @ExceptionHandler(PreconditionFailedException.class)
    @ResponseStatus(HttpStatus.PRECONDITION_FAILED)
    public ResponseEntity<ErrorDto1> handlePreconditionFailedException(MethodArgumentNotValidException ex) {

        ErrorDto1 dto = new ErrorDto1(HttpStatus.PRECONDITION_FAILED, "Validation error");
System.out.println("------------------------------------------"+dto);
        dto.setDetailedMessages(ex.getBindingResult().getAllErrors().stream()
            .map(err -> err.unwrap(ConstraintViolation.class))
            .map(err -> String.format("field='%s'message= %s", err.getPropertyPath(), err.getMessage()))
            .collect(Collectors.toList()));

        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(dto);

    }

    @Data
    public static class ErrorDto1 {

        private final int status;
        private final String error;
        private final String message;
        private List<String> detailedMessages;

        public ErrorDto1(HttpStatus httpStatus, String message) {
            status = httpStatus.value();
            error = httpStatus.getReasonPhrase();
            this.message = message;
        }

    }

}