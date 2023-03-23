package com.innovature.Library.view;

import com.innovature.Library.entity.Borrow;

public class BorrowDetailView extends BorrowListView {

    public BorrowDetailView(Borrow borrow) {
        super(
                borrow.getBorrowId(),
                borrow.getUser(),
                borrow.getBooks(),
                borrow.getIssueDate(),
                borrow.getReturnDate(),
                borrow.getBookReturnedDate(),
                borrow.getDueDate(),
                borrow.getStatus(),
                borrow.getReason(),
                borrow.getDueDays(),
                borrow.getFine(),
                borrow.getPaymentStatus());

    }

}
