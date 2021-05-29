package com.hoaxify.ws.tweety;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@Service
public class TweetyService {
	
	TweetyRepository tweetyRepository;
	UserService userService;
	
	public TweetyService(TweetyRepository tweetyRepository, UserService userService) {
		super();
		this.tweetyRepository = tweetyRepository;
		this.userService = userService;
	}

	public void save(Tweety tweety, User user) {
		tweety.setTimestamp(new Date());
		tweety.setUser(user);
		tweetyRepository.save(tweety);
	}

	public Page<Tweety> getTweeties(Pageable page) {
		return tweetyRepository.findAll(page);
	}

	public Page<Tweety> getTweetiesOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return tweetyRepository.findByUser(inDB, page);
	}

}
