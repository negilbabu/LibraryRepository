package com.innovature.Library.repository;

import java.sql.Date;
import java.util.Collection;

//import org.springframework.data.repository.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import com.innovature.Library.entity.Borrow;
import com.innovature.Library.view.BorrowListView;

public interface BorrowRepository extends PagingAndSortingRepository<Borrow, Integer> {

    public Borrow save(Collection<Borrow> borrow);

    Collection<Borrow> findAll();

    // Optional<Borrow> findByBorrowId(Integer borrowId)
    Borrow findByBorrowId(Integer borrowId);

    Collection<BorrowListView> findAllByUserUserId(Integer userId);

    

    public Page<Borrow> findAll(Pageable paging);
    public Page<Borrow> findAllByUserUserId(Integer userId,Pageable paging);

    // public Page<Borrow> findAll(org.springframework.data.domain.Pageable paging);
    
    //To select borrow details with user_id,a day before due day
    @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date=date_add(curdate(),interval 1 day)  and status='APPROVED' and user_id=?1)", nativeQuery = true)
    Collection<Borrow> findBorrowIdbyUserId(Integer userId);

    
//at notification of user to pick data when duedate=currrent date
    @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date=curdate()  and status='APPROVED' and user_id=?1)", nativeQuery = true)
    Collection<Borrow> findbyUserIdDueDate(Integer userId);




    //To select all user(without used_id) by due date expired(@admin side)
    @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status='APPROVED')", nativeQuery = true)
    Collection<Borrow> findbyBorrowIdandStatus();



    @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status!='RETURNED')", nativeQuery = true)
    Collection <Borrow> findbyBorrowIdandDueDateandStatus();



    
    //To select user by due date expired
    @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status='APPROVED' and user_id=?1 )", nativeQuery = true)
    Collection<Borrow> findbyUserIdandStatus(Integer userId);



    // @Query(value = "select email from user where user_id in(select user_id from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status='APPROVED'))", nativeQuery = true)
    // Collection<Borrow> findbyBorrowIdandStatus();

    @Query(value = "select * from borrow where status='APPROVED' and due_date<curdate()", nativeQuery = true)
    Collection<Borrow> findbyBorrowId();

    @Query(value="update borrow set due_days=DATEDIFF(curdate(),due_date) WHERE borrow_id=?",nativeQuery=true)
    void findDueDays(Integer borrowId);

    //public Borrow save(Collection<Borrow> borrow);

   //total sum of fine /user
    // @Query(value=" select sum(fine) from borrow where user_id=?",nativeQuery=true)
    // void findFineByUserId(Integer userId); public Page<Borrow> findAll(Pageable paging);

    // @Query(value = "select * from borrow where issue_date between '2022-12-12' and '2022-12-20' ", nativeQuery = true)
    // public Page<Borrow> findbyIssuDate(Pageable paging);

    

    @Query(value = "select * from borrow where issue_date between DATE(?1) and DATE(?2) and status!='REQUESTED'", nativeQuery = true)
    public Page<Borrow> findbyIssuDate( java.sql.Date date1,java.sql.Date date2,Pageable paging);

  //  public Page<Borrow> findbyIssuDate(java.util.Date date1, java.util.Date date2, Pageable paging);


    // @Query(value = "select * from booking where booked_date BETWEEN DATE(?2) AND DATE(?3) and vaccine_id in(select vaccine_id from vaccine where vaccine_type=?1);",nativeQuery = true)
    // Collection<Booking> findAll(String string, Date date1, Date date2);
    


}
