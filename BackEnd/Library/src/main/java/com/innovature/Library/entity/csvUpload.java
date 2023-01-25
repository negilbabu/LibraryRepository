package com.innovature.Library.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "books")

public class csvUpload {
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
    @Column(name = "books_id")
    private Integer booksId;

    @Column(name = "books_name")
    private String booksName;

    @Column(name = "auther")
    private String booksAuther;

    @Column(name = "books_copies")
    private Integer booksCopies;

    @Column(name = "status")
    private Integer status;

    @Column(name = "publication")
    private String publication;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "image")
    private String image;

    public csvUpload() {

    }

    public csvUpload(String booksName, String publication, String booksAuther, Integer booksCopies, Integer categoryId,
            Integer status) {
        this.booksName = booksName;
        this.publication = publication;
        this.booksAuther = booksAuther;
        this.booksCopies = booksCopies;

        this.categoryId = categoryId;
        this.status = status;

    }

    @Override
    public String toString() {
        return "Csv [ booksName=" + booksName + ", booksAuthor=" + booksAuther + ", booksCopies=" + booksCopies
                + ", categoryId=" + categoryId + ", status=" + status + "]";
    }

    public String getBooksName() {
        return booksName;
    }

    public void setBooksName(String booksName) {
        this.booksName = booksName;
    }

    public String getBooksAuther() {
        return booksAuther;
    }

    public void setBooksAuther(String booksAuther) {
        this.booksAuther = booksAuther;
    }

    public Integer getBooksCopies() {
        return booksCopies;
    }

    public void setBooksCopies(Integer booksCopies) {
        this.booksCopies = booksCopies;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getPublication() {
        return publication;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

}