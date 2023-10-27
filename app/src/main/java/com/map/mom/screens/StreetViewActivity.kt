package com.map.mom.screens

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.common.api.Status
import com.google.android.gms.maps.StreetViewPanorama
import com.google.android.gms.maps.SupportStreetViewPanoramaFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.widget.AutocompleteSupportFragment
import com.google.android.libraries.places.widget.listener.PlaceSelectionListener
import com.map.mom.BuildConfig
import com.map.mom.R
import com.map.mom.databinding.ActivityStreetViewBinding
import com.map.mom.utility.Constants.placeAPIFields
import com.map.mom.utility.showToast
import java.util.Locale

class StreetViewActivity : AppCompatActivity() {

    companion object {
        private val TAG = this::class.java.name
    }
    private lateinit var binding: ActivityStreetViewBinding
    private var mStreetViewPanorama: StreetViewPanorama? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityStreetViewBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val streetViewPanoramaFragment =
            supportFragmentManager
                .findFragmentById(R.id.street_view_panorama) as SupportStreetViewPanoramaFragment
        streetViewPanoramaFragment.initStreetViewFragment(savedInstanceState)

        val autocompleteFragment =
            supportFragmentManager.findFragmentById(R.id.autocomplete_fragment) as AutocompleteSupportFragment
        setUpPlaceAPI()
        autocompleteFragment.placeSelectionHandler()
    }

    private fun SupportStreetViewPanoramaFragment.initStreetViewFragment(savedInstanceState: Bundle?) {
        //must be called on a main thread
        this.getStreetViewPanoramaAsync { panorama ->
            mStreetViewPanorama = panorama
            if (savedInstanceState == null) {        //no panoramas have been loaded
                intent.extras?.let {
                    val lat = it.getDouble("lat")
                    val lng = it.getDouble("lng")
                    Log.d("Activity", "Streetview: latlang = ${LatLng(lat, lng)}")
                    showPanorama(LatLng(lat, lng))
                }
            }
        }
    }

    private fun setUpPlaceAPI() {
        if (!Places.isInitialized()) {
            Places.initialize(applicationContext, BuildConfig.MAPS_API_KEY, Locale.US)
        }
        Places.createClient(this)
    }

    private fun AutocompleteSupportFragment.placeSelectionHandler() {
        this.setPlaceFields(placeAPIFields)
        this.setOnPlaceSelectedListener(object : PlaceSelectionListener {
            override fun onPlaceSelected(place: Place) {
                if (place.latLng != null) {
                    showPanorama(place.latLng!!)
                }
                else{
                    showToast("Place Not Found")
                }
            }

            override fun onError(status: Status) {
                Log.i(TAG, "An error occurred: $status")
            }
        })
    }

    private fun showPanorama(latLng: LatLng) {
        Log.d(TAG, "show street view for location: latLng = $latLng")
        if (mStreetViewPanorama != null) {
            try {
                mStreetViewPanorama!!.setPosition(latLng)
            } catch (e: Exception) {
                showToast("No View Available")
                Log.d(TAG, e.message.toString())
                e.printStackTrace()
            }
        }
    }
}