package lecle.nanum.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.security.SecureRandom;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {

        /* allow static files */
        web
                .ignoring()
                .antMatchers("/assets/**", "/img/**", "/css/**", "/js/**", "/favicon.ico");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // no cache at all
        http.headers().cacheControl();
        http.csrf().disable();
        http.sessionManagement().disable();

        http
                .authorizeRequests()
                .anyRequest().authenticated()

                .and()
                .anonymous()

                .and()
                .formLogin()
//                .loginPage("/login")
                .defaultSuccessUrl("/", false)
                .permitAll()
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", HttpMethod.GET.name()))
                .logoutSuccessUrl("/")
                .clearAuthentication(true)
                .and()
        ;

    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return (new BCryptPasswordEncoder(12, new SecureRandom("lecle.co.kr-nanum".getBytes())));
    }
}