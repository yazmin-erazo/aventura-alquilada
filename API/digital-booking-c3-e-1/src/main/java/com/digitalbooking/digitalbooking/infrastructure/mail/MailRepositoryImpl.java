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

    private final String templateHtmlValidateAccountMail = "<html>"
            + "<body>"
            + "<p>Hola %s,</p>"
            + "<p>Gracias por registrarte. ¡Estamos emocionados de tenerte como parte de nuestra comunidad!</p>"
            + "<p>Para activar tu cuenta, por favor haz clic en el botón a continuación:</p>"
            + "<p><a href='%s' style='padding:10px; background-color: #ADD8E6; color: #006400; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;'>Activar Cuenta</a></p>"
            + "<p>Si no activas tu cuenta dentro de las próximas 48 horas, el sistema desactivará tu cuenta y necesitarás registrarte de nuevo para usar el sitio.</p>"
            + "<p>Saludos,</p>"
            + "<p>El equipo de Digital Booking</p>"
            + "</body>"
            + "</html>";

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
}
