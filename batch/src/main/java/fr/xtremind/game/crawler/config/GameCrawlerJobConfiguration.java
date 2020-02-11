package fr.xtremind.game.crawler.config;

import java.util.Arrays;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import fr.xtremind.game.crawler.domain.Console;
import fr.xtremind.game.crawler.listener.JobCompletionListener;

@Configuration
@EnableBatchProcessing
public class GameCrawlerJobConfiguration {

	private static final String PROPERTY_REST_API_URL = "rest.api.url";
	private static final String PROPERTY_CONSOLE_LIST = "console.list";

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
    public StepBuilderFactory stepBuilderFactory;

	@Autowired
	public Environment environment;
	
	@Bean
	public RestTemplate restTemplate() {
		RestTemplate restTemplate = new RestTemplate();
		MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
		mappingJackson2HttpMessageConverter.setSupportedMediaTypes(Arrays.asList(MediaType.ALL));
		restTemplate.getMessageConverters().add(mappingJackson2HttpMessageConverter);

		return restTemplate;
	}

    @Bean
    ItemReader<Console> gameReader() {
        return new fr.xtremind.game.crawler.steps.gamecrawler.Reader(environment.getRequiredProperty(PROPERTY_CONSOLE_LIST));
    }

    @Bean
    ItemProcessor<Console, Console> gameProcessor() {
        return new fr.xtremind.game.crawler.steps.gamecrawler.Processor(environment.getRequiredProperty(PROPERTY_REST_API_URL), restTemplate());
    }

    @Bean
    ItemWriter<Console> gameWriter() {
        return new fr.xtremind.game.crawler.steps.gamecrawler.Writer();
    }

    @Bean
	public Job processJob() {
		return jobBuilderFactory.get("processJob")
				.incrementer(new RunIdIncrementer())
				.listener(listener())
				.flow(step1())
				.end()
				.build();
	}

	@Bean
	public Step step1() {
		return stepBuilderFactory.get("step1").<Console, Console> chunk(1)
				.reader(gameReader())
				.processor(gameProcessor())
				.writer(gameWriter())
				.build();
	}

	@Bean
	public JobExecutionListener listener() {
		return new JobCompletionListener();
	}
}