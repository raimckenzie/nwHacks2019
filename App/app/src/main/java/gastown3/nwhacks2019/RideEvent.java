package gastown3.nwhacks2019;

import com.google.android.gms.maps.model.LatLng;

import java.util.Date;

public class RideEvent {

    //This is a class that represents the ride event in the swipe up menu

    //this represents the status of the ride: True: trip has started, False: trip is waiting to start
    public int RequestId;
    public int UserId;
    public String username;
    public int hasStarted;
    public String create;

    //this represents the start and end points of the ride
    public float startLon;
    public float startLat;
    public float endLon;
    public float endLat;

    //this represents the username to be displayed

    public String expiry;





    public RideEvent(int UserId, String username, float startLon, float startLat, float endLon, float endLat){

        this.startLat = startLat;
        this.startLon = startLon;
        this.endLat = endLat;
        this.endLon = endLon;
        this.username = username;
        this.UserId = UserId;
    }

    @Override
    public String toString() {
        return "RideEvent{" +
                "hasStarted=" + hasStarted +
                ", startLon=" + startLon +
                ", startLat=" + startLat +
                ", endLon=" + endLon +
                ", endLat=" + endLat +
                ", username='" + username + '\'' +
                ", expiry='" + expiry + '\'' +
                ", RequestId=" + RequestId +
                ", UserId=" + UserId +
                ", create='" + create + '\'' +
                '}';
    }
}
