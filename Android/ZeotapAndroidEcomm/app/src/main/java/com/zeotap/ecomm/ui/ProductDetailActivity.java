package com.zeotap.ecomm.ui;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.zeotap.collect.Collect;
import com.zeotap.ecomm.R;
import com.zeotap.ecomm.data.Product;
import com.zeotap.ecomm.data.ProductData;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * Displays detailed information about a single product.
 *
 * Zeotap SDK integration:
 * - Tracks page view with setPageProperties for product detail screen
 * - Tracks "Product Viewed" event with full product details
 * - Tracks "Product Added to Cart" event on add to cart click
 * - Tracks "Purchase Initiated" event on buy now click
 */
public class ProductDetailActivity extends AppCompatActivity {

    private static final String TAG = "ProductDetailActivity";
    private Product product;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setNavigationOnClickListener(v -> onBackPressed());

        String productId = getIntent().getStringExtra("product_id");
        product = ProductData.getProductById(productId);

        if (product == null) {
            Toast.makeText(this, "Product not found", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        toolbar.setTitle(product.getName());
        bindProductData();
        setupButtons();
        trackProductView();
    }

    private void bindProductData() {
        TextView tvProductIcon = findViewById(R.id.tvProductIcon);
        TextView tvBrand = findViewById(R.id.tvBrand);
        TextView tvProductName = findViewById(R.id.tvProductName);
        TextView tvPrice = findViewById(R.id.tvPrice);
        TextView tvRating = findViewById(R.id.tvRating);
        TextView tvStockStatus = findViewById(R.id.tvStockStatus);
        TextView tvDescription = findViewById(R.id.tvDescription);

        String icon = getIconForCategory(product.getCategoryId());
        tvProductIcon.setText(icon);
        tvBrand.setText(product.getBrand());
        tvProductName.setText(product.getName());
        tvPrice.setText(String.format(Locale.US, "$%.2f", product.getPrice()));
        tvRating.setText(String.format(Locale.US, "\u2B50 %.1f", product.getRating()));

        if (product.isInStock()) {
            tvStockStatus.setText("In Stock");
            tvStockStatus.setTextColor(ContextCompat.getColor(this, R.color.green));
        } else {
            tvStockStatus.setText("Out of Stock");
            tvStockStatus.setTextColor(ContextCompat.getColor(this, R.color.red));
        }

        tvDescription.setText(product.getDescription());
    }

    private void setupButtons() {
        MaterialButton btnAddToCart = findViewById(R.id.btnAddToCart);
        MaterialButton btnBuyNow = findViewById(R.id.btnBuyNow);

        btnAddToCart.setOnClickListener(v -> {
            // Zeotap SDK: Track add to cart event
            try {
                Map<String, Object> eventProps = new HashMap<>();
                eventProps.put("product_id", product.getId());
                eventProps.put("product_name", product.getName());
                eventProps.put("category", product.getCategory());
                eventProps.put("price", product.getPrice());
                eventProps.put("brand", product.getBrand());
                eventProps.put("currency", "USD");

                Collect.getInstance().setEventProperties("Product Added to Cart", eventProps, response -> {
                    Log.d(TAG, "Add to cart event tracked: " + response);
                });
            } catch (Exception e) {
                Log.e(TAG, "Error tracking add to cart event", e);
            }

            Toast.makeText(this, product.getName() + " added to cart", Toast.LENGTH_SHORT).show();
        });

        btnBuyNow.setOnClickListener(v -> {
            // Zeotap SDK: Track purchase initiated event
            try {
                Map<String, Object> eventProps = new HashMap<>();
                eventProps.put("product_id", product.getId());
                eventProps.put("product_name", product.getName());
                eventProps.put("category", product.getCategory());
                eventProps.put("price", product.getPrice());
                eventProps.put("brand", product.getBrand());
                eventProps.put("currency", "USD");
                eventProps.put("payment_method", "direct_buy");

                Collect.getInstance().setEventProperties("Purchase Initiated", eventProps, response -> {
                    Log.d(TAG, "Purchase event tracked: " + response);
                });
            } catch (Exception e) {
                Log.e(TAG, "Error tracking purchase event", e);
            }

            Toast.makeText(this, "Purchase initiated for " + product.getName(), Toast.LENGTH_SHORT).show();
        });
    }

    private void trackProductView() {
        // Zeotap SDK: Track page view
        try {
            Map<String, Object> pageProperties = new HashMap<>();
            pageProperties.put("name", "Product Detail");
            pageProperties.put("category", product.getCategory());
            pageProperties.put("product_id", product.getId());

            Collect.getInstance().setPageProperties(pageProperties, response -> {
                Log.d(TAG, "Page properties set: " + response);
            });
        } catch (Exception e) {
            Log.e(TAG, "Error setting page properties", e);
        }

        // Zeotap SDK: Track product viewed event
        try {
            Map<String, Object> eventProps = new HashMap<>();
            eventProps.put("product_id", product.getId());
            eventProps.put("product_name", product.getName());
            eventProps.put("category", product.getCategory());
            eventProps.put("price", product.getPrice());
            eventProps.put("brand", product.getBrand());
            eventProps.put("currency", "USD");
            eventProps.put("in_stock", product.isInStock());
            eventProps.put("rating", product.getRating());

            Collect.getInstance().setEventProperties("Product Viewed", eventProps, response -> {
                Log.d(TAG, "Product view event tracked: " + response);
            });
        } catch (Exception e) {
            Log.e(TAG, "Error tracking product view event", e);
        }
    }

    private String getIconForCategory(String categoryId) {
        switch (categoryId) {
            case "electronics": return "\uD83D\uDCF1";
            case "clothing": return "\uD83D\uDC55";
            case "books": return "\uD83D\uDCDA";
            case "home": return "\uD83C\uDFE0";
            case "sports": return "\u26BD";
            case "beauty": return "\uD83D\uDC84";
            default: return "\uD83D\uDCE6";
        }
    }
}
