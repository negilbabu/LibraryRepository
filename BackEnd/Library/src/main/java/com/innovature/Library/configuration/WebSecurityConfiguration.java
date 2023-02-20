/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.innovature.Library.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.OPTIONS;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;

import com.innovature.Library.security.AccessTokenProcessingFilter;
import com.innovature.Library.security.AccessTokenUserDetailsService;
import com.innovature.Library.security.config.SecurityConfig;
import com.innovature.Library.security.util.TokenGenerator;
//import com.innovature.Library.service.BorrowService;

/**
 *
 * @author nirmal
 */
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    public WebSecurityConfiguration() {
        super(true);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .requestMatcher(new NegatedRequestMatcher(new AntPathRequestMatcher("/error")))
                .addFilter(accessTokenProcessingFilter())
                .authenticationProvider(preAuthenticatedAuthenticationProvider())
                .exceptionHandling().and()
                .headers().and()
                .sessionManagement().sessionCreationPolicy(STATELESS).and()
                .securityContext().and()
                .anonymous().and()
                .authorizeRequests()

                // .antMatchers(GET,"/users/admin/**/").access("hasRole('ROLE_ADMIN')")
                // .antMatchers(GET,"/users/admin/viewProfile").access("hasRole('ROLE_ADMIN')")

                .antMatchers(OPTIONS, "/users").anonymous()
                .antMatchers(POST, "/users").anonymous()
                .antMatchers(GET, "/socket").anonymous()
                .antMatchers(GET, "/chat").anonymous()
                .antMatchers(POST, "/chat").anonymous()
                .antMatchers(POST, "/users/register").anonymous()
                .antMatchers(POST, "/users/google").anonymous()
                .antMatchers(POST, "/users/google/signin").anonymous()
                .antMatchers(OPTIONS, "/login").anonymous()
                .antMatchers(POST, "/login").anonymous()
                .antMatchers(POST, "/email/**").anonymous()
                .antMatchers(PUT, "/login").anonymous()
                .antMatchers(OPTIONS, "/**").anonymous() 
                
                //category
                 .antMatchers(GET,"/category/admin/**/").access("hasRole('ROLE_ADMIN')")
                 .antMatchers(POST,"/category").access("hasRole('ROLE_ADMIN')")
                 .antMatchers(DELETE,"/category").access("hasRole('ROLE_ADMIN')")
                 .antMatchers(PUT,"/category/{catogoryId}").access("hasRole('ROLE_ADMIN')")

                 //books
                 .antMatchers(GET,"/books/admin/**/").access("hasRole('ROLE_ADMIN')")
                 .antMatchers(GET,"/books/user/**/").access("hasRole('ROLE_USER')")
                 .antMatchers(POST,"/books").access("hasRole('ROLE_ADMIN')")
                 .antMatchers(POST,"/books/save/image/{booksId}").access("hasRole('ROLE_ADMIN')")
                 .antMatchers(DELETE,"/books/{booksId}").access("hasRole('ROLE_ADMIN')")
                 .antMatchers(PUT,"/books/{booksId}").access("hasRole('ROLE_ADMIN')")
                
                 //borrow
                 .antMatchers(GET,"/borrow/admin/**").access("hasRole('ROLE_ADMIN')")
                 .antMatchers(GET,"/borrow/user/**/").access("hasRole('ROLE_USER')")
                 .antMatchers(POST,"/borrow/").access("hasRole('ROLE_USER')")
                 .antMatchers(PUT,"/borrow/admin/**").access("hasRole('ROLE_ADMIN')")

                 //user
                 




                .anyRequest().authenticated();


               
    }

    @Bean
    protected AccessTokenUserDetailsService accessTokenUserDetailsService() {
        return new AccessTokenUserDetailsService();
    }

    @Bean
    protected PreAuthenticatedAuthenticationProvider preAuthenticatedAuthenticationProvider() {
        PreAuthenticatedAuthenticationProvider authProvider = new PreAuthenticatedAuthenticationProvider();
        authProvider.setPreAuthenticatedUserDetailsService(accessTokenUserDetailsService());
        return authProvider;
    }

    @Bean
    protected AccessTokenProcessingFilter accessTokenProcessingFilter() throws Exception {
        AccessTokenProcessingFilter filter = new AccessTokenProcessingFilter();
        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    @ConfigurationProperties("app.security")
    public SecurityConfig securityConfig() {
        return new SecurityConfig();
    }

    @Bean
    @ConfigurationProperties("app.security.configuration")
    public TokenGenerator tokenGenerator(SecurityConfig securityConfig) {
        return new TokenGenerator(securityConfig.getTokenGeneratorPassword(), securityConfig.getTokenGeneratorSalt());
    }
}