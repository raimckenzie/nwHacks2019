package gastown3.nwhacks2019;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class FurtherInfoActivity extends AppCompatActivity {

    Integer Position;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_further_info);

        Position = getIntent().getIntExtra("POSITION", -1);

        
    }
}
