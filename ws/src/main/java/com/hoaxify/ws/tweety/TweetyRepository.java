package com.hoaxify.ws.tweety;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.hoaxify.ws.user.User;

public interface TweetyRepository extends JpaRepository<Tweety, Long>, JpaSpecificationExecutor<Tweety> {

	Page<Tweety> findByUser(User user, Pageable page);
	
}
