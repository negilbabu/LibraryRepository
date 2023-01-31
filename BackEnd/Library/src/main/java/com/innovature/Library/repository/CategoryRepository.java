package com.innovature.Library.repository;

import java.util.Collection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import com.innovature.Library.entity.Category;

public interface CategoryRepository extends Repository<Category, Integer> {

    Category save(Category category);

    Collection<Category> findAll();

    Category findByCategoryId(Integer categoryId);

    void delete(Category orElseThrow);

    public Page<Category> findAll(Pageable paging);

}
