package com.example.iot.shsecuirity;

import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

public class firbaseIdService extends FirebaseInstanceIdService {
    public static final String Tag= "firebaseInstanceService";



    @Override
    public void onTokenRefresh() {
        String token= FirebaseInstanceId.getInstance().getToken();
        Log.d(Tag,"registration token...................... :"+token);
        super.onTokenRefresh();

        sendRegisrationToServer(token);
    }

    public void sendRegisrationToServer(String s){

    }
}
