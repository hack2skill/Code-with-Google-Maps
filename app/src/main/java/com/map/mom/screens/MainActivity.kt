package com.map.mom.screens

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.Color
import android.location.Location
import android.location.LocationManager
import android.net.Uri
import android.os.Bundle
import android.os.Looper
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.Gravity
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import com.google.android.gms.common.api.Status
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.Polyline
import com.google.android.gms.maps.model.PolylineOptions
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.widget.AutocompleteSupportFragment
import com.google.android.libraries.places.widget.listener.PlaceSelectionListener
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.gson.Gson
import com.google.maps.android.PolyUtil
import com.map.mom.BuildConfig
import com.map.mom.R
import com.map.mom.adapters.FeaturesAdapter
import com.map.mom.adapters.RouteDetailAdapter
import com.map.mom.databinding.ActivityMainBinding
import com.map.mom.models.Feature
import com.map.mom.models.RouteDetailData
import com.map.mom.retrofit.RetrofitHelper
import com.map.mom.retrofit.RetrofitResponseManager
import com.map.mom.utility.Constants
import com.map.mom.utility.Constants.GOOGLE_MAPS_PACKAGE_NAME
import com.map.mom.utility.Constants.MAP_TYPE_HYBRID
import com.map.mom.utility.Constants.MAP_TYPE_NORMAL
import com.map.mom.utility.Constants.MAP_TYPE_TERRAIN
import com.map.mom.utility.Constants.iconMarker
import com.map.mom.utility.Constants.placeAPIFields
import com.map.mom.utility.Constants.routeColorList
import com.map.mom.utility.FeatureUtility
import com.map.mom.utility.FeatureUtility.getKeywordForFeatureType
import com.map.mom.utility.FeatureUtility.removeAllFeatureMarkers
import com.map.mom.utility.changeMapView
import com.map.mom.utility.showToast
import com.map.mom.viewmodels.FeaturesViewModel
import okhttp3.MediaType
import okhttp3.RequestBody
import okhttp3.ResponseBody
import org.json.JSONArray
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.Locale

