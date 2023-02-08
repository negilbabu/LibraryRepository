
package com.innovature.Library.service.impl;

import static com.innovature.Library.security.AccessTokenUserDetailsService.PURPOSE_ACCESS_TOKEN;

import java.util.Collection;
import java.util.Random;
import java.time.LocalTime;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.innovature.Library.entity.Email;
import com.innovature.Library.entity.User;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.exception.ConflictException;
import com.innovature.Library.exception.NotFoundException;
import com.innovature.Library.exception.expectationFailedException;
import com.innovature.Library.form.LoginForm;
import com.innovature.Library.form.ResetNewPswd;
import com.innovature.Library.form.ResetPasswordForm;
import com.innovature.Library.form.UserForm;
import com.innovature.Library.repository.EmailRepository;
import com.innovature.Library.repository.UserRepository;
import com.innovature.Library.security.config.SecurityConfig;
import com.innovature.Library.security.util.InvalidTokenException;
import com.innovature.Library.security.util.SecurityUtil;
import com.innovature.Library.security.util.TokenExpiredException;

import com.innovature.Library.security.util.TokenGenerator;
import com.innovature.Library.security.util.TokenGenerator.Status;
import com.innovature.Library.security.util.TokenGenerator.Token;
import com.innovature.Library.service.UserService;
import com.innovature.Library.view.LoginView;
import com.innovature.Library.view.UserView;

@Service
public class UserServiceImpl implements UserService {

    private static final String PURPOSE_REFRESH_TOKEN = "REFRESH_TOKEN";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private TokenGenerator tokenGenerator;

    @Autowired
    private SecurityConfig securityConfig;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public UserView add(UserForm form) {

        
        User email = userRepository.findByEmailId(form.getEmail());

        if (email == null) {
            return new UserView(userRepository.save(new User(
                    form.getFirstName(),
                    form.getLastName(),
                    form.getDob(),
                    form.getAddress(),
                    form.getPhone(),
                    form.getEmail(),
                    passwordEncoder.encode(form.getPassword()))));

        } else if (email.getEmail() != null) {
            throw conflictException();
        } else
            return null;
 
    }

    private static BadRequestException badRequestException() {
        return new BadRequestException("Invalid credentials");
    }

    private static expectationFailedException expectationFailedException() {
        return new expectationFailedException("Invalid username or password");
    }

    private static ConflictException conflictException() {
        return new ConflictException("Email id Already Registered");
    }


    @Override
    public LoginView login(LoginForm form) throws BadRequestException {

            User user = userRepository.findByEmail(form.getEmail()).orElseThrow(UserServiceImpl::expectationFailedException);
            if (!passwordEncoder.matches(form.getPassword(), user.getPassword())) {
                throw expectationFailedException();
            }

            String id = String.format("%010d", user.getUserId());
            Token accessToken = tokenGenerator.create(PURPOSE_ACCESS_TOKEN, id, securityConfig.getAccessTokenExpiry());
            Token refreshToken = tokenGenerator.create(PURPOSE_REFRESH_TOKEN, id + user.getPassword(),
                    securityConfig.getRefreshTokenExpiry());
            return new LoginView(user, accessToken, refreshToken);

    }


    @Override
    public UserView currentUser() {
        return new UserView(
                userRepository.findById(SecurityUtil.getCurrentUserId()));
    }

    @Override
    public LoginView refresh(String refreshToken) throws BadRequestException {
        Status status;
        try {
            status = tokenGenerator.verify(PURPOSE_REFRESH_TOKEN, refreshToken);
        } catch (InvalidTokenException e) {
            throw new BadRequestException("Invalid token", e);
        } catch (TokenExpiredException e) {
            throw new BadRequestException("Token expired", e);
        }

        int userId;
        try {
            userId = Integer.parseInt(status.data.substring(0, 10));
        } catch (NumberFormatException e) {
            throw new BadRequestException("Invalid token", e);
        }

        String password = status.data.substring(10);

        User user = userRepository.findByUserIdAndPassword(userId, password)
                .orElseThrow(UserServiceImpl::badRequestException);

        String id = String.format("%010d", user.getUserId());
        Token accessToken = tokenGenerator.create(PURPOSE_ACCESS_TOKEN, id, securityConfig.getAccessTokenExpiry());
        return new LoginView(
                user,
                new LoginView.TokenView(accessToken.value, accessToken.expiry),
                new LoginView.TokenView(refreshToken, status.expiry));
    }



    @Override
    public Collection<User> listAll() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public Page<User> getAllUser(Integer pageNo, Integer pageSize, String sortBy, Integer direction) {

        var sortByDescending = Sort.by(sortBy).descending();
        var sortByAscending = Sort.by(sortBy).ascending();

        if (direction == 1) {

            Pageable paging = PageRequest.of(pageNo, pageSize, sortByDescending);
            Page<User> pagedResult = userRepository.findAUser(paging);
            return pagedResult;
        }

        else {
            Pageable paging = PageRequest.of(pageNo, pageSize, sortByAscending);
            Page<User> pagedResult = userRepository.findAUser(paging);
            return pagedResult;
        }
    }

    @Override
    public UserView edit(Integer userId, UserForm form) {

        User user = userRepository.findById(userId);
System.out.println(user.getEmail());
System.out.println(user.getPassword());

        user.edit(
                form.getFirstName(),
                form.getLastName(),
                form.getDob(),
                form.getAddress(),
                form.getPhone(),
                user.getEmail(),
                // form.getEmail(),
                user.getPassword()
                // passwordEncoder.encode(form.getPassword())
                );
                System.out.println("-----------------------------------"+user.getPassword());
        return new UserView(userRepository.save(user));
    }

    @Override
    public Collection<User> viewProfile(Integer userId) {

        return userRepository.findByUserId(userId);

    }

    @Override
    public UserView updates(Integer userId, UserForm form) {

        User user = userRepository.findById(userId);

        user.edit(
                form.getFirstName(),
                form.getLastName(),
                form.getDob(),
                form.getAddress(),
                form.getPhone(),
                form.getEmail(),
                passwordEncoder.encode(form.getPassword()));

        return new UserView(userRepository.save(user));
    }

    @Override
    public void deletes(Integer userId) throws NotFoundException {
        userRepository.delete(
                userRepository.findById(userId)

        );

    }

    @Override
    public Collection getUserById(Integer userId) {

        userRepository.findById(userId);
        return userRepository.findByUserId(userId);

    }

    @Transactional
    @Override
    public boolean validatePassword(ResetPasswordForm form) {
        

        User user = userRepository.findById(SecurityUtil.getCurrentUserId());
      
        if ( (!passwordEncoder.matches(form.getOldPassword(), user.getPassword()))){

            throw new expectationFailedException("Incorrect Password ");
        }
        else
        {       
        
            return true;
        }
      

    }

    @Override
    public boolean addPassword(ResetNewPswd form) {

        User user = userRepository.findById(SecurityUtil.getCurrentUserId());
        var email=userRepository.findEmailByUserId(SecurityUtil.getCurrentUserId());

        // User user = userRepository.findByEmailId(form.getEmail());

        if (form.getNewPassword().equals(form.getCnewPassword()))

        {

            user.setPassword(passwordEncoder.encode(form.getNewPassword()));
            userRepository.save(user);
            return true;
        }
        return false;

    }

}
