/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//package com.innovaturelabs.training.contacts.security;
package com.innovature.Library.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class AccessTokenUserDetails implements UserDetails {

    private static final List<GrantedAuthority> ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
    // AuthorityUtils.createAuthorityList("ROLE_ADMIN");
    
    public final int userId;
    public String userRole;

    public AccessTokenUserDetails(int userId,int role) {
        this.userId = userId;
      switch(role){
        case 1:
        userRole="ADMIN";
        break;

        case 2:
        userRole="USER";
        break;

        default:
        break;
      }

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String ROLE_PREFIX = "ROLE_";
        List<GrantedAuthority> ROLES = new ArrayList<>();
        ROLES.add(new SimpleGrantedAuthority(ROLE_PREFIX + userRole));
        return ROLES;    
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
