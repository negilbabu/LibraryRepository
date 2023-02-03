package com.innovature.Library.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import com.innovature.Library.entity.Books;
import com.innovature.Library.entity.Borrow;
import com.innovature.Library.entity.User;
import com.innovature.Library.view.BorrowListView;

public interface BorrowRepository extends PagingAndSortingRepository<Borrow, Integer> {

  public Borrow save(Collection<Borrow> borrow);

  Collection<Borrow> findAll();

  Borrow findByBorrowId(Integer borrowId);

  Collection<BorrowListView> findAllByUserUserId(Integer userId);

  // load all @ pagenation
  public Page<Borrow> findAll(Pageable paging);

  // load all @ fine pagenation

  @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status!='RETURNED')", nativeQuery = true)
  public Page<Borrow> findbyBorrowIdandDueDateandStatus(Pageable paging);

  // load all with userId(in user-login)
  public Page<Borrow> findAllByUserUserId(Integer userId, Pageable paging);

  // To select borrow details with user_id,a day before due day
  @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date=date_add(curdate(),interval 1 day)  and status='APPROVED' and user_id=?1)", nativeQuery = true)
  Collection<Borrow> findBorrowIdbyUserId(Integer userId);

  // at notification of user to pick data when duedate=currrent date
  @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date=curdate()  and status='APPROVED' and user_id=?1)", nativeQuery = true)
  Collection<Borrow> findbyUserIdDueDate(Integer userId);

  // To select all user(without used_id) by due date expired(@admin side)
  @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status='APPROVED')", nativeQuery = true)
  Collection<Borrow> findbyBorrowIdandStatus();

  @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status!='RETURNED')", nativeQuery = true)
  Collection<Borrow> findbyBorrowIdandDueDateandStatus();

  // To select user by due date expired
  @Query(value = "select * from borrow where borrow_id in(select borrow_id  from borrow where due_date<curdate() and status='APPROVED' and payment_status!='PAID' and user_id=?1 )", nativeQuery = true)
  Collection<Borrow> findbyUserIdandStatus(Integer userId);

  @Query(value = "select * from borrow where status='APPROVED' and due_date<curdate()", nativeQuery = true)
  Collection<Borrow> findbyBorrowId();

  @Query(value = "update borrow set due_days=DATEDIFF(curdate(),due_date) WHERE borrow_id=?", nativeQuery = true)
  void findDueDays(Integer borrowId);

  // LOAD-FILTER @ADMIN ### ON-Load Filterd results
  @Query(value = "select * from borrow where issue_date between DATE(?1) and DATE(?2) and status!='REQUESTED'", nativeQuery = true)
  List<Borrow> findbyIssuDate(java.sql.Date date1, java.sql.Date date2);

  // GET FILTER-RSLT @ADMIN- filtered results
  @Query(value = "select * from borrow where issue_date between DATE(?1) and DATE(?2) and status!='REQUESTED'", nativeQuery = true)
  public Page<Borrow> findbyIssuDate(java.sql.Date date1, java.sql.Date date2, Pageable paging);

  // test
  @Query(value = "select * from borrow where issue_date between DATE(?1) and DATE(?2) and status!='REQUESTED'", nativeQuery = true)
  public Page<Borrow> findbyIssuDat(java.sql.Date date1, java.sql.Date date2, Pageable paging);

  // Load Filterd results at user borrow history
  @Query(value = "select * from borrow where issue_date between DATE(?1) and DATE(?2) and user_id=?1", nativeQuery = true)
  List<Borrow> findbyIssuDateAndUserId(java.sql.Date date1, java.sql.Date date2);

  // to get total books in-hand by user ie. borrow block
  @Query(value = "select count(user_id) from borrow where status='APPROVED' and user_id=?1", nativeQuery = true)
  Integer findbyUserIdAndStatus(Integer userId);

  @Query(value = "select count(user_id) from borrow where status='REQUESTED' and user_id=?1", nativeQuery = true)
  Integer findbyUserIdAndStat(Integer userId);

  //borrow block to restrict user to request same boook
  @Query(value = "select count(borrow_id) from borrow where borrow_id in(select borrow_id from borrow where books_id=?1 and status='APPROVED'  and user_id=?2)", nativeQuery = true)
  Integer borrowBlockByBook(Books booksId, User userId);

    //borrow block to restrict user to request same boook
    @Query(value = "select count(borrow_id) from borrow where borrow_id in(select borrow_id from borrow where books_id=?1 and status='REQUESTED'   and user_id=?2)", nativeQuery = true)
    Integer borrowBlockByRequestedStatus(Books booksId, User userId);

  // @Query(value = "SELECT * FROM borrow",nativeQuery = true)
  // filter by approved in ADMIN SIDE
  @Query(value = "select * from borrow where  status='APPROVED' and user_id=?", nativeQuery = true)
  public Page<Borrow> findByApprovedStatusUser(Pageable paging);

  // @Query(value = "select * from borrow where issue_date between
  // date_sub(curdate(),interval 7 day) and curdate()",nativeQuery = true)

  // filter by approved @userside
  @Query(value = "select * from borrow where  status='APPROVED' and user_id=?", nativeQuery = true)
  public Page<Borrow> findByAppStatusUser(Integer userId, Pageable paging);

  // filter by rejected
  @Query(value = "select * from borrow where  status='REJECTED' and user_id=?", nativeQuery = true)
  public Page<Borrow> findByRejStatusUser(Integer userId, Pageable paging);

  // filter by returned
  @Query(value = "select * from borrow where  status='RETURNED' and user_id=?", nativeQuery = true)
  public Page<Borrow> findByRetStatusUser(Integer userId, Pageable paging);

  // filter by requested
  @Query(value = "select * from borrow where  status='REQUESTED' and user_id=?", nativeQuery = true)
  public Page<Borrow> findByReqStatusUser(Integer userId, Pageable paging);


  // filter by approved @admin
  @Query(value = "select * from borrow where  status='APPROVED'", nativeQuery = true)
  public Page<Borrow> findByAppStatusAdmin( Pageable paging);

    // filter by rejected @admin
    @Query(value = "select * from borrow where  status='REJECTED'", nativeQuery = true)
    public Page<Borrow> findByRejStatusUser( Pageable paging);
  
    // filter by returned @admin
    @Query(value = "select * from borrow where  status='RETURNED' ", nativeQuery = true)
    public Page<Borrow> findByRetStatusUser( Pageable paging);
  
    // filter by requested @admin
    @Query(value = "select * from borrow where  status='REQUESTED'", nativeQuery = true)
    public Page<Borrow> findByReqStatusUser( Pageable paging);

  @Query(value = "SELECT * FROM borrow", nativeQuery = true)
  List<Borrow> findAllC();

  @Query(value = "select * from borrow where issue_date between date_sub(curdate(),interval 7 day) and curdate()", nativeQuery = true)
  List<Borrow> findAllL7();

  @Query(value = "select * from borrow where issue_date between DATE(?1) and DATE(?2) ", nativeQuery = true)
  List<Borrow> findAsFilter(String date1, String date2);

  // @Query(value = "Select * from borrow where books_name like %?1% order by
  // books_name like ?2% DESC,books_name like %?3 DESC,books_name like %?4% ",
  // nativeQuery = true)

  // @Query(value = "SELECT * FROM borrow INNER JOIN user ON borrow.user_id =
  // user.user_id where first_name like %?1% order by first_name like ?2%
  // DESC,first_name like %?3 DESC,first_name like %?4% ", nativeQuery = true)

  // @Query(value = "select * from borrow where user_id in(select user_id from
  // user where first_name like %?%", nativeQuery = true)

  // select count(borrow_id) from borrow where book_returned_date between
  // '2023-01-01' and '2023-01-07'
  // select count(borrow_id) from borrow where book_returned_date='2022-12-27'

  // inner join eg = SELECT user.first_name FROM borrow INNER JOIN user ON
  // borrow.user_id = user.user_id
  // >no innerjoin= select user.first_name from user,borrow where
  // user.user_id=borrow.user_id
  // >select * from borrow where user_id in(select user_id from user where
  // first_name like 'ashwin')

}
