package com.example.godappmaps.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import com.example.godappmaps.R

class GetStartedActivity : AppCompatActivity() {

    private var getStarted: Button? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_get_started)

        getStarted = findViewById(R.id.btn_get_started)
        getStarted?.setOnClickListener {
            val intent = Intent(this, GetInActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
        }
    }

    fun navigateToLoginFormActivity(view: View) {}
    fun navigateToRegistrationForm(view: View) {}
}