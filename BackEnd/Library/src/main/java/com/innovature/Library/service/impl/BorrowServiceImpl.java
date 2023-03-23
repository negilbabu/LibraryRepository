package com.innovature.Library.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;

import com.innovature.Library.entity.Books;
import com.innovature.Library.entity.Borrow;
import com.innovature.Library.entity.User;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.exception.ConflictException;
import com.innovature.Library.form.BorrowForm;
import com.innovature.Library.repository.BooksRepository;
import com.innovature.Library.repository.BorrowRepository;
import com.innovature.Library.repository.UserRepository;
import com.innovature.Library.security.util.SecurityUtil;
import com.innovature.Library.service.BorrowService;

import com.innovature.Library.view.BorrowDetailView;
import com.innovature.Library.view.BorrowListView;
import com.innovature.Library.view.rentChartView;

import com.innovature.Library.exception.expectationFailedException;

@Service
public class BorrowServiceImpl implements BorrowService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    BooksRepository booksRepository;

    @Autowired
    UserRepository userRepository;

    private static ConflictException conflictException() {
        return new ConflictException("Book Already Rented to you");
    }

    private static expectationFailedException expectationFailedException() {
        return new expectationFailedException("Invalid username or password");
    }

    private static BadRequestException badRequestException() {
        return new BadRequestException("Invalid credentials");
    }

    @Override
    public BorrowDetailView add(BorrowForm form) {
        Books books = booksRepository.findByBooksId(form.getBooksId());
        User user = userRepository.findById(SecurityUtil.getCurrentUserId());

        Integer inHand = borrowRepository.findbyUserIdAndStatus(SecurityUtil.getCurrentUserId());

        if (inHand > 3) {

            throw expectationFailedException();
        }

        else {

            Integer stat = borrowRepository.borrowBlockByBook(books, user);
            Integer status = borrowRepository.borrowBlockByRequestedStatus(books, user);

            if (stat >= 1) {

                throw conflictException();
            } else if (status >= 1) {
                throw badRequestException();
            }

            else
                return new BorrowDetailView(borrowRepository.save(new Borrow(books, user)));
        }

    }

    @Override
    public Integer BorrowBlock() {

        return borrowRepository.findbyUserIdAndStatus(SecurityUtil.getCurrentUserId());
    }

    @Override
    public Collection<Borrow> listAll() {
        return borrowRepository.findAll();
    }

    @Override
    public List<Borrow> loadtAllByIssueDate(java.sql.Date date1, java.sql.Date date2) {
        return borrowRepository.findbyIssuDate(date1, date2);
    }

    @Override
    public Collection<Borrow> listDue() {
        return borrowRepository.findbyBorrowIdandStatus();
    }

    @Override
    public Collection<Borrow> listDueByUser() {
        return borrowRepository.findbyUserIdandStatus(SecurityUtil.getCurrentUserId());
    }

    @Override
    public Borrow BorrowDetail(Integer borrowId) {

        return borrowRepository.findByBorrowId(borrowId);
    }

    @Override
    public BorrowDetailView list(Integer borrowId) {
        Borrow borrow = borrowRepository.findByBorrowId(borrowId);
        return new BorrowDetailView(borrow);
    }

    @Override
    public Collection<BorrowListView> list1() {
        return borrowRepository.findAllByUserUserId(SecurityUtil.getCurrentUserId());
    }

    @Override
    public Collection<Borrow> listNotification() {
        return borrowRepository.findBorrowIdbyUserId(SecurityUtil.getCurrentUserId());
    }

    @Override
    public Collection<Borrow> listUserNotification() {
        return borrowRepository.findbyUserIdDueDate(SecurityUtil.getCurrentUserId());
    }

    @Override
    @Transactional
    public BorrowDetailView updates(Integer borrowId, BorrowForm form) {

        Borrow borrow = borrowRepository.findByBorrowId(borrowId);
        Books books = booksRepository.findbyBorrowId(borrowId);

        if (books.getBooksCopies() == 0) {
            throw expectationFailedException();
        }

        else {
            borrow.setIssueDate(LocalDate.now());

            borrow.setDueDate(form.getDueDate());
            borrow.setReturnDate(form.getReturnDate());
            borrow.setReason("NA");
            borrow.setStatus("APPROVED");
            books.setBooksCopies(books.getBooksCopies() - 1);
            return new BorrowDetailView(borrowRepository.save(borrow));

        }
    }

    @Override
    @Transactional
    public BorrowDetailView updatereject(Integer borrowId, BorrowForm form) {

        Borrow borrow = borrowRepository.findByBorrowId(borrowId);

        borrow.setReason(form.getReason());
        borrow.setIssueDate(null);
        borrow.setReturnDate(null);
        borrow.setDueDate(null);
        borrow.setStatus("REJECTED");
        return new BorrowDetailView(borrow);
    }

    @Override
    @Transactional
    public BorrowDetailView updateReturn(Integer borrowId, BorrowForm form) {

        Borrow borrow = borrowRepository.findByBorrowId(borrowId);
        Books books = booksRepository.findbyBorrowId(borrowId);

        borrow.setBookReturnedDate(LocalDate.now());
        borrow.setStatus("RETURNED");
        // borrow.setBookReturnedDate(borrow.getBookReturnedDate());
        books.setBooksCopies(books.getBooksCopies() + 1);
        return new BorrowDetailView(borrowRepository.save(borrow));
    }



    @Override
    @Transactional
    public BorrowDetailView updatePaymentStatus(Integer borrowId, BorrowForm form) {

        Borrow borrow = borrowRepository.findByBorrowId(borrowId);
System.out.println("---======="+borrow.getIssueDate());
        borrow.setPaymentStatus("PAID");
        System.out.println("---======="+borrow.getPaymentStatus());
        System.out.println("---======="+borrow.getIssueDate());
        // borrow.setIssueDate(borrow.getIssueDate());
        return new BorrowDetailView(borrowRepository.save(borrow));
    }



    @Override
    @Transactional
    public BorrowDetailView undo(Integer borrowId, BorrowForm form) {

        Borrow borrow = borrowRepository.findByBorrowId(borrowId);
        Books books = booksRepository.findbyBorrowId(borrowId);

        borrow.setBookReturnedDate(null);
        borrow.setStatus("APPROVED");
        books.setBooksCopies(books.getBooksCopies() - 1);
        return new BorrowDetailView(borrowRepository.save(borrow));
    }

    /// pagenation and sort///
    @Override
    @Transactional
    public List<Borrow> getAllBorrow(java.sql.Date date1, java.sql.Date date2, Integer pageNo, Integer pageSize,
            String sortBy) {

        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        Page<Borrow> pagedResult = borrowRepository.findbyIssuDate(date1, date2, paging);

        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Borrow>();
        }
    }

    @Override
    @Transactional
    public Page<Borrow> getAllBor(java.sql.Date date1, java.sql.Date date2, Integer pageNo, Integer pageSize,
            String sortBy, Integer direction) {

        var sortByDescending = Sort.by(sortBy).descending();
        var sortByAscending = Sort.by(sortBy).ascending();

        if (direction == 1) {

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<Borrow> pagedResult = borrowRepository.findbyIssuDat(date1, date2, paging);
            return pagedResult;
        }

        else {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findbyIssuDat(date1, date2, paging);
            return pagedResult;
        }

    }

    @Override
    @Transactional
    public List<Borrow> getAllBorrows(Integer pageNo, Integer pageSize, String sortBy) {

        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        Page<Borrow> pagedResult = borrowRepository.findAll(paging);

        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Borrow>();
        }
    }

    // @admin borrow oninit
    @Override
    @Transactional
    public Page<Borrow> getAllBorr(Integer pageNo, Integer pageSize, String sortBy, Integer direction) {

        var sortByDescending = Sort.by(sortBy).descending();

        var sortByAscending = Sort.by(sortBy).ascending();

        if (direction == 1) {

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<Borrow> pagedResult = borrowRepository.findAll(paging);
            return pagedResult;
        }

        else {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findAll(paging);
            return pagedResult;
        }

    }

    @Override
    @Transactional
    public List<Borrow> getBorrowHistory(Integer pageNo, Integer pageSize, String sortBy) {

        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        Page<Borrow> pagedResult = borrowRepository.findAllByUserUserId(SecurityUtil.getCurrentUserId(), paging);

        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Borrow>();
        }
    }

    @Override
    public Collection<Borrow> fine() {
        return borrowRepository.findbyBorrowIdandDueDateandStatus();
    }

    // @admin borrow oninit
    @Override
    @Transactional
    public Page<Borrow> getAllFine(Integer pageNo, Integer pageSize, String sortBy, Integer direction) {

        var sortByDescending = Sort.by(sortBy).descending();

        var sortByAscending = Sort.by(sortBy).ascending();

        if (direction == 1) {

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<Borrow> pagedResult = borrowRepository.findbyBorrowIdandDueDateandStatus(paging);
            return pagedResult;
        }

        else {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findbyBorrowIdandDueDateandStatus(paging);
            return pagedResult;
        }

    }

    @Override
    @Transactional
    // @Scheduled(cron="* */1 * * * * ")
    // @Scheduled(cron = "0 0 12 * * ?")
    public void sendMails() {

        Collection<Borrow> borrow = borrowRepository.findbyBorrowIdandStatus();
        for (Borrow bor : borrow) {
            User user = userRepository.findById(bor.getUser().getUserId()); // fetching uid from user
          
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom("testnegspam@gmail.com");
            simpleMailMessage.setTo(user.getEmail());
            simpleMailMessage.setSubject("Books are due");
            simpleMailMessage.setText(
                    "Please return the book '" + bor.getBooks().getBooksName() + "'. The due date has expired on "
                            + bor.getDueDate() + ". Fine will be generated for each day(5 rs/day)");

            this.mailSender.send(simpleMailMessage);
        }
    }

    @Override
    @Transactional
    // @Scheduled(cron="* */1 * * * * ")
    @Scheduled(cron = "0 0 */12 * * ?")
    public void fineGeneration() {

        Collection<Borrow> borrow = borrowRepository.findbyBorrowId();
        for (Borrow bor : borrow) {
System.out.println("isuueeeeeeeeeeeeeeeeeeeeeeeeeee=="+bor.getIssueDate());
            Date d = new Date();
            Long due = d.getTime() - bor.getDueDate().getTime(); // date conversion to time
            due = due / 86400000; // time conversion to date
            bor.setDueDays(due);

            bor.setFine(due * 5);
            bor.setPaymentStatus("UNPAID");
        }

    }

    public rentChartView getChart() {
        rentChartView result = new rentChartView();
        String[] weeks = { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
        result.setLabel(Arrays.asList(weeks));

        HashMap<Integer, Result> hm = new HashMap<Integer, Result>();

        hm.put(1, new Result(0, 0));
        hm.put(2, new Result(0, 0));
        hm.put(3, new Result(0, 0));
        hm.put(4, new Result(0, 0));
        hm.put(5, new Result(0, 0));
        hm.put(6, new Result(0, 0));
        hm.put(7, new Result(0, 0));

        List<Borrow> s = borrowRepository.findAllL7();

        for (Borrow a : s) {
            if (a.getIssueDate() != null) {

                LocalDate b = a.getIssueDate();

                hm.put(b.getDayOfWeek().getValue(), new Result(hm.get(b.getDayOfWeek().getValue()).getIssueCount() + 1,
                        hm.get(b.getDayOfWeek().getValue()).getReturnedCount()));
            }

            LocalDate c = null;

            if (a.getStatus().equals("RETURNED")) {

                c = a.getBookReturnedDate();

                hm.put(c.getDayOfWeek().getValue(), new Result(hm.get(c.getDayOfWeek().getValue()).getIssueCount(),
                        hm.get(c.getDayOfWeek().getValue()).getReturnedCount() + 1));

            }
        }
        for (Map.Entry<Integer, Result> mapElement : hm.entrySet()) {
            result.getIssueCount().add(mapElement.getValue().getIssueCount() + "");
            result.getReturnedCount().add(mapElement.getValue().getReturnedCount() + "");

        }
        return result;
    }

    public class Result {
        private Integer issueCount;
        private Integer returnedCount;

        public Result(Integer issueCount, Integer returnedCount) {
            this.issueCount = issueCount;
            this.returnedCount = returnedCount;
        }

        public Integer getIssueCount() {
            return issueCount;
        }

        public void setIssueCount(Integer issueCount) {
            this.issueCount = issueCount;
        }

        public Integer getReturnedCount() {
            return returnedCount;
        }

        public void setReturnedCount(Integer returnedCount) {
            this.returnedCount = returnedCount;
        }
    }

    @Override
    @Transactional
    public Page<Borrow> getAllBorrByStat(Integer pageNo, Integer pageSize, String sortBy, Integer direction,
            Integer status) {

        var sortByDescending = Sort.by(sortBy).descending();

        var sortByAscending = Sort.by(sortBy).ascending();

        if (direction == 1 && status == 1) {

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<Borrow> pagedResult = borrowRepository.findByAppStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;
        }

        else if (direction == 1 && status == 2) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByRejStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;
        } else if (direction == 1 && status == 3) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByRetStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;
        } else if (direction == 1 && status == 4) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByReqStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;
        }

        else if (direction == -1 && status == 1) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByAppStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;
        }

        else if (direction == -1 && status == 2) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByRejStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;

        } else if (direction == -1 && status == 3) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByRetStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;

        } else if (direction == -1 && status == 4) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByReqStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;
        } else {
            return null;
        }
    }

    @Override
    @Transactional
    public Page<Borrow> getAllBorrByStatus(Integer pageNo, Integer pageSize, String sortBy, Integer direction,
            Integer status) {

        var sortByDescending = Sort.by(sortBy).descending();

        var sortByAscending = Sort.by(sortBy).ascending();

        if (direction == 1 && status == 1) {

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<Borrow> pagedResult = borrowRepository.findByAppStatusAdmin(paging);
            return pagedResult;
        }

        else if (direction == 1 && status == 2) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByRejStatusUser(paging);
            return pagedResult;
        } else if (direction == 1 && status == 3) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByRetStatusUser(paging);
            return pagedResult;
        } else if (direction == 1 && status == 4) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByReqStatusUser(paging);
            return pagedResult;
        }

        else if (direction == -1 && status == 1) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByAppStatusAdmin(paging);
            return pagedResult;
        }

        else if (direction == -1 && status == 2) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByRejStatusUser(paging);
            return pagedResult;

        } else if (direction == -1 && status == 3) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByRetStatusUser(paging);
            return pagedResult;

        } else if (direction == -1 && status == 4) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findByReqStatusUser(SecurityUtil.getCurrentUserId(), paging);
            return pagedResult;
        } else {
            return null;
        }
    }



    @Override
    public List<Borrow> listcsv(String date1, String date2) {

        String d1 = date1;

        if (!d1.equals("")) {

            return borrowRepository.findAsFilter(date1, date2);
        } else {

            return borrowRepository.findAllC();
        }
    }

}
