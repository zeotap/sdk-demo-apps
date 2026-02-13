package com.zeotap.kotlinshopping.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.zeotap.kotlinshopping.R
import com.zeotap.kotlinshopping.data.Category

class CategoryAdapter(
    private val categories: List<Category>,
    private val listener: OnCategoryClickListener
) : RecyclerView.Adapter<CategoryAdapter.ViewHolder>() {

    interface OnCategoryClickListener {
        fun onCategoryClick(category: Category)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_category, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val category = categories[position]
        holder.tvCategoryIcon.text = category.icon
        holder.tvCategoryName.text = category.name
        holder.categoryContainer.setBackgroundColor(
            ContextCompat.getColor(holder.itemView.context, category.colorResId)
        )
        holder.itemView.setOnClickListener { listener.onCategoryClick(category) }
    }

    override fun getItemCount(): Int = categories.size

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvCategoryIcon: TextView = itemView.findViewById(R.id.tvCategoryIcon)
        val tvCategoryName: TextView = itemView.findViewById(R.id.tvCategoryName)
        val categoryContainer: LinearLayout = itemView.findViewById(R.id.categoryContainer)
    }
}
