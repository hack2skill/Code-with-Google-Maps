package com.google.persistent.googlemapsapisdemo.activities.solar

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.google.android.gms.maps.CameraUpdate
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.GoogleMap.OnInfoWindowClickListener
import com.google.android.gms.maps.GoogleMap.OnMapLongClickListener
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.GroundOverlayOptions
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.PolygonOptions
import com.google.android.material.slider.Slider
import com.google.persistent.googlemapsapisdemo.R
import com.google.persistent.googlemapsapisdemo.activities.future.NextFutureOfSolarActivity
import com.google.persistent.googlemapsapisdemo.activities.wealth_meter.WealthMeterActivity
import com.google.persistent.googlemapsapisdemo.callbacks.OnImageConversionOperation
import com.google.persistent.googlemapsapisdemo.databinding.ActivitySolarApiBinding
import com.google.persistent.googlemapsapisdemo.dataclasses.LocationDataClass
import com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight.BuildingInsightResponseModel
import com.google.persistent.googlemapsapisdemo.models.solar.response.data_layer.DataLayerResponseModel
import com.google.persistent.googlemapsapisdemo.retrofit.APIStatus
import com.google.persistent.googlemapsapisdemo.retrofit.ApiHelper
import com.google.persistent.googlemapsapisdemo.retrofit.Result
import com.google.persistent.googlemapsapisdemo.retrofit.RetrofitClient
import com.google.persistent.googlemapsapisdemo.utility.AerialViewChecker
import com.google.persistent.googlemapsapisdemo.utility.DialogUtils
import com.google.persistent.googlemapsapisdemo.utility.FileUtils
import com.google.persistent.googlemapsapisdemo.viewmodel_generator.ViewModelFactory
import com.google.persistent.googlemapsapisdemo.viewmodels.MapsViewModel
import com.google.persistent.googlemapsapisdemo.viewmodels.SolarViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


