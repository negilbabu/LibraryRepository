package com.innovature.Library.controller;

import java.security.Principal;
import java.util.Collection;
import java.sql.Date;
import java.util.List;
import java.io.IOException;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import com.innovature.Library.entity.Borrow;
import com.innovature.Library.form.BorrowForm;
import com.innovature.Library.service.BorrowService;
import com.innovature.Library.service.impl.BorrowServiceImpl;
import com.innovature.Library.view.BorrowDetailView;
import com.innovature.Library.view.rentChartView;
import com.innovature.Library.view.BorrowListView;

@RestController
@RequestMapping("/borrow")
public class BorrowController {

    @Autowired
    private BorrowService bService;

    @Autowired
    private BorrowServiceImpl borrowServices;

    // load all borrow list
    @GetMapping
    public Collection<Borrow> list() {
        return bService.listAll();
    }

    @GetMapping("/user/statusFilter/")
    public ResponseEntity<Page<Borrow>> getAllBorrByStat(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "borrowId") String sortBy,
            @RequestParam(defaultValue = "1") Integer direction,
            @RequestParam(defaultValue = "1") Integer status) {
        Page<Borrow> list = bService.getAllBorrByStat(pageNo - 1, pageSize, sortBy, direction, status);
        return new ResponseEntity<Page<Borrow>>(list, new HttpHeaders(),
                HttpStatus.OK);

    }

    @GetMapping("/admin/statusFilter/")
    public ResponseEntity<Page<Borrow>> getAllBorrowByStatus(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "borrowId") String sortBy,
            @RequestParam(defaultValue = "1") Integer direction,
            @RequestParam(defaultValue = "1") Integer status) {
        Page<Borrow> list = bService.getAllBorrByStatus(pageNo - 1, pageSize, sortBy, direction, status);
        return new ResponseEntity<Page<Borrow>>(list, new HttpHeaders(),HttpStatus.OK);

    }

    // BORROW @ADMIN //pagenated borrow list at admin VIEW borrow single api
    @GetMapping("/admin/pagenated/")
    public ResponseEntity<Page<Borrow>> getAllBorTest(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "borrowId") String sortBy,
            @RequestParam(defaultValue = "1") Integer direction) {
        Page<Borrow> list = bService.getAllBorr(pageNo - 1, pageSize, sortBy, direction);
        return new ResponseEntity<Page<Borrow>>(list, new HttpHeaders(),
                HttpStatus.OK);

    }

    // GET FILTER RESULT@ADMIN//filtered single api
    @GetMapping("/admin/{date1}/{date2}")
    public ResponseEntity<Page<Borrow>> getTestFilterBorrow(
            // @PathVariable Date date1, @PathVariable Date date2,
            @PathVariable("date1") Date date1,
            @PathVariable("date2") Date date2,
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "borrow_id") String sortBy,
            @RequestParam(defaultValue = "1") Integer direction) {

        Page<Borrow> list = bService.getAllBor(date1, date2, pageNo - 1, pageSize, sortBy, direction);
        return new ResponseEntity<Page<Borrow>>(list, new HttpHeaders(), HttpStatus.OK);

    }

    // load results of issuedate filter at User BorrowHistory
    @GetMapping("user/loadByIssueDate/{date1}/{date2}")
    public ResponseEntity<List<Borrow>> loadByIssueDateUser(
            @PathVariable("date1") Date date1,
            @PathVariable("date2") Date date2)

    {
        List<Borrow> list = bService.loadtAllByIssueDate(date1, date2);
        return new ResponseEntity<List<Borrow>>(list, new HttpHeaders(),
                HttpStatus.OK);
    }

    // pagenation+sort at user borrow history
    @GetMapping("/userBorrow/pagenated/")
    public ResponseEntity<List<Borrow>> getBorrowHistory(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy) {
        List<Borrow> list = bService.getBorrowHistory(pageNo - 1, pageSize, sortBy);
        return new ResponseEntity<List<Borrow>>(list, new HttpHeaders(),
                HttpStatus.OK);

    }

    @PostMapping
    public BorrowDetailView add(@Valid @RequestBody BorrowForm form) {
        return bService.add(form);
    }

    // borrow history @user
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

    @GetMapping("user/due")
    public Collection<Borrow> listDue() {
        return bService.listDue();
    }

    @GetMapping("/admin/fine/")
    public ResponseEntity<Page<Borrow>> listfine(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "borrowId") String sortBy,
            @RequestParam(defaultValue = "1") Integer direction) {
        Page<Borrow> list = bService.getAllFine(pageNo - 1, pageSize, sortBy, direction);
        return new ResponseEntity<Page<Borrow>>(list, new HttpHeaders(),
                HttpStatus.OK);

    }

    @GetMapping("admin/fine")
    public Collection<Borrow> listfine() {
        return bService.fine();
    }

    @GetMapping("/borrowDetailView")
    public Borrow BorrowDetail(Integer borrowId) {
        return bService.BorrowDetail(borrowId);
    }

    @GetMapping("/borrowBlock")
    public Integer BorrowBlock() {
        return bService.BorrowBlock();
    }

    @GetMapping("user/dueByUser")
    public Collection<Borrow> listDueByUser() {
        return bService.listDueByUser();
    }

    @GetMapping("/{borrowId}")
    public BorrowDetailView list(
            @PathVariable("borrowId") Integer borrowId) {
        return bService.list(borrowId);
    }

    @PutMapping("admin/accept/{borrowId}")
    public BorrowDetailView updateApprove(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form) {
        return bService.updates(borrowId, form);
    }

    @PutMapping("admin/reject/{borrowId}")
    public BorrowDetailView updateReject(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form) {
        return bService.updatereject(borrowId, form);
    }

    @PutMapping("admin/return/{borrowId}")
    public BorrowDetailView updateReturn(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form) {
        return bService.updateReturn(borrowId, form);
        
    }

    @PutMapping("admin/undo/{borrowId}")
    public BorrowDetailView undo(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form) {
        return bService.undo(borrowId, form);
    }

    // chart
    @GetMapping("/admin/chart")
    public rentChartView getchart() {
        rentChartView test = borrowServices.getChart();
        return test;
    }

    @PutMapping("user/paymentStatus/{borrowId}")
    public BorrowDetailView updatePaymentStatus(
            @PathVariable("borrowId") Integer borrowId,
            @Valid @RequestBody BorrowForm form) {
        return bService.updatePaymentStatus(borrowId, form);
    }

    @GetMapping("admin/export")
    public void Exportcsv( 
    @RequestParam(defaultValue = "") String date1,
    @RequestParam(defaultValue = "") String date2,
    HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.setContentType("text/csv");
        java.text.DateFormat datefFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = datefFormat.format(new java.util.Date());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".csv";
        httpServletResponse.setHeader(headerKey, headerValue);
        
        List<Borrow> rents = bService.listcsv(date1, date2);

        ICsvBeanWriter csvWriter = new CsvBeanWriter(httpServletResponse.getWriter(),
                CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = { "borrow_id", "first_name", "books_name", "issue_date", "return_date", "due_date",
                "book_returned_date", "reason", "due_days", "fine", "status" };
        String[] nameMapping = { "borrowId", "firstName", "booksName", "issueDate", "returnDate", "dueDate",
                "bookReturnedDate", "reason", "dueDays", "fine", "status" };
        csvWriter.writeHeader(csvHeader);
        for (Borrow rent : rents) {
            csvWriter.write(rent, nameMapping);
        }
        csvWriter.flush();
        csvWriter.close();
    }

}
