package com.zeotap.ecomm.data;

import com.zeotap.ecomm.R;

import java.util.ArrayList;
import java.util.List;

public class ProductData {

    public static List<Category> getCategories() {
        List<Category> categories = new ArrayList<>();
        categories.add(new Category("electronics", "Electronics", "\uD83D\uDCF1", R.color.category_electronics));
        categories.add(new Category("clothing", "Clothing", "\uD83D\uDC55", R.color.category_clothing));
        categories.add(new Category("books", "Books", "\uD83D\uDCDA", R.color.category_books));
        categories.add(new Category("home", "Home & Kitchen", "\uD83C\uDFE0", R.color.category_home));
        categories.add(new Category("sports", "Sports", "\u26BD", R.color.category_sports));
        categories.add(new Category("beauty", "Beauty", "\uD83D\uDC84", R.color.category_beauty));
        return categories;
    }

    public static List<Product> getProductsByCategory(String categoryId) {
        List<Product> allProducts = getAllProducts();
        List<Product> filtered = new ArrayList<>();
        for (Product p : allProducts) {
            if (p.getCategoryId().equals(categoryId)) {
                filtered.add(p);
            }
        }
        return filtered;
    }

    public static Product getProductById(String productId) {
        for (Product p : getAllProducts()) {
            if (p.getId().equals(productId)) {
                return p;
            }
        }
        return null;
    }

    private static List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();

        // Electronics
        products.add(new Product("E001", "Wireless Bluetooth Headphones", "electronics", "Electronics",
                79.99, "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design. Features Bluetooth 5.0 connectivity and built-in microphone for calls.",
                "SoundMax", 4.5f, true));
        products.add(new Product("E002", "Smartphone 128GB", "electronics", "Electronics",
                699.99, "Latest flagship smartphone with 6.7\" AMOLED display, 128GB storage, 48MP triple camera system, and 5G connectivity. Powered by the newest processor for lightning-fast performance.",
                "TechPro", 4.7f, true));
        products.add(new Product("E003", "Laptop 15.6\" i7", "electronics", "Electronics",
                1099.99, "Powerful laptop with Intel i7 processor, 16GB RAM, 512GB SSD, and dedicated graphics card. Perfect for work and entertainment with a stunning Full HD display.",
                "CompuTech", 4.3f, true));
        products.add(new Product("E004", "Smart Watch", "electronics", "Electronics",
                249.99, "Feature-packed smartwatch with heart rate monitor, GPS tracking, sleep analysis, and 7-day battery life. Water-resistant and compatible with both Android and iOS.",
                "FitGear", 4.4f, true));
        products.add(new Product("E005", "Wireless Earbuds", "electronics", "Electronics",
                49.99, "Compact true wireless earbuds with rich bass, 24-hour total battery life with charging case, and IPX5 water resistance. Touch controls and voice assistant support.",
                "SoundMax", 4.2f, false));

        // Clothing
        products.add(new Product("C001", "Men's Casual T-Shirt", "clothing", "Clothing",
                24.99, "Comfortable cotton crew neck t-shirt available in multiple colors. Pre-shrunk fabric with reinforced stitching for long-lasting wear. Machine washable.",
                "UrbanWear", 4.1f, true));
        products.add(new Product("C002", "Women's Running Shoes", "clothing", "Clothing",
                89.99, "Lightweight running shoes with responsive cushioning and breathable mesh upper. Features a durable rubber outsole for excellent traction on various surfaces.",
                "SpeedFit", 4.6f, true));
        products.add(new Product("C003", "Denim Jacket", "clothing", "Clothing",
                64.99, "Classic denim jacket with a modern fit. Features button closure, chest pockets, and adjustable waist tabs. Made from premium washed denim for a vintage look.",
                "DenimCo", 4.3f, true));
        products.add(new Product("C004", "Winter Puffer Jacket", "clothing", "Clothing",
                129.99, "Warm insulated puffer jacket with water-resistant shell. Features a detachable hood, multiple zip pockets, and elastic cuffs. Ideal for cold weather.",
                "NorthStyle", 4.5f, false));

