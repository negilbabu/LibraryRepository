package com.innovature.Library.view;

import com.innovature.Library.entity.Books;

public class BooksDetailView extends BooksListView {

    public BooksDetailView(Books books) {
        super(
                books.getBooksId(),
                books.getBooksName(),
                books.getCategory(),
                books.getPublication(),
                books.getAuther(),
                books.getBooksCopies());

    }
}
