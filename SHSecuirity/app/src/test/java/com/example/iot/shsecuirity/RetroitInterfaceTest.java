package com.example.iot.shsecuirity;

import static org.junit.Assert.*;

package com.example.ish_25.qrcode.network;

import com.example.ish_25.qrcode.model.RetrofitModel;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface RetroitInterface {

    @GET("register.php")
    Call<RetrofitModel>performRegistration(
            @Query("name") String name,
            @Query("userName") String userName,
            @Query("userPassword") String userPassword
    );

    @GET("login.php")
    Call<RetrofitModel>performLogin(
            @Query("prn_id") int userName,
            @Query("password") String userPassword
    );

}