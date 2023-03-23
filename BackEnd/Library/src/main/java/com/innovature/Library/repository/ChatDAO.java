package com.innovature.Library.repository;

import java.util.List;

import org.springframework.data.repository.Repository;

import com.innovature.Library.entity.MessageEntity;
import com.innovature.Library.entity.ChatEntity;


public interface ChatDAO extends Repository<ChatEntity, Integer>{

    MessageEntity save(ChatEntity newChat);

    ChatEntity findByName(String name);
    // ChatEntity findByChatId(String chatId);

    // List<ChatEntity> findByPartecipant(String user);

}
