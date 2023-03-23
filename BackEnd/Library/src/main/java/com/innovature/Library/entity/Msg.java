package com.innovature.Library.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.innovature.Library.form.MsgForm;
import com.innovature.Library.security.util.SecurityUtil;

@Entity
public class Msg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer msgId;

    private Integer status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

    // @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Integer sender;

    // @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Integer receiver;

    private String content;

    public Msg() {
    }

    public Msg(Integer msgId) {
        this.msgId = msgId;
    }

    public Msg(MsgForm form) {
        this.content = form.getContent();
        this.sender = SecurityUtil.getCurrentUserId();
        this.receiver = form.getReceiver();
        this.status = 1;
        Date dt = new Date();
        this.time = dt;

    }

    public Integer getMsgId() {
        return msgId;
    }

    public void setMsgId(Integer msgId) {
        this.msgId = msgId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Integer getSender() {
        return sender;
    }

    public void setSender(Integer sender) {
        this.sender = sender;
    }

    public Integer getReceiver() {
        return receiver;
    }

    public void setReceiver(Integer receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }



    
}