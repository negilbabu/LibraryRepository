package com.innovature.Library.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.Transient;

import javax.persistence.Column;

import com.innovature.Library.form.BooksForm;

@Entity
public class Books {
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
    private Integer booksId;
    private String booksName;
    private String publication;
    private String auther;
    private Integer booksCopies;
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Category category;
    @Column(nullable = true, length = 64)
    private String image;

    public Books() {
    }

    public Books(Integer booksId) {
        this.booksId = booksId;
    }

    public Books(BooksForm form, Category category) {
        this.booksName = form.getBooksName();
        this.publication = form.getPublication();
        this.auther = form.getAuther();
        this.booksCopies = form.getBooksCopies();
        this.category = category;
    }

    @Transient
    public String getPhotosImagePath() {
        if (image == null || booksId == null)
            return null;
        return "/items - photos/" + booksId + image;
    }

    public Integer getBooksId() {
        return booksId;
    }

    public void setBooksId(Integer booksId) {
        this.booksId = booksId;
    }

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Books(int booksId, String booksName, String publication, String auther, Integer booksCopies,
            Category category) {
        this.booksId = booksId;
        this.booksName = booksName;
        this.publication = publication;
        this.auther = auther;

        this.booksCopies = booksCopies;
        this.category = category;
    }

    

}
