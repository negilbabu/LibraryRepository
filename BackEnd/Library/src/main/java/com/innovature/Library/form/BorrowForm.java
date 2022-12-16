package com.innovature.Library.form;

import java.sql.Date;

// import com.innovature.Library.security.util.SecurityUtil;

public class BorrowForm {
    // private Date issueDate;
    private Date returnDate;
    private Date dueDate;
    private Integer booksId;
    private String reason;
    // private String status;
    private Date startDate;
    private Date endDate;

    // public Date getIssueDate() {
    // return issueDate;
    // }
    // public void setIssueDate(Date issueDate) {
    // this.issueDate = issueDate;
    // }

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

    public Integer getBooksId() {
        return booksId;
    }

    public void setBooksId(Integer booksId) {
        this.booksId = booksId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    // public String getStatus() {
    // return status;
    // }
    // public void setStatus(String status) {
    // this.status = status;
    // }

}
