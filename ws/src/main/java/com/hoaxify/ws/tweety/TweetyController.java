package com.hoaxify.ws.tweety;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.tweety.vm.TweetyVM;
import com.hoaxify.ws.user.User;

@RestController
@RequestMapping("/api/1.0")
public class TweetyController {

	@Autowired
	TweetyService tweetyService;
	
	@PostMapping("/tweeties")
	GenericResponse saveTweety(@Valid @RequestBody Tweety tweety, @CurrentUser User user) {
		tweetyService.save(tweety, user);
		return new GenericResponse("Tweety is saved");
	}
	
	@GetMapping("/tweeties")
	Page<TweetyVM> getTweeties(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return tweetyService.getTweeties(page).map(TweetyVM::new);
	}
	
	@GetMapping("/users/{username}/tweeties")
	Page<TweetyVM> getUserTweeties(@PathVariable String username, @PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return tweetyService.getTweetiesOfUser(username, page).map(TweetyVM::new);
	}
	
}
