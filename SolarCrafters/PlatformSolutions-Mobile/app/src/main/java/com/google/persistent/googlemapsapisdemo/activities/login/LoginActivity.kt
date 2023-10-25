package com.google.persistent.googlemapsapisdemo.activities.login

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.persistent.googlemapsapisdemo.R
import com.google.persistent.googlemapsapisdemo.activities.list_buildings.BuildingAnalysisListActivity
import com.google.persistent.googlemapsapisdemo.databinding.ActivityLoginBinding
import com.google.persistent.googlemapsapisdemo.utility.DialogUtils

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        showToolBar()
        addUiEventListeners()
    }

    private fun showToolBar() {
        val toolbar = binding.appToolbarTB.toolbar
        toolbar.findViewById<TextView>(R.id.toolbarMainTitleTV).text = "Login"
        toolbar.navigationIcon = null
        //setSupportActionBar(toolbar) // Setting/replace toolbar as the ActionBar4
    }

    private fun addUiEventListeners() {
        binding.loginActionBTN.setOnClickListener(uiClickEventListeners)
    }

    private val uiClickEventListeners = View.OnClickListener {
        when(it?.id) {
            R.id.loginActionBTN     -> handleLoginAction()
        }
    }

    private fun handleLoginAction() {
        startActivity(Intent(this, BuildingAnalysisListActivity::class.java))
    }
}