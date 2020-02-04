package fr.xtremind.game.crawler.domain;

public class Game {

    String consoleUri;
    boolean hasProduct;
    String id;
    String price1;
    String price2;
    String price3;
    String productName;
    String productUri;
    boolean wishlistHasProduct;

    public Game() {
    }

    public Game(String consoleUri, boolean hasProduct, String id, String price1, String price2, String price3,
            String productName, String productUri, boolean wishlistHasProduct) {
        this.consoleUri = consoleUri;
        this.hasProduct = hasProduct;
        this.id = id;
        this.price1 = price1;
        this.price2 = price2;
        this.price3 = price3;
        this.productName = productName;
        this.productUri = productUri;
        this.wishlistHasProduct = wishlistHasProduct;
    }

    public String getConsoleUri() {
        return consoleUri;
    }

    public void setConsoleUri(String consoleUri) {
        this.consoleUri = consoleUri;
    }

    public boolean isHasProduct() {
        return hasProduct;
    }

    public void setHasProduct(boolean hasProduct) {
        this.hasProduct = hasProduct;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrice1() {
        return price1;
    }

    public void setPrice1(String price1) {
        this.price1 = price1;
    }

    public String getPrice2() {
        return price2;
    }

    public void setPrice2(String price2) {
        this.price2 = price2;
    }

    public String getPrice3() {
        return price3;
    }

    public void setPrice3(String price3) {
        this.price3 = price3;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductUri() {
        return productUri;
    }

    public void setProductUri(String productUri) {
        this.productUri = productUri;
    }

    public boolean isWishlistHasProduct() {
        return wishlistHasProduct;
    }

    public void setWishlistHasProduct(boolean wishlistHasProduct) {
        this.wishlistHasProduct = wishlistHasProduct;
    }

    @Override
    public String toString() {
        return "Game [consoleUri=" + consoleUri + ", hasProduct=" + hasProduct + ", id=" + id + ", price1=" + price1
                + ", price2=" + price2 + ", price3=" + price3 + ", productName=" + productName + ", productUri="
                + productUri + ", wishlistHasProduct=" + wishlistHasProduct + "]";
    }

}
