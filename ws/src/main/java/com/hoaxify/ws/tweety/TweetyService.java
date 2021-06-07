package com.hoaxify.ws.tweety;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.file.FileAttachment;
import com.hoaxify.ws.file.FileAttachmentRepository;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.tweety.vm.TweetySubmitVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@Service
public class TweetyService {
	
	TweetyRepository tweetyRepository;
	UserService userService;
	FileAttachmentRepository fileAttachmentRepository;
	FileService fileService;
	
	public TweetyService(TweetyRepository tweetyRepository, FileAttachmentRepository fileAttachmentRepository, FileService fileService, UserService userService) {
		super();
		this.tweetyRepository = tweetyRepository;
		this.fileAttachmentRepository = fileAttachmentRepository;
		this.fileService = fileService;
		this.userService = userService;
	}

	public void save(TweetySubmitVM tweetySubmitVM, User user) {
		Tweety tweety = new Tweety();
		tweety.setContent(tweetySubmitVM.getContent());
		tweety.setTimestamp(new Date());
		tweety.setUser(user);
		tweetyRepository.save(tweety);
		Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(tweetySubmitVM.getAttachmentId());
		if(optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setTweety(tweety);
			fileAttachmentRepository.save(fileAttachment);
		}
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

	public void delete(long id) {
		Tweety inDB = tweetyRepository.getOne(id);
		if(inDB.getFileAttachment() != null) {
			String fileName = inDB.getFileAttachment().getName();
			fileService.deleteAttachmentFile(fileName);
		}
		tweetyRepository.deleteById(id);
	}
}

