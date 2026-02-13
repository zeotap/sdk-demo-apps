package com.zeotap.ecomm.data;

import java.io.Serializable;

public class Product implements Serializable {
    private final String id;
    private final String name;
    private final String categoryId;
    private final String category;
    private final double price;
    private final String description;
    private final String brand;
    private final float rating;
    private final boolean inStock;

    public Product(String id, String name, String categoryId, String category,
                   double price, String description, String brand, float rating, boolean inStock) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.category = category;
        this.price = price;
        this.description = description;
        this.brand = brand;
        this.rating = rating;
        this.inStock = inStock;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getCategoryId() { return categoryId; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public String getDescription() { return description; }
    public String getBrand() { return brand; }
    public float getRating() { return rating; }
    public boolean isInStock() { return inStock; }
}