        // Books
        products.add(new Product("B001", "The Art of Programming", "books", "Books",
                39.99, "Comprehensive guide to modern programming techniques and best practices. Covers algorithms, data structures, and software design patterns with practical examples.",
                "TechPress", 4.8f, true));
        products.add(new Product("B002", "Data Science Handbook", "books", "Books",
                44.99, "Essential handbook for aspiring data scientists. Covers statistics, machine learning, data visualization, and Python programming with hands-on projects.",
                "LearnPublish", 4.6f, true));
        products.add(new Product("B003", "Digital Marketing Guide", "books", "Books",
                29.99, "Complete guide to digital marketing strategies including SEO, social media marketing, content marketing, and analytics. Updated with the latest trends and tools.",
                "BizBooks", 4.2f, true));
        products.add(new Product("B004", "Leadership Principles", "books", "Books",
                19.99, "Timeless leadership principles from successful business leaders. Learn how to inspire teams, make strategic decisions, and drive organizational growth.",
                "ExecReads", 4.4f, true));

        // Home & Kitchen
        products.add(new Product("H001", "Coffee Maker", "home", "Home & Kitchen",
                59.99, "Programmable 12-cup coffee maker with thermal carafe to keep coffee hot for hours. Features auto-brew, adjustable strength, and a built-in grinder.",
                "BrewMaster", 4.3f, true));
        products.add(new Product("H002", "Air Purifier", "home", "Home & Kitchen",
                149.99, "HEPA air purifier for rooms up to 500 sq ft. Removes 99.97% of allergens, dust, and pollutants. Features quiet operation mode and air quality indicator.",
                "CleanAir", 4.5f, true));
        products.add(new Product("H003", "Non-Stick Cookware Set", "home", "Home & Kitchen",
                89.99, "10-piece non-stick cookware set including pots, pans, and utensils. Dishwasher safe with heat-resistant handles. Even heat distribution for perfect cooking.",
                "ChefPro", 4.1f, true));
        products.add(new Product("H004", "Robot Vacuum Cleaner", "home", "Home & Kitchen",
                299.99, "Smart robot vacuum with LiDAR navigation, automatic dirt disposal, and app control. Works on all floor types with 150-minute runtime.",
                "CleanBot", 4.6f, false));

        // Sports
        products.add(new Product("S001", "Yoga Mat", "sports", "Sports",
                29.99, "Extra thick 6mm yoga mat with non-slip surface. Made from eco-friendly TPE material. Lightweight and includes carrying strap for easy transport.",
                "FlexFit", 4.4f, true));
        products.add(new Product("S002", "Resistance Bands Set", "sports", "Sports",
                19.99, "Set of 5 resistance bands with varying resistance levels. Includes door anchor, handles, and ankle straps. Perfect for home workouts and physical therapy.",
                "PowerBand", 4.3f, true));
        products.add(new Product("S003", "Basketball", "sports", "Sports",
                34.99, "Official size and weight basketball with deep channel design for superior grip. Indoor/outdoor composite leather construction for all-surface play.",
                "SlamDunk", 4.5f, true));
        products.add(new Product("S004", "Adjustable Dumbbells", "sports", "Sports",
                199.99, "Adjustable dumbbell set from 5 to 52.5 lbs. Quick-change weight selection mechanism replaces 15 sets of dumbbells. Space-saving design.",
                "IronFlex", 4.7f, true));

        // Beauty
        products.add(new Product("BT001", "Vitamin C Serum", "beauty", "Beauty",
                28.99, "Brightening vitamin C serum with hyaluronic acid and vitamin E. Helps reduce dark spots, fine lines, and uneven skin tone. Suitable for all skin types.",
                "GlowSkin", 4.5f, true));
        products.add(new Product("BT002", "Hair Care Set", "beauty", "Beauty",
                42.99, "Complete hair care set with shampoo, conditioner, and hair mask. Formulated with argan oil and keratin for smooth, shiny, and healthy-looking hair.",
                "SilkHair", 4.3f, true));
        products.add(new Product("BT003", "Facial Moisturizer SPF 30", "beauty", "Beauty",
                34.99, "Daily moisturizer with SPF 30 sun protection. Lightweight, non-greasy formula with hyaluronic acid for all-day hydration and UV protection.",
                "DermaCare", 4.6f, true));
        products.add(new Product("BT004", "Perfume Eau de Parfum", "beauty", "Beauty",
                74.99, "Elegant floral fragrance with notes of jasmine, rose, and sandalwood. Long-lasting eau de parfum in a beautifully designed 100ml bottle.",
                "LuxScent", 4.4f, true));

        return products;
    }
}
