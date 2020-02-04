package fr.xtremind.game.crawler.domain;

import java.util.ArrayList;
import java.util.List;

public class GameDTO{

    String cursor;
    List<Game> products;

    public GameDTO(){
        this.cursor = null;
        this.products = new ArrayList<Game>();
    }

	public String getCursor() {
		return cursor;
	}

	public void setCursor(String cursor) {
		this.cursor = cursor;
	}

	public List<Game> getProducts() {
        if (this.products == null) {
            this.products = new ArrayList<Game>();
        }
		return this.products;
	}

}