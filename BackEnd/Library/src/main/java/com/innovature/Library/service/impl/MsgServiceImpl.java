package com.innovature.Library.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.form.MsgForm;
import com.innovature.Library.repository.MsgRepository;
import com.innovature.Library.service.MsgService;
import com.innovature.Library.view.MsgView;
import com.innovature.Library.entity.Msg;

@Service
public class MsgServiceImpl implements MsgService {


    @Autowired
    private MsgRepository msgRepository;


    @Override
    public MsgView add(MsgForm form) throws BadRequestException {
 
           return new MsgView(msgRepository.save(new Msg(form)));
   
    }

    @Override
    public Collection<Msg> listById(Integer sender,Integer receiver) {
        System.out.println("-----------------------"+sender);
        System.out.println("-----------+++++++++++++++++++++++++++++++++++++++++++-----------"+receiver);
        return msgRepository.findBySenderAndReceiver(sender,receiver);
    }
    
}
