/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//package com.innovaturelabs.training.contacts.security;
package com.innovature.Library.security;

// import java.util.Collection;
// import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import com.innovature.Library.entity.User;
import com.innovature.Library.repository.UserRepository;
import com.innovature.Library.security.util.InvalidTokenException;
import com.innovature.Library.security.util.TokenExpiredException;
import com.innovature.Library.security.util.TokenGenerator;
import com.innovature.Library.security.util.TokenGenerator.Status;

/**
 *
 * @author nirmal
 */
public class AccessTokenUserDetailsService implements AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> {

    public static final String PURPOSE_ACCESS_TOKEN = "ACCESS_TOKEN";

    @Autowired
    private TokenGenerator tokenGenerator;
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserDetails(PreAuthenticatedAuthenticationToken token) throws UsernameNotFoundException {
        if (!PURPOSE_ACCESS_TOKEN.equals(token.getCredentials())) {
            throw new UsernameNotFoundException("Invalid credentials");
        }

        final Status status;
        try {
            status = tokenGenerator.verify(PURPOSE_ACCESS_TOKEN, token.getPrincipal().toString());
        } catch (InvalidTokenException e) {
            throw new UsernameNotFoundException("Invalid access token", e);
        } catch (TokenExpiredException e) {
            throw new UsernameNotFoundException("Access token expired", e);
        }

         int userId = Integer.parseInt(status.data);
         User user = userRepository.findById(userId);

         return new AccessTokenUserDetails(userId, user.getRole());

       // return new AccessTokenUserDetails(Integer.parseInt(status.data), 1);
    }
}
