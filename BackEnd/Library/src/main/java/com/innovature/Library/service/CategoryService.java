package com.innovature.Library.service;

import java.util.Collection;

import org.springframework.data.domain.Page;
import com.innovature.Library.view.CategoryDetailView;
import com.innovature.Library.entity.Category;
import com.innovature.Library.form.CategoryForm;

public interface CategoryService {

    Collection<Category> listAll();

    CategoryDetailView add(CategoryForm form);

    CategoryDetailView list(Integer categoryId);

    void deletes(Integer catogoryId);

    CategoryDetailView updates(Integer categoryId, CategoryForm form);

    Page<Category> getAllCategory(String keyword,Integer pageNo, Integer pageSize, String sortBy, Integer direction);

}
