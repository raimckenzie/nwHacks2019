package gastown3.nwhacks2019;

import com.google.android.gms.maps.model.LatLng;

public class RideEvent {

    //This is a class that represents the ride event in the swipe up menu

    //this represents the status of the ride: True: trip has started, False: trip is waiting to start
    public boolean hasStarted;

    //this represents the start and end points of the ride
    public LatLng starting;
    public LatLng ending;

    //this represents the username to be displayed
    public String username;

    public RideEvent(boolean status, LatLng start, LatLng end, String username){
        this.hasStarted = status;
        this.starting = start;
        this.ending = end;
        this.username = username;
    }


}
