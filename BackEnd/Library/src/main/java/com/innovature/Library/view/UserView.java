package com.innovature.Library.view;

import java.util.Date;

import com.innovature.Library.entity.User;
import com.innovature.Library.json.Json;

public class UserView {

    private final int userId;
    private final String firstName;
    private final String lastName;
    private final String address;
    private final String phone;
    private final String email;
    private final int role;

    private final short status;
    @Json.DateFormat
    private final Date dob;
    @Json.DateTimeFormat
    private final Date createDate;
    @Json.DateTimeFormat
    private final Date updateDate;

    public UserView(User user) {
        this.userId = user.getUserId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.dob = user.getDob();
        this.address = user.getAddress();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.status = user.getStatus();
        this.createDate = user.getCreateDate();
        this.updateDate = user.getUpdateDate();
    }

    public int getRole() {
        return role;
    }

    public int getUserId() {
        return userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public Date getDob() {
        return dob;
    }

    public String getEmail() {
        return email;
    }

    public short getStatus() {
        return status;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

}
