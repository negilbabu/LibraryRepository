package com.innovature.Library.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.persistence.Column;

public class BooksForm {

    @NotBlank
    @Size(max = 30)  
    private String booksName;

    @Column(name = "categoryId", nullable = false)
    private Integer categoryId;

    @NotBlank
    @Size(max = 30)
    private String publication;

    @NotBlank
    @Size(max = 100)
    private String auther;

   @Column(name = "booksCopies", nullable = false)
    private Integer booksCopies;


    public String getBooksName() {
        return booksName;
    }

    public void setBooksName(String booksName) {
        this.booksName = booksName;
    }

    public String getPublication() {
        return publication;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public String getAuther() {
        return auther;
    }

    public void setAuther(String auther) {
        this.auther = auther;
    }

    public Integer getBooksCopies() {
        return booksCopies;
    }

    public void setBooksCopies(Integer booksCopies) {
        this.booksCopies = booksCopies;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

}
