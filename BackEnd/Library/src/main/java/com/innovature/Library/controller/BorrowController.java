package com.innovature.Library.controller;

 import java.security.Principal;
import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.DeleteMapping;
 import org.springframework.web.bind.annotation.GetMapping;
 import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innovature.Library.entity.Borrow;
import com.innovature.Library.form.BorrowForm;
import com.innovature.Library.service.BorrowService;
import com.innovature.Library.view.BorrowDetailView;
//import com.innovature.Library.view.BorrowListView;
import com.innovature.Library.view.BorrowListView;


@RestController
@RequestMapping("/borrow")
public class BorrowController {
    

    @Autowired
    private BorrowService bService;




    @GetMapping("/pagenated/")
    public ResponseEntity<List<Borrow>>getAllBorrow(
                        @RequestParam(defaultValue = "0") Integer pageNo,
                        @RequestParam(defaultValue = "10") Integer pageSize,
                        @RequestParam(defaultValue = "id") String sortBy)
    {
        List<Borrow> list = bService.getAllBorrow(pageNo, pageSize, sortBy);
        return new ResponseEntity<List<Borrow>>(list,new HttpHeaders(),
        HttpStatus.OK);

    }










    @PostMapping
    public BorrowDetailView add(@Valid @RequestBody BorrowForm form) {
        return bService.add(form);
    }

    @GetMapping("/list/user")
    public Collection<BorrowListView> list1(Principal p) {
        return bService.list1();
    }
    @GetMapping("/user/notification")
    public Collection<Borrow> listNotification(Principal p) {
        return bService.listNotification();
    }
    @GetMapping("/user/UserNotification")
    public Collection<Borrow> listUserNotification(Principal p) {
        return bService.listNotification();
    }

    @GetMapping
    public Collection<Borrow> list() {
        return bService.listAll();
    }

    @GetMapping("/due")
    public Collection<Borrow> listDue() {
        return bService.listDue();
    }

    @GetMapping("/dueByUser")
    public Collection<Borrow> listDueByUser() {
        return bService.listDueByUser();
    }


    @GetMapping("/{borrowId}")
    public BorrowDetailView list(
        @PathVariable("borrowId") Integer borrowId      
    ) 
     {
        return bService.list(borrowId);
    }






    @PutMapping("/{borrowId}")
    public BorrowDetailView updateApprove(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form
    ) {
        return bService.updates(borrowId, form);
    }


    @PutMapping("reject/{borrowId}")
    public BorrowDetailView updateReject(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form
    ) {
        return bService.updatereject(borrowId, form);
    }


    @PutMapping("return/{borrowId}")
    public BorrowDetailView updateReturn(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form
    ) {
        return bService.updateReturn(borrowId, form);
    }
    @PutMapping("undo/{borrowId}")
    public BorrowDetailView undo(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form
    ) {
        return bService.undo(borrowId, form);
    }





}
