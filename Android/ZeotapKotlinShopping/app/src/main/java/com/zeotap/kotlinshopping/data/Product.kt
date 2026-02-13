package com.zeotap.kotlinshopping.data

import java.io.Serializable

data class Product(
    val id: String,
    val name: String,
    val categoryId: String,
    val category: String,
    val price: Double,
    val description: String,
    val brand: String,
    val rating: Float,
    val inStock: Boolean
) : Serializable
