package com.zeotap.ecomm.ui;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.zeotap.collect.Collect;
import com.zeotap.ecomm.R;

import java.util.HashMap;
import java.util.Map;

/**
 * Login screen where user enters email and password.
 *
 * Zeotap SDK integration:
 * - Calls setUserIdentities with the user's email on successful login
 * - Calls setUserProperties with user profile attributes
 * - Tracks "User Logged In" event via setEventProperties
 */
public class LoginActivity extends AppCompatActivity {

    private static final String TAG = "LoginActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        TextInputEditText etEmail = findViewById(R.id.etEmail);
        TextInputEditText etPassword = findViewById(R.id.etPassword);
        MaterialButton btnLogin = findViewById(R.id.btnLogin);

        btnLogin.setOnClickListener(v -> {
            String email = etEmail.getText() != null ? etEmail.getText().toString().trim() : "";
            String password = etPassword.getText() != null ? etPassword.getText().toString().trim() : "";

            if (TextUtils.isEmpty(email)) {
                etEmail.setError("Email is required");
                return;
            }

            if (TextUtils.isEmpty(password)) {
                etPassword.setError("Password is required");
                return;
            }

            // Zeotap SDK: Set user identities after login
            try {
                Map<String, String> identities = new HashMap<>();
                identities.put("email", email);
                identities.put("loginid", email);

                Collect.getInstance().setUserIdentities(identities, response -> {
                    Log.d(TAG, "User identities set: " + response);
                });
            } catch (Exception e) {
                Log.e(TAG, "Error setting user identities", e);
            }

            // Zeotap SDK: Set user properties
            try {
                Map<String, Object> userProperties = new HashMap<>();
                userProperties.put("loginMethod", "email_password");
                userProperties.put("appVersion", "1.0");
                userProperties.put("platform", "Android");

                Collect.getInstance().setUserProperties(userProperties, response -> {
                    Log.d(TAG, "User properties set: " + response);
                });
            } catch (Exception e) {
                Log.e(TAG, "Error setting user properties", e);
            }

            // Zeotap SDK: Track login event
            try {
                Map<String, Object> eventProps = new HashMap<>();
                eventProps.put("method", "email_password");
                eventProps.put("email_provided", true);

                Collect.getInstance().setEventProperties("User Logged In", eventProps, response -> {
                    Log.d(TAG, "Login event tracked: " + response);
                });
            } catch (Exception e) {
                Log.e(TAG, "Error tracking login event", e);
            }

            Toast.makeText(this, "Login successful!", Toast.LENGTH_SHORT).show();
            navigateToCategories();
        });
    }

    private void navigateToCategories() {
        Intent intent = new Intent(this, CategoryActivity.class);
        startActivity(intent);
        finish();
    }
}
