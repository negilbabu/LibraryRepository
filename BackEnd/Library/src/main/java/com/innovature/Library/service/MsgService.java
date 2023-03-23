package com.innovature.Library.service;

import java.util.Collection;

import com.innovature.Library.entity.Msg;
import com.innovature.Library.form.MsgForm;
import com.innovature.Library.view.MsgView;

public interface MsgService {

    MsgView add(MsgForm form);

    Collection<Msg> listById(Integer sender,Integer receiver);
    
}
