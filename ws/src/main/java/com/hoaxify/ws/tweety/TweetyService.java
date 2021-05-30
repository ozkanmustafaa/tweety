package com.hoaxify.ws.tweety;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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

	public Page<Tweety> getOldTweeties(long id, String username, Pageable page) {
		Specification<Tweety> specification = idLessThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		
		return tweetyRepository.findAll(specification, page);		
	}

	public long getNewTweetiesCount(long id, String username) {
		Specification<Tweety> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return tweetyRepository.count(specification);
	}

	public List<Tweety> getNewTweeties(long id, String username, Sort sort) {
		Specification<Tweety> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return tweetyRepository.findAll(specification, sort);
	}
	
	Specification<Tweety> idLessThan(long id){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.lessThan(root.get("id"), id);
		};
	}
	
	Specification<Tweety> userIs(User user){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};
	}
	
	Specification<Tweety> idGreaterThan(long id){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.greaterThan(root.get("id"), id);
		};
	}
}
