package com.example.godappmaps.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import com.example.godappmaps.R

class LandDetailsActivity : AppCompatActivity() {
    private lateinit var homeLink: ImageView
    private lateinit var profileLink: ImageView
    private lateinit var dashboardLink: ImageView

    private lateinit var getRent: Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_land_details)

        handleBar()

        getRent = findViewById(R.id.get_landDetails)
        getRent.setOnClickListener{
            Toast.makeText(this, "Your request is put up to progress", Toast.LENGTH_LONG).show()
        }
    }

    private fun handleBar(){
        homeLink = findViewById(R.id.homeLink)
        homeLink.setOnClickListener{
            val intent = Intent(this, HomeActivity:: class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TOP
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