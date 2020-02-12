package fr.xtremind.game.crawler.config;

import java.io.File;
import java.nio.charset.Charset;
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
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import fr.xtremind.game.crawler.domain.Console;
import fr.xtremind.game.crawler.listener.JobCompletionListener;
import fr.xtremind.game.crawler.steps.gamecrawler.JsonFlatFileItemWriter;
import fr.xtremind.game.crawler.steps.gamecrawler.JsonHeaderFooterCallback;
import fr.xtremind.game.crawler.steps.gamecrawler.JsonLineAggregator;
import fr.xtremind.game.crawler.steps.gamecrawler.Processor;
import fr.xtremind.game.crawler.steps.gamecrawler.Reader;

@Configuration
@EnableBatchProcessing
public class GameCrawlerJobConfiguration {

	private static final String PROPERTY_REST_API_URL = "rest.api.url";
	private static final String PROPERTY_CONSOLE_LIST = "console.list";
	private static final String JSON_ROOT_NODE = "consoles";
	private static final String LINE_SEPARATOR = ",";
    public static final Charset UTF_8 = Charset.forName("UTF-8");

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
        return new Reader(environment.getRequiredProperty(PROPERTY_CONSOLE_LIST));
    }

    @Bean
    ItemProcessor<Console, Console> gameProcessor() {
        return new Processor(environment.getRequiredProperty(PROPERTY_REST_API_URL), restTemplate());
    }

    /*@Bean
    ItemWriter<Console> gameWriter() {
        return new Writer();
    }*/

	@Bean
    public ItemWriter<Console> gameWriter() {
        JsonFlatFileItemWriter<Console> writer = new JsonFlatFileItemWriter<Console>();
        
        //Setting header and footer.
        JsonHeaderFooterCallback headerFooterCallBack = new JsonHeaderFooterCallback();
        headerFooterCallBack.setRootNode(JSON_ROOT_NODE);        
        writer.setHeaderCallback(headerFooterCallBack);
        writer.setFooterCallback(headerFooterCallBack);

        writer.setLineSeparator(LINE_SEPARATOR);
        writer.setLineAggregator(new JsonLineAggregator<Console>());       
        
        writer.setResource(new FileSystemResource(System.getProperty("user.dir") + File.separator  + "target/data/sample-output-data.json"));
        writer.setEncoding(UTF_8.name());
       // writer.setAppend(true);
        writer.setShouldDeleteIfExists(true);

        return writer;
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