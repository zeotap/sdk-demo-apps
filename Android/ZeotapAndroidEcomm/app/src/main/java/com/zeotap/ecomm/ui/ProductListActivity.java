package com.zeotap.ecomm.ui;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.appbar.MaterialToolbar;
import com.zeotap.collect.Collect;
import com.zeotap.ecomm.R;
import com.zeotap.ecomm.adapter.ProductAdapter;
import com.zeotap.ecomm.data.Product;
import com.zeotap.ecomm.data.ProductData;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Displays list of products for a selected category.
 *
 * Zeotap SDK integration:
 * - Tracks page view with setPageProperties for this product list screen
 * - Tracks "Product List Viewed" event with category info
 * - Tracks "Product Clicked" event when a product is selected
 */
public class ProductListActivity extends AppCompatActivity implements ProductAdapter.OnProductClickListener {

    private static final String TAG = "ProductListActivity";
    private String categoryId;
    private String categoryName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);

        categoryId = getIntent().getStringExtra("category_id");
        categoryName = getIntent().getStringExtra("category_name");

        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle(categoryName != null ? categoryName : "Products");
        toolbar.setNavigationOnClickListener(v -> onBackPressed());

        List<Product> products = ProductData.getProductsByCategory(categoryId);

        RecyclerView rvProducts = findViewById(R.id.rvProducts);
        rvProducts.setLayoutManager(new LinearLayoutManager(this));
        rvProducts.setAdapter(new ProductAdapter(products, this));

        // Zeotap SDK: Track page view
        try {
            Map<String, Object> pageProperties = new HashMap<>();
            pageProperties.put("name", "Product List");
            pageProperties.put("category", categoryName);

            Collect.getInstance().setPageProperties(pageProperties, response -> {
                Log.d(TAG, "Page properties set: " + response);
            });
        } catch (Exception e) {
            Log.e(TAG, "Error setting page properties", e);
        }

        // Zeotap SDK: Track product list view event
        try {
            Map<String, Object> eventProps = new HashMap<>();
            eventProps.put("category_id", categoryId);
            eventProps.put("category_name", categoryName);
            eventProps.put("product_count", products.size());

            Collect.getInstance().setEventProperties("Product List Viewed", eventProps, response -> {
                Log.d(TAG, "Product list event tracked: " + response);
            });
        } catch (Exception e) {
            Log.e(TAG, "Error tracking product list event", e);
        }
    }

    @Override
    public void onProductClick(Product product) {
        // Zeotap SDK: Track product click event
        try {
            Map<String, Object> eventProps = new HashMap<>();
            eventProps.put("product_id", product.getId());
            eventProps.put("product_name", product.getName());
            eventProps.put("category", product.getCategory());
            eventProps.put("price", product.getPrice());
            eventProps.put("brand", product.getBrand());

            Collect.getInstance().setEventProperties("Product Clicked", eventProps, response -> {
                Log.d(TAG, "Product click event tracked: " + response);
            });
        } catch (Exception e) {
            Log.e(TAG, "Error tracking product click event", e);
        }

        Intent intent = new Intent(this, ProductDetailActivity.class);
        intent.putExtra("product_id", product.getId());
        startActivity(intent);
    }
}
