package com.google.maps.android.compose

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity.RESULT_OK
import android.content.Context
import android.content.Context.LOCATION_SERVICE
import android.content.IntentSender
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationManager
import android.util.Log
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.IntentSenderRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import androidx.core.app.ActivityCompat
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationAvailability
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.LocationSettingsRequest
import com.google.android.gms.location.LocationSettingsResponse
import com.google.android.gms.location.Priority
import com.google.android.gms.location.SettingsClient
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.tasks.Task


private var currentLocation: Location? = null
private lateinit var locationCallback: LocationCallback
private lateinit var locationRequest: LocationRequest
private lateinit var fusedLocationProviderClient: FusedLocationProviderClient

@Composable
fun Permisssion(done : (Boolean) -> Unit)
{
    val context =  LocalContext.current
    val requestLocationPermission = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted: Boolean ->
        done(isGranted)
    }
    if (ActivityCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) != PackageManager.PERMISSION_GRANTED
    ) {
        requestLocationPermission.launch(android.Manifest.permission.ACCESS_FINE_LOCATION)
    }
    else
    {
        done(true)
    }
}
@SuppressLint("MissingPermission")
@Composable
fun Layout(check: (LatLng) -> Unit) {
    Log.d("called", "yes")
    val context = LocalContext.current
    val locationManager = context.getSystemService(LOCATION_SERVICE) as LocationManager
    val already = remember{
        mutableStateOf(locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER))}
    fusedLocationProviderClient= LocationServices.getFusedLocationProviderClient(context)

    val hasLocationPermission = remember{ mutableStateOf(false) }

    val settingResultRequest = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.StartIntentSenderForResult()
    ) { activityResult ->
        if (activityResult.resultCode == RESULT_OK)
            Log.d("appDebug", "Accepted")
        else {
            Log.d("appDebug", "Denied")
        }
    }
    if(!hasLocationPermission.value)
    {
        Permisssion()
        {
            hasLocationPermission.value = it

        }
    }


    if(!already.value && hasLocationPermission.value)
    {
        Log.d("calling check location", "hh")
        checkLocationSetting(
            context = context,
            onDisabled = { intentSenderRequest ->
                settingResultRequest.launch(intentSenderRequest)
            },
            onEnabled = {

                already.value = true
                check(it)
            }
        )
    }
    if (hasLocationPermission.value && already.value) {
        Log.d("both true", "yes")
        fusedLocationProviderClient.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, null).addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val locationResult = task.result
                if (locationResult != null) {
                    Log.d("got", locationResult.latitude.toString())
                    Log.d("currentLocation",  locationResult.latitude.toString())
                    check(LatLng(locationResult.latitude, locationResult.longitude))
                } else {
                    Log.e("Error", "Location result is null")
                }
            } else {
                Log.e("Error", "Failed to get location: ${task.exception?.message}")
            }
        }
    }


}


// call this function on button click
@SuppressLint("MissingPermission")
fun checkLocationSetting(
    context: Context,
    onDisabled: (IntentSenderRequest) -> Unit,
    onEnabled: (LatLng) -> Unit
) {



    val locationRequest = LocationRequest.create().apply {
        interval = 1000
        fastestInterval = 1000
        priority = LocationRequest.PRIORITY_HIGH_ACCURACY
    }

    val client: SettingsClient = LocationServices.getSettingsClient(context)
    val builder: LocationSettingsRequest.Builder = LocationSettingsRequest
        .Builder()
        .addLocationRequest(locationRequest)

    val gpsSettingTask: Task<LocationSettingsResponse> =
        client.checkLocationSettings(builder.build())

    gpsSettingTask.addOnSuccessListener {  }
    gpsSettingTask.addOnFailureListener { exception ->
        if (exception is ResolvableApiException) {
            try {
                val intentSenderRequest = IntentSenderRequest
                    .Builder(exception.resolution)
                    .build()
                onDisabled(intentSenderRequest)
            } catch (sendEx: IntentSender.SendIntentException) {
                // ignore here
            }
        }
    }
    gpsSettingTask.addOnCompleteListener{
            result -> Log.d("Now avaiblabe", "ues")
    }

    locationCallback = object : LocationCallback() {
        override fun onLocationAvailability(p0: LocationAvailability) {
            Log.d("Now available", "hmm")
            super.onLocationAvailability(p0)
            fusedLocationProviderClient.removeLocationUpdates(locationCallback)
        }

        override fun onLocationResult(p0: LocationResult) {
            super.onLocationResult(p0)
            Log.d("Now result", "hmm")
            currentLocation = p0.locations[0]
//            currentLocation.longitude = p0.lastLocation.longitude
            Log.d("coordinates", p0.lastLocation!!.latitude.toString() + p0.lastLocation!!.longitude.toString())
            fusedLocationProviderClient.removeLocationUpdates(locationCallback)
            onEnabled(LatLng(p0.lastLocation!!.latitude, p0.lastLocation!!.longitude))
        }
    }
    fusedLocationProviderClient.requestLocationUpdates(locationRequest, locationCallback, null)

}