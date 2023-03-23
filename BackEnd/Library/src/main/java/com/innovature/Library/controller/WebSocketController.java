package com.innovature.Library.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @MessageMapping("/send/message")
    public void sendMessage(String message){
        System.out.println(message);
        this.template.convertAndSend("/message",  message);
    }
    
}
