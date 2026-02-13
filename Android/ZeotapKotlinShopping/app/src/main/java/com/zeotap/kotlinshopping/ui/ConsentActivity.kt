package com.zeotap.kotlinshopping.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.zeotap.collect.Collect
import com.zeotap.kotlinshopping.R

/**
 * First screen shown to the user asking for consent to collect data.
 *
 * Zeotap SDK integration:
 * - Calls setConsent(track: true) when user agrees
 * - Calls setConsent(track: false) when user disagrees
 */
class ConsentActivity : AppCompatActivity() {

    companion object {
        private const val TAG = "ConsentActivity"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_consent)

        val btnAgree = findViewById<MaterialButton>(R.id.btnAgree)
        val btnDisagree = findViewById<MaterialButton>(R.id.btnDisagree)

        btnAgree.setOnClickListener {
            // Zeotap SDK: Grant consent for tracking
            try {
                val consentData = mapOf<String, Any>(
                    "track" to true,
                    "identify" to true,
                    "analyticsConsent" to true,
                    "marketingConsent" to true
                )
                Collect.getInstance().setConsent(consentData) { response ->
                    Log.d(TAG, "Consent set successfully: $response")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error setting consent", e)
            }
            navigateToLogin()
        }

        btnDisagree.setOnClickListener {
            // Zeotap SDK: Deny consent for tracking
            try {
                val consentData = mapOf<String, Any>(
                    "track" to false,
                    "identify" to false,
                    "analyticsConsent" to false,
                    "marketingConsent" to false
                )
                Collect.getInstance().setConsent(consentData) { response ->
                    Log.d(TAG, "Consent denied: $response")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error setting consent", e)
            }
            navigateToLogin()
        }
    }

    private fun navigateToLogin() {
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
}
