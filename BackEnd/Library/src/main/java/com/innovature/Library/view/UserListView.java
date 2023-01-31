package com.innovature.Library.view;

import java.util.Date;

import com.innovature.Library.entity.User;
import com.innovature.Library.json.Json;

public class UserListView {

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

    public UserListView(User user) {
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

    public UserListView(Integer userId, String firstName, String lastName, String address2, Date dob2, String phone2,
            int role2,
            Date createDate2, Date updateDate2, String email2, byte status) {

        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob2;
        this.address = address2;
        this.phone = phone2;
        this.email = email2;
        this.role = role2;
        this.status = status;
        this.createDate = createDate2;
        this.updateDate = updateDate2;
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
