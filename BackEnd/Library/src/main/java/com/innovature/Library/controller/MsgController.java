package com.innovature.Library.controller;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovature.Library.entity.Msg;
import com.innovature.Library.form.MsgForm;
import com.innovature.Library.security.util.SecurityUtil;
import com.innovature.Library.service.MsgService;
import com.innovature.Library.view.MsgView;

@RestController
@RequestMapping("/msg")
public class MsgController {

    @Autowired
    private MsgService service; 




    @PostMapping
    public MsgView add(@Valid @RequestBody MsgForm form ) {
        return service.add(form);
    }

    @GetMapping("/{receiver}")
    public Collection<Msg> list(
    //    Integer sender,
        @PathVariable("receiver") Integer receiver
    ) {
        return service.listById( SecurityUtil.getCurrentUserId(), receiver);
    }

    
}
