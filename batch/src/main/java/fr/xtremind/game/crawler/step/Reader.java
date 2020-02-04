package fr.xtremind.game.crawler.step;

import java.util.ArrayList;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import fr.xtremind.game.crawler.domain.GameDTO;
import fr.xtremind.game.crawler.domain.Game;

public class Reader implements ItemReader<Game> {

    private final String apiUrl;
	private final RestTemplate restTemplate;

	private int nextGameIndex;
	private int nextCursor;
	private List<Game> gameData = new ArrayList<Game>();
	
	public Reader(String requiredProperty, RestTemplate restTemplate) {
		System.out.println("construct " + requiredProperty);
		this.apiUrl = requiredProperty;
		this.restTemplate = restTemplate;
	}

	@Override
	public Game read() throws Exception, UnexpectedInputException,
			ParseException, NonTransientResourceException {
		
		if (gameDataIsNotInitialized() || (nextGameIndex == nextCursor)){
			//gameData = fetchGameDTOFromAPI();
			gameData.addAll(fetchGameDTOFromAPI());
		}

		Game game = null;

		/*if(nextGameIndex == nextCursor){
			gameData.addAll(fetchGameDTOFromAPI());
		} */
		
		if (nextGameIndex < gameData.size()) {
            game = gameData.get(nextGameIndex);
            nextGameIndex++;
			//System.out.println("********* index " + nextGameIndex);
        }
 
        return game;
	}

	private boolean gameDataIsNotInitialized(){
		return this.gameData == null;
	}

	private List<Game> fetchGameDTOFromAPI(){
		ResponseEntity<GameDTO> response = restTemplate.getForEntity(
            apiUrl + this.nextCursor, 
            GameDTO.class
        );
		GameDTO gameDTO = response.getBody();
		if (gameDTO.getCursor() != null){
			this.nextCursor = Integer.parseInt(gameDTO.getCursor());
		} else {
			this.nextCursor = 0;
		}
        return gameDTO.getProducts();
	}

}