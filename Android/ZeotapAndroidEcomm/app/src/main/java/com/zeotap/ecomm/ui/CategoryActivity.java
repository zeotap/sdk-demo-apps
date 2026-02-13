package com.zeotap.ecomm.ui;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.zeotap.collect.Collect;
import com.zeotap.ecomm.R;
import com.zeotap.ecomm.adapter.CategoryAdapter;
import com.zeotap.ecomm.data.Category;
import com.zeotap.ecomm.data.ProductData;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Displays product categories in a grid layout.
 *
 * Zeotap SDK integration:
 * - Tracks page view with setPageProperties when screen loads
 * - Tracks "Category Viewed" event when a category is clicked
 */
public class CategoryActivity extends AppCompatActivity implements CategoryAdapter.OnCategoryClickListener {

    private static final String TAG = "CategoryActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_category);

        List<Category> categories = ProductData.getCategories();

        RecyclerView rvCategories = findViewById(R.id.rvCategories);
        rvCategories.setLayoutManager(new GridLayoutManager(this, 2));
        rvCategories.setAdapter(new CategoryAdapter(categories, this));

        // Zeotap SDK: Track page view
        try {
            Map<String, Object> pageProperties = new HashMap<>();
            pageProperties.put("name", "Categories");
            pageProperties.put("category", "Shopping");

            Collect.getInstance().setPageProperties(pageProperties, response -> {
                Log.d(TAG, "Page properties set: " + response);
            });
        } catch (Exception e) {
            Log.e(TAG, "Error setting page properties", e);
        }

        // Zeotap SDK: Track screen view event
        try {
            Map<String, Object> eventProps = new HashMap<>();
            eventProps.put("screen_name", "Categories");
            eventProps.put("category_count", categories.size());

            Collect.getInstance().setEventProperties("screen_view", eventProps);
        } catch (Exception e) {
            Log.e(TAG, "Error tracking screen view", e);
        }
    }

    @Override
    public void onCategoryClick(Category category) {
        // Zeotap SDK: Track category click event
        try {
            Map<String, Object> eventProps = new HashMap<>();
            eventProps.put("category_id", category.getId());
            eventProps.put("category_name", category.getName());

            Collect.getInstance().setEventProperties("Category Viewed", eventProps, response -> {
                Log.d(TAG, "Category event tracked: " + response);
            });
        } catch (Exception e) {
            Log.e(TAG, "Error tracking category event", e);
        }

        Intent intent = new Intent(this, ProductListActivity.class);
        intent.putExtra("category_id", category.getId());
        intent.putExtra("category_name", category.getName());
        startActivity(intent);
    }
}
