package com.zeotap.kotlinshopping.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.zeotap.kotlinshopping.R
import com.zeotap.kotlinshopping.data.Product
import java.util.Locale

class ProductAdapter(
    private val products: List<Product>,
    private val listener: OnProductClickListener
) : RecyclerView.Adapter<ProductAdapter.ViewHolder>() {

    interface OnProductClickListener {
        fun onProductClick(product: Product)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_product, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val product = products[position]
        holder.tvProductName.text = product.name
        holder.tvProductBrand.text = product.brand
        holder.tvProductPrice.text = String.format(Locale.US, "$%.2f", product.price)
        holder.tvProductRating.text = String.format(Locale.US, "\u2B50 %.1f", product.rating)
        holder.tvProductIcon.text = getIconForCategory(product.categoryId)
        holder.itemView.setOnClickListener { listener.onProductClick(product) }
    }

    override fun getItemCount(): Int = products.size

    private fun getIconForCategory(categoryId: String): String = when (categoryId) {
        "electronics" -> "\uD83D\uDCF1"
        "clothing" -> "\uD83D\uDC55"
        "books" -> "\uD83D\uDCDA"
        "home" -> "\uD83C\uDFE0"
        "sports" -> "\u26BD"
        "beauty" -> "\uD83D\uDC84"
        else -> "\uD83D\uDCE6"
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvProductIcon: TextView = itemView.findViewById(R.id.tvProductIcon)
        val tvProductName: TextView = itemView.findViewById(R.id.tvProductName)
        val tvProductBrand: TextView = itemView.findViewById(R.id.tvProductBrand)
        val tvProductPrice: TextView = itemView.findViewById(R.id.tvProductPrice)
        val tvProductRating: TextView = itemView.findViewById(R.id.tvProductRating)
    }
}
