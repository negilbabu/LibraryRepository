package com.innovature.Library.view;

import java.util.Date;
// import java.util.Optional;

import com.innovature.Library.entity.Books;
import com.innovature.Library.entity.User;
// import com.innovature.Library.form.BooksForm;

public class BorrowListView {

    private final int borrowId;
    private final UserDetailView user;
    private final BooksDetailView books;

    @Json.DateTimeFormat
    private final Date issueDate;
    @Json.DateTimeFormat
    private final Date returnDate;
    @Json.DateTimeFormat
    private final Date dueDate;
    @Json.DateTimeFormat
    private final Date bookReturnedDate;
    private String status;
    private String reason;

    public BorrowListView(int borrowId, User user, Books books, Date issueDate, Date returnDate, Date dueDate,Date bookReturnedDate, String status,String reason) {
        this.borrowId = borrowId;
        this.user = new UserDetailView(user);
        this.books = new BooksDetailView(books);

        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.bookReturnedDate=bookReturnedDate;
        this.status = status;
        this.dueDate = dueDate;
        this.reason = reason;


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




}

