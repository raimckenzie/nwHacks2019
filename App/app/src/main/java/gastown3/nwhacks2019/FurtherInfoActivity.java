package gastown3.nwhacks2019;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import gastown3.nwhacks2019.server.Server;

public class FurtherInfoActivity extends AppCompatActivity {

    Integer Position;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_further_info);
        Server s = new Server("asdsda");
        RideEvent[] res = s.getRequests();
        Position = getIntent().getIntExtra("POSITION", -1);
        if(Position != -1) {
            TextView text = findViewById(R.id.textView4);

        }


    }
}
