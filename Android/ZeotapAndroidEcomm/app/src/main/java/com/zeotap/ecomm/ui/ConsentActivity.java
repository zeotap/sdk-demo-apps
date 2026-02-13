package com.zeotap.ecomm.ui;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;
import com.zeotap.collect.Collect;
import com.zeotap.ecomm.R;

import java.util.HashMap;
import java.util.Map;

/**
 * First screen shown to the user asking for consent to collect data.
 *
 * Zeotap SDK integration:
 * - Calls setConsent(track: true) when user agrees
 * - Calls setConsent(track: false) when user disagrees
 */
public class ConsentActivity extends AppCompatActivity {

    private static final String TAG = "ConsentActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_consent);

        MaterialButton btnAgree = findViewById(R.id.btnAgree);
        MaterialButton btnDisagree = findViewById(R.id.btnDisagree);

        btnAgree.setOnClickListener(v -> {
            // Zeotap SDK: Grant consent for tracking
            try {
                Map<String, Object> consentData = new HashMap<>();
                consentData.put("track", true);
                consentData.put("identify", true);
                consentData.put("analyticsConsent", true);
                consentData.put("marketingConsent", true);

                Collect.getInstance().setConsent(consentData, response -> {
                    Log.d(TAG, "Consent set successfully: " + response);
                });
            } catch (Exception e) {
                Log.e(TAG, "Error setting consent", e);
            }

            navigateToLogin();
        });

        btnDisagree.setOnClickListener(v -> {
            // Zeotap SDK: Deny consent for tracking
            try {
                Map<String, Object> consentData = new HashMap<>();
                consentData.put("track", false);
                consentData.put("identify", false);
                consentData.put("analyticsConsent", false);
                consentData.put("marketingConsent", false);

                Collect.getInstance().setConsent(consentData, response -> {
                    Log.d(TAG, "Consent denied: " + response);
                });
            } catch (Exception e) {
                Log.e(TAG, "Error setting consent", e);
            }

            navigateToLogin();
        });
    }

    private void navigateToLogin() {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
        finish();
    }
}
