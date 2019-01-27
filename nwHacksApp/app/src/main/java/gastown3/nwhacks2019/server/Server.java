package gastown3.nwhacks2019.server;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Server {

    private String home_URL;

    public Server(String url) {
        this.home_URL = url;
    }

    public String requestSignin(String username) throws MalformedURLException, ServerConnectionException {
        String address = home_URL + "signin";
        URL url = new URL(address);
        HttpURLConnection client = null;

        try {
            client = (HttpURLConnection) url.openConnection();
            client.setRequestMethod("POST");
            client.setRequestProperty("username", username);
            client.setDoOutput(true);


            StringBuilder content;

            try (BufferedReader in = new BufferedReader(
                    new InputStreamReader(client.getInputStream()))) {

                String line;
                content = new StringBuilder();

                while ((line = in.readLine()) != null) {
                    content.append(line);
                    content.append(System.lineSeparator());
                }

                return content.toString();
            }

        } catch (IOException error) {
            throw new ServerConnectionException();
        }

    }


}
