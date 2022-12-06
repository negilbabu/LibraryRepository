package com.innovature.Library.view;
// import com.innovature.Library.json.Json;
// import com.innovature.Library.entity.Category;

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
