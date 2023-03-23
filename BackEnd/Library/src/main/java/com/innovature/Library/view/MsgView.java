package com.innovature.Library.view;

import java.util.Date;

import com.innovature.Library.entity.Msg;
import com.innovature.Library.json.Json;


public class MsgView {

    private final int msgId;
    private final String content;
    private final int sender;
    private final int receiver;
    private final int status;

    @Json.DateTimeFormat
    private final Date time;


    public MsgView(Msg msg){
        this.msgId = msg.getMsgId();
        this.content = msg.getContent();
        this.sender = msg.getSender();
        this.receiver = msg.getReceiver();
        this.status = msg.getStatus(); 
        this.time=msg.getTime();

        
    }


    public int getMsgId() {
        return msgId;
    }


    public String getContent() {
        return content;
    }


    public int getSender() {
        return sender;
    }


    public int getReceiver() {
        return receiver;
    }


    public int getStatus() {
        return status;
    }


    public Date getTime() {
        return time;
    }

    
}
