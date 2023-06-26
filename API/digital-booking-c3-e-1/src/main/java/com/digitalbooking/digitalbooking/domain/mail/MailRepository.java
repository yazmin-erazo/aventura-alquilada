package com.digitalbooking.digitalbooking.domain.mail;

import java.util.Date;

public interface MailRepository {
    void sendEmailValidateAccount(String to, String subject, String username, String activationUrl) ;

    void sendEmailAccountActivate(String email, String subject, String name, String urlValidation);
    void sendEmailRentConfirmation(String email, String subject, String name, String urlRents, Date starDate, Date endDate, String productDTOName);
}
