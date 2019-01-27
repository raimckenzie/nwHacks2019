package gastown3.nwhacks2019.server;


import android.os.AsyncTask;
import android.util.Log;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutionException;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONException;
import org.json.JSONObject;

import gastown3.nwhacks2019.RideEvent;
import org.json.*;

public class Server {

    private static final int RADIUS = 1000;
    private String home_URL;

    public Server(String url) {
        this.home_URL = url;
    }

    public String requestSignin(String username) throws MalformedURLException, ServerConnectionException {
        AsyncSignin caller = new AsyncSignin();
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

    public RideEvent[] getRequests() {
        RideEvent re = new RideEvent(32, "Jack Jack", (float) 49.272398, (float) -123.246083, (float) 49.250662, (float) -123.167108);
        RideEvent r2 = new RideEvent(36, "Rey", (float) 49.270109, (float) -123.252169, (float) 49.263672, (float) -123.213599);
        RideEvent r3 = new RideEvent(44, "Weasley", (float) 49.262890, (float) -123.251284, (float) 49.259292, (float) -123.194467);
        RideEvent[] res = new RideEvent[]{re, r2, r3};
        return res;
    }

    public RideEvent[] getRequests(float lon, float lat) {
        AsyncRequests caller = new AsyncRequests();
        caller.execute(lon, lat);
        try{
            String json = caller.get();
            System.out.println(json);
            try {
                JSONObject obj = new JSONObject(json);
                JSONObject payload = obj.getJSONObject("payload");
                JSONArray arr = payload.getJSONArray("result");
                RideEvent[] rideEvents = new RideEvent[arr.length()];
                for (int i = 0; i < arr.length(); i++) {
                    Integer id = arr.getJSONObject(i).getInt("user_id");
                    String username = arr.getJSONObject(i).getString("username");
                    float startlon = (float) arr.getJSONObject(i).getDouble("startLocLon");
                    float startlat = (float) arr.getJSONObject(i).getDouble("startLocLat");
                    float endlon = (float) arr.getJSONObject(i).getDouble("endLocLon");
                    float endlat = (float) arr.getJSONObject(i).getDouble("endLocLat");
                    RideEvent re = new RideEvent(id, username, startlon, startlat, endlon, endlat);
                    System.out.println(re.toString());
                    rideEvents[i] = re;
                }
                return rideEvents;
            } catch (JSONException e) {
                e.printStackTrace();
            }


        }catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }


    private class AsyncRequests extends AsyncTask<Float, Void, String> {
        @Override
        protected String doInBackground(Float... floats) {
            String address = home_URL + "getRequests";
            URL url = null;
            try {
                url = new URL(address);
            } catch (MalformedURLException e) {
                return " url error";
            }
            HttpURLConnection client = null;
            try {
                client = (HttpURLConnection) url.openConnection();
                client.setRequestMethod("POST");
                client.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
                client.setDoOutput(true);
                client.setDoInput(true);

                JSONObject jsonParam = new JSONObject();
                JSONObject coordss = new JSONObject();
                coordss.put("lat", floats[0]);
                coordss.put("lon", floats[1]);
                jsonParam.put("radius", RADIUS);
                jsonParam.put("loc", coordss);

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
                return "IOerror";
            } catch (JSONException e) {
                e.printStackTrace();
            }finally {
                client.disconnect();
            }
            return "no json";
        }
    }

    private class AsyncSignin extends AsyncTask<String, Void, String>{
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
