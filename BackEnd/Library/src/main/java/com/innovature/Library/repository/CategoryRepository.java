package com.innovature.Library.repository;

import java.util.Collection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import com.innovature.Library.entity.Category;

public interface CategoryRepository extends Repository<Category, Integer> {

    Category save(Category category);

    Collection<Category> findAll();

    Category findByCategoryId(Integer categoryId);

    void delete(Category orElseThrow);

    // public Page<Category> findAll(Pageable paging);

    @Query(value = "Select * from category ", nativeQuery = true)
    public Page<Category> findAll(Pageable pageable);

    @Query(value = "Select * from category where category_name like %?1% order by category_name like ?2% DESC,category_name like %?3 DESC,category_name like %?4% ", nativeQuery = true)
   public Page<Category> findByKeywords(String keyword, String k, String k1, String k2, Pageable pageable);


}
