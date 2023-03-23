package com.innovature.Library.entity;

import java.time.LocalDate;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.ManyToOne;

import com.innovature.Library.form.BorrowForm;

@Entity
public class Borrow {
    public static enum Status {
        INACTIVE((byte) 0),
        ACTIVE((byte) 1);

        public final byte value;

        private Status(byte value) {
            this.value = value;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer borrowId;

    private LocalDate issueDate;

    @Temporal(TemporalType.DATE)
    private Date returnDate;

    @Temporal(TemporalType.DATE)
    private Date dueDate;

    private LocalDate bookReturnedDate;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Books books;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private User user;

    private String status;
    private String paymentStatus;
    private String reason;
    public Long fine;
    public Long dueDays;

    public Borrow() {
    }

    public Borrow(Integer borrowId) {
        this.borrowId = borrowId;
    }

    public Borrow(BorrowForm form, Books books, User user2) {

        this.returnDate = form.getReturnDate();
        this.dueDate = form.getDueDate();
        this.books = books;
        this.user = user2;
        this.status = getStatus();
        this.paymentStatus = getPaymentStatus();
        this.reason = form.getReason();

        LocalDate dt = LocalDate.now();
        this.issueDate = dt;

        LocalDate date = LocalDate.now();
        this.bookReturnedDate = date;
        this.dueDays = 0L;
        this.fine = 0L;

    }
    public Borrow Edit () {

        // this.returnDate = form.getReturnDate();
        // this.dueDate = form.getDueDate();
        // this.books = books;
        // this.user = user2;
        // this.status = getStatus();
        // this.paymentStatus = getPaymentStatus();
        // this.reason = form.getReason();

        // LocalDate dt = LocalDate.now();
        // this.issueDate = dt;
        this.setStatus("RETURNED");
        books.setBooksCopies(books.getBooksCopies() + 1);

        LocalDate date = LocalDate.now();
        this.bookReturnedDate = date;
        // this.dueDays = 0L;
        // this.fine = 0L;
        return this;

    }


    public Borrow(Books book, User user) {
        this.books = book;
        this.user = user;
        this.status = "REQUESTED";
        this.paymentStatus = "UNBILLED";
        this.reason = "NA";
        this.dueDays = (long) 0;
        this.fine = (long) 0;
    }

    public Integer getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(Integer borrowId) {
        this.borrowId = borrowId;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Books getBooks() {
        return books;
    }

    public void setBooks(Books books) {
        this.books = books;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDate getBookReturnedDate() {
        return bookReturnedDate;
    }

    public void setBookReturnedDate(LocalDate bookReturnedDate) {
        this.bookReturnedDate = bookReturnedDate;
    }

    public Long getDueDays() {
        return dueDays;
    }

    public void setDueDays(Long dueDays) {
        this.dueDays = dueDays;
    }

    public Long getFine() {
        return fine;
    }

    public void setFine(Long fine) {
        this.fine = fine;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getFirstName() {
        return user.getFirstName();
    }

    public String getBooksName() {
        return books.getBooksName();
    }

}
