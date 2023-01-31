package com.innovature.Library.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CategoryForm {

    @Size(max = 30)
    @NotBlank
    private String categoryName;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

}
