package com.example.godappmaps.activities

import android.content.Intent
import android.content.res.ColorStateList
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.example.godappmaps.R

class ProfileActivity : AppCompatActivity() {
    private lateinit var homeLink: ImageView
    private lateinit var exploreLink: ImageView
    private lateinit var dashboardLink: ImageView

    private lateinit var ownedButton: Button
    private lateinit var leasedButton: Button

    private lateinit var headingProfile: TextView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        handleBar()
        headingProfile = findViewById(R.id.heading_profile)
        try {
            ownedButton = findViewById(R.id.owned_profile)
            ownedButton.setOnClickListener{
                ownedButton.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#698E3F"))
                leasedButton.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#8BC34A"))
                headingProfile.text = "List of Your Owned Lands"
            }
            leasedButton = findViewById(R.id.leased_profile)
            leasedButton.setOnClickListener{
                headingProfile.text = "List of Your Leased Lands"
                ownedButton.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#8BC34A"))
                leasedButton.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#698E3F"))
            }
        }catch (err: Exception){
            Log.e("myTag", "Profile: $err")
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

        exploreLink = findViewById(R.id.exploreLink)
        exploreLink.setOnClickListener{
            val intent = Intent(this, ExploreActivity:: class.java)
            startActivity(intent)
        }

        dashboardLink = findViewById(R.id.dashboardLink)
        dashboardLink.setOnClickListener{
            val intent = Intent(this, DashboardActivity:: class.java)
            startActivity(intent)
        }
    }
}