package com.zeotap.kotlinshopping.ui

import android.os.Bundle
import android.util.Log
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.google.android.material.appbar.MaterialToolbar
import com.google.android.material.button.MaterialButton
import com.zeotap.collect.Collect
import com.zeotap.kotlinshopping.R
import com.zeotap.kotlinshopping.data.Product
import com.zeotap.kotlinshopping.data.ProductData
import java.util.Locale

/**
 * Displays detailed information about a single product.
 *
 * Zeotap SDK integration:
 * - Tracks page view with setPageProperties for product detail screen
 * - Tracks "Product Viewed" event with full product details
 * - Tracks "Product Added to Cart" event on add to cart click
 * - Tracks "Purchase Initiated" event on buy now click
 */
class ProductDetailActivity : AppCompatActivity() {

    companion object {
        private const val TAG = "ProductDetailActivity"
    }

    private var product: Product? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_detail)

        val toolbar = findViewById<MaterialToolbar>(R.id.toolbar)
        toolbar.setNavigationOnClickListener { finish() }

        val productId = intent.getStringExtra("product_id")
        product = ProductData.getProductById(productId.orEmpty())

        if (product == null) {
            Toast.makeText(this, "Product not found", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        toolbar.title = product!!.name
        bindProductData()
        setupButtons()
        trackProductView()
    }

    private fun bindProductData() {
        val p = product ?: return

        findViewById<TextView>(R.id.tvProductIcon).text = getIconForCategory(p.categoryId)
        findViewById<TextView>(R.id.tvBrand).text = p.brand
        findViewById<TextView>(R.id.tvProductName).text = p.name
        findViewById<TextView>(R.id.tvPrice).text = String.format(Locale.US, "$%.2f", p.price)
        findViewById<TextView>(R.id.tvRating).text = String.format(Locale.US, "\u2B50 %.1f", p.rating)

        val tvStockStatus = findViewById<TextView>(R.id.tvStockStatus)
        if (p.inStock) {
            tvStockStatus.text = "In Stock"
            tvStockStatus.setTextColor(ContextCompat.getColor(this, R.color.green))
        } else {
            tvStockStatus.text = "Out of Stock"
            tvStockStatus.setTextColor(ContextCompat.getColor(this, R.color.red))
        }

        findViewById<TextView>(R.id.tvDescription).text = p.description
    }

    private fun setupButtons() {
        val p = product ?: return

        findViewById<MaterialButton>(R.id.btnAddToCart).setOnClickListener {
            // Zeotap SDK: Track add to cart event
            try {
                val eventProps = mapOf<String, Any>(
                    "product_id" to p.id,
                    "product_name" to p.name,
                    "category" to p.category,
                    "price" to p.price,
                    "brand" to p.brand,
                    "currency" to "USD"
                )
                Collect.getInstance().setEventProperties("Product Added to Cart", eventProps) { response ->
                    Log.d(TAG, "Add to cart event tracked: $response")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error tracking add to cart event", e)
            }

            Toast.makeText(this, "${p.name} added to cart", Toast.LENGTH_SHORT).show()
        }

        findViewById<MaterialButton>(R.id.btnBuyNow).setOnClickListener {
            // Zeotap SDK: Track purchase initiated event
            try {
                val eventProps = mapOf<String, Any>(
                    "product_id" to p.id,
                    "product_name" to p.name,
                    "category" to p.category,
                    "price" to p.price,
                    "brand" to p.brand,
                    "currency" to "USD",
                    "payment_method" to "direct_buy"
                )
                Collect.getInstance().setEventProperties("Purchase Initiated", eventProps) { response ->
                    Log.d(TAG, "Purchase event tracked: $response")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error tracking purchase event", e)
            }

            Toast.makeText(this, "Purchase initiated for ${p.name}", Toast.LENGTH_SHORT).show()
        }
    }

    private fun trackProductView() {
        val p = product ?: return

        // Zeotap SDK: Track page view
        try {
            val pageProperties = mapOf<String, Any>(
                "name" to "Product Detail",
                "category" to p.category,
                "product_id" to p.id
            )
            Collect.getInstance().setPageProperties(pageProperties) { response ->
                Log.d(TAG, "Page properties set: $response")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error setting page properties", e)
        }

        // Zeotap SDK: Track product viewed event
        try {
            val eventProps = mapOf<String, Any>(
                "product_id" to p.id,
                "product_name" to p.name,
                "category" to p.category,
                "price" to p.price,
                "brand" to p.brand,
                "currency" to "USD",
                "in_stock" to p.inStock,
                "rating" to p.rating
            )
            Collect.getInstance().setEventProperties("Product Viewed", eventProps) { response ->
                Log.d(TAG, "Product view event tracked: $response")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error tracking product view event", e)
        }
    }

    private fun getIconForCategory(categoryId: String): String = when (categoryId) {
        "electronics" -> "\uD83D\uDCF1"
        "clothing" -> "\uD83D\uDC55"
        "books" -> "\uD83D\uDCDA"
        "home" -> "\uD83C\uDFE0"
        "sports" -> "\u26BD"
        "beauty" -> "\uD83D\uDC84"
        else -> "\uD83D\uDCE6"
    }
}
