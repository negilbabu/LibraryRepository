/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//package com.innovaturelabs.training.contacts.security;
package com.innovature.Library.security;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;


public class AccessTokenUserDetails implements UserDetails {

    private List<GrantedAuthority> ROLES = AuthorityUtils.createAuthorityList("ROLE_USER","ROLE_ADMIN");
    // AuthorityUtils.createAuthorityList("ROLE_ADMIN");
    
    public final int userId;

    public AccessTokenUserDetails(int userId) {
        this.userId = userId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
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
