package com.example.medisync;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

public class TrackingMap extends Fragment {

    private GoogleMap mMap;
    private LatLng startLatLng = new LatLng(12.9717, 79.1380); // Start coordinates
    private LatLng endLatLng = new LatLng(12.9692, 79.1559);

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_tracking_map, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        SupportMapFragment mapFragment =
                (SupportMapFragment) getChildFragmentManager().findFragmentById(R.id.map);
        if (mapFragment != null) {
            mapFragment.getMapAsync(new OnMapReadyCallback() {
                @Override
                public void onMapReady(GoogleMap googleMap) {
                    mMap = googleMap;

                    // Add markers and calculate bounds
                    mMap.addMarker(new MarkerOptions().position(startLatLng).title("Start"));
                    BitmapDescriptor customIcon = BitmapDescriptorFactory.fromResource(R.drawable.ambulance_icon);

// Add the marker with the custom icon
                    mMap.addMarker(new MarkerOptions()
                            .position(endLatLng)
                            .title("End")
                            .icon(customIcon));


                    LatLngBounds.Builder builder = new LatLngBounds.Builder();
                    builder.include(startLatLng);
                    builder.include(endLatLng);
                    LatLngBounds bounds = builder.build();

                    // Move camera with padding, post layout
                    final int padding = 100;
                    final View mapView = mapFragment.getView();
                    if (mapView.getViewTreeObserver().isAlive()) {
                        mapView.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
                            @SuppressLint("NewApi") // We check which build version we are using.
                            @Override
                            public void onGlobalLayout() {
                                if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN) {
                                    mapView.getViewTreeObserver().removeGlobalOnLayoutListener(this);
                                } else {
                                    mapView.getViewTreeObserver().removeOnGlobalLayoutListener(this);
                                }
                                mMap.moveCamera(CameraUpdateFactory.newLatLngBounds(bounds, padding));
                            }
                        });
                    }

                    // Draw polyline between start and end points
                    PolylineOptions polylineOptions = new PolylineOptions()
                            .add(startLatLng)
                            .add(endLatLng);
                    Polyline polyline = mMap.addPolyline(polylineOptions);
                }
            });
        }
    }
}