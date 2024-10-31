package com.zeodemo;

import android.util.Log;

import androidx.annotation.NonNull;

import com.inmobi.cmp.ChoiceCmpCallback;
import com.inmobi.cmp.core.model.ACData;
import com.inmobi.cmp.core.model.GDPRData;
import com.inmobi.cmp.core.model.gbc.GoogleBasicConsents;
import com.inmobi.cmp.core.model.mspa.USRegulationData;
import com.inmobi.cmp.model.ChoiceError;
import com.inmobi.cmp.model.DisplayInfo;
import com.inmobi.cmp.model.NonIABData;
import com.inmobi.cmp.model.PingReturn;

public class ConsentCallbackImp implements ChoiceCmpCallback {

    @Override
    public void onCCPAConsentGiven(@NonNull String s) {
        Log.d("ConsentCallbackImp", "onCCPAConsentGiven: " + s);
    }

    @Override
    public void onCMPUIStatusChanged(@NonNull DisplayInfo displayInfo) {
        Log.d("ConsentCallbackImp", "onCMPUIStatusChanged: " + displayInfo);
    }

    @Override
    public void onCmpError(@NonNull ChoiceError choiceError) {
        Log.d("ConsentCallbackImp", "onCmpError: " + choiceError);
    }

    @Override
    public void onCmpLoaded(@NonNull PingReturn pingReturn) {
        Log.d("ConsentCallbackImp", "onCmpLoaded: " + pingReturn);
    }

    @Override
    public void onGoogleBasicConsentChange(@NonNull GoogleBasicConsents googleBasicConsents) {
        Log.d("ConsentCallbackImp", "onGoogleBasicConsentChange: " + googleBasicConsents);
    }

    @Override
    public void onGoogleVendorConsentGiven(@NonNull ACData acData) {
        Log.d("ConsentCallbackImp", "onGoogleVendorConsentGiven: " + acData);
    }

    @Override
    public void onIABVendorConsentGiven(@NonNull GDPRData gdprData) {

    }

    @Override
    public void onNonIABVendorConsentGiven(@NonNull NonIABData nonIABData) {

    }

    @Override
    public void onReceiveUSRegulationsConsent(@NonNull USRegulationData usRegulationData) {

    }

    @Override
    public void onUserMovedToOtherState() {

    }
}
