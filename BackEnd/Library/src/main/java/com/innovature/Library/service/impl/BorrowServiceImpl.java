package com.innovature.Library.service.impl;

import java.util.ArrayList;
import java.util.Collection;
// import java.util.Date;
import java.util.Date;
//import java.sql.Date;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;

import com.innovature.Library.entity.Books;
import com.innovature.Library.entity.Borrow;
import com.innovature.Library.entity.User;
import com.innovature.Library.form.BorrowForm;
import com.innovature.Library.repository.BooksRepository;
import com.innovature.Library.repository.BorrowRepository;
import com.innovature.Library.repository.UserRepository;
import com.innovature.Library.security.util.SecurityUtil;
import com.innovature.Library.service.BorrowService;

import com.innovature.Library.view.BorrowDetailView;
import com.innovature.Library.view.BorrowListView;
import com.innovature.Library.view.rentChartView;

import java.util.List;







@Service
public class BorrowServiceImpl implements BorrowService {

    // @Autowired
    // private JavaMailSender mailSender;
    @Autowired
    private JavaMailSender mailSender;

    

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    BooksRepository booksRepository;

    @Autowired
    UserRepository userRepository;

   // private Object mailSender;

    @Override
    public BorrowDetailView add(BorrowForm form){
    Books books=booksRepository.findByBooksId(form.getBooksId());
    User user=userRepository.findById(SecurityUtil.getCurrentUserId());
   // String status= form.setStatus("REQUESTED");
  // return new BorrowDetailView(borrowRepository.save(new Borrow(form,books,user)));

    return new BorrowDetailView(borrowRepository.save(new Borrow(books,user)));
  
    }

    @Override
    public Collection<Borrow> listAll() {
        return borrowRepository.findAll();              
    }


    @Override
    public List<Borrow> loadtAllByIssueDate(java.sql.Date date1, java.sql.Date date2) {
        return borrowRepository.findbyIssuDate(date1,date2);              
    }


    @Override
    public Collection<Borrow> listDue() {
        return borrowRepository.findbyBorrowIdandStatus();                
    }


    @Override
    public Collection<Borrow> listDueByUser() {
        return borrowRepository.findbyUserIdandStatus(SecurityUtil.getCurrentUserId());                
    }

    @Override
    public Collection<Borrow> fine() {
        return borrowRepository.findbyBorrowIdandDueDateandStatus();                
    }

    @Override
    public Borrow BorrowDetail(Integer borrowId) {
        
        return borrowRepository.findByBorrowId(borrowId);                
    }
/////////////////////////////////////////////////////////////////////////////////////////////
    @Override
    public Integer BorrowBlock() {
        
        return borrowRepository.findbyUserIdAndStatus(SecurityUtil.getCurrentUserId());                
    }


    @Override
    public BorrowDetailView list(Integer borrowId){
        Borrow borrow=borrowRepository.findByBorrowId(borrowId);
        return new BorrowDetailView(borrow);
    }


    @Override
    public Collection<BorrowListView> list1() {
        return borrowRepository.findAllByUserUserId(SecurityUtil.getCurrentUserId());
    }


    @Override
    public Collection<Borrow> listNotification() {
        return borrowRepository.findBorrowIdbyUserId(SecurityUtil.getCurrentUserId());
    }

    @Override
    public Collection<Borrow> listUserNotification() {
        return borrowRepository.findbyUserIdDueDate(SecurityUtil.getCurrentUserId());
    }









    @Override
    @Transactional
    public BorrowDetailView updates(Integer borrowId, BorrowForm form)  {

        Borrow borrow=borrowRepository.findByBorrowId(borrowId);        
        Books books=booksRepository.findbyBorrowId(borrowId);
  

       borrow.setIssueDate(LocalDateTime.now());
       borrow.setDueDate(form.getDueDate());
       borrow.setReturnDate(form.getReturnDate());
       borrow.setReason(null);
       borrow.setStatus("APPROVED");
       books.setBooksCopies(books.getBooksCopies() - 1);
       return new BorrowDetailView(borrowRepository.save(borrow));
    }





    @Override
    @Transactional
    public BorrowDetailView updatereject(Integer borrowId, BorrowForm form)  {

        Borrow borrow=borrowRepository.findByBorrowId(borrowId);        
       // Books books=booksRepository.findByBooksId(borrowId);
  
    //    borrow.setIssueDate("NA");
    //    borrow.setDueDate("NA");
    //    borrow.setReturnDate("NA");
   //    String status= form.setStatus("REQUESTED"); category.setCategoryName(form.getCategoryName());
       borrow.setReason(form.getReason());
       borrow.setIssueDate(null);
       borrow.setReturnDate(null);
       borrow.setDueDate(null);
       borrow.setStatus("REJECTED");
       return new BorrowDetailView(borrow);
    }


