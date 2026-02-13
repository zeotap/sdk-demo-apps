package com.zeotap.ecomm;

import android.app.Application;
import android.util.Log;

import com.zeotap.collect.Collect;
import com.zeotap.collect.CollectOptions;

public class EcommApplication extends Application {

    private static final String TAG = "ZeotapEcomm";

    @Override
    public void onCreate() {
        super.onCreate();
        initZeotapSDK();
    }

    private void initZeotapSDK() {
        try {
            CollectOptions options = CollectOptions.builder(this)
                    .credential("YOUR_WRITE_KEY") // Replace with your Zeotap write key
                    .enableLogging(true)
                    .useConsent(true)
                    .build();

            Collect.init(options);
            Log.d(TAG, "Zeotap SDK initialized successfully");
        } catch (Exception e) {
            Log.e(TAG, "Failed to initialize Zeotap SDK", e);
        }
    }
}
