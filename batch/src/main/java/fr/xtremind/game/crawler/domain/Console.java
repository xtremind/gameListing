package fr.xtremind.game.crawler.domain;

import java.util.ArrayList;
import java.util.List;

public class Console {

    String version;
    String name;
    List<Game> games;

    public Console (String version, String name) {
        this.version = version;
        this.name = name;
    }

    public List<Game> getGames() {
        if(games == null) {
            games = new ArrayList<Game>();
        }
        return games;
    }

    @Override
    public String toString(){
        return this.version +"-"+ this.name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}