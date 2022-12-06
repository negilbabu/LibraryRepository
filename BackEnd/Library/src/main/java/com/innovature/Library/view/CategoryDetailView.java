package com.innovature.Library.view;

import com.innovature.Library.entity.Category;

public class CategoryDetailView extends CategoryListView {

    public CategoryDetailView (Category category) {
        super(
        category.getCategoryId(),
        category.getCategoryName()
  
         );

}
}