package fr.xtremind.game.crawler.config;

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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.client.RestTemplate;

import fr.xtremind.game.crawler.domain.Game;
import fr.xtremind.game.crawler.listener.JobCompletionListener;
import fr.xtremind.game.crawler.step.Processor;
import fr.xtremind.game.crawler.step.Reader;
import fr.xtremind.game.crawler.step.Writer;

@Configuration
@EnableBatchProcessing
public class GameCrawlerJobConfiguration {

	private static final String PROPERTY_REST_API_URL = "rest.api.url";
	
	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Bean
    ItemReader<Game> gameReader(Environment environment, RestTemplate restTemplate) {
        return new Reader(environment.getRequiredProperty(PROPERTY_REST_API_URL), restTemplate);
    }

    @Bean
    ItemProcessor<Game, String> gameProcessor() {
        return new Processor();
    }

    @Bean
    ItemWriter<String> gameWriter() {
        return new Writer();
    }

    @Bean
	public Job processJob(JobBuilderFactory jobBuilderFactory, @Qualifier("orderStep1") Step orderStep1) {
		return jobBuilderFactory.get("processJob")
				.incrementer(new RunIdIncrementer())
				.listener(listener())
				.flow(orderStep1)
				.end()
				.build();
	}

	@Bean
	public Step orderStep1(ItemReader<Game> gameReader,
							ItemProcessor<Game, String> gameProcessor,
							ItemWriter<String> gameWriter,
							StepBuilderFactory stepBuilderFactory) {
		return stepBuilderFactory.get("orderStep1").<Game, String> chunk(1)
				.reader(gameReader)
				.processor(gameProcessor)
				.writer(gameWriter)
				.build();
	}

	@Bean
	public JobExecutionListener listener() {
		return new JobCompletionListener();
	}
}