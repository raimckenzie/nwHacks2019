package gastown3.nwhacks2019;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class RideEnd extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ride_end);

        final Intent intent = new Intent(this, MapsActivity.class);

        Button Button = (Button) findViewById(R.id.button_go);
        Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
;                finish();
                startActivity(intent);
            }
        });
    }
}
