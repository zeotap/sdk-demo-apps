package com.zeotap.kotlinshopping

import android.app.Application
import android.util.Log
import com.zeotap.collect.Collect
import com.zeotap.collect.CollectOptions

class ShoppingApplication : Application() {

    companion object {
        private const val TAG = "ZeotapKotlinShopping"
    }

    override fun onCreate() {
        super.onCreate()
        initZeotapSDK()
    }

    private fun initZeotapSDK() {
        try {
            val options = CollectOptions.builder(this)
                .credential("YOUR_WRITE_KEY") // Replace with your Zeotap write key
                .enableLogging(true)
                .useConsent(true)
                .build()

            Collect.init(options)
            Log.d(TAG, "Zeotap SDK initialized successfully")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to initialize Zeotap SDK", e)
        }
    }
}
