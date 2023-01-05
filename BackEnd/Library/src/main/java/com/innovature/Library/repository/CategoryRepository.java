package com.innovature.Library.repository;

import java.util.Collection;
// import java.util.Optional;
// import java.util.Optional;
//import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

// import org.aspectj.apache.bcel.util.Repository;

import com.innovature.Library.entity.Category;
// import com.innovature.Library.view.CategoryDetailView;
//import com.innovature.Library.view.CategoryListView;

public interface CategoryRepository extends Repository <Category, Integer> {


    Category save(Category category);

    Collection<Category> findAll();  
    //Collection<Category>findByCategoryIdAndUserId(Integer categoryId,Integer userId);
    
    Category findByCategoryId(Integer categoryId);

    // void delete(Collection<Category> collection);
    void delete(Category orElseThrow);

    public Page<Category> findAll(Pageable paging);


}
