package com.digitalbooking.digitalbooking.domain.mail;

import javax.mail.MessagingException;

public interface MailRepository {
    void sendEmailValidateAccount(String to, String subject, String username, String activationUrl) ;

    void sendEmailAccountActivate(String email, String subject, String name, String urlValidation);
}
