package com.hoaxify.ws.tweety;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.GenericResponse;

@RestController
@RequestMapping("/api/1.0")
public class TweetyController {

	@Autowired
	TweetyService tweetyService;
	
	@PostMapping("/tweeties")
	GenericResponse saveTweety(@Valid @RequestBody Tweety tweety) {
		tweetyService.save(tweety);
		return new GenericResponse("Tweety is saved");
	}
	
	@GetMapping("/tweeties")
	Page<Tweety> getTweeties(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return tweetyService.getTweeties(page);
	}
	
	
}
