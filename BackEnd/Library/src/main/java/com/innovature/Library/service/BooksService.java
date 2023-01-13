package com.innovature.Library.service;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import com.innovature.Library.entity.Books;
import com.innovature.Library.form.BooksForm;
import com.innovature.Library.view.BooksDetailView;

public interface BooksService {

    BooksDetailView add(BooksForm form);

    // Collection<BooksListView> listAll();

    // BooksDetailView listAll();
    Collection<Books> listAll();

    Collection<Books> listByCategory(Integer categoryId);

    BooksDetailView list(Integer booksId);

    void deletes(Integer booksId);

    BooksDetailView updates(Integer booksId,BooksForm form);

    HttpEntity<byte[]> getImagePic(Integer booksId);

    RedirectView uploadImage(MultipartFile multipartFile) throws IOException;

    Page<Books> getAllBooks(Integer pageNo, Integer pageSize, String sortBy,Integer direction);

    List<Object[]> getBookCountByCategory();

    }
    

