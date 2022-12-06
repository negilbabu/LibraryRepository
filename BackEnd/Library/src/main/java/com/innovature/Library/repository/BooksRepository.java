package com.innovature.Library.repository;
import java.util.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import com.innovature.Library.entity.Books;


public interface BooksRepository extends Repository <Books, Integer> {

   Books save(Books books);

   Collection<Books> findAll();
   //Books findAll(Books books);
   // Collection<BooksListView> findAll();

   Books findByBooksId(Integer booksId);

   void delete(Books findByBooksId);


   @Query(value="select * from books where books_id=(select books_id from borrow where borrow_id=?1)",nativeQuery=true)
   Books findbyBorrowId(Integer borrowId);


   @Query(value = "select * from books where books_id in(select books_id from books where category_id=?1)",nativeQuery = true)
   Collection<Books> findbyCategoryId(Integer categoryId);

   
}
