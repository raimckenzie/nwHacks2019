package gastown3.nwhacks2019;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class RideEnd extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ride_end);

        try {
            Thread.sleep(6000);

        } catch (Exception e) {
            e.printStackTrace();
        }

        Intent intent = new Intent(this, MapsActivity.class);
        startActivity(intent);
    }
}
