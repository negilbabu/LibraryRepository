package com.innovature.Library.controller;

import java.security.Principal;
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

import com.innovature.Library.entity.Category;
import com.innovature.Library.form.CategoryForm;
import com.innovature.Library.service.CategoryService;
import com.innovature.Library.view.CategoryDetailView;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping
    public Collection<Category> list(Principal p) {
        return service.listAll();
    }


    @PostMapping
    public CategoryDetailView add(@Valid @RequestBody CategoryForm form) {
        return service.add(form);
    }


    @DeleteMapping("/{catogoryId}")
    public void deletes(
            @PathVariable("catogoryId") Integer catogoryId) {
        service.deletes(catogoryId);
    }


    @PutMapping("/{catogoryId}")
    public CategoryDetailView update(
            @PathVariable("catogoryId") Integer catogoryId,
            @Valid @RequestBody CategoryForm form
    ) {
        return service.updates(catogoryId, form);
    }


    @GetMapping("/{catogoryId}")
    public CategoryDetailView list(
        @PathVariable("catogoryId") Integer catogoryId
      
    ) 
     {
        return service.list(catogoryId);
    }




  
   

}
