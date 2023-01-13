package com.innovature.Library.service;
import java.util.Collection;

import org.springframework.data.domain.Page;

//import javax.validation.Valid;

// import org.springframework.http.HttpEntity;
// import javax.validation.Valid;
// import org.springframework.validation.Errors;
import com.innovature.Library.view.CategoryDetailView;
// import com.innovature.Library.entity.Category;
//import com.innovature.Library.view.CategoryListView;
import com.innovature.Library.entity.Category;
//import com.innovature.Library.exception.NotFoundException;
import com.innovature.Library.form.CategoryForm;
// import com.innovature.Library.entity.Category;
// import com.innovature.Library.exception.BadRequestException;
// import com.innovature.Library.exception.NotFoundException;

public interface CategoryService {

    // Collection<CategoryListView>list();

    Collection<Category> listAll();

    CategoryDetailView add(CategoryForm form);

    CategoryDetailView list(Integer categoryId);

    void deletes(Integer catogoryId);
    
    CategoryDetailView updates(Integer categoryId, CategoryForm form);

    Page<Category> getAllCategory(Integer pageNo, Integer pageSize, String sortBy,Integer direction);


    
}
