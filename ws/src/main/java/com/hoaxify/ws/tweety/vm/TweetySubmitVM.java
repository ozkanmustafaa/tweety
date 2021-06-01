package com.hoaxify.ws.tweety.vm;

import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class TweetySubmitVM {

	@Size(min = 1, max = 1000)
	private String content;
	
	private long attachmentId;
	
}
