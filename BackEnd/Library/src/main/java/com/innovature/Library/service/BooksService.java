package com.innovature.Library.service;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;


import com.innovature.Library.entity.Books;
import com.innovature.Library.form.BooksForm;
import com.innovature.Library.view.BooksDetailView;

public interface BooksService {

    BooksDetailView add(BooksForm form);

    Collection<Books> listAll();

    Collection<Books> listByCategory(Integer categoryId);

    BooksDetailView list(Integer booksId);

    void deletes(Integer booksId);

    BooksDetailView updates(Integer booksId, BooksForm form);

    HttpEntity<byte[]> getImagePic(Integer booksId);

    Page<Books> getAllBooks(Integer pageNo, Integer pageSize, String sortBy, Integer direction);

    List<Object[]> getBookCountByCategory();

    Page<Books> getAllBookStocks(String keyword, Integer pageNo, Integer pageSize, String sortBy, Integer direction);

}
