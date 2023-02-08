package com.innovature.Library.service.impl;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.innovature.Library.view.CategoryDetailView;
import com.innovature.Library.entity.Category;
import com.innovature.Library.exception.NotFoundException;
import com.innovature.Library.form.CategoryForm;
import com.innovature.Library.repository.CategoryRepository;
import com.innovature.Library.service.CategoryService;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.exception.NotAcceptableException;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryDetailView add(CategoryForm form) throws BadRequestException {

            return new CategoryDetailView(categoryRepository.save(new Category(form)));

    }

    @Override
    public Collection<Category> listAll() {
        return categoryRepository.findAll();
    }

    @Override
    public void deletes(Integer categoryId) throws NotFoundException {

        try{
            categoryRepository.delete(categoryRepository.findByCategoryId(categoryId) );
          } catch(Exception reason){
            throw new NotAcceptableException("Unable to delete parent class");
          }
    }


    


    @Override
    public CategoryDetailView list(Integer categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId);
        return new CategoryDetailView(category);

    }

    @Override
    @Transactional
    public CategoryDetailView updates(Integer categoryId, CategoryForm form) {

        Category category = categoryRepository.findByCategoryId(categoryId);
        category.setCategoryName(form.getCategoryName());

        return new CategoryDetailView(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public Page<Category> getAllCategory(String keyword,Integer pageNo, Integer pageSize, String sortBy, Integer direction) {

        var sortByDescending = Sort.by(sortBy).descending();
        var sortByAscending = Sort.by(sortBy).ascending();
if(keyword == null){


        if (direction == 1) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
                
            Page<Category> pagedResult = categoryRepository.findAll( paging);
            return pagedResult;
        }

        else {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);

            Page<Category> pagedResult = categoryRepository.findAll( paging);
            return pagedResult;
        }
    }
    else{

        if (direction == 1) {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            String k = keyword;
            String k1 = keyword;
            String k2 = keyword;
          
            Page<Category> pagedResult = categoryRepository.findByKeywords(keyword, k, k1, k2, paging);
            return pagedResult;
        }

        else {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);

            String k = keyword;
            String k1 = keyword;
            String k2 = keyword;
            Page<Category> pagedResult = categoryRepository.findByKeywords(keyword, k, k1, k2, paging);
            return pagedResult;
        }

    }

    }

}
