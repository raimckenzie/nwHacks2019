package gastown3.nwhacks2019;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class rideFoundActivity extends AppCompatActivity {

    private View goodView;
    private View progressView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ride_found);

        goodView = findViewById(R.id.textView_ride);
        progressView = findViewById(R.id.rideFind_progress);

        Button Button = (Button) findViewById(R.id.button_go);
        Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(rideFoundActivity.this, RideEnd.class);
                startActivity(intent);
            }
        });
    }

    private void asyncWait(int milli){

        rideFoundActivity.waiter wait = new waiter(milli);
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


    /**
     * Shows the progress UI and hides the login form.
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    private void showProgress(final boolean show) {

        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

            goodView.setVisibility(show ? View.GONE : View.VISIBLE);
            goodView.animate().setDuration(shortAnimTime).alpha(
                    show ? 0 : 1).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    goodView.setVisibility(show ? View.GONE : View.VISIBLE);
                }
            });

            progressView.setVisibility(show ? View.VISIBLE : View.GONE);
            progressView.animate().setDuration(shortAnimTime).alpha(
                    show ? 1 : 0).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    progressView.setVisibility(show ? View.VISIBLE : View.GONE);
                }
            });
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            progressView.setVisibility(show ? View.VISIBLE : View.GONE);
            goodView.setVisibility(show ? View.GONE : View.VISIBLE);
        }
    }

}
