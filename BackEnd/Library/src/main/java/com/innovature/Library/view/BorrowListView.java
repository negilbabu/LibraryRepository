package com.innovature.Library.view;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.innovature.Library.entity.Books;
import com.innovature.Library.entity.User;

public class BorrowListView {

    private final int borrowId;
    private final UserDetailView user;
    private final BooksDetailView books;

    private final LocalDate issueDate;

    @Temporal(TemporalType.DATE)
    private final Date returnDate;
 
    @Temporal(TemporalType.DATE)
    private final Date dueDate;

    private final LocalDate bookReturnedDate;
    private String status;
    private String paymentStatus;
    private String reason;
    public Long fine;
    public Long dueDays;

    public BorrowListView(int borrowId, User user, Books books, LocalDate issueDate, Date returnDate,
            LocalDate bookReturnedDate, Date dueDate, String status, String reason, Long dueDays, Long fine,
            String paymentStatus) {
        this.borrowId = borrowId;
        this.user = new UserDetailView(user);
        this.books = new BooksDetailView(books);

        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.bookReturnedDate = bookReturnedDate;
        this.status = status;
        this.dueDate = dueDate;
        this.reason = reason;
        this.dueDays = dueDays;
        this.fine = fine;
        this.paymentStatus = paymentStatus;

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

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public String getStatus() {
        return status;

    }

    public String getReason() {
        return reason;

    }

    public LocalDate getBookReturnedDate() {
        return bookReturnedDate;
    }

    public Long getFine() {
        return fine;
    }

    public Long getDueDays() {
        return dueDays;
    }

    public String getpaymentStatus() {
        return paymentStatus;

    }

}
