package com.google.persistent.googlemapsapisdemo.activities.future

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.TextView
import com.google.persistent.googlemapsapisdemo.R
import com.google.persistent.googlemapsapisdemo.databinding.ActivityNextFutureOfSolarBinding

class NextFutureOfSolarActivity : AppCompatActivity() {
    private lateinit var binding: ActivityNextFutureOfSolarBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityNextFutureOfSolarBinding.inflate(layoutInflater)
        setContentView(binding.root)
        showToolBar()
        showContent()
    }

    private fun showToolBar() {
        val toolbar = binding.appToolbarTB.toolbar
        toolbar.findViewById<TextView>(R.id.toolbarMainTitleTV).text = "Future of Solar & Capabilities"
        toolbar.setNavigationOnClickListener { finish() }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun showContent() {
        binding.futureOfSolarWV.settings.javaScriptEnabled = true
        binding.futureOfSolarWV.webViewClient = object : WebViewClient() {
            @Deprecated("Deprecated in Java")
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                view?.loadUrl(url!!)
                return true
            }
        }
        binding.futureOfSolarWV.loadUrl("file:///android_asset/solar_future.html")
    }
}