package com.innovature.Library.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.innovature.Library.form.CategoryForm;


@Entity
public class Category {

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
    private Integer categoryId;
    private String categoryName;


 
    public Category(){}
 
    public Category(Integer categoryId){
        this.categoryId=categoryId;
    }

    public Category(Integer categoryId,String categoryName)
    {
        this.categoryId=categoryId;
        this.categoryName=categoryName;
    }

    public Category(CategoryForm form){
        this.categoryName=form.getCategoryName();      
    }






    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public Category orElseThrow(Object object) {
        return null;
    }

 







    // @Override
    // public int hashCode() {
    //     int hash = 0;
    //     hash += (CategoryId != null ? CategoryId.hashCode() : 0);
    //     return hash;
    // }

    // @Override
    // public boolean equals(Object object) {
    //     if (!(object instanceof Category)) {
    //         return false;
    //     }
    //     return Objects.equals(CategoryId, ((Category) object).CategoryId);
    // }

    // @Override
    // public String toString() {
    //     return "com.innovature.Library.entity.Category[ CategoryId=" + CategoryId + " ]";
    // }

    
}
