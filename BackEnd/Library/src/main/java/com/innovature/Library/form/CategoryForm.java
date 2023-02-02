package com.innovature.Library.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CategoryForm {
  
    @NotBlank
    @Size(max = 30)
    private String categoryName;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

}
