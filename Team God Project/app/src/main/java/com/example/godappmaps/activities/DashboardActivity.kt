package com.example.godappmaps.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import com.example.godappmaps.R

class DashboardActivity : AppCompatActivity() {
    private lateinit var homeLink: ImageView
    private lateinit var profileLink: ImageView
    private lateinit var exploreLink: ImageView

    private lateinit var btnSubmit: Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        handleBar()

        btnSubmit = findViewById(R.id.btn_submit)
        btnSubmit.setOnClickListener{
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
    }
}