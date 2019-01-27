package gastown3.nwhacks2019;

import android.widget.Toast;

import com.directions.route.AbstractRouting;
import com.directions.route.Route;
import com.directions.route.RouteException;
import com.directions.route.Routing;
import com.directions.route.RoutingListener;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import java.util.ArrayList;
import java.util.List;

public class MapHelper implements RoutingListener {

    private GoogleMap mMap;
    private List<Polyline> polylines;

    public MapHelper(GoogleMap map) {
        this.mMap = map;
    }


    public void getRouteToMarker(RideEvent[] re){
        for (RideEvent r: re) {
            LatLng start = new LatLng(r.startLat, r.startLon);
            LatLng end = new LatLng(r.endLat, r.endLon);
            mMap.addMarker(new MarkerOptions().position(start).title("start"));
            mMap.addMarker(new MarkerOptions().position(end).title("dest"));

            Routing routing = new Routing.Builder()
                    .key("AIzaSyCvFJPm0uOdnWAbf7J6EVYtxKanC1r4xfc")
                    .travelMode(AbstractRouting.TravelMode.DRIVING)
                    .withListener(this)
                    .alternativeRoutes(false)
                    .waypoints(start, end)
                    .build();
            routing.execute();
        }
    }

    @Override
    public void onRoutingFailure(RouteException e) {

    }

    @Override
    public void onRoutingStart() {

    }

    @Override
    public void onRoutingSuccess(ArrayList<Route> route, int shortestRouteIndex) {

        polylines = new ArrayList<>();
        //add route(s) to the map.
        for (int i = 0; i <route.size(); i++) {



            PolylineOptions polyOptions = new PolylineOptions();
            polyOptions.color(0x44C8FF);
            polyOptions.width(10 + i * 3);
            polyOptions.addAll(route.get(i).getPoints());
            Polyline polyline = mMap.addPolyline(polyOptions);
            polylines.add(polyline);


        }
    }

    @Override
    public void onRoutingCancelled() {

    }
}
