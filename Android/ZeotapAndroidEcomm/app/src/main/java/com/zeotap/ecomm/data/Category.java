package com.zeotap.ecomm.data;

public class Category {
    private final String id;
    private final String name;
    private final String icon;
    private final int colorResId;

    public Category(String id, String name, String icon, int colorResId) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.colorResId = colorResId;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getIcon() { return icon; }
    public int getColorResId() { return colorResId; }
}
