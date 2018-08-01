package com.example.iot.shsecuirity;

import android.media.MediaPlayer;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.MediaController;
import android.widget.Toast;
import android.widget.VideoView;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.io.UnsupportedEncodingException;

public class Main2Activity extends AppCompatActivity {
   // ProgressDialog pd;
    VideoView view;
    String URL = "http://18.222.90.144/vidrec.mp4";
    MqttAndroidClient client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        ///////////video streaming code //////////////////////////
        view = (VideoView)findViewById(R.id.videoView);
       // pd = new ProgressDialog(Show.this);
        try{
            MediaController controller=new MediaController(this);
            controller.setAnchorView(view);
            Uri vidUri = Uri.parse(URL);
            view.setMediaController(controller);
            view.setVideoURI(vidUri);
        }catch(Exception e){
            Log.e("Error",e.getMessage());
            e.printStackTrace();
        }
        view.requestFocus();
        view.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            public void onPrepared(MediaPlayer mp) {
            //// TODO Auto-generated method stub
                //pd.dismiss();
                view.start();
            }
        });
        //////////////video streaming code ENDs here ///////////////////

        //////////////MQTT CODE start////////////////////////////public broker=>   broker.hivemq.com:1883
        String clientId = MqttClient.generateClientId();
        client = new MqttAndroidClient(this.getApplicationContext(), "tcp://18.222.90.144:1883",clientId);

        try {
            IMqttToken token = client.connect();
            token.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    // We are connected
                    Toast.makeText(Main2Activity.this,"Locker Connected",Toast.LENGTH_LONG).show();
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    // Something went wrong e.g. connection timeout or firewall problems
                    Toast.makeText(Main2Activity.this,"locker not connected",Toast.LENGTH_LONG).show();

                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }

    }//onCreate end

    public void pubOn(View v){
        String topic = "Lock";
        String message = "1";
        try {
            client.publish(topic,message.getBytes(),0,false);
            Toast.makeText(Main2Activity.this,"Door is UnLocked now",Toast.LENGTH_LONG).show();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void pubOff(View v){
        String topic = "Lock";
        String message = "0";
        try {
            client.publish(topic,message.getBytes(),0,false);
            Toast.makeText(Main2Activity.this,"Door is Locked now",Toast.LENGTH_LONG).show();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
