package com.example.medisync;

import static android.content.ContentValues.TAG;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import android.Manifest;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.drawable.Drawable;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.Circle;
import com.google.android.gms.maps.model.CircleOptions;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapsFragment extends Fragment implements OnMapReadyCallback {

    private GoogleMap mMap;
    private FusedLocationProviderClient fusedLocationClient;
    private Location userLocation; // The user's current location as a Location object
    private LatLng currentLocation;
    private Circle radiusCircle;
    private Marker userMarker;
    private static final int RADIUS_IN_METERS = 5000;

    private List<Bus> allBuses = new ArrayList<>();
    private Map<String, Marker> busMarkers = new HashMap<>();
    private BitmapDescriptor bitmapDescriptor;
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_maps, container, false);

        // Initialize the FusedLocationProviderClient
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity());

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getChildFragmentManager().findFragmentById(R.id.map);
        mapFragment.getMapAsync((OnMapReadyCallback) this);
        CollectionReference busesRef = db.collection("Ambulance");

        // Listen for changes to the documents in Firebase
        busesRef.addSnapshotListener(new EventListener<QuerySnapshot>() {
            @Override
            public void onEvent(QuerySnapshot snapshots, FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w(TAG, "listen:error", e);
                    return;
                }

                allBuses.clear();
                // Loop through the documents and add the buses to the list
                for (DocumentSnapshot dc : snapshots) {
                    Double latitude = dc.getDouble("latitude");
                    Double longitude = dc.getDouble("longitude");
                    String busName = dc.getString("text");
                   // Toast.makeText(getActivity(), busName, Toast.LENGTH_SHORT).show();
                    LatLng location = new LatLng(latitude, longitude);
                    Bus bus = new Bus(busName, location);
                    allBuses.add(bus);
                }

                // Now that we have fetched the data, update the map with markers
                updateMapWithMarkers();
            }
        });

        return view;
    }

    private void updateMapWithMarkers() {
        if (mMap == null) {
            return;
        }

        // Check if the user location is available
        if (userLocation == null) {
            // Fetch the user location first
            fetchUserLocation();
            return;
        }

        // Filter buses based on distance from user's location
        for (Bus bus : allBuses) {
            Location busLocationObj = new Location("");
            busLocationObj.setLatitude(bus.getLocation().latitude);
            busLocationObj.setLongitude(bus.getLocation().longitude);
            float distanceToBus = userLocation.distanceTo(busLocationObj);

            // Check if the bus is within the radius
            if (distanceToBus <= RADIUS_IN_METERS) {
                // Check if the marker for this bus already exists
                Marker busMarker = busMarkers.get(bus.getBusName());
                if (busMarker == null) {
                    // Marker doesn't exist, create a new one

                    // Create a custom marker icon with the bus name
                    BitmapDescriptor customIcon = createCustomIcon(bus.getBusName());

                    busMarker = mMap.addMarker(new MarkerOptions()
                            .position(bus.getLocation())
                            .title(bus.getBusName())
                            .icon(customIcon));

                    busMarkers.put(bus.getBusName(), busMarker);
                } else {
                    // Marker already exists, just update its position
                    busMarker.setPosition(bus.getLocation());
                }
            } else {
                // Remove the marker for buses outside the radius
                removeMarkerForBus(bus);
            }
        }
    }
    private BitmapDescriptor createCustomIcon(String busName) {
        // Convert the vector drawable to a bitmap
        Drawable drawable = ContextCompat.getDrawable(getActivity(), R.drawable.ambulance_icon);
        Bitmap bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);

        // Create a text paint
        Paint textPaint = new Paint();
        textPaint.setTextSize(36);
        textPaint.setColor(Color.BLACK);

        // Calculate the text position on the icon
        int x = (canvas.getWidth() - (int) textPaint.measureText(busName)) / 2;
        int y = canvas.getHeight() / 2;

        // Draw the bus name on the icon
        canvas.drawText(busName, x, y, textPaint);

        // Create a BitmapDescriptor from the updated bitmap
        return BitmapDescriptorFactory.fromBitmap(bitmap);
    }

    private void removeMarkerForBus(Bus bus) {
        // Remove the marker for the bus
        Marker busMarker = busMarkers.get(bus.getBusName());
        if (busMarker != null) {
            busMarker.remove();
            busMarkers.remove(bus.getBusName());
        }
    }

    private void fetchUserLocation() {
        // Check for location permission before accessing user's location
        if (ActivityCompat.checkSelfPermission(getActivity(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            // Permission is granted, get current location
            fusedLocationClient.getLastLocation().addOnSuccessListener(location -> {
                if (location != null) {
                    // Use the location to update the map
                    userLocation = location; // Store the user's current location as a Location object

                    // Update the user's location marker
                    if (userMarker == null) {
                        userMarker = mMap.addMarker(new MarkerOptions().position(new LatLng(userLocation.getLatitude(), userLocation.getLongitude())).title("Current location"));
                        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(userMarker.getPosition(), 13));
                    } else {
                        userMarker.setPosition(new LatLng(userLocation.getLatitude(), userLocation.getLongitude()));
                    }

                    // Update the radius circle
                    if (radiusCircle != null) {
                        radiusCircle.remove(); // Remove old circle if any
                    }
                    radiusCircle = mMap.addCircle(new CircleOptions()
                            .center(new LatLng(userLocation.getLatitude(), userLocation.getLongitude()))
                            .radius(RADIUS_IN_METERS)
                            .strokeColor(Color.BLUE)
                            .fillColor(Color.parseColor("#500084d3"))); // Semi-transparent blue color

                    // Update the bus markers
                    updateMapWithMarkers();
                }
            });
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        this.mMap = googleMap;

        // Check if permission to access fine location is granted
        if (ActivityCompat.checkSelfPermission(requireContext(), android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            // Permission is granted, get current location
            fusedLocationClient.getLastLocation().addOnSuccessListener(location -> {
                if (location != null) {
                    // Use the location to update the map
                    currentLocation = new LatLng(location.getLatitude(), location.getLongitude());
                    googleMap.addMarker(new MarkerOptions().position(currentLocation).title("Current location"));
                    googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(currentLocation, 16));
                }
            });
        } else {
            // Permission is not granted, request it
            ActivityCompat.requestPermissions(requireActivity(), new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        }

        // Enable My Location layer on the map
        googleMap.setMyLocationEnabled(true);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == 1) {
            // Permission is granted, get current location
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                if (ActivityCompat.checkSelfPermission(requireActivity(), android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(requireActivity(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    // TODO: Consider calling
                    //    ActivityCompat#requestPermissions
                    // here to request the missing permissions, and then overriding
                    //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                    //                                          int[] grantResults)
                    // to handle the case where the user grants the permission. See the documentation
                    // for ActivityCompat#requestPermissions for more details.
                    return;
                }
                fusedLocationClient.getLastLocation().addOnSuccessListener(location -> {
                    if (location != null) {
                        // Use the location to update the map
                        currentLocation = new LatLng(location.getLatitude(), location.getLongitude());
                        mMap.addMarker(new MarkerOptions().position(currentLocation).title("Current location"));
                        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(currentLocation, 16));
                    }
                });
            } else {
                Toast.makeText(requireContext(), "Permission denied", Toast.LENGTH_SHORT).show();
            }
        }
    }
    private static class Bus {
        private String busName;
        private LatLng location;

        public Bus(String busName, LatLng location) {
            this.busName = busName;
            this.location = location;
        }

        public String getBusName() {
            return busName;
        }

        public LatLng getLocation() {
            return location;
        }
    }
}