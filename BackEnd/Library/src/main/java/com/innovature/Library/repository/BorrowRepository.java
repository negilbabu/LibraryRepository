package com.innovature.Library.repository;

import java.util.Collection;

//import org.springframework.data.repository.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import com.innovature.Library.entity.Borrow;
import com.innovature.Library.view.BorrowListView;

public interface BorrowRepository extends PagingAndSortingRepository<Borrow, Integer> {

    public Borrow save(Borrow borrow);

    Collection<Borrow> findAll();

    // Optional<Borrow> findByBorrowId(Integer borrowId)
    Borrow findByBorrowId(Integer borrowId);

    Collection<BorrowListView> findAllByUserUserId(Integer userId);

    public Page<Borrow> findAll(Pageable paging);

    // public Page<Borrow> findAll(org.springframework.data.domain.Pageable paging);

    @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date=date_add(curdate(),interval 1 day) and user_id=?1)", nativeQuery = true)
    Collection<Borrow> findBorrowIdbyUserId(Integer userId);



    @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status='APPROVED' )", nativeQuery = true)
    Collection<Borrow> findbyBorrowIdandStatus();


    // @Query(value = "select email from user where user_id in(select user_id from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() an    d status='APPROVED'))", nativeQuery = true)
    // Collection<Borrow> findbyBorrowIdandStatus();

    


}
