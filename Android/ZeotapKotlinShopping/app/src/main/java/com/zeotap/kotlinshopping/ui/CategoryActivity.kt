package com.zeotap.kotlinshopping.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.zeotap.collect.Collect
import com.zeotap.kotlinshopping.R
import com.zeotap.kotlinshopping.adapter.CategoryAdapter
import com.zeotap.kotlinshopping.data.Category
import com.zeotap.kotlinshopping.data.ProductData

/**
 * Displays product categories in a grid layout.
 *
 * Zeotap SDK integration:
 * - Tracks page view with setPageProperties when screen loads
 * - Tracks "Category Viewed" event when a category is clicked
 */
class CategoryActivity : AppCompatActivity(), CategoryAdapter.OnCategoryClickListener {

    companion object {
        private const val TAG = "CategoryActivity"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_category)

        val categories = ProductData.getCategories()

        val rvCategories = findViewById<RecyclerView>(R.id.rvCategories)
        rvCategories.layoutManager = GridLayoutManager(this, 2)
        rvCategories.adapter = CategoryAdapter(categories, this)

        // Zeotap SDK: Track page view
        try {
            val pageProperties = mapOf<String, Any>(
                "name" to "Categories",
                "category" to "Shopping"
            )
            Collect.getInstance().setPageProperties(pageProperties) { response ->
                Log.d(TAG, "Page properties set: $response")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error setting page properties", e)
        }

        // Zeotap SDK: Track screen view event
        try {
            val eventProps = mapOf<String, Any>(
                "screen_name" to "Categories",
                "category_count" to categories.size
            )
            Collect.getInstance().setEventProperties("screen_view", eventProps)
        } catch (e: Exception) {
            Log.e(TAG, "Error tracking screen view", e)
        }
    }

    override fun onCategoryClick(category: Category) {
        // Zeotap SDK: Track category click event
        try {
            val eventProps = mapOf<String, Any>(
                "category_id" to category.id,
                "category_name" to category.name
            )
            Collect.getInstance().setEventProperties("Category Viewed", eventProps) { response ->
                Log.d(TAG, "Category event tracked: $response")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error tracking category event", e)
        }

        val intent = Intent(this, ProductListActivity::class.java).apply {
            putExtra("category_id", category.id)
            putExtra("category_name", category.name)
        }
        startActivity(intent)
    }
}