    @Override
    @Transactional
    public BorrowDetailView updateReturn(Integer borrowId, BorrowForm form)  {

        Borrow borrow=borrowRepository.findByBorrowId(borrowId);        
        Books books=booksRepository.findbyBorrowId(borrowId);
  

       borrow.setBookReturnedDate(LocalDateTime.now());
       borrow.setIssueDate(borrow.getIssueDate());
       borrow.setReturnDate(borrow.getReturnDate());
       borrow.setDueDate(borrow.getDueDate());
       borrow.setStatus("RETURNED");
       books.setBooksCopies(books.getBooksCopies() + 1);
       return new BorrowDetailView(borrowRepository.save(borrow));
    }

    @Override
    @Transactional
    public BorrowDetailView undo(Integer borrowId, BorrowForm form)  {

        Borrow borrow=borrowRepository.findByBorrowId(borrowId);        
        Books books=booksRepository.findbyBorrowId(borrowId);
  
       borrow.setBookReturnedDate(null);
       borrow.setStatus("APPROVED");
       books.setBooksCopies(books.getBooksCopies() - 1);
       return new BorrowDetailView(borrowRepository.save(borrow));
    }



    @Override
    public BorrowDetailView listByUser(Integer borrowId, BorrowForm form) {
        // TODO Auto-generated method stub
        return null;
    }




///pagenation and sort///
    @Override
    @Transactional
    public List<Borrow>getAllBorrow( java.sql.Date date1, java.sql.Date date2,Integer pageNo, Integer pageSize, String sortBy){
        
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort .by(sortBy));

        Page<Borrow> pagedResult = borrowRepository.findbyIssuDate(date1,date2,paging);

        if(pagedResult.hasContent()){
            return pagedResult.getContent();
        } else {
            return new ArrayList<Borrow>();
        }
    }


    //////////////////////////////////
    @Override
    @Transactional
    public Page<Borrow>getAllBor( java.sql.Date date1, java.sql.Date date2,Integer pageNo, Integer pageSize, String sortBy,Integer direction){
        
       // Pageable paging = PageRequest.of(pageNo, pageSize, Sort .by(sortBy));
        var sortByDescending=Sort.by(sortBy).descending();
        var sortByAscending=Sort.by(sortBy).ascending();

        if(direction==1){

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<Borrow> pagedResult = borrowRepository.findbyIssuDat(date1,date2,paging);
            return pagedResult;    
        }

        else 
        {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findbyIssuDat(date1,date2,paging);
             return pagedResult; 
        }

        // Page<Borrow> pagedResult = borrowRepository.findbyIssuDat(date1,date2,paging);
        // return pagedResult;
      
    }





    @Override
    @Transactional
    public List<Borrow>getAllBorrows(Integer pageNo, Integer pageSize, String sortBy){
        
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        Page<Borrow> pagedResult = borrowRepository.findAll(paging);

        if(pagedResult.hasContent()){
            return pagedResult.getContent();
        } else {
            return new ArrayList<Borrow>();
        }
    }


//@admin borrow oninit
    @Override
    @Transactional
    public Page<Borrow>getAllBorr(Integer pageNo, Integer pageSize, String sortBy,Integer direction){
        
        var sortByDescending=Sort.by(sortBy).descending();

        var sortByAscending=Sort.by(sortBy).ascending();

        if(direction==1){

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<Borrow> pagedResult = borrowRepository.findAll(paging);
            return pagedResult;    
        }

        else 
        {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<Borrow> pagedResult = borrowRepository.findAll(paging);
             return pagedResult; 
        }
       // return pagedResult;

 



     
    }


    @Override
    @Transactional
    public List<Borrow>getBorrowHistory(Integer pageNo, Integer pageSize, String sortBy){
        
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        Page<Borrow> pagedResult = borrowRepository.findAllByUserUserId(SecurityUtil.getCurrentUserId(),paging);

        if(pagedResult.hasContent()){
            return pagedResult.getContent();
        } else {
            return new ArrayList<Borrow>();
        }
    }

    // @Override
    // public Collection<BorrowListView> list1() {
    //     return borrowRepository.findAllByUserUserId(SecurityUtil.getCurrentUserId());
    // }


   
//mail//
    // @Override
    // @Transactional
    // @Scheduled(cron="*/50 * * * * * ")
    // public void sendMail(Integer userId,String subject,String text) {
    //     System.out.println("ssss");
    //    // User user =  userRepository.findByUserId(userId); 
    //     User user=userRepository.findById(userId);

    //     SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    //     simpleMailMessage.setFrom("bookstore.shopp@gmail.com");
    //     simpleMailMessage.setTo(user.getEmail());
    //     simpleMailMessage.setSubject(subject);
    //     simpleMailMessage.setText(text);

    //     this.mailSender.send(simpleMailMessage);
    // }

    @Override
    @Transactional
   // @Scheduled(cron="* */1 * * * * ")
   @Scheduled(cron="0 0 12 * * ?")
    public void sendMails() {
        System.out.println("Email sent successfully");
       
       // User user=userRepository.findById(userId);
        Collection<Borrow> borrow=borrowRepository.findbyBorrowIdandStatus();
        for(Borrow bor: borrow){
            User user =  userRepository.findById(bor.getUser().getUserId()); //fetching uid from user
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

            simpleMailMessage.setFrom("bookstore.shopp@gmail.com");            
            simpleMailMessage.setTo(user.getEmail());    
            simpleMailMessage.setSubject("Books are due");
            simpleMailMessage.setText("Please return the book '"+bor.getBooks().getBooksName()+"'. The due date has expired on "+bor.getDueDate() +". Fine will be generated for each day(5 rs/day)");
    
            this.mailSender.send(simpleMailMessage);        }      
        }
    @Override
    public void sendMail(Integer userId, String subject, String text) {
        // TODO Auto-generated method stub        
    }







    @Override
    @Transactional
   // @Scheduled(cron="* */1 * * * * ")
   @Scheduled(cron="0 0 12 * * ?")
    public void fineGeneration() {
       System.out.println("reachllllllllllllll");
       

        Collection<Borrow> borrow=borrowRepository.findbyBorrowId();
        System.out.println("hereeeeeeeeeeeeeee");

        for(Borrow bor:borrow){
            System.out.println(bor.getBorrowId());
            Date d=new Date();
            Long due=d.getTime()-bor.getDueDate().getTime(); //date conversion to time
            due=due/86400000; //time conversion to date
            bor.setDueDays(due);

            bor.setFine(due*5);                    
        }
        
    }


public rentChartView getChart(){
    rentChartView result= new rentChartView();
    String[] weeks = {"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"};
    result.setLabel(Arrays.asList(weeks));

    HashMap<Integer, Result> hm
            = new HashMap<Integer, Result>();

            hm.put(1, new Result(0, 0));
            hm.put(2, new Result(0, 0));
            hm.put(3, new Result(0, 0));
            hm.put(4, new Result(0, 0));
            hm.put(5, new Result(0, 0));
            hm.put(6, new Result(0, 0));
            hm.put(7, new Result(0, 0));

            List<Borrow>s=borrowRepository.findAllC();


            for(Borrow a:s){
                // if(a.getStatus().equals("APPROVED" ))
                if(a.getIssueDate()!=null)
                {

                LocalDateTime b = a.getIssueDate();
                //  System.out.println("-----in issue----------------------"+b);
                // System.out.println("........>>>>>>>>>>>>>>>>....."+ b.getDayOfWeek().getValue());
               
                hm.put(b.getDayOfWeek().getValue(), new Result(hm.get(b.getDayOfWeek().getValue()).getIssueCount() + 1,
                hm.get(b.getDayOfWeek().getValue()).getReturnedCount()));
                }

                LocalDateTime c=null;
                
                if(a.getStatus().equals("RETURNED"))
                {

                    c = a.getBookReturnedDate();
                // System.out.println("cccccccccccccccccccccccccccccccccccccccccc="+c);


                hm.put(c.getDayOfWeek().getValue(), new Result(hm.get(c.getDayOfWeek().getValue()).getIssueCount() ,
                hm.get(c.getDayOfWeek().getValue()).getReturnedCount() +1));
            
                // System.out.println(hm.get(c.getDayOfWeek().getValue()).getReturnedCount());   
            }                   
            }
            for (Map.Entry<Integer, Result > mapElement : hm.entrySet()) {
                result.getIssueCount().add(mapElement.getValue().getIssueCount()+"");
                  result.getReturnedCount().add(mapElement.getValue().getReturnedCount()+"");

            }
            return result;
}


public class Result {
    private Integer issueCount;
    private Integer returnedCount;

    public Result(Integer issueCount, Integer returnedCount) {
        this.issueCount = issueCount;
        this.returnedCount= returnedCount;
    }

    public Integer getIssueCount() {
        return issueCount;
    }

    public void setIssueCount(Integer issueCount) {
        this.issueCount = issueCount;
    }

    public Integer getReturnedCount() {
        return returnedCount;
    }

    public void setReturnedCount(Integer returnedCount) {
        this.returnedCount = returnedCount;
    }
}

@Override
public List<Borrow> listcsv() {
    return borrowRepository.findAllC();
}

    
@Override
public Page<Borrow> getAllBorrowedUserSearch(String keyword, Integer pageNo, Integer pageSize) {
    Pageable paging = PageRequest.of(pageNo, pageSize);
    System.out.println(keyword);
    String k = keyword;
    String k1 = keyword;
    String k2 = keyword;
    Page<Borrow> pagedResult = borrowRepository.findByKeywords(keyword, k, k1, k2, paging);
     return pagedResult;

}



    
}
