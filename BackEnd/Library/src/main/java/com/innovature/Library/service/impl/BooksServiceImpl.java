package com.innovature.Library.service.impl;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.innovature.Library.entity.Books;
import com.innovature.Library.entity.Category;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.exception.NotAcceptableException;
import com.innovature.Library.exception.NotFoundException;
import com.innovature.Library.form.BooksForm;
import com.innovature.Library.repository.BooksRepository;
import com.innovature.Library.repository.CategoryRepository;
import com.innovature.Library.service.BooksService;
import com.innovature.Library.view.BooksDetailView;
import com.innovature.Library.exception.expectationFailedException;
import com.innovature.Library.util.FileUtil;

@Service
public class BooksServiceImpl implements BooksService {

    @Autowired
    private BooksRepository booksRepository;

    @Autowired
    CategoryRepository catRepo;

    @Override
    public BooksDetailView add(BooksForm form) throws BadRequestException {
 
            Category category = catRepo.findByCategoryId(form.getCategoryId());
            
            if(category==null)
            
            {
                throw new expectationFailedException("Invalid category id");
            } else
                return new BooksDetailView(booksRepository.save(new Books(form, category)));
   
    }

    @Override
    public Collection<Books> listAll() {
        return booksRepository.findAll();
    }

    @Override
    public Collection<Books> listByCategory(Integer categoryId) {
        return booksRepository.findbyCategoryId(categoryId);
    }

    @Override
    public BooksDetailView list(Integer booksId) {
        Books books = booksRepository.findByBooksId(booksId);
        return new BooksDetailView(books);
    }

    @Override
    @Transactional
    public BooksDetailView updates(Integer booksId, BooksForm form) {

        Category category = catRepo.findByCategoryId(form.getCategoryId());
        Books books = booksRepository.findByBooksId(booksId);
        books.setCategory(category);
        books.setPublication(form.getPublication());
        books.setBooksName(form.getBooksName());
        books.setAuther(form.getAuther());
        books.setBooksCopies(form.getBooksCopies());

        return new BooksDetailView(books);
    }

    @Override
    public void deletes(Integer categoryId) throws NotFoundException {
        try{
            booksRepository.delete( booksRepository.findByBooksId(categoryId));
        }
        catch(Exception reason){
            throw new NotAcceptableException("Unable to delete parent class");
        }
   

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
    @Transactional
    public Page<Books> getAllBooks(Integer pageNo, Integer pageSize, String sortBy, Integer direction) {

        var sortByDescending = Sort.by(sortBy).descending();
        var sortByAscending = Sort.by(sortBy).ascending();

        if (direction == 1) {

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<Books> pagedResult = booksRepository.findAll(paging);
            return pagedResult;
        }

        else {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Books> pagedResult = booksRepository.findAll(paging);
            return pagedResult;
        }
    }

    // pie
    @Override
    public List<Object[]> getBookCountByCategory() {
        return booksRepository.findCountByCategoryId();
    }

    // book search
    @Override
    public Page<Books> getAllBookStocks(String keyword, Integer pageNo, Integer pageSize, String sortBy,
            Integer direction) {

        var sortByDescending = Sort.by(sortBy).descending();
        var sortByAscending = Sort.by(sortBy).ascending();

        if (direction == 1) {

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);

            String k = keyword;
            String k1 = keyword;
            String k2 = keyword;
            Page<Books> pagedResult = booksRepository.findByKeywords(keyword, k, k1, k2, paging);
            return pagedResult;
        }

        else {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);

            String k = keyword;
            String k1 = keyword;
            String k2 = keyword;
            Page<Books> pagedResult = booksRepository.findByKeywords(keyword, k, k1, k2, paging);
            return pagedResult;
        }

    }

}
