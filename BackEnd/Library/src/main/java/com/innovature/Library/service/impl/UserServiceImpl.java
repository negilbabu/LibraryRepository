
package com.innovature.Library.service.impl;

import static com.innovature.Library.security.AccessTokenUserDetailsService.PURPOSE_ACCESS_TOKEN;

import java.util.Collection;
import java.util.Collections;
import java.util.Random;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.innovature.Library.entity.Email;
import com.innovature.Library.entity.User;
import com.innovature.Library.exception.BadRequestException;
import com.innovature.Library.exception.ConflictException;
import com.innovature.Library.exception.GatewayTimeoutException;
import com.innovature.Library.exception.NotAcceptableException;
import com.innovature.Library.exception.NotFoundException;
import com.innovature.Library.exception.expectationFailedException;
import com.innovature.Library.form.EditProfileForm;
import com.innovature.Library.form.EmailForm;
import com.innovature.Library.form.LoginForm;
import com.innovature.Library.form.ResetNewPswd;
import com.innovature.Library.form.ResetPasswordForm;
import com.innovature.Library.form.UserForm;
import com.innovature.Library.form.googleForm;
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

import ch.qos.logback.core.joran.conditional.ElseAction;

import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.core.JsonFactory;
// import org.springframework.social.facebook.api.Facebook;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
// import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Service
public class UserServiceImpl implements UserService {

    private static final String PURPOSE_REFRESH_TOKEN = "REFRESH_TOKEN";

    private String email;
    private String firstName;
    private String lastName;

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
    public ResponseEntity add(EmailForm form) {

        User email = userRepository.findByEmailId(form.getSentto());

        if (email == null) {

            Random random = new Random();
            int otp = 100000 + random.nextInt(900000);
            LocalTime myObj = LocalTime.now();
            LocalTime exp = myObj;

            Email otp2 = new Email();
            otp2.setOtp(otp);
            otp2.setEmail(form.getSentto());
            otp2.setExpiry(exp);

            var emails = form.getSentto();
            Email email2 = emailRepository.findByEmail(emails);

            if (email2 != null) {
                email2.setOtp(otp);
                email2.setExpiry(exp);
                emailRepository.save(email2);
            } else
                emailRepository.save(otp2);

try {
    System.out.println("--------tryyyyyy------------------" );
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    simpleMailMessage.setFrom("testnegspam@gmail.com");
    simpleMailMessage.setTo(form.getSentto());
    simpleMailMessage.setSubject("Email verification");
    simpleMailMessage.setText(
            "OTP for create account in Library is : " + otp);
                this.mailSender.send(simpleMailMessage); 
} catch (org.springframework.mail.MailSendException e) {
    System.out.println("-----------catch---------------" + e);
    throw badRequestException();
}
    
            
        //      if (errors.hasErrors()) {
        //     throw badRequestException();
        // }
            
            return new ResponseEntity(null, HttpStatus.ACCEPTED);

        } else if (email.getEmail() != null) {
            throw conflictException();
        } else
            return null;
        // return null;

    }

    @Override
    public UserView register(UserForm form) {

        Email otp = emailRepository.findByEmail(form.getEmail());
        System.out.println("--------------------------" + form.getEmail());
        System.out.println("--------------------------" + otp);

        LocalTime myObj = LocalTime.now();

        var exp = otp.getExpiry().until(myObj, ChronoUnit.SECONDS);

        if ((form.getOtp().equals(otp.getOtp()))) {

            if (exp < 181) {

                // return new ResponseEntity(null, HttpStatus.ACCEPTED);
                return new UserView(userRepository.save(new User(
                        form.getFirstName(),
                        form.getLastName(),
                        form.getDob(),
                        form.getAddress(),
                        form.getPhone(),
                        form.getEmail(),
                        passwordEncoder.encode(form.getPassword()))));
            } else {
                throw new GatewayTimeoutException("OTP VALIDITY EXPIRED ");
            }

        } else {
            throw new NotAcceptableException("OTP VERIFICATION FAILED");
        }
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
    public LoginView googleSignIn1(googleForm form) throws GeneralSecurityException, IOException {       

        var token = form.getIdToken();

        // Create verifier
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections
                        .singletonList("508399831720-cai87nbnl4updp779c21a4br40kqc77s.apps.googleusercontent.com"))
                .build();

        // Verify it
        GoogleIdToken idToken = verifier.verify(token);

        if (idToken != null) {
        GoogleIdToken.Payload payload = idToken.getPayload();

        email = payload.getEmail();
   
        if(userRepository.existsByEmail(email)){
            User user = userRepository.findByEmailId(email);
            System.out.println("Email alreayd registered: " + email);   

            String id = String.format("%010d", user.getUserId());
            Token accessToken = tokenGenerator.create(PURPOSE_ACCESS_TOKEN, id, securityConfig.getAccessTokenExpiry());
            Token refreshToken = tokenGenerator.create(PURPOSE_REFRESH_TOKEN, id + user.getPassword(),
                    securityConfig.getRefreshTokenExpiry());
                 
            return new LoginView(user, accessToken, refreshToken);
   

        }
        else{
            System.out.println("Email not registered: " + email); 
           
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");

 
             new UserView(userRepository.save(new User(
                firstName,
                lastName,
                email
            )));
            User user = userRepository.findByEmailId(email);
            String id = String.format("%010d", user.getUserId());
            Token accessToken = tokenGenerator.create(PURPOSE_ACCESS_TOKEN, id, securityConfig.getAccessTokenExpiry());
            Token refreshToken = tokenGenerator.create(PURPOSE_REFRESH_TOKEN, id + user.getPassword(),
                    securityConfig.getRefreshTokenExpiry());
            return new LoginView(user, accessToken, refreshToken);

        }  
      
        }

        else{          
            throw badRequestException();
         }
        // return null;      

    }









    // @Override
    // public boolean googleSignIn(googleForm form) throws GeneralSecurityException, IOException {       

    //     var token = form.getIdToken();

    //     // Create verifier
    //     GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
    //             .setAudience(Collections
    //                     .singletonList("508399831720-cai87nbnl4updp779c21a4br40kqc77s.apps.googleusercontent.com"))
    //             .build();

    //     // Verify it
    //     GoogleIdToken idToken = verifier.verify(token);

    //     if (idToken != null) {
    //     GoogleIdToken.Payload payload = idToken.getPayload();

    //     email = payload.getEmail();
   
    //     if(userRepository.existsByEmail(email)){

    //       System.out.println("Email already registered: " + email);   
    //       throw conflictException(); 

    //     }
    //     else{
    //         System.out.println("Email not registered: " + email); 
    //         String firstName = (String) payload.get("given_name");
    //         String lastName = (String) payload.get("family_name");
 
    //          new UserView(userRepository.save(new User(
    //             firstName,
    //             lastName,
    //             email
    //         )));

    //     }








    //     return true;
    //     }

    //     else{          
    //         return false;
    //      }      

    // }












   
    @Override
    public LoginView login(LoginForm form) throws BadRequestException {

        User user = userRepository.findByEmail(form.getEmail())
                .orElseThrow(UserServiceImpl::expectationFailedException);
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
    public UserView edit(Integer userId, EditProfileForm form) {

        User user = userRepository.findById(userId);
 System.out.println("user-------------------="+user.getRole());

 if(user.getRole()==1){
    user.edit(
        form.getFirstName(),
        form.getLastName(),
        form.getDob(),
        form.getAddress(),
        form.getPhone()

);

return new UserView(userRepository.save(user));
 }
 else if(user.getRole()==2){
    user.editUser(
        form.getFirstName(),
        form.getLastName(),
        form.getDob(),
        form.getAddress(),
        form.getPhone()
);
return new UserView(userRepository.save(user));
 }
 else
return null;



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

        if ((!passwordEncoder.matches(form.getOldPassword(), user.getPassword()))) {

            throw new expectationFailedException("Incorrect Password ");
        } else {

            return true;
        }

    }

    @Override
    public boolean addPassword(ResetNewPswd form) {

        User user = userRepository.findById(SecurityUtil.getCurrentUserId());
        var email = userRepository.findEmailByUserId(SecurityUtil.getCurrentUserId());

        // User user = userRepository.findByEmailId(form.getEmail());

        if (form.getNewPassword().equals(form.getCnewPassword()))

        {

            user.setPassword(passwordEncoder.encode(form.getNewPassword()));
            userRepository.save(user);
            return true;
        }
        return false;

    }


    @Override
    public Collection<User> chatList( Integer sender) {
  
        Integer role=userRepository.findRoleByUserId(sender); 
        System.out.println("role="+role);
        if(role==1){
            return userRepository.findByReceiverId(sender);
        }
        else{
            return userRepository.findByAdmin();
        }
      

    }


    @Override
    public Collection<User> getAllUserBykeyword(String key) {



            String k = key;
            String k1 = key;
            String k2 = key;
            Collection<User> pagedResult = userRepository.findByKeywords(key, k, k1, k2);
            return pagedResult;
            // return null;
        }
}
