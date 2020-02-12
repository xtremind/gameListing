package fr.xtremind.game.crawler.steps.gamecrawler;

import java.io.IOException;
import java.io.Writer;

import com.google.gson.stream.JsonWriter;

import org.springframework.batch.item.file.FlatFileFooterCallback;
import org.springframework.batch.item.file.FlatFileHeaderCallback;

public class JsonHeaderFooterCallback implements FlatFileFooterCallback, FlatFileHeaderCallback {
	
	private JsonWriter jsonWriter;
	
	//The String to use as a rootnode for the json expected.
	private String rootNode; 	

	@Override	
	public void writeHeader(Writer writer) throws IOException {		
		this.jsonWriter = new JsonWriter(writer);
		jsonWriter.beginObject().name(rootNode).beginArray();		
	}

	@Override
	public void writeFooter(Writer item) throws IOException {
		jsonWriter.endArray().endObject();
		jsonWriter.close();		
	}
	
	public void setRootNode(String rootNode) {
		this.rootNode = rootNode;
	}


}