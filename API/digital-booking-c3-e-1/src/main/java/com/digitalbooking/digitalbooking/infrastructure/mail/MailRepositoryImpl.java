package com.digitalbooking.digitalbooking.infrastructure.mail;

import com.digitalbooking.digitalbooking.domain.mail.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Repository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Repository
public class MailRepositoryImpl implements MailRepository {
    @Autowired
    private JavaMailSender emailSender;

    private final String templateHtmlValidateAccountMail = "<html>" +
            "<body style='background-color: #F5F5F5; text-align: center; padding:50px; font-family: Arial, sans-serif;'>" +
            "<p>¡Hola %s!</p>" +
            "<p>Estamos emocionados de que te hayas unido a nosotros. ¡Bienvenido a bordo!</p>" +
            "<p>Para activar tu cuenta y poner en marcha la diversión, solo tienes que hacer clic en el botón de abajo:</p>" +
            "<p><a href='%s' style='padding:10px; background-color: #2f6304; color: #FFFFFF; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;'>Activar Cuenta</a></p>" +
            "<p>Si no activas tu cuenta en las próximas 48 horas, el sistema desactivará tu cuenta y tendrás que registrarte de nuevo. Así que no te demores!</p>" +
            "<p>Hasta pronto,</p>" +
            "<p>Tu equipo de <span style='color: #008000;'>Digital</span> <span style='color: #00008B;'>Booking</span></p>" +
            "</body>" +
            "</html>";

    private final String templateHtmlAccountAvailableMail = "<html>" +
            "<body style='background-color: #F5F5F5; text-align: center; padding:50px; font-family: Arial, sans-serif;'>" +
            "<p>¡Hola %s!</p>" +
            "<p>¡Tu cuenta está lista para ser usada! Estamos seguros de que vas a disfrutar nuestra plataforma y las ventajas que tenemos para ti.</p>" +
            "<p>Para iniciar sesión, solo haz clic en el botón de abajo. Recuerda usar este email: %s</p>" +
            "<div style='margin: 20px 0;'>" +
            "    <a href='%s' style='padding:15px; background-color: #2f6304; color: #FFFFFF; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 18px;'>Iniciar sesión</a>" +
            "</div>" +
            "<p>Si encuentras algún problema al acceder a tu cuenta, no dudes en contactarnos. Estamos aquí para ayudarte.</p>" +
            "<p>Nos vemos pronto,</p>" +
            "<p>Tu equipo de <span style='color: #008000;'>Digital</span> <span style='color: #00008B;'>Booking</span></p>" +
            "</body>" +
            "</html>";

    @Override
    public void sendEmailValidateAccount(String to, String subject, String username, String activationUrl)  {
        MimeMessage msg = emailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(msg, false, "utf-8");
            String htmlMsg = String.format(templateHtmlValidateAccountMail, username, activationUrl);
            msg.setContent(htmlMsg, "text/html");
            helper.setTo(to);
            helper.setFrom("digitalhouse.dh123@gmail.com");
            helper.setSubject(subject);
        } catch (MessagingException e) {
            //throw new RuntimeException(e);
        }
        emailSender.send(msg);
    }

    @Override
    public void sendEmailAccountActivate(String email, String subject, String name, String urlValidation) {
        MimeMessage msg = emailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(msg, false, "utf-8");
            String htmlMsg = String.format(templateHtmlAccountAvailableMail, name,email, urlValidation);
            msg.setContent(htmlMsg, "text/html");
            helper.setTo(email);
            helper.setFrom("digitalhouse.dh123@gmail.com");
            helper.setSubject(subject);
        } catch (MessagingException e) {
            //throw new RuntimeException(e);
        }
        emailSender.send(msg);
    }
}
