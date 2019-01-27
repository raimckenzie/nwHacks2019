package gastown3.nwhacks2019.server;


import android.os.AsyncTask;
import android.util.Log;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ExecutionException;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONException;
import org.json.JSONObject;

public class Server {

    private String home_URL;

    public Server(String url) {
        this.home_URL = url;
    }

    public String requestSignin(String username) throws MalformedURLException, ServerConnectionException {
        AsyncCaller caller = new AsyncCaller();
        caller.execute(username);
        try {
            String json = caller.get();
            System.out.println(json);
            return json;
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return "error";

    }


    private class AsyncCaller extends AsyncTask<String, Void, String>{
        private String json;

        @Override
        protected String doInBackground(String... strings) {
            String address = home_URL + "signin";
            URL url = null;
            try {
                url = new URL(address);
            } catch (MalformedURLException e) {
                return "error";
            }
            HttpURLConnection client = null;
            try {
                client = (HttpURLConnection) url.openConnection();
                client.setRequestMethod("POST");
                System.out.println("THE USERNAME " + strings[0] );
                client.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
                client.setDoOutput(true);
                client.setDoInput(true);


                JSONObject jsonParam = new JSONObject();
                jsonParam.put("username", strings[0]);
                Log.i("JSON", jsonParam.toString());
                DataOutputStream os = new DataOutputStream(client.getOutputStream());
                //os.writeBytes(URLEncoder.encode(jsonParam.toString(), "UTF-8"));
                os.writeBytes(jsonParam.toString());

                os.flush();
                os.close();

                StringBuilder content;

                try (BufferedReader in = new BufferedReader(
                        new InputStreamReader(client.getInputStream()))) {

                    String line;
                    content = new StringBuilder();

                    while ((line = in.readLine()) != null) {
                        content.append(line);
                        content.append(System.lineSeparator());
                    }

                    String json = content.toString();
                    JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();

                    return json;
                }

            } catch (IOException error) {
                return "error";
            } catch (JSONException e) {
                e.printStackTrace();
            }finally {
                client.disconnect();
            }
            return "no json";
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
        }
    }

}
