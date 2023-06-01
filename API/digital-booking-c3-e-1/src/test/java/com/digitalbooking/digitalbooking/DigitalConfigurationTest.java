package com.digitalbooking.digitalbooking;

import com.digitalbooking.digitalbooking.domain.mail.MailRepository;
import com.digitalbooking.digitalbooking.domain.role.repository.RoleRepository;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import com.digitalbooking.digitalbooking.domain.user.service.ServiceUser;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DigitalConfigurationTest {

    @Bean
    RepositoryUser repositoryUser(){
        return Mockito.mock(RepositoryUser.class);
    }
    @Bean
    MailRepository mailRepository(){
        return Mockito.mock(MailRepository.class);
    }
    @Bean
    RoleRepository roleRepository(){
        return Mockito.mock(RoleRepository.class);
    }
    @Bean
    ServiceUser serviceUser(){
        return new ServiceUser();
    }
}
