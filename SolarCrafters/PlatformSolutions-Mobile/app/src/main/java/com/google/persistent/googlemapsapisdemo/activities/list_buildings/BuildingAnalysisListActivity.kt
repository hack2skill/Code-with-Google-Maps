package com.google.persistent.googlemapsapisdemo.activities.list_buildings

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import com.google.persistent.googlemapsapisdemo.R
import com.google.persistent.googlemapsapisdemo.activities.solar.SolarApiActivity
import com.google.persistent.googlemapsapisdemo.adapters.LocationAdapter
import com.google.persistent.googlemapsapisdemo.adapters.OnLocationListItemClicked
import com.google.persistent.googlemapsapisdemo.databinding.ActivityBuildingAnalysisListBinding
import com.google.persistent.googlemapsapisdemo.dataclasses.LocationDataClass
import com.google.persistent.googlemapsapisdemo.utility.BuildingData

class BuildingAnalysisListActivity : AppCompatActivity() {
    private lateinit var binding: ActivityBuildingAnalysisListBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBuildingAnalysisListBinding.inflate(layoutInflater)
        setContentView(binding.root)
        showToolBar()
        showBuildingsToAnalyzeForSolar()
    }
    private fun showToolBar() {
        //val toolbar: Toolbar = findViewById<View>(R.id.toolbar) as Toolbar // get the reference of Toolbar
        val toolbar = binding.appToolbarTB.toolbar
        val title = toolbar.findViewById<TextView>(R.id.toolbarMainTitleTV)
        title.text = "Welcome to Ghar Ghar Solar"
        toolbar.navigationIcon = getDrawable(R.drawable.ic_logout)
        toolbar.setNavigationOnClickListener { finish() }
        //setSupportActionBar(toolbar) // Setting/replace toolbar as the ActionBar4
    }
    private fun showBuildingsToAnalyzeForSolar() {
        binding.locationsRV.adapter = LocationAdapter(BuildingData.getLocationDataList(),
            object : OnLocationListItemClicked {
            override fun onLocationItemClicked(objectOfLocationDataClass: LocationDataClass) {
                val intent2Open = Intent(this@BuildingAnalysisListActivity, SolarApiActivity::class.java)
                intent2Open.putExtra(SolarApiActivity.BUILDING_LOCATION_DATA, objectOfLocationDataClass)
                intent2Open.putExtra(SolarApiActivity.BUILDING_ADDRESS, objectOfLocationDataClass.address)
                startActivity(intent2Open)
            }
        })
    }
}