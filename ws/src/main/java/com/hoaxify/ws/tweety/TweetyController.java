package com.hoaxify.ws.tweety;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.GenericResponse;

@RestController
public class TweetyController {

	@Autowired
	TweetyService tweetyService;
	
	@PostMapping("/api/1.0/tweeties")
	GenericResponse saveTweety(@Valid @RequestBody Tweety tweety) {
		tweetyService.save(tweety);
		return new GenericResponse("Tweety is saved");
	}
}
