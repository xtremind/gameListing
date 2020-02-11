package fr.xtremind.game.crawler.steps.gamecrawler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.batch.item.ItemReader;

import fr.xtremind.game.crawler.domain.Console;


public class Reader implements ItemReader<Console> {

	private int nextConsoleIndex = 0;
	private List<Console> consoles = new ArrayList<Console>();
	
	public Reader(String requiredProperty) {
		System.out.println("construct " + requiredProperty);
		this.consoles = Arrays.asList(requiredProperty.split(",")).stream().map(s -> convertTo(s)).collect(Collectors.toList());
	}

	@Override
	public Console read() {
		return nextConsoleIndex < consoles.size() ? consoles.get(nextConsoleIndex++) :  null;
	}

	private Console convertTo(String consoleName) {
		return new Console("pal", consoleName);
	}

}