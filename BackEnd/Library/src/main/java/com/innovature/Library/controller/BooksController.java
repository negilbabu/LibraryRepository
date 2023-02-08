package com.innovature.Library.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.innovature.Library.entity.Books;
import com.innovature.Library.form.BooksForm;
import com.innovature.Library.repository.BooksRepository;
import com.innovature.Library.service.BooksService;
import com.innovature.Library.util.FileUtil;
import com.innovature.Library.view.BooksDetailView;

@RestController
@RequestMapping("/books")
public class BooksController {

    @Autowired
    private BooksService service;

    @Autowired
    private BooksRepository booksRepository;

    @PostMapping
    public BooksDetailView add(@Valid @RequestBody BooksForm form) {
        return service.add(form);
    }

    @GetMapping("/admin")
    public Collection<Books> list() {
        return service.listAll();
    }

    @GetMapping("user/findByCategory/{categoryId}")
    public Collection<Books> listByCategory(
            @PathVariable("categoryId") Integer categoryId) {
        return service.listByCategory(categoryId);
    }

    @GetMapping("/{booksId}")
    public BooksDetailView list(
            @PathVariable("booksId") Integer booksId) {
        return service.list(booksId);
    }

    @DeleteMapping("/{booksId}")
    public void deletes(@PathVariable("booksId") Integer booksId)
    {
        service.deletes(booksId);
    }

    @PutMapping("/{booksId}")
    public BooksDetailView update(
            @PathVariable("booksId") Integer booksId,
            @Valid @RequestBody BooksForm form) {
        return service.updates(booksId, form);
    }

    @GetMapping("admin/pagenated/")
    public ResponseEntity<Page<Books>> getAllBooks(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "auther") String sortBy,
            @RequestParam(defaultValue = "1") Integer direction) {
        Page<Books> list = service.getAllBooks(pageNo - 1, pageSize, sortBy, direction);
        return new ResponseEntity<Page<Books>>(list, new HttpHeaders(),
                HttpStatus.OK);

    }

    @GetMapping("user/pagenated/")
    public ResponseEntity<Page<Books>> getAllBooksforUser(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "auther") String sortBy,
            @RequestParam(defaultValue = "1") Integer direction) {
        Page<Books> list = service.getAllBooks(pageNo - 1, pageSize, sortBy, direction);
        return new ResponseEntity<Page<Books>>(list, new HttpHeaders(),
                HttpStatus.OK);
    }

    @PostMapping("/save/image/{booksId}")
    public void saveBookImage(@RequestParam(value = "image") MultipartFile multipartFile,
            @PathVariable Integer booksId) throws IOException {

        Books books = booksRepository.findByBooksId(booksId);

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        books.setImage(fileName);

        booksRepository.save(books);

        FileUtil.saveUserProfile(fileName, multipartFile);

    }

    @GetMapping("/books/{booksId}")
    public HttpEntity<byte[]> getImagePic(@PathVariable Integer booksId) {

        return service.getImagePic(booksId);
    }

    // pie
    @GetMapping("admin/pie")
    public List<Object[]> getcountByCategoryId() {
        return service.getBookCountByCategory();

    }

    @GetMapping("/admin/searchBooks")
    public ResponseEntity<Page<Books>> getAllBookStockSearch(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "books_id") String sortBy,
            @RequestParam(defaultValue = "-1") Integer direction) {
        Page<Books> list = service.getAllBookStocks(keyword, pageNo - 1, pageSize, sortBy, direction);
        return new ResponseEntity<Page<Books>>(list, new HttpHeaders(),
                HttpStatus.OK);

    }

}
