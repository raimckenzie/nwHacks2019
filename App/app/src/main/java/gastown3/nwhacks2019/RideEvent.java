package gastown3.nwhacks2019;

import com.google.android.gms.maps.model.LatLng;

import java.util.Date;

public class RideEvent {

    //This is a class that represents the ride event in the swipe up menu

    //this represents the status of the ride: True: trip has started, False: trip is waiting to start
    public int hasStarted;

    //this represents the start and end points of the ride
    public float startLon;
    public float startLat;
    public float endLon;
    public float endLat;

    //this represents the username to be displayed
    public String username;
    public Date expiry;


    public RideEvent(int status, String username, float startLon, float startLat, float endLon, float endLat, Date expiry){
        this.hasStarted = status;
        this.startLat = startLat;
        this.startLon = startLon;
        this.endLat = endLat;
        this.endLon = endLon;
        this.username = username;
        this.expiry = expiry;
    }


}
