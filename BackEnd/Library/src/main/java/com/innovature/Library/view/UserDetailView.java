package com.innovature.Library.view;

import com.innovature.Library.entity.User;

public class UserDetailView extends UserListView {

    public UserDetailView(User user) {
        super(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddress(),
                user.getDob(),
                user.getPhone(),
                user.getRole(),
                user.getCreateDate(),
                user.getUpdateDate(),
                user.getEmail(),
                user.getStatus()

        );

    }

}
