package com.hoaxify.ws.Configuration;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserAuthService userAuthService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		// Cross Site Request Forgery
		http.csrf().disable();
		
		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());
		
		http // burada sıra önemli. spesifikten genele doğru bir yaklaşım gösterdik. önce permitAll çağırsaydık aşağı doğru ezecekti ve auth yapamayacaktı.
			.authorizeRequests().antMatchers(HttpMethod.POST, "api/1.0/auth").authenticated()
			.and()
			.authorizeRequests().anyRequest().permitAll();
		
		// Security ile ilgili bir session üretmemek için STATELESS kullanıyoruz.
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userAuthService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
