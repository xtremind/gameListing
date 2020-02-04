package fr.xtremind.game.crawler;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
public class GameCrawlerApplication {
	
	@Bean
	public RestTemplate restTemplate() {
		RestTemplate restTemplate = new RestTemplate();
		MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
		mappingJackson2HttpMessageConverter.setSupportedMediaTypes(Arrays.asList(MediaType.ALL));
		restTemplate.getMessageConverters().add(mappingJackson2HttpMessageConverter);

		return restTemplate;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(GameCrawlerApplication.class, args);
	}

}
