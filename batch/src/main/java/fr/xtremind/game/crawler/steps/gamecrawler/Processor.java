package fr.xtremind.game.crawler.steps.gamecrawler;

import java.util.List;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import fr.xtremind.game.crawler.domain.Console;
import fr.xtremind.game.crawler.domain.Game;
import fr.xtremind.game.crawler.domain.GameDTO;

public class Processor implements ItemProcessor<Console, Console> {

    private final String apiUrl;
	private final RestTemplate restTemplate;

	private Integer nextCursor;
	
	public Processor(String requiredProperty, RestTemplate restTemplate) {
		System.out.println("construct " + requiredProperty);
		this.apiUrl = requiredProperty;
		this.restTemplate = restTemplate;
	}

	@Override
	public Console process(Console console) {
		this.nextCursor = 0;
		//System.out.println("********* index " + String.format(apiUrl, console.toString(), this.nextCursor));
		while (this.nextCursor != null) {
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
