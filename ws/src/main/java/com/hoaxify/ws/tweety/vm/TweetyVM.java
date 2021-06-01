package com.hoaxify.ws.tweety.vm;

import com.hoaxify.ws.file.vm.FileAttachmentVM;
import com.hoaxify.ws.tweety.Tweety;
import com.hoaxify.ws.user.vm.UserVM;

import lombok.Data;

@Data
public class TweetyVM {

	private long id;
	
	private String content;
	
	private long timestamp;
	
	private UserVM user;
	
	private FileAttachmentVM fileAttachment;
	
	public TweetyVM(Tweety tweety) {
		this.setId(tweety.getId());
		this.setContent(tweety.getContent());
		this.setTimestamp(tweety.getTimestamp().getTime());
		this.setUser(new UserVM(tweety.getUser()));
		if(tweety.getFileAttachment() != null) {
			this.fileAttachment = new FileAttachmentVM(tweety.getFileAttachment());			
		}
	}
}
