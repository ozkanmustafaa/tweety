package com.hoaxify.ws.tweety;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TweetyService {
	
	TweetyRepository tweetyRepository;

	public TweetyService(TweetyRepository tweetyRepository) {
		super();
		this.tweetyRepository = tweetyRepository;
	}

	public void save(Tweety tweety) {
		tweety.setTimestamp(new Date());
		tweetyRepository.save(tweety);
	}

	public Page<Tweety> getTweeties(Pageable page) {
		return tweetyRepository.findAll(page);
	}

}
