package fr.xtremind.game.crawler.steps.consoleparser;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import fr.xtremind.game.crawler.domain.Game;

public class Reader implements ItemReader<Game> {

	int first = 0; 

	public Reader() {
	}

	@Override
	public Game read() throws Exception, UnexpectedInputException,
			ParseException, NonTransientResourceException {
				System.out.println("read " + first);
		if(first++ < 3) {
			return  new Game("consoleUri" + first, true, "id"+ first, "price1", "price2", "price3", "productName", "productUri", true);
		}
        return null;
	}


}