package com.innovature.Library.view;

public class CategoryListView {
    private final int categoryId;
    private final String categoryName;


    public CategoryListView(int categoryId, String categoryName) 
    {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }


    public int getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

}
