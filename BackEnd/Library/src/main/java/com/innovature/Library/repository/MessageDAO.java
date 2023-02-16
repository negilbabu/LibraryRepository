package com.innovature.Library.repository;

import java.util.List;

import org.springframework.data.repository.Repository;
import com.innovature.Library.entity.MessageEntity;



public interface MessageDAO extends Repository <MessageEntity, Integer>{
    
   
    // List<MessageEntity> findAllByChat(long chat_id);

    MessageEntity save(MessageEntity message);
}
