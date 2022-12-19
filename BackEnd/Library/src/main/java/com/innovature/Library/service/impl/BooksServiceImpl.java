package com.innovature.Library.service.impl;

import java.io.IOException;
import java.util.ArrayList;
// import java.net.http.HttpHeaders;
import java.util.Collection;
import java.util.List;

//import java.util.ArrayList;
import javax.transaction.Transactional;
//import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.innovature.Library.entity.Books;
import com.innovature.Library.entity.Category;
import com.innovature.Library.exception.NotFoundException;
import com.innovature.Library.form.BooksForm;
import com.innovature.Library.repository.BooksRepository;
import com.innovature.Library.repository.CategoryRepository;
import com.innovature.Library.service.BooksService;
import com.innovature.Library.view.BooksDetailView;

import com.innovature.Library.util.FileUtil;

@Service
public class BooksServiceImpl implements BooksService{

    @Autowired
    private BooksRepository booksRepository;

    @Autowired
    CategoryRepository catRepo;

    @Override
    public BooksDetailView add(BooksForm form){
    Category category=catRepo.findByCategoryId(form.getCategoryId());
    return new BooksDetailView(booksRepository.save(new Books(form,category)));
    }

  
    @Override
    public  Collection<Books> listAll() {
    return booksRepository.findAll();
    } 

    @Override
    public  Collection<Books> listByCategory(Integer categoryId) {
    return booksRepository.findbyCategoryId(categoryId);
    } 


    @Override
    public BooksDetailView list(Integer booksId) {
        Books books=booksRepository.findByBooksId(booksId);
        return new BooksDetailView(books);
    }


    @Override
    @Transactional
    public BooksDetailView updates(Integer booksId, BooksForm form)  {

        Category category=catRepo.findByCategoryId(form.getCategoryId());        
        Books books=booksRepository.findByBooksId(booksId);
        books.setCategory(category);
        books.setPublication(form.getPublication());
        books.setBooksName(form.getBooksName());
        books.setAuther(form.getAuther());
        books.setBooksCopies(form.getBooksCopies());
        // return new BooksDetailView(booksRepository.save(new Books(form,category)));
        return new BooksDetailView(books);
    }

    @Override
    public void deletes(Integer categoryId) throws NotFoundException {
        booksRepository.delete(
            booksRepository.findByBooksId(categoryId)
                    
        );

    }

    @Override
    public HttpEntity<byte[]> getImagePic(Integer booksId) {
    
        String image = booksRepository.findByBooksId(booksId)
                .getImage();
    
        byte[] file = FileUtil.getImage(image);
    
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentLength(file.length);
    
        return new HttpEntity<>(file, headers);

    }


    @Override
    public RedirectView uploadImage(MultipartFile multipartFile) throws IOException {
        // TODO Auto-generated method stub
        return null;
    }



    public List<Books>getAllBooks(Integer pageNo, Integer pageSize, String sortBy){
        
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        Page<Books> pagedResult = booksRepository.findAll(paging);

        if(pagedResult.hasContent()){
            return pagedResult.getContent();
        } else {
            return new ArrayList<Books>();
        }
    }


}


