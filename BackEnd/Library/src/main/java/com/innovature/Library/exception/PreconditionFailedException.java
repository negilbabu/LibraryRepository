package com.innovature.Library.exception;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.PRECONDITION_FAILED;

import org.springframework.http.HttpStatus;;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PreconditionFailedException extends RuntimeException{

    // private static final long serialVersionUID = 1L;

    public PreconditionFailedException(String reason){
        super(reason);

    }
   
    
}


// @ResponseStatus(HttpStatus.BAD_REQUEST)
// public class PreconditionFailedException extends RuntimeException{

//     public PreconditionFailedException(){
//      super(PRECONDITION_FAILED);

//   }

//     private static final long serialVersionUID = 1L;    
//     public PreconditionFailedException(String reason){
//         super(reason);

//     }
//    public PreconditionFailedException(String reason,Throwable cause){
//       super(PRECONDITION_FAILED,reason,cause);

//     }
   
    
// }
