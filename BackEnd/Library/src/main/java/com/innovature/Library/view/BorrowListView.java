package com.innovature.Library.view;

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

    @Json.DateFormat
    private final Date issueDate;
    @Json.DateFormat
    private final Date returnDate;
    @Json.DateFormat
    private final Date dueDate;
    @Json.DateFormat
    private final Date bookReturnedDate;
    private String status;
    private String reason;
    public Long fine;
    public Long dueDays;

    public BorrowListView(int borrowId, User user, Books books, Date issueDate, Date returnDate, Date dueDate,Date bookReturnedDate, String status,String reason,Long dueDays,Long fine) {
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


    }

    public int getBorrowId() {
        return borrowId;
    }

    public UserDetailView getUser() {
        return user;
    }

    public BooksDetailView getBooks() {
        return books;
    }

    public Date getIssueDate() {
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

    public Date getBookReturnedDate() {
        return bookReturnedDate;
    }

    public Long getFine() {
        return fine;
    }

    public Long getDueDays() {
        return dueDays;
    }




}

