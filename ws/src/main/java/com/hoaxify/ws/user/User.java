package com.hoaxify.ws.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.*;
import lombok.Data;

@Data
@Entity
public class User {

	@Id
	@GeneratedValue
	private long id;
	
	@NotNull(message = "{hoaxify.constraint.username.Notnull.message}")
	@Size(min = 4, max = 255)
	@UniqueUsername
	private String username;
	
	@NotNull
	@Size(min = 4, max = 255)
	private String displayName;
	
	@NotNull 
	@Size(min = 8, max = 255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constraint.password.Pattern.message}")
	private String password;
	
}
