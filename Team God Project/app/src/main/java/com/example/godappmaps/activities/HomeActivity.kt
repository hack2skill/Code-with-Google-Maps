package com.example.godappmaps.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import androidx.core.os.HandlerCompat
import com.example.godappmaps.R

class HomeActivity : AppCompatActivity() {
    private lateinit var exploreLink: ImageView
    private lateinit var profileLink: ImageView
    private lateinit var dashboardLink: ImageView

    private var doubleBackToExitPressedOnce = false
    private val doubleTapDelay = 2000

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        handleBar()
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (doubleBackToExitPressedOnce) {
            super.onBackPressed()
            return
        }
        this.doubleBackToExitPressedOnce = true
        Toast.makeText(this, "Press back again to exit", Toast.LENGTH_SHORT).show()
        HandlerCompat.postDelayed(HandlerCompat.createAsync(mainLooper), {
            doubleBackToExitPressedOnce = false
        }, null, doubleTapDelay.toLong())
    }

    private fun handleBar(){
        exploreLink = findViewById(R.id.exploreLink)
        exploreLink.setOnClickListener{
            val intent = Intent(this, ExploreActivity:: class.java)
            startActivity(intent)
        }

        profileLink = findViewById(R.id.profileLink)
        profileLink.setOnClickListener{
            val intent = Intent(this, ProfileActivity:: class.java)
            startActivity(intent)
        }

        dashboardLink = findViewById(R.id.dashboardLink)
        dashboardLink.setOnClickListener{
            val intent = Intent(this, DashboardActivity:: class.java)
            startActivity(intent)
        }
    }
}