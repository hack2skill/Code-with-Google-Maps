package com.example.medisync;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.google.android.material.bottomsheet.BottomSheetBehavior;

public class Tracking_Details extends AppCompatActivity {
    Button b1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tracking_details);
        final View mapFrame = findViewById(R.id.mapframe);
        final View bottomSheet = findViewById(R.id.sheet);

        b1=findViewById(R.id.bookAmb);
        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i =new Intent(Tracking_Details.this,azure2.class);
                startActivity(i);
            }
        });
        // Get the BottomSheetBehavior from the FrameLayout
        //final BottomSheetBehavior<View> bottomSheetBehavior = BottomSheetBehavior.from(bottomSheet);

        // Calculate the screen height
        final int screenHeight = getResources().getDisplayMetrics().heightPixels;

        // Calculate the height for the first FrameLayout (75% of screen height)
        final int firstFrameHeight = (int) (screenHeight * 0.75);

        // Calculate the height for the second FrameLayout (25% of screen height)


        // Set the height for the first FrameLayout
        ViewGroup.LayoutParams mapFrameParams = mapFrame.getLayoutParams();
        mapFrameParams.height = firstFrameHeight;
        mapFrame.setLayoutParams(mapFrameParams);


        FragmentManager fragmentManager = getSupportFragmentManager();

        // Create a FragmentTransaction
        FragmentTransaction transaction = fragmentManager.beginTransaction();

        // Add a fragment to the container (R.id.fragment_container) in your layout
        TrackingMap firstFragment = new TrackingMap();
        transaction.add(R.id.mapframe, firstFragment);

        // Commit the transaction
        transaction.commit();
        //View bottomSheet = findViewById(R.id.sheet);

// Get the BottomSheetBehavior from the FrameLayout
        BottomSheetBehavior<View> bottomSheetBehavior = BottomSheetBehavior.from(bottomSheet);
        int peakHeightPixels = (int) (screenHeight * 0.29); // Replace with your desired value
        bottomSheetBehavior.setPeekHeight(peakHeightPixels);

        // Set the initial state of the BottomSheet to collapsed
        bottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
    }
}