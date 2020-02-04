package fr.xtremind.game.crawler.step;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.web.client.RestTemplate;

public class Reader implements ItemReader<String> {

	private String[] messages = { "javainuse.com",
			"Welcome to Spring Batch Example",
			"We use H2 Database for this example" };

	private int count = 0;

	public Reader(String requiredProperty, RestTemplate restTemplate) {
		System.out.println("construct " + requiredProperty);
	}

	@Override
	public String read() throws Exception, UnexpectedInputException,
			ParseException, NonTransientResourceException {

		String message = null;
		if (count < messages.length) {
			message = messages[count++];
			System.out.println("read " + message);
			return message;
		} else {
			count = 0;
		}
		return message;
	}

}