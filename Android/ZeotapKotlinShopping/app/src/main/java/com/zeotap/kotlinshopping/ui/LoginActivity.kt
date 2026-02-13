package com.zeotap.kotlinshopping.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import com.zeotap.collect.Collect
import com.zeotap.kotlinshopping.R

/**
 * Login screen where user enters email and password.
 *
 * Zeotap SDK integration:
 * - Calls setUserIdentities with the user's email on successful login
 * - Calls setUserProperties with user profile attributes
 * - Tracks "User Logged In" event via setEventProperties
 */
class LoginActivity : AppCompatActivity() {

    companion object {
        private const val TAG = "LoginActivity"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etEmail = findViewById<TextInputEditText>(R.id.etEmail)
        val etPassword = findViewById<TextInputEditText>(R.id.etPassword)
        val btnLogin = findViewById<MaterialButton>(R.id.btnLogin)

        btnLogin.setOnClickListener {
            val email = etEmail.text?.toString()?.trim().orEmpty()
            val password = etPassword.text?.toString()?.trim().orEmpty()

            if (email.isEmpty()) {
                etEmail.error = "Email is required"
                return@setOnClickListener
            }

            if (password.isEmpty()) {
                etPassword.error = "Password is required"
                return@setOnClickListener
            }

            // Zeotap SDK: Set user identities after login
            try {
                val identities = mapOf(
                    "email" to email,
                    "loginid" to email
                )
                Collect.getInstance().setUserIdentities(identities) { response ->
                    Log.d(TAG, "User identities set: $response")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error setting user identities", e)
            }

            // Zeotap SDK: Set user properties
            try {
                val userProperties = mapOf<String, Any>(
                    "loginMethod" to "email_password",
                    "appVersion" to "1.0",
                    "platform" to "Android"
                )
                Collect.getInstance().setUserProperties(userProperties) { response ->
                    Log.d(TAG, "User properties set: $response")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error setting user properties", e)
            }

            // Zeotap SDK: Track login event
            try {
                val eventProps = mapOf<String, Any>(
                    "method" to "email_password",
                    "email_provided" to true
                )
                Collect.getInstance().setEventProperties("User Logged In", eventProps) { response ->
                    Log.d(TAG, "Login event tracked: $response")
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error tracking login event", e)
            }

            Toast.makeText(this, "Login successful!", Toast.LENGTH_SHORT).show()
            navigateToCategories()
        }
    }

    private fun navigateToCategories() {
        startActivity(Intent(this, CategoryActivity::class.java))
        finish()
    }
}