class SolarApiActivity : AppCompatActivity(),
    GoogleMap.OnMapClickListener,
    OnMapReadyCallback,
    View.OnClickListener,
    OnInfoWindowClickListener,
    OnMapLongClickListener,
    Slider.OnChangeListener {

    /** Private local accessible variables, objects and values */
    private lateinit var binding: ActivitySolarApiBinding
    private lateinit var buildingInsightData:BuildingInsightResponseModel
    private lateinit var viewModelForSolar:SolarViewModel
    private lateinit var viewModelFor3dVideo: MapsViewModel
    private lateinit var arialViewChecker: AerialViewChecker
    private lateinit var gMap: GoogleMap
    private var isBuildingAnalyzed = false
    private var highestSliderSlidingVal = 0
    private lateinit var buildingLocation: LocationDataClass
    private lateinit var buildingAddress:String

    /** When activity got created */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySolarApiBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setupViewModel()
        hideUiInitially()
        initUiClickListeners()
        initializeGoogleMap()
    }

    /** Get building address data from Building Listing screen */
    private fun getBuildingLocationData() {
        if (intent.hasExtra(BUILDING_LOCATION_DATA)) {
            buildingLocation = intent.getSerializableExtra(BUILDING_LOCATION_DATA) as LocationDataClass
            buildingAddress = intent.getStringExtra(BUILDING_ADDRESS).toString()
            focusAndMoveToLocation()
        }
    }

    /** Hide unwanted and not shown Ui in startup */
    private fun hideUiInitially() {
        binding.showSolarPanels.visibility = View.GONE
        binding.wealthMeterBTN.visibility = View.GONE
    }

    /** added on UI components interaction events */
    private fun initUiClickListeners() {
        binding.showSolarPanels.setOnClickListener(this)
        binding.threeDupBTN.setOnClickListener(this)
        binding.threeDdownBTN.setOnClickListener(this)
        binding.nextFutureBTN.setOnClickListener(this)
        binding.arielViewVideoBTN.setOnClickListener(this)
        binding.backActionBTN.setOnClickListener(this)
        binding.wealthMeterBTN.setOnClickListener(this)
    }

    /** Initialize the Google Map */
    private fun initializeGoogleMap() {
        val mapFragment = supportFragmentManager.findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    /** Setup view model for this */
    private fun setupViewModel() {
        viewModelForSolar = ViewModelProviders.of(this, ViewModelFactory(ApiHelper(RetrofitClient.apiServiceForSolar)))[SolarViewModel::class.java]
        viewModelFor3dVideo = ViewModelProviders.of(this, ViewModelFactory(ApiHelper(RetrofitClient.apiServiceForArialView)))[MapsViewModel::class.java]
        arialViewChecker = AerialViewChecker(viewModelFor3dVideo, this, this)
    }

    /** This callback is triggered when the map is ready to be used.*/
    override fun onMapReady(googleMap: GoogleMap) {
        gMap = googleMap
        gMap.isBuildingsEnabled = true
        setMapType(GoogleMap.MAP_TYPE_SATELLITE)
        addMapsUiComponentsClickEvent()
        getBuildingLocationData()
    }

    /** Add Map type views */
    private fun setMapType(mapTypeNormal: Int) { gMap.mapType = mapTypeNormal }

    /** Update the camera to focused location with Marker */
    private fun focusAndMoveToLocation() {
        gMap.clear()
        val locationLatLong = LatLng(buildingLocation.latitude, buildingLocation.longitude)
        val cameraPosition = CameraPosition.Builder()
            .target(locationLatLong)
            .zoom(16f)
            .bearing(90f)
            .tilt(30f)
            .build()
        gMap.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition), 3000, null)
        gMap.addMarker(MarkerOptions()
            .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_building_location_pin)).
            position(locationLatLong).title(buildingAddress?:"Not found"))
    }

    /** Added Maps Ui Components Click events */
    private fun addMapsUiComponentsClickEvent() {
        gMap.setOnInfoWindowClickListener(this)
        gMap.setOnMapClickListener(this)
        gMap.setOnMapLongClickListener(this)
    }

    /** Do the Building Insight operation by this SOLAR API call */
    private fun evaluateBuilding(objOfMarker: Marker) {
        highestSliderSlidingVal = 0
        viewModelForSolar.getBuildingInsight(objOfMarker.position.latitude, objOfMarker.position.longitude).observe(this, Observer {
            it?.let { result ->
                when (result.APIStatus) {
                    APIStatus.SUCCESS   -> { handleApiSuccessResponse(result) }
                    APIStatus.ERROR     -> { handleApiFailureResponse(result) }
                    APIStatus.LOADING   -> { DialogUtils.showLoaderDialog("Analysing Roof-top", "Evaluating the building's roof-top for solar potentials.", this) }
                }
            }
        })
    }

    /** Handle the success response of Building Insight API call */
    private fun handleApiSuccessResponse(result: Result<BuildingInsightResponseModel>) {
        DialogUtils.hideLoaderDialog()
        Log.d("response:Building-insight", result.toString())
        if (result.data == null) {
            Toast.makeText(this, "Could not get the building insight data, please try again later.", Toast.LENGTH_LONG).show()
            return
        }
        buildingInsightData = result.data
        addSegmentsMarkers()
        drawBuildingBoundary()
        showPanelCountSliderUiLayout()
        completeFocusOnThisBuilding()
        showUiButtons()
        isBuildingAnalyzed = true
    }

    /** Show Ui components as needed */
    private fun showUiButtons() {
        binding.showSolarPanels.visibility = View.VISIBLE
        //binding.wealthMeterBTN.visibility = View.VISIBLE
    }

    /** When building insight done, let's complete zoom to that location */
    private fun completeFocusOnThisBuilding() {
        val buildingLocation = LatLng(buildingInsightData.center.latitude, buildingInsightData.center.longitude)
        val focusMapCamera2Location: CameraUpdate = CameraUpdateFactory.newLatLngZoom(buildingLocation, 22.toFloat())
        gMap.animateCamera(focusMapCamera2Location)
    }

    /** Add all solar panels on Building Roof-top at a time by clicking */
    private fun addAllSolarPanels() {
        val solarPanels = buildingInsightData.solarPotential.solarPanels
        val panelHeight = buildingInsightData.solarPotential.panelHeightMeters
        val panelWidth = buildingInsightData.solarPotential.panelWidthMeters
        /** Adding image on Ground level */
        solarPanels.forEachIndexed { index, solarPanel ->
            val solarPanelIcon = FileUtils.getDrawableSolarPanel(solarPanel.orientation)
            val groundOverlayLocation = LatLng(solarPanel.center.latitude, solarPanel.center.longitude)
            val groundOverlays = GroundOverlayOptions()
                .image(BitmapDescriptorFactory.fromResource(solarPanelIcon))
                .position(groundOverlayLocation, panelWidth.toFloat(), panelHeight.toFloat())
                .clickable(true)
            gMap.addGroundOverlay(groundOverlays)
        }
        binding.panelCounterNumberTV.text = solarPanels.size.toString()
        binding.sliderForPanel.value = solarPanels.size.toFloat()
    }

    /** Added Panel by Panel on Building Roof-top by Slider change as per user action */
    private fun addSolarPanelsBySliderAction(indexOfPanel:Int) {
        binding.solarPanelsProgressBar.progress = indexOfPanel
        Log.e("position", indexOfPanel.toString())
        val listOfAllSolarPanels = buildingInsightData.solarPotential.solarPanels
        val panelHeight = buildingInsightData.solarPotential.panelHeightMeters
        val panelWidth = buildingInsightData.solarPotential.panelWidthMeters
        /** Adding image on Ground level */
        val solarPanelIcon = FileUtils.getDrawableSolarPanel(listOfAllSolarPanels[indexOfPanel].orientation)
        val groundOverlayLocation = LatLng(listOfAllSolarPanels[indexOfPanel].center.latitude,
            listOfAllSolarPanels[indexOfPanel].center.longitude)
        val groundOverlays = GroundOverlayOptions()
            .image(BitmapDescriptorFactory.fromResource(solarPanelIcon))
            .position(groundOverlayLocation,
                panelWidth.toFloat(),
                panelHeight.toFloat())
            .clickable(true)
        gMap.addGroundOverlay(groundOverlays)
    }

    /** Show and Handle UI for Solar Panel plotting and designing */
    private fun showPanelCountSliderUiLayout() {
        binding.solarPanelActionviewLL.visibility = View.VISIBLE
        binding.sliderForPanel.valueFrom = 1.0f
        binding.sliderForPanel.valueTo = buildingInsightData.solarPotential.maxArrayPanelsCount.toFloat()
        binding.sliderForPanel.addOnChangeListener(this)
        binding.sliderForPanel.value = 1.0f
        binding.solarPanelsProgressBar.max = buildingInsightData.solarPotential.maxArrayPanelsCount
        binding.solarPanelsProgressBar.progress = 1
    }

    /** Draw the building roof-top boundary when Insight API call is done */
    private fun drawBuildingBoundary() {
        val polygonOptions = PolygonOptions()
            .add(LatLng(buildingInsightData.boundingBox.ne.latitude, buildingInsightData.boundingBox.ne.longitude))
            .add(LatLng(buildingInsightData.boundingBox.sw.latitude, buildingInsightData.boundingBox.ne.longitude))
            .add(LatLng(buildingInsightData.boundingBox.sw.latitude, buildingInsightData.boundingBox.sw.longitude))
            .add(LatLng(buildingInsightData.boundingBox.ne.latitude, buildingInsightData.boundingBox.sw.longitude))
            .strokeColor(Color.GREEN)
        gMap.addPolygon(polygonOptions)
    }

    /** Added number of Roof-top Segments */
    private fun addSegmentsMarkers() {
        buildingInsightData.solarPotential.roofSegmentStats.forEachIndexed { index, roofSegmentStat ->
            val location = LatLng(roofSegmentStat.center.latitude, roofSegmentStat.center.longitude)
            gMap.addMarker(MarkerOptions()
                .position(location)
                .title("Segment ${index+1}"))
        }
    }

    /** Handle Building Insight API failure response */
    private fun handleApiFailureResponse(result: Result<BuildingInsightResponseModel>) {
        DialogUtils.hideLoaderDialog()
        Toast.makeText(this, result.toString(), Toast.LENGTH_LONG).show()
        Log.e("Error", result.toString())
    }

    /** Click events interface implementations */
    override fun onClick(v: View?) {
        when(v?.id) {
            R.id.nextFutureBTN          -> showNextFutureOfSolar()
            R.id.showSolarPanels        -> applyAndShowSolarPanels()
            R.id.threeDdownBTN          -> handleMapTilt("plus", 90F)
            R.id.threeDupBTN            -> handleMapTilt("minus", 0F)
            R.id.arielViewVideoBTN      -> handleAerialView()
            R.id.backActionBTN          -> handleScreenExit()
            R.id.wealthMeterBTN         -> openWealthMeterScreen()
        }
    }

    /** Open Wealth Meter screen */
    private fun openWealthMeterScreen() {
        val intentOfWealthMeter = Intent(this, WealthMeterActivity::class.java)
        intentOfWealthMeter.putExtra(WealthMeterActivity.BUILDING_INSIGHT_DATA, buildingInsightData)
        startActivity(intentOfWealthMeter)
    }

    /** Handle screen exit */
    private fun handleScreenExit() { finish() }

    /** Check, validate and show Building in 3-D view mode */
    private fun handleAerialView() {
        arialViewChecker.checkForAerialViewOfThisBuilding(buildingAddress)
    }

    /** Handle Google Map Tilt action with in and out */
    private fun handleMapTilt(tiltToBe: String, floatValToB: Float) {
        try {
            val newTilt: Float = if (tiltToBe == "plus") Math.min(gMap.cameraPosition.tilt + 10, floatValToB)
            else Math.min(gMap.cameraPosition.tilt - 10, floatValToB)
            val cameraPosition = CameraPosition.Builder(gMap.cameraPosition).tilt(newTilt).build()
            gMap.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition), null)
        }
        catch (e:Exception) {
            Log.e("Tilt-Error", e.printStackTrace().toString())
        }
    }

    /** Show all the panels at a time on building roof-top */
    private fun applyAndShowSolarPanels() { addAllSolarPanels() }

    /** Configure and open the Solar Potentials screen */
    private fun showBuildingAnalysisAndSolarData(indexOfSegment: Int) {
        val intentOfSolarDetail = Intent(this, SolarDetailsActivity::class.java)
        CoroutineScope(Dispatchers.Main).launch {
            intentOfSolarDetail.putExtra(SolarDetailsActivity.BUILDING_INSIGHT_DATA, buildingInsightData)
            intentOfSolarDetail.putExtra(SolarDetailsActivity.BUILDING_ROOF_TOP_INDEX, indexOfSegment)
            intentOfSolarDetail.putExtra(SolarDetailsActivity.BUILDING_ADDRESS, buildingAddress)
        }.invokeOnCompletion {
            startActivity(intentOfSolarDetail)
        }
    }

    /** Handle Google Map Marker's info window click */
    override fun onInfoWindowClick(objOfMarker: Marker) {
        if (isBuildingAnalyzed) {
            if (objOfMarker.title!!.contains("Segment")) {
                val segmentIndex = objOfMarker.title?.split("Segment ")
                Log.e("Rooftop-index-id", segmentIndex?.get(1).toString())
                showBuildingAnalysisAndSolarData(segmentIndex?.get(1)!!.toInt())
            }
            else {
                showBuildingAnalysisAndSolarData(SolarDetailsActivity.BUILDING_WHOLE_ROOF_TOP)
            }
            return
        }
        binding.solarPanelActionviewLL.visibility = View.GONE
        binding.spotlightView.visibility = View.GONE
        evaluateBuilding(objOfMarker)
        objOfMarker.hideInfoWindow()
    }

    /** Handle when any click triggered on Google Map */
    override fun onMapClick(p0: LatLng) { Log.e("clicked pos", "${p0.latitude} and ${p0.longitude}") }


    /** Handle Slider Change event */
    @SuppressLint("SetTextI18n")
    override fun onValueChange(slider: Slider, value: Float, fromUser: Boolean) {
        binding.panelCounterTV.text = "Panel Count: ${value.toInt()}/${buildingInsightData.solarPotential.solarPanels.size}"
        val valCurrent = value.toInt() - 1
        if (valCurrent >= highestSliderSlidingVal) {
            highestSliderSlidingVal = valCurrent
            addSolarPanelsBySliderAction(valCurrent)
        }
        //else
        /// think about to remove the Ground overlay images and back add ///// or handle show hide.
    }

    /** Handle Google Map Long CLick event */
    override fun onMapLongClick(latLong: LatLng) {
        val location = LatLng(latLong.latitude, latLong.longitude)
        gMap.addMarker(MarkerOptions().position(location).title("${latLong.latitude} and ${latLong.longitude}"))
    }

    /** Open Solar Next/Future screen */
    private fun showNextFutureOfSolar() {
        startActivity(Intent(this, NextFutureOfSolarActivity::class.java))
    }

    /** Companion properties declarations */
    companion object {
        const val BUILDING_LOCATION_DATA = "building_location"
        const val BUILDING_ADDRESS = "building_address"
    }
}