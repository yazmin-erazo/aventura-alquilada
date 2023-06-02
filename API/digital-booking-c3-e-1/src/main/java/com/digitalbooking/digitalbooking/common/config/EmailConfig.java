package com.digitalbooking.digitalbooking.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfig {
    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("digitalhouse.dh123@gmail.com");
        mailSender.setPassword("lwbuuozyrmxhncyl");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }


    @Bean
    public String templateHtmlValidateAccountMail() {
        return "<html>"
                + "<body>"
                + "<p>Hola %s,</p>"
                + "<p>Gracias por registrarte. ¡Estamos emocionados de tenerte como parte de nuestra comunidad!</p>"
                + "<p>Para activar tu cuenta, por favor haz clic en el botón a continuación:</p>"
                + "<p><a href='%s' style='padding:10px; background-color: #4CAF50; color: white; text-align: center; text-decoration: none; display: inline-block;'>Activar Cuenta</a></p>"
                + "<p>Si no activas tu cuenta dentro de las próximas 48 horas, el sistema desactivará tu cuenta y necesitarás registrarte de nuevo para usar el sitio.</p>"
                + "<p>Saludos,</p>"
                + "<p>El equipo de [Tu Compañía]</p>"
                + "</body>"
                + "</html>";
    }

}
