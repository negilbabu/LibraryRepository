package com.innovature.Library.controller;

//import java.security.Principal;
import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovature.Library.entity.Books;
//import com.innovature.Library.entity.Category;
import com.innovature.Library.form.BooksForm;
import com.innovature.Library.service.BooksService;
import com.innovature.Library.view.BooksDetailView;
//import com.innovature.Library.view.BooksListView;
//import com.innovature.Library.view.BooksListView;

@RestController
@RequestMapping("/books")
public class BooksController {

    @Autowired
    private BooksService service;


    @PostMapping
    public BooksDetailView add(@Valid @RequestBody BooksForm form) {
        return service.add(form);
    }

    @GetMapping
    public Collection<Books> list() {
        return service.listAll();
    }

    @GetMapping("/findByCategory/{categoryId}")
    public Collection<Books> listByCategory(
        @PathVariable("categoryId") Integer categoryId) 
        {
        return service.listByCategory(categoryId);
       }
    

    @GetMapping("/{booksId}")
    public BooksDetailView list(
        @PathVariable("booksId") Integer booksId      
    ) 
     {
        return service.list(booksId);
    }


    @DeleteMapping("/{booksId}")
    public void deletes(
            @PathVariable("booksId") Integer booksId) {
        service.deletes(booksId);
    }

    @PutMapping("/{booksId}")
    public BooksDetailView update(
            @PathVariable("booksId") Integer booksId,
            @Valid @RequestBody BooksForm form
    ) {
        return service.updates(booksId, form);
    }


    
}
