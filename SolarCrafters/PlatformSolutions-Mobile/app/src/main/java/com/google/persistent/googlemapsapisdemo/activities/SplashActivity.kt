package com.google.persistent.googlemapsapisdemo.activities

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat.OnRequestPermissionsResultCallback
import com.google.persistent.googlemapsapisdemo.activities.login.LoginActivity
import com.google.persistent.googlemapsapisdemo.databinding.ActivitySplashBinding


private const val SPLASH_SCREEN_DURATION: Long = 2000

@SuppressLint("CustomSplashScreen")
class SplashActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySplashBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)
        navigateToNextScreen()
    }
    /**
     * do Navigation after SPLASH_SCREEN_DURATION seconds to Next Activity
     */
    private fun navigateToNextScreen() {
        try {
            val timerThread = object : Thread() {
                override fun run() {
                    try {
                        sleep(SPLASH_SCREEN_DURATION)
                    } catch (e: InterruptedException) {
                        e.printStackTrace()
                    } finally {
                        startActivity(Intent(this@SplashActivity, LoginActivity::class.java))
                    }
                }
            }
            timerThread.start()
        } catch (e: Exception) {
            e.toString()
        }
    }
    override fun onPause() {
        super.onPause()
        finish()
    }
}