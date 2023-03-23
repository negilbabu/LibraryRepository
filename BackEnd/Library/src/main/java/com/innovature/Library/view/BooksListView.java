package com.innovature.Library.view;

import com.innovature.Library.entity.Category;

public class BooksListView {
    private final int booksId;
    private final String booksName;
    private CategoryDetailView category;
    private final String publication;
    private final String auther;
    private final Integer booksCopies;
    private String image;

    public BooksListView(int booksId, String booksName, Category category, String publication, String auther,
            Integer booksCopies) {

        this.booksId = booksId;
        this.booksName = booksName;
        this.category = new CategoryDetailView(category);
        this.publication = publication;
        this.auther = auther;

        this.booksCopies = booksCopies;
    }

    public int getBooksId() {
        return booksId;
    }

    public String getbooksName() {
        return booksName;
    }

    public CategoryDetailView getCategory() {
        return category;
    }

    public String getPublication() {
        return publication;
    }

    public String getAuther() {
        return auther;
    }

    public Integer getBooksCopies() {
        return booksCopies;
    }

    public String getCategoryName() {
        return this.category.getCategoryName();
    }

    public String getImage() {
        return image;
    }

}