class MainActivity : AppCompatActivity(), OnMapReadyCallback,
    FeaturesAdapter.IOnFeatureItemClickListener,
    RouteDetailAdapter.IOnRouteDetailsItemClickListener {

    companion object {
        private val TAG = this::class.java.name
    }

    private lateinit var mMap: GoogleMap
    private lateinit var binding: ActivityMainBinding
    private var autocompleteFragment: AutocompleteSupportFragment? = null

    private lateinit var featuresAdapter: FeaturesAdapter
    private lateinit var routeDetailAdapter: RouteDetailAdapter
    private lateinit var featuresViewModel: FeaturesViewModel

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var locationCallback: LocationCallback? = null

    private var currentLatLng: LatLng? = null
    private var marker: Marker? = null
    private var markerMap: MutableMap<String, MutableList<Marker>> = mutableMapOf()
    private var routeDetailDataList: MutableList<RouteDetailData> = mutableListOf()
    private var polylineMap: MutableMap<Int, Polyline> = mutableMapOf()
    private var mapTypeList = listOf(MAP_TYPE_NORMAL, MAP_TYPE_HYBRID, MAP_TYPE_TERRAIN)
    private var mapTypeCurrentIndex = 0
    private var destinationLatLang: LatLng? = null
    private var destinationMarker: Marker? = null
    private var destinationLabelMarker: Marker? = null
    private var routeLabelMarkers: MutableList<Marker?> = mutableListOf()

    override fun onStart() {
        super.onStart()
        setupLocationPermission()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        featuresViewModel = ViewModelProvider(this)[FeaturesViewModel::class.java]
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager.findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    //****************************** START GOOGLE MAP VIEW *********************************/
    /*
    * Calls On Google map ready
    * Usage: Setting location permissions and map features are ready to use
    * */
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        mMap.isBuildingsEnabled = true

        setupLocationPermission()
        setupFeaturesAdapter()
        setupPlacesAPI()

        /* Show Street view whenever click event occurs on Google Map*/
        mMap.setOnMapClickListener { clickedLatLng ->
            enableStreetView(clickedLatLng)
        }

        /* Show different types of Map Views */
        binding.imgBtnChangeMapView.setOnClickListener {
            mapTypeCurrentIndex = (mapTypeCurrentIndex + 1) % mapTypeList.size
            mMap.changeMapView(mapTypeList[mapTypeCurrentIndex])
        }

        /* Start Navigating to selected route */
        binding.imgBtnStartNavigation.setOnClickListener {
            if (destinationLatLang != null) {
                startNavigationActivity()
            } else {
                showToast(getString(R.string.empty_destination_navigation_msg))
            }
        }
    }

    //****************************** END GOOGLE MAP VIEW *********************************/

    //****************************** START STREET VIEW API USAGE *********************************/

    /*
    * Start showing street view for particular location
    * */
    private fun enableStreetView(latLng: LatLng) {
        val intent = Intent(this, StreetViewActivity::class.java)
        intent.putExtra("lat", latLng.latitude)
        intent.putExtra("lng", latLng.longitude)
        startActivity(intent)
    }

    //****************************** END STREET VIEW API USAGE *********************************/

    //****************************** START PLACES API INITIALIZATION *********************************/

    /*
    * This function sets up the places api and it's relative autocomplete search view
    * Usage: To search places worldwide
    * */
    private fun setupPlacesAPI() {
        if (!Places.isInitialized()) {      //Initialize Google Place API
            Places.initialize(applicationContext, BuildConfig.MAPS_API_KEY, Locale.US)
        }
        Places.createClient(this)

        //Initialize the AutocompleteSupportFragment to search for a Particular place
        autocompleteFragment =
            supportFragmentManager.findFragmentById(R.id.autocomplete_fragment) as AutocompleteSupportFragment
        if (autocompleteFragment != null) {
            // Specify the types of place data to return.
            autocompleteFragment!!.setPlaceFields(placeAPIFields)
            // Set up a PlaceSelectionListener to handle the response.
            autocompleteFragment!!.setOnPlaceSelectedListener(object : PlaceSelectionListener {
                override fun onPlaceSelected(place: Place) {
                    setDestinationMarker(place)
                    Log.d(TAG, "Destination place id = ${place.id}")
                    if (place.latLng != null) {
                        removeAllFeatureMarkers(
                            markerMap,
                            featuresAdapter.getSelectedFeature() ?: Constants.FEATURE_ACTIVE
                        )
                        getElevationData(place.latLng!!, place.name!!)
                        findRoute(place)
                    }
                }

                override fun onError(status: Status) {
                    Log.i(TAG, "An error occurred: $status")
                }
            })
            //handle on search cancel
            val searchView = autocompleteFragment!!.requireView()
                .findViewById<EditText>(com.google.android.libraries.places.R.id.places_autocomplete_search_input)
            searchView.hint = getString(R.string.search_view_hint)
            searchView.textSize = 16F
            searchView.addTextChangedListener(object : TextWatcher {
                override fun beforeTextChanged(
                    s: CharSequence?,
                    start: Int,
                    count: Int,
                    after: Int
                ) {
                }

                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                override fun afterTextChanged(s: Editable?) {
                    // Check if the text becomes empty, indicating that the user clicked the cancel button
                    if (s.isNullOrEmpty()) {
                        // Handle the cancel button click here
                        emptyRoutes()
                    }
                }
            })
        }
    }

    //****************************** END PLACES API INITIALIZATION *********************************/

    //****************************** START ROUTES API USAGE *********************************/

    /*
    * This function calls when user search for a destination and tries to find route to reach
    * Usage: Get routes using Google's Routes API
    * */
    private fun findRoute(place: Place) {
        val fields =
            "routes.localizedValues.distance,routes.localizedValues.duration,routes.polyline,routes.distanceMeters"
        RetrofitHelper.getRetrofitRoutesObject().findRoute(
            apiKey = BuildConfig.MAPS_API_KEY,
            fields = fields,
            requestBody = RequestBody.create(
                MediaType.parse("application/json"),
                getRoutesRequest(place.id).toString()
            )
        ).enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                if (response.isSuccessful) {
                    val responseJSON = response.body()?.string()
                    responseJSON?.let {
                        val jsonRouteObject = JSONObject(responseJSON)
                        manageRouteData(jsonRouteObject)
                    }
                } else {
                    RetrofitResponseManager.onResponseFailed(response, TAG)
                }
            }

            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                Log.d(TAG, "Response failed")
                Log.getStackTraceString(t)
                hideProgressbar()
            }
        })
    }

    /*
    * This function prepares request data required in Google's Routes API
    * */
    private fun getRoutesRequest(destinationPlaceId: String?): JSONObject {
        val jsonParams = mutableMapOf(
            "origin" to mutableMapOf(
                "location" to mutableMapOf(
                    "latLng" to mutableMapOf(
                        "latitude" to currentLatLng!!.latitude,
                        "longitude" to currentLatLng!!.longitude
                    )
                )
            ),
            "destination" to mutableMapOf("placeId" to destinationPlaceId),
            "travelMode" to "DRIVE",
            "computeAlternativeRoutes" to "true",
            "routingPreference" to "TRAFFIC_AWARE",
            "languageCode" to "en-US",
        )
        return JSONObject(Gson().toJson(jsonParams))
    }

    /*
    * Manage Routes data received from Google's Routes API
    * Usage: Extract requested data and show routes and markers on map
    * */
    private fun manageRouteData(jsonRouteObject: JSONObject) {
        val routesArr = jsonRouteObject.optJSONArray("routes")
        Log.d(TAG, "Response Json = $routesArr")
        if (routesArr != null && routesArr.length() > 0) {
            var totalRoutesAvailable = routesArr.length()
            for (i in 0 until routesArr.length()) {
                val routeObj = JSONObject(routesArr[i].toString())
                val distanceInMtrs = routeObj.optInt("distanceMeters")
                val polylineJsonObj = routeObj.optJSONObject("polyline")
                val encodedPolyline = polylineJsonObj?.optString("encodedPolyline")
                val localizedValuesJsonObj = routeObj.optJSONObject("localizedValues")
                val distanceObj = localizedValuesJsonObj?.optJSONObject("distance")
                val durationObj = localizedValuesJsonObj?.optJSONObject("duration")
                val distance = distanceObj?.optString("text")
                val duration = durationObj?.optString("text")
                Log.d(
                    TAG,
                    "Got route data: distance = $distance\nduration = $duration\nencodedPolyline = $encodedPolyline"
                )
                routeDetailDataList.add(
                    RouteDetailData(
                        distance,
                        distanceInMtrs,
                        duration,
                        i == 0,
                        routeColorList[i]
                    )
                )
                val index = --totalRoutesAvailable
                polylineMap[i] =
                    createRoute(encodedPolyline, routeColorList[i], index)
                routeLabelMarkers.add(showRouteLabel(polylineMap[i]!!, duration!!))
            }
            setUpRouteAdapter(routeDetailDataList)
        } else {
            showToast(getString(R.string.no_route_found))
        }
    }

    /*
    * This function draw route as polyline on map
    * */
    private fun createRoute(encodedPolyline: String?, routeColor: Int, routeNo: Int): Polyline {
        val latLngList = PolyUtil.decode(encodedPolyline)
        val polyline = mMap.addPolyline(
            PolylineOptions().addAll(latLngList).color(routeColor).zIndex(routeNo.toFloat())
                .width(20.0F)
        )
        setMapViewCamera(latLngList)
        return polyline
    }

    /*
    * This function will be called whenever search places changes/cancelled
    * Usage: removes all drawn paths on Google map,
    *        removes route details show as cards,
    *        destination marker
    *        and a route labels
    * */
    private fun emptyRoutes() {
        val indicesToRemove = mutableListOf<Int>()
        polylineMap.forEach { (index, polyline) ->
            polyline.remove()
            indicesToRemove.add(index)
        }

        indicesToRemove.sortedDescending().forEach { index ->
            polylineMap.remove(index)
            if (index >= 0 && index < routeDetailDataList.size) {
                routeDetailDataList.removeAt(index)
                routeDetailAdapter.notifyItemRemoved(index)
            }
        }
        routeLabelMarkers.forEach { it?.remove() }
        destinationMarker?.remove()
        destinationLabelMarker?.remove()
        destinationLatLang = null

        //After removing All details of last search, Locate map to user's location
        moveCameraToCurrentLocation()
    }

    //****************************** END ROUTES API USAGE *********************************/

    //****************************** START PLACES API USAGE *********************************/

    /*
    * Calls when any feature is selected
    * Usage: To find near by places to user's live location based on selected feature
    * */
    private fun getNearByPlaces(featureName: String, position: Int) {
        if (featuresViewModel.featureList[position].isSelected) {
            showProgressbar()
            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                Log.d(TAG, "Missing permissions for locating places")
                requestPermissions(Constants.LOCATION_PERMISSIONS, 111)
                return
            } else {
                fusedLocationClient.lastLocation.addOnSuccessListener { location ->
                    if (location != null) {
                        // Get the latitude and longitude of the user's current location.
                        FeatureUtility.getFeatureTypeFromName(featureName)
                            .forEach { featureType ->
                                val call = RetrofitHelper.getRetrofitObject().getNearbyPlaces(
                                    location = "${location.latitude},${location.longitude}",
                                    radius = 3000, // Radius in meters.
                                    type = featureType,
                                    keyword = getKeywordForFeatureType(featureName),
                                    apiKey = BuildConfig.MAPS_API_KEY
                                )
                                call.enqueue(object : Callback<ResponseBody> {
                                    override fun onResponse(
                                        call: Call<ResponseBody>,
                                        response: Response<ResponseBody>
                                    ) {
                                        if (response.isSuccessful) {
                                            val placesJson = response.body()?.string()
                                            placesJson?.let {
                                                val jsonObject = JSONObject(placesJson)
                                                if (jsonObject.getString("status") == "OK") {
                                                    val resultsArray =
                                                        jsonObject.getJSONArray("results")
                                                    locateFeatureMarkers(resultsArray, featureName)
                                                } else {
                                                    // Handle the case where the response status is not OK
                                                    showToast("Place data not found")
                                                }
                                            }
                                        } else {
                                            // Handle the case where the response status is not OK
                                            showToast("Failed to find place data")
                                            RetrofitResponseManager.onResponseFailed(response, TAG)
                                        }
                                    }

                                    override fun onFailure(
                                        call: Call<ResponseBody>,
                                        t: Throwable
                                    ) {
                                        Log.getStackTraceString(t)
                                    }
                                })
                            }
                        // Get the nearby hospitals using the Nearby Places API.
                    }
                }
            }
        } else {
            removeAllFeatureMarkers(markerMap, featureName)
        }
    }

    /*
    * Calls when selected feature data successfully received from Google Places API
    * Usage: Based on selected feature, show all places as marker on google map
    * */
    fun locateFeatureMarkers(places: JSONArray, featureName: String) {
        val latLngList = mutableListOf<LatLng>()
        for (i in 0 until places.length()) {
            val place = places.getJSONObject(i)
            val name = place.getString("name")
            val vicinity = place.getString("vicinity")
            val geometry = place.getJSONObject("geometry")
            val location = geometry.getJSONObject("location")
            val lat = location.getDouble("lat")
            val lng = location.getDouble("lng")
            val latLng = LatLng(lat, lng)
            latLngList.add(latLng)
            val marker = showMarker(name, latLng, vicinity, iconMarker[featureName])
            markerMap[featureName]!!.add(marker!!)
        }
        if (latLngList.isNotEmpty()) {
            setMapViewCamera(latLngList)
        }
        hideProgressbar()
    }

    //****************************** END PLACES API USAGE *********************************/

    //****************************** START ELEVATION API USAGE *********************************/

    /*
    * This function helps to calculate elevation for particular place
    * Usage: Get Elevation of place from Google's Elevation API
    * */
    private fun getElevationData(destinationLatLang: LatLng, destinationName: String) {
        Log.d(
            TAG,
            "Get elevation for : (${destinationLatLang.latitude}, ${destinationLatLang.longitude})"
        )
        RetrofitHelper.getRetrofitObject().getElevationData(
            "${destinationLatLang.latitude},${destinationLatLang.longitude}",
            apiKey = BuildConfig.MAPS_API_KEY
        ).enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                if (response.isSuccessful) {
                    val responseJson = response.body()?.string()
                    if (responseJson != null) {
                        val jsonElevationDataObj = JSONObject(responseJson)
                        val status = jsonElevationDataObj.optString("status")
                        if (status.equals("OK")) {
                            val resultArr = jsonElevationDataObj.optJSONArray("results")
                            if (resultArr != null) {
                                for (i in 0 until resultArr.length()) {
                                    val dataObj = JSONObject(resultArr[i].toString())
                                    val elevation = dataObj.optString("elevation")
                                    manageElevationData(elevation, destinationName)
                                }
                            }
                        } else {
                            RetrofitResponseManager.onResponseFailed(response, TAG)
                        }
                    }
                }
            }

            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                Log.d(TAG, "Response failed")
                Log.getStackTraceString(t)
                hideProgressbar()
            }
        })
    }

    /*
    * Handle elevation data received for Google Elevation API
    * Usage: Show alerts on risky places for mother and baby
    * */
    private fun manageElevationData(elevation: String, destinationName: String) {
        if (elevation.toDouble() > Constants.max_safe_elevation_mtr) {
            MaterialAlertDialogBuilder(this)
                .setTitle("Avoid Risk: High Altitude Area - $destinationName")
                .setMessage(
                    "This region may have lower oxygen pressure " +
                            "which can affect the oxygen level of both " +
                            "the mother and a developing baby"
                )
                .show()
        }
    }

    //****************************** END ELEVATION API USAGE *********************************/

    /*
    * Check for provider to get location data
    * */
    private fun isProviderEnabled(): Boolean {
        val locationManager = getSystemService(LOCATION_SERVICE) as LocationManager
        return (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) || locationManager.isProviderEnabled(
            LocationManager.NETWORK_PROVIDER
        ))
    }

    /*
    * To request live location up to date
    * */
    private fun requestLocationUpdates() {
        val locationRequest = LocationRequest
            .Builder(Priority.PRIORITY_HIGH_ACCURACY, 1000).build()

        if (locationCallback == null) {
            locationCallback = object : LocationCallback() {
                override fun onLocationResult(locationResult: LocationResult) {
                    Log.d(TAG, "etDeviceCurrentLocation: using request location updates")
                    for (location in locationResult.locations) {
                        if (location != null && currentLatLng == null) {
                            currentLatLng = LatLng(location.latitude, location.longitude)
                            Log.d(TAG, "$currentLatLng")
                        }
                    }
                }
            }
            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                setupLocationPermission()
            }
            fusedLocationClient.requestLocationUpdates(
                locationRequest,
                locationCallback!!,
                Looper.getMainLooper()
            )
        }
    }

    /*
    * To stop live location updates
    * */
    private fun stopLocationUpdates() {
        if (locationCallback != null) fusedLocationClient.removeLocationUpdates(locationCallback!!)
    }

    /*
    * Check for location permission granted or not
    * */
    private fun isLocationPermissionGranted(): Boolean {
        return !(ContextCompat.checkSelfPermission(
            applicationContext,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) != PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(
            applicationContext,
            Manifest.permission.ACCESS_COARSE_LOCATION
        ) != PackageManager.PERMISSION_GRANTED)
    }

    /*
    * This function set up the permission for location
    * */
    private fun setupLocationPermission() {
        if (!isLocationPermissionGranted()) {
            requestPermissions(Constants.LOCATION_PERMISSIONS, 111)
        } else {
            getCurrentLocation()
        }
    }

    /*
    * TO get current(live) location of user
    * */
    private fun getCurrentLocation() {
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        try {
            if (isProviderEnabled()) {
                fusedLocationClient.lastLocation.addOnSuccessListener { location: Location? ->
                    if (location != null) {
                        currentLatLng = LatLng(location.latitude, location.longitude)
                        stopLocationUpdates()
                        showCurrentLocation()
                    } else {
                        Log.d(TAG, "Location Failed")
                        requestLocationUpdates()
                    }
                    // Got last known location. In some rare situations this can be null.
                }
                if (currentLatLng == null) {
                    requestLocationUpdates()
                }
            }
        } catch (e: SecurityException) {
            Log.d(TAG, e.message.toString())
        }
    }

    /*
    * To show live location on map as custom marker
    * */
    private fun showCurrentLocation() {
        if (currentLatLng != null && marker == null) {
            val height = 120
            val width = 120
            val b = BitmapFactory.decodeResource(resources, R.drawable.marker_current)
            val smallMarker = Bitmap.createScaledBitmap(b, width, height, false)
            val smallMarkerIcon = BitmapDescriptorFactory.fromBitmap(smallMarker)
            marker = mMap.addMarker(
                MarkerOptions().position(currentLatLng!!).title("My Location").icon(smallMarkerIcon)
            )
            moveCameraToCurrentLocation()
        }
    }

    /*
    * show map view of user's live location
    * */
    private fun moveCameraToCurrentLocation() {
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(currentLatLng!!, 13f))
    }

    /*
    * To show location as marker on map
    * */
    private fun showMarker(
        name: String?,
        latLng: LatLng?,
        address: String?,
        marker: Int?
    ): Marker? {
        Log.d(TAG, "show marker at: $address")
        val height = 100
        val width = 100
        val b = BitmapFactory.decodeResource(resources, marker!!)
        val smallMarker = Bitmap.createScaledBitmap(b, width, height, false)
        val smallMarkerIcon = BitmapDescriptorFactory.fromBitmap(smallMarker)
        return mMap.addMarker(
            MarkerOptions().position(
                latLng ?: currentLatLng
                ?: LatLng(0.0, 0.0)
            ).title("$name").icon(smallMarkerIcon)
        )
    }

    /*
    * To show map including all the locations requested
    * */
    private fun setMapViewCamera(markerPositions: MutableList<LatLng>) {
        val builder = LatLngBounds.Builder()
        for (pos in markerPositions) {
            builder.include(pos)
        }
        val bounds = builder.build()
        val padding = 100
        mMap.animateCamera(CameraUpdateFactory.newLatLngBounds(bounds, padding))
    }

    /*
    * Calls when search for a particular place
    * Usage: To show marker of searched location as destination
    * */
    private fun setDestinationMarker(place: Place) {
        destinationLatLang = place.latLng
        destinationMarker = mMap.addMarker(
            MarkerOptions()
                .position(place.latLng ?: currentLatLng ?: LatLng(0.0, 0.0))
                .title(place.name)
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
        )
    }

    /*
  * Show label in middle of drawn route on map
  * */
    private fun showRouteLabel(polyline: Polyline, duration: String): Marker? {
        // Create a custom TextView as the label
        val labelView = TextView(this)
        labelView.text = duration
        labelView.setBackgroundColor(Color.BLACK)
        labelView.setTextColor(Color.WHITE)
        labelView.gravity = Gravity.CENTER
        labelView.setPadding(16, 8, 16, 8)

        // Create a MarkerOptions object and set its position to the midpoint of the polyline.
        val markerOptions = MarkerOptions().position(midPointOfPolyline(polyline))
            .icon(BitmapDescriptorFactory.fromBitmap(createLabelBitmap(labelView))) // Create a BitmapDescriptor from the TextView

        // Add the marker as label to the map.
        destinationLabelMarker = mMap.addMarker(markerOptions)!!
        destinationLabelMarker?.showInfoWindow()
        return destinationLabelMarker
    }

    /*
    * This function creates label for route
    * */
    private fun createLabelBitmap(view: View): Bitmap {
        view.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED)
        view.layout(0, 0, view.measuredWidth, view.measuredHeight)
        val bitmap =
            Bitmap.createBitmap(view.measuredWidth, view.measuredHeight, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        view.draw(canvas)
        return bitmap
    }

    /*
    * This function calculates the midpoint of a polyline
    * */
    private fun midPointOfPolyline(polyline: Polyline): LatLng {
        val points = polyline.points
        val size = points.size
        Log.d(TAG, "points = $points\nsize = $size")
        return if (size % 2 != 0) {
            val mid = size / 2
            Log.d(TAG, "points = $points\nsize = $size\nmid=$mid")
            LatLng(
                (points[mid].latitude + points[mid - 1].latitude) / 2,
                (points[mid].longitude + points[mid - 1].longitude) / 2
            )
        } else {
            points[size / 2]
        }
    }

    /*
    * Calls when any of the route is selected from list of route details
    * Usage: To show polyline of route based on route data selection
    * */
    private fun onRouteSelectionChange(clickedIndex: Int) {
        //find highest index in map
        val highestIndex = polylineMap.keys.maxOrNull() ?: 0
        //update indices in map
        polylineMap.forEach { (index, polyline) ->
            polyline.zIndex =
                if (index == clickedIndex) highestIndex.toFloat()
                else if (index >= highestIndex) (index - 1).toFloat()
                else index.toFloat()
        }
    }

    /*
    * Calls When Navigation is about to start
    * Usage: Check and start Google map Navigation based on selected route location
    * */
    private fun startNavigationActivity() {
        val intent = Intent(
            Intent.ACTION_VIEW,
            Uri.parse("google.navigation:q=${destinationLatLang?.latitude},${destinationLatLang?.longitude}")
        ).apply {
            `package` = GOOGLE_MAPS_PACKAGE_NAME
        }
        if (intent.resolveActivity(packageManager) != null)
            startActivity(intent)
        else
            showToast(getString(R.string.google_maps_install_instruction))
    }

    /*
    * To show all features at bottom of the map
    * */
    private fun setupFeaturesAdapter() {
        val list = featuresViewModel.featureList
        for (feature in list) {          //create marker list for each feature to handle check uncheck of feature on map
            markerMap[feature.name] = mutableListOf()
        }
        featuresAdapter = FeaturesAdapter(this, list, this)
        binding.rvFeatures.adapter = featuresAdapter
    }

    /*
    * To show each route details received from Google's Route API
    * */
    private fun setUpRouteAdapter(routeDetailDataList: MutableList<RouteDetailData>) {
        routeDetailAdapter = RouteDetailAdapter(this, routeDetailDataList, this)
        binding.rvRouteDetails.adapter = routeDetailAdapter
    }

    private fun showProgressbar() {
        binding.layoutProgressbar.progressbar.visibility = View.VISIBLE
    }

    private fun hideProgressbar() {
        binding.layoutProgressbar.progressbar.visibility = View.GONE
    }

    /*
    * Calls when any route detail data selected
    * Usage: On route selection, manage route/polylines of the map, also adjust camera view of map
    * */
    override fun onRouteDetailItemClick(position: Int, lastSelectedItemPostion: Int) {
        routeDetailDataList[position].isSelected = true
        routeDetailDataList[lastSelectedItemPostion].isSelected = false
        routeDetailAdapter.notifyItemRangeChanged(0, routeDetailDataList.size)
        onRouteSelectionChange(position)
        setMapViewCamera(mutableListOf(currentLatLng!!, destinationLatLang!!))
    }

    /*
    * Calls when any feature is selected
    * Usage: On feature selection/de-selection, manage markers on the map
    * */
    override fun onItemClick(feature: Feature, position: Int) {
        featuresViewModel.onFeatureClick(position)
        featuresAdapter.notifyItemChanged(position)
        getNearByPlaces(feature.name, position)
    }
}