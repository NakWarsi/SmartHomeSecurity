package com.example.iot.shsecuirity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    Button btlogin;
    EditText ETUserid;
    EditText ETPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btlogin = (Button)findViewById(R.id.BtLogin);
        ETUserid=(EditText)findViewById(R.id.ETuserId);
        ETPassword=(EditText)findViewById(R.id.ETpassword);


        btlogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent=new Intent(
                        MainActivity.this,
                        Main2Activity.class
                );
                String userid=ETUserid.getText().toString().trim();
                String Password=ETPassword.getText().toString().trim();
              //  startActivity(intent);
                if ((userid.equals("nakwarsi")  && Password.equals("nakwarsi123"))||(userid.equals("mihir") && (Password.equals("mihir123"))) || (userid.equals("kajal") && Password.equals("kajal123")) || (userid.equals("teena") && Password.equals("teena123"))){
                    startActivity(intent);
                }
                else
                {
                    Toast.makeText(MainActivity.this,"UserId or Password is Wrong",Toast.LENGTH_LONG).show();

                }

            }
        });


    }
}
