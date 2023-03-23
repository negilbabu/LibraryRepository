package com.innovature.Library.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import com.innovature.Library.entity.Books;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BooksRepository extends Repository<Books, Integer> {

   Books save(Books books);

   Collection<Books> findAll();

   Books findByBooksId(Integer booksId);

   void delete(Books findByBooksId);

   @Query(value = "select * from books where books_id=(select books_id from borrow where borrow_id=?1)", nativeQuery = true)
   Books findbyBorrowId(Integer borrowId);

   @Query(value = "select * from books where books_id in(select books_id from books where category_id=?1)", nativeQuery = true)
   Collection<Books> findbyCategoryId(Integer categoryId);

   public Page<Books> findAll(Pageable paging);

   @Query(value = "select COUNT(books.books_id),category.category_name from books Inner Join category on books.category_id=category.category_id group by books.category_id ", nativeQuery = true)
   public List<Object[]> findCountByCategoryId();

   @Query(value = "Select * from books where  status = 1 AND books_name like %?1% order by books_name like ?2% DESC,books_name like %?3 DESC,books_name like %?4% ", nativeQuery = true)
   public Page<Books> findByKeywords(String keyword, String k, String k1, String k2, Pageable pageable);

}
