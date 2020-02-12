package fr.xtremind.game.crawler.steps.gamecrawler;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import fr.xtremind.game.crawler.domain.Console;
import fr.xtremind.game.crawler.domain.Game;
import fr.xtremind.game.crawler.domain.GameDTO;

public class Processor implements ItemProcessor<Console, Console> {

	protected static final Log logger = LogFactory.getLog(Processor.class);
	
    private final String apiUrl;
	private final RestTemplate restTemplate;

	private Integer nextCursor;
	
	public Processor(String requiredProperty, RestTemplate restTemplate) {
		if (logger.isDebugEnabled()) {
			logger.debug("process " + requiredProperty);
		}
		this.apiUrl = requiredProperty;
		this.restTemplate = restTemplate;
	}

	@Override
	public Console process(Console console) {
		this.nextCursor = 0;
		while (this.nextCursor != null) {
			if (logger.isDebugEnabled()) {
				logger.debug("********* index " + String.format(apiUrl, console.toString(), this.nextCursor));
			}
			console.getGames().addAll(fetchGameDTOFromAPI(console));
		}
        return console;
	}

	private List<Game> fetchGameDTOFromAPI(Console console){
		ResponseEntity<GameDTO> response = restTemplate.getForEntity(
            String.format(apiUrl, console.toString(), this.nextCursor),
            GameDTO.class
        );
		GameDTO gameDTO = response.getBody();
		this.nextCursor = gameDTO.getCursor() != null ? Integer.parseInt(gameDTO.getCursor()) : null;
        return gameDTO.getProducts();
	}

}
