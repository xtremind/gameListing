package fr.xtremind.game.crawler.steps.gamecrawler;

import java.util.List;

import org.springframework.batch.item.ItemWriter;

import fr.xtremind.game.crawler.domain.Console;

public class Writer implements ItemWriter<Console> {

	@Override
	public void write(List<? extends Console> messages) throws Exception {
		for (Console msg : messages) {
				System.out.println("write " + msg.toString());
		}
	}

}