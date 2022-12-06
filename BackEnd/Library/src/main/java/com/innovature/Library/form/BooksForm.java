package com.innovature.Library.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class BooksForm {
    @Size(max = 30)
    @NotBlank
    private String booksName;    
    private Integer categoryId;
    @Size(max = 30)
    private String publication;
    @Size(max = 100)
    private String auther;
    // @Size(max = 30)
    // private String status;
    // @Size(max = 100)
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
    // public String getStatus() {
    //     return status;
    // }
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
