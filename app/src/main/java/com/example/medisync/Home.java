package com.example.medisync;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;

public class Home extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
       @SuppressLint({"MissingInflatedId", "LocalSuppress"}) final View Frame1 = findViewById(R.id.FrameScroll);
       final View NavigationBar=findViewById(R.id.bottomNavigationView);



        final int screenHeight = getResources().getDisplayMetrics().heightPixels;

        // Calculate the height for the first FrameLayout (75% of screen height)
        final int firstFrameHeight = (int) (screenHeight * 0.95);
        ViewGroup.LayoutParams FrameParams = Frame1.getLayoutParams();
        FrameParams.height = firstFrameHeight;
        Frame1.setLayoutParams(FrameParams);





        FragmentManager fragmentManager = getSupportFragmentManager();

        // Create a FragmentTransaction
        FragmentTransaction transaction = fragmentManager.beginTransaction();

        // Add a fragment to the container (R.id.fragment_container) in your layout
        HomeFragment firstFragment = new HomeFragment();
        transaction.add(R.id.homeFrame, firstFragment);

        // Commit the transaction
        transaction.commit();
    }
}