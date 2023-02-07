package com.innovature.Library.service;

import java.util.Collection;
import java.sql.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;

import com.innovature.Library.entity.Borrow;
import com.innovature.Library.form.BorrowForm;
import com.innovature.Library.view.BorrowDetailView;
import com.innovature.Library.view.BorrowListView;

public interface BorrowService {

    BorrowDetailView add(BorrowForm form);

    Collection<Borrow> listAll();

    List<Borrow> loadtAllByIssueDate(Date date1, Date date2);

    BorrowDetailView list(Integer borrowId);

    BorrowDetailView updates(Integer borrowId, BorrowForm form);

    Collection<BorrowListView> list1();

    Collection<Borrow> listNotification();

    Collection<Borrow> listUserNotification();

    BorrowDetailView updatereject(Integer borrowId, BorrowForm form);

    List<Borrow> getAllBorrows(Integer pageNo, Integer pageSize, String sortBy);

    Page<Borrow> getAllBorr(Integer pageNo, Integer pageSize, String sortBy, Integer direction);

    Page<Borrow> getAllFine(Integer pageNo, Integer pageSize, String sortBy, Integer direction); // fine

    List<Borrow> getAllBorrow(Date date1, Date date2, Integer pageNo, Integer pageSize, String sortBy);

    Page<Borrow> getAllBor(Date date1, Date date2, Integer pageNo, Integer pageSize, String sortBy, Integer direction);

    List<Borrow> getBorrowHistory(Integer pageNo, Integer pageSize, String sortBy);

    BorrowDetailView updateReturn(Integer borrowId, BorrowForm form);



    BorrowDetailView undo(Integer borrowId, @Valid BorrowForm form);

    Collection<Borrow> listDue();

    Collection<Borrow> listDueByUser();

    void sendMails();

    void fineGeneration();

    Collection<Borrow> fine();

    Borrow BorrowDetail(Integer borrowId);

    Integer BorrowBlock();

    Page<Borrow> getAllBorrByStat(Integer pageNo, Integer pageSize, String sortBy, Integer direction, Integer status);

    Page<Borrow> getAllBorrByStatus(Integer pageNo, Integer pageSize, String sortBy, Integer direction, Integer status);

    BorrowDetailView updatePaymentStatus(Integer borrowId, BorrowForm form);

    List<Borrow> listcsv(String date1, String date2);

}
