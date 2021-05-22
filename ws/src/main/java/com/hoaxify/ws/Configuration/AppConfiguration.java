package com.hoaxify.ws.Configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "tweety")
public class AppConfiguration {

	private String uploadPath;
}
