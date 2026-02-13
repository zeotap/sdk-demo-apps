package com.zeotap.kotlinshopping.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.appbar.MaterialToolbar
import com.zeotap.collect.Collect
import com.zeotap.kotlinshopping.R
import com.zeotap.kotlinshopping.adapter.ProductAdapter
import com.zeotap.kotlinshopping.data.Product
import com.zeotap.kotlinshopping.data.ProductData

/**
 * Displays list of products for a selected category.
 *
 * Zeotap SDK integration:
 * - Tracks page view with setPageProperties for this product list screen
 * - Tracks "Product List Viewed" event with category info
 * - Tracks "Product Clicked" event when a product is selected
 */
class ProductListActivity : AppCompatActivity(), ProductAdapter.OnProductClickListener {

    companion object {
        private const val TAG = "ProductListActivity"
    }

    private var categoryId: String = ""
    private var categoryName: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_list)

        categoryId = intent.getStringExtra("category_id").orEmpty()
        categoryName = intent.getStringExtra("category_name").orEmpty()

        val toolbar = findViewById<MaterialToolbar>(R.id.toolbar)
        toolbar.title = categoryName.ifEmpty { "Products" }
        toolbar.setNavigationOnClickListener { finish() }

        val products = ProductData.getProductsByCategory(categoryId)

        val rvProducts = findViewById<RecyclerView>(R.id.rvProducts)
        rvProducts.layoutManager = LinearLayoutManager(this)
        rvProducts.adapter = ProductAdapter(products, this)

        // Zeotap SDK: Track page view
        try {
            val pageProperties = mapOf<String, Any>(
                "name" to "Product List",
                "category" to categoryName
            )
            Collect.getInstance().setPageProperties(pageProperties) { response ->
                Log.d(TAG, "Page properties set: $response")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error setting page properties", e)
        }

        // Zeotap SDK: Track product list view event
        try {
            val eventProps = mapOf<String, Any>(
                "category_id" to categoryId,
                "category_name" to categoryName,
                "product_count" to products.size
            )
            Collect.getInstance().setEventProperties("Product List Viewed", eventProps) { response ->
                Log.d(TAG, "Product list event tracked: $response")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error tracking product list event", e)
        }
    }

    override fun onProductClick(product: Product) {
        // Zeotap SDK: Track product click event
        try {
            val eventProps = mapOf<String, Any>(
                "product_id" to product.id,
                "product_name" to product.name,
                "category" to product.category,
                "price" to product.price,
                "brand" to product.brand
            )
            Collect.getInstance().setEventProperties("Product Clicked", eventProps) { response ->
                Log.d(TAG, "Product click event tracked: $response")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error tracking product click event", e)
        }

        val intent = Intent(this, ProductDetailActivity::class.java).apply {
            putExtra("product_id", product.id)
        }
        startActivity(intent)
    }
}
