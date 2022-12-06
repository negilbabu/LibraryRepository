package com.innovature.Library.service;
import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import com.innovature.Library.entity.Borrow;
import com.innovature.Library.form.BorrowForm;
import com.innovature.Library.view.BorrowDetailView;
import com.innovature.Library.view.BorrowListView;

public interface BorrowService {

    BorrowDetailView add(BorrowForm form);

    Collection<Borrow> listAll();

    BorrowDetailView list(Integer borrowId);

    BorrowDetailView updates(Integer borrowId,BorrowForm form);

    BorrowDetailView listByUser(Integer borrowId,BorrowForm form);

    Collection<BorrowListView>list1();

    Collection<Borrow>listNotification();

    BorrowDetailView updatereject(Integer borrowId,BorrowForm form);
    
    List<Borrow> getAllBorrow(Integer pageNo, Integer pageSize, String sortBy);

    BorrowDetailView updateReturn(Integer borrowId, BorrowForm form);

    BorrowDetailView undo(Integer borrowId, @Valid BorrowForm form);

    Collection<Borrow> listDue();

    void sendMail(Integer userId,String subject,String text);








}