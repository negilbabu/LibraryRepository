package com.innovature.Library.entity;

import java.util.Date;
//import java.util.Objects;

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

    @Temporal(TemporalType.TIMESTAMP)
    private Date issueDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date returnDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date bookReturnedDate;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Books books;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private User user;
    private String status;
    private String reason;

    public Borrow() {
    }

    public Borrow(Integer borrowId) {
        this.borrowId = borrowId;
    }

    public Borrow(BorrowForm form, Books books, User user2) {
        
        // Date dt = new Date();
        // this.issueDate= dt;
        // this.user = new User(user2);
        // this.booksId=form.getBooksId();
       
        //this.issueDate = form.getIssueDate();
        this.returnDate = form.getReturnDate();
        this.dueDate = form.getDueDate();
        this.books = books;
        this.user = user2;
        this.status = getStatus();
        this.reason=form.getReason();
        Date dt = new Date();
        this.issueDate = dt;

        Date date = new Date();
        this.bookReturnedDate = date;
        
        

    }

    public Borrow(Books book, User user) {
        this.books = book;
        this.user = user;
        this.status = "REQUESTED";
    }

    public Integer getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(Integer borrowId) {
        this.borrowId = borrowId;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
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

    public Date getBookReturnedDate() {
        return bookReturnedDate;
    }

    public void setBookReturnedDate(Date bookReturnedDate) {
        this.bookReturnedDate = bookReturnedDate;
    }
    

}
