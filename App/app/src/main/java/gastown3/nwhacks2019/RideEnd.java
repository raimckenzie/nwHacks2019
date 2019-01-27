package gastown3.nwhacks2019;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class RideEnd extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ride_end);

        asyncWait(5000);

        Intent intent = new Intent(this, MapsActivity.class);
        startActivity(intent);
    }

    private void asyncWait(int milli){

        RideEnd.waiter wait = new RideEnd.waiter(milli);
        wait.execute((Void) null);
    }


    private class waiter extends AsyncTask<Void, Void, Boolean> {

        private int wait;

        waiter(int wait) {
            this.wait = wait;
        }

        @Override
        protected Boolean doInBackground(Void... params) {
            try {
                Thread.sleep(wait);

            } catch (Exception e) {
                return false;
            }
            return true;
        }
    }
}
