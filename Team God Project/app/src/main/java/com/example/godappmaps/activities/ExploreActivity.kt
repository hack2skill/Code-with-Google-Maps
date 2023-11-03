package com.example.godappmaps.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import com.example.godappmaps.R

class ExploreActivity : AppCompatActivity() {
    private lateinit var homeLink: ImageView
    private lateinit var profileLink: ImageView
    private lateinit var dashboardLink: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_explore)

        handleBar()

        var button1: Button = findViewById(R.id.view_1)
        var button2: Button = findViewById(R.id.view_2)
        var button3: Button = findViewById(R.id.view_3)
        var button4: Button = findViewById(R.id.view_4)

        button1.setOnClickListener{
            val intent = Intent(this, LandDetailsActivity:: class.java)
            startActivity(intent)
        }
        button2.setOnClickListener{
            val intent = Intent(this, LandDetailsActivity:: class.java)
            startActivity(intent)
        }
        button3.setOnClickListener{
            val intent = Intent(this, LandDetailsActivity:: class.java)
            startActivity(intent)
        }
        button4.setOnClickListener{
            val intent = Intent(this, LandDetailsActivity:: class.java)
            startActivity(intent)
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