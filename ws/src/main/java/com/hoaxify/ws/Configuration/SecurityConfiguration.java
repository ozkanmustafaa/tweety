package com.hoaxify.ws.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserAuthService userAuthService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		// Cross Site Request Forgery
		http.csrf().disable();
		http.headers().frameOptions().disable();
		
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
