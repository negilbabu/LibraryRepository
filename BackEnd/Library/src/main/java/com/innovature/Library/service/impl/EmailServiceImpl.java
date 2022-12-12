// package com.innovature.Library.service.impl;

// import com.innovature.Library.service.EmailService;


// import java.util.Properties;




// import javax.mail.*;
// import javax.mail.internet.InternetAddress;
// import javax.mail.internet.MimeMessage;
// import javax.mail.Session;

// import org.springframework.stereotype.Service;

// @Service
// public class EmailServiceImpl implements EmailService {
//     @Override
//     public boolean sendEmail(String subject, String message, String to)
//     {
//         boolean s=false;
//         String senderEmail="stormhokspam@gmail.com";
//         String senderPassword="cyckyhziponehguf";

//         Properties properties = new Properties();
//         properties.put("mail.smtp.auth", "true");
//         properties.put("mail.smtp.starttls.enable", "true"); 
//         properties.put("mail.smtp.host", "smtp.gmail.com"); 
//         properties.put("mail.smtp.port", "587"); // 587 is TLS port number
//         Session session = Session.getInstance(properties, new Authenticator()
//         {
//             protected PasswordAuthentication getPasswordAuthentication(){

//                 return new PasswordAuthentication(senderEmail, senderPassword);
//             }
//         });
//         try {

//             MimeMessage msg = new MimeMessage(session); 

//             msg.setFrom(new InternetAddress(senderEmail));

//             msg.addRecipient(Message.RecipientType.TO, new InternetAddress(to)); 

//             msg.setSubject(subject); 
//             msg.setText(message); 
//             Transport.send(msg); 

//             s = true; // Set the "foo" variable to true after successfully sending emails

//         }catch(Exception e){

//         }

//         return s; // and return foo variable
//     }




// }