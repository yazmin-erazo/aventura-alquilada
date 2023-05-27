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
            "<p>Hola %s,</p>" +
            "<p>Gracias por registrarte. ¡Estamos emocionados de tenerte como parte de nuestra comunidad!</p>" +
            "<p>Para activar tu cuenta, por favor haz clic en el botón a continuación:</p>" +
            "<p><a href='%s' style='padding:10px; background-color: #2f6304; color: #FFFFFF; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;'>Activar Cuenta</a></p>" +
            "<p>Si no activas tu cuenta dentro de las próximas 48 horas, el sistema desactivará tu cuenta y necesitarás registrarte de nuevo para usar el sitio.</p>" +
            "<p>Saludos,</p>" +
            "<p>El equipo de <span style='color: #008000;'>Digital</span> <span style='color: #00008B;'>Booking</span></p>" +
            "</body>" +
            "</html>";

    private final String templateHtmlAccountAvailableMail = "<html>" +
            "<body style='background-color: #F5F5F5; text-align: center; padding:50px; font-family: Arial, sans-serif;'>" +
            "<p>Hola %s,</p>" +
            "<p>¡Tu cuenta ahora está disponible! Esperamos que disfrutes de nuestra plataforma y descubras todos los beneficios que tenemos para ti.</p>" +
            "<p>Para iniciar sesión, por favor haz clic en el botón a continuación:</p>" +
            "<p>Utilizando el siguiente email: %s</p>" +
            "<div style='margin: 20px 0;'>" +
            "    <a href='%s' style='padding:15px; background-color: #2f6304; color: #FFFFFF; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 18px;'>Iniciar sesión</a>" +
            "</div>" +
            "<p>Si tienes algún problema para acceder a tu cuenta, por favor, no dudes en ponerte en contacto con nosotros.</p>" +
            "<p>Saludos,</p>" +
            "<p>El equipo de <span style='color: #008000;'>Digital</span> <span style='color: #00008B;'>Booking</span></p>" +
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
