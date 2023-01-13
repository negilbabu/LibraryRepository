package com.innovature.Library.view;

import java.time.LocalDateTime;
import java.util.Date;
// import java.util.Optional;

import com.innovature.Library.entity.Books;
import com.innovature.Library.entity.User;
// import com.innovature.Library.form.BooksForm;

//import Json.DateFormat;

public class BorrowListView {

    private final int borrowId;
    private final UserDetailView user;
    private final BooksDetailView books;

    // @Json.DateFormat
    private final LocalDateTime issueDate;
    @Json.DateFormat
    private final Date returnDate;
    @Json.DateFormat
    private final Date dueDate;
    // @Json.DateFormat
    private final LocalDateTime bookReturnedDate;
    private String status;
    private String paymentStatus;
    private String reason;
    public Long fine;
    public Long dueDays;

    public BorrowListView(int borrowId, User user, Books books, LocalDateTime issueDate, Date returnDate, LocalDateTime bookReturnedDate,Date dueDate, String status,String reason,Long dueDays,Long fine,String paymentStatus) {
        this.borrowId = borrowId;
        this.user = new UserDetailView(user);
        this.books = new BooksDetailView(books);

        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.bookReturnedDate=bookReturnedDate;
        this.status = status;
        this.dueDate = dueDate;
        this.reason = reason;
        this.dueDays=dueDays;
        this.fine=fine;
        this.paymentStatus=paymentStatus;

    }

    // public BorrowListView(Integer borrowId2, User user2, Books books2, LocalDateTime issueDate2, Date returnDate2,
    //         LocalDateTime bookReturnedDate2, Date dueDate2, String status2, String reason2, Long dueDays2, Long fine2) {
    // }

    public int getBorrowId() {
        return borrowId;
    }

    public UserDetailView getUser() {
        return user;
    }

    public BooksDetailView getBooks() {
        return books;
    }

    public LocalDateTime getIssueDate() {
        return issueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public String getStatus(){
        return status;

    }

    public String getReason(){
        return reason;

    }

    public LocalDateTime getBookReturnedDate() {
        return bookReturnedDate;
    }

    public Long getFine() {
        return fine;
    }

    public Long getDueDays() {
        return dueDays;
    }

    public String getpaymentStatus(){
        return paymentStatus;

    }


}

