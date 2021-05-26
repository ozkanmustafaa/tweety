package com.hoaxify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.hoaxify.ws.tweety.Tweety;
import com.hoaxify.ws.tweety.TweetyService;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService, TweetyService tweetyService) {
		return (args) -> {
			for (int i = 1; i <= 25; i++) {
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setPassword("P4ssword");
				userService.save(user);
			}
			for(int i = 1; i <= 50; i++) {
				Tweety tweety = new Tweety();
				tweety.setContent("Tweety - " + i);
				tweetyService.save(tweety);
			}
		};
	}
}
