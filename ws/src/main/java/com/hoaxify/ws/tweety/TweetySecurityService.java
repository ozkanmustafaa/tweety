package com.hoaxify.ws.tweety;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.user.User;

@Service
public class TweetySecurityService {
	
	@Autowired
	TweetyRepository tweetyRepository;
	
	public boolean isAllowedToDelete(long id, User loggedInUser) {
		Optional<Tweety> optionalTweety = tweetyRepository.findById(id);
		if (!optionalTweety.isPresent()) {
			return false;
		}
		Tweety tweety = optionalTweety.get();
		if (tweety.getUser().getId() != loggedInUser.getId()) {
			return false;
		}
		return true;
	}

}
