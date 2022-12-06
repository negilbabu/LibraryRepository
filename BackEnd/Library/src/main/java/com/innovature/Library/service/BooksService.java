package com.innovature.Library.service;

import java.util.Collection;

import com.innovature.Library.entity.Books;

//import javax.validation.Valid;

//import com.innovature.Library.entity.Books;
//import com.innovature.Library.entity.Category;

// import javax.validation.Valid;

import com.innovature.Library.form.BooksForm;
import com.innovature.Library.view.BooksDetailView;
//import com.innovature.Library.view.BooksListView;
//import com.innovature.Library.view.BooksListView;

public interface BooksService {

    BooksDetailView add(BooksForm form);

    // Collection<BooksListView> listAll();

    // BooksDetailView listAll();
    Collection<Books> listAll();

    Collection<Books> listByCategory(Integer categoryId);

    BooksDetailView list(Integer booksId);

    void deletes(Integer booksId);

    BooksDetailView updates(Integer booksId,BooksForm form);

  



    }
    

