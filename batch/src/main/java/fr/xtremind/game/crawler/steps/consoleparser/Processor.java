package fr.xtremind.game.crawler.steps.consoleparser;

import org.springframework.batch.item.ItemProcessor;

import fr.xtremind.game.crawler.domain.Game;

public class Processor implements ItemProcessor<Game, String> {

	@Override
	public String process(Game data) throws Exception {
		System.out.println("process " + data.toString());
		return data.toString().toUpperCase();
	}

}
