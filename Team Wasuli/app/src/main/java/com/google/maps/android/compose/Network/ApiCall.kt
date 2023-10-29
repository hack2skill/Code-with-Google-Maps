package com.google.maps.android.compose.Network

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.api.net.FetchPhotoRequest
import com.google.android.libraries.places.api.net.FetchPlaceRequest
import com.google.gson.Gson
import com.google.maps.android.compose.BuildConfig
import com.google.maps.android.compose.model.AirQualityResponse
import com.google.maps.android.compose.model.DirectionsResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okio.IOException
import kotlin.coroutines.resume



suspend fun makeDirectionsApiCall() : DirectionsResponse? {
    val API_KEY = BuildConfig.MAPS_API_KEY
    return suspendCancellableCoroutine { continuation ->
        val client = OkHttpClient()
        val jsonMediaType = "application/json".toMediaTypeOrNull()

        val requestBody = RequestBody.create(
            jsonMediaType, """
        {
          "origin": {
            "location": {
              "latLng": {
                "latitude": -33.87072386019095,
                "longitude": 151.1976422635673
              }
            }
          },
          "destination": {
            "location": {
              "latLng": {
                "latitude": -33.85881632243714,
                "longitude": 151.2135552186834
              }
            }
          },
          "travelMode": "DRIVE",
          "routingPreference": "TRAFFIC_AWARE",
          "departureTime": "2023-11-25T15:01:23.045123456Z",
          "computeAlternativeRoutes": false,
          "routeModifiers": {
            "avoidTolls": false,
            "avoidHighways": false,
            "avoidFerries": false
          },
          "languageCode": "en-US",
          "units": "IMPERIAL"
        }
    """.trimIndent()
        )

        val request = Request.Builder()
            .url("https://routes.googleapis.com/directions/v2:computeRoutes")
            .addHeader("Content-Type", "application/json")
            .addHeader("X-Goog-Api-Key", API_KEY)
            .addHeader(
                "X-Goog-FieldMask",
                "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
            )
            .post(requestBody)
            .build()

        client.newCall(request).enqueue(object : okhttp3.Callback {

            override fun onFailure(call: okhttp3.Call, e: IOException) {
                continuation.resumeWith(Result.failure(e))
            }

            override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                val responseBody = response.body?.string()
                val directionsResponse =
                    Gson().fromJson(responseBody, DirectionsResponse::class.java)

                // Handle the directionsResponse as needed
                val routes = directionsResponse.routes
                if (routes.isNotEmpty()) {
                    print("$\nroutes.size is ${routes.size}\n")
                    val firstRoute = routes[0]
                    val distanceMeters = firstRoute.distanceMeters
                    val duration = firstRoute.duration
                    val encodedPolyline = firstRoute.polyline.encodedPolyline
                    println("$distanceMeters $duration $encodedPolyline")
                }
                continuation.resume(directionsResponse)
            }

        })
    }
}



suspend fun makeAirQualityApiCall(selectedPlace : String) : AirQualityResponse? {
    val API_KEY = BuildConfig.MAPS_API_KEY
    var lat : String
    var lan: String
    if(selectedPlace == "Archopolis of Athens")
    {
        lat = "28.7041"
        lan = "77.102"
    }
    else
    {
        lat = "37.9715"
        lan = "23.7257"
    }

    return suspendCancellableCoroutine { continuation ->
        val client = OkHttpClient()
        val jsonMediaType = "application/json".toMediaTypeOrNull()

        val requestBody = RequestBody.create(
            jsonMediaType, """
        {
          "location": {
            "latitude": 37.419734,
            "longitude": -122.0827784
          }
        }
    """.trimIndent()
        )

        val request = Request.Builder()
            .url("https://airquality.googleapis.com/v1/currentConditions:lookup?key=$API_KEY")
            .addHeader("Content-Type", "application/json")
            .post(requestBody)
            .build()

        client.newCall(request).enqueue(object : okhttp3.Callback {
            override fun onFailure(call: okhttp3.Call, e: IOException) {
                println("${e.message}")
                continuation.resumeWith(Result.failure(e))
            }

            override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                val responseBody = response.body?.string()
                val airQualityResponse =
                    Gson().fromJson(responseBody, AirQualityResponse::class.java)

                // Handle the airQualityResponse as needed
                val dateTime = airQualityResponse.dateTime
                val regionCode = airQualityResponse.regionCode
                val indexes = airQualityResponse.indexes
                if (indexes.isNotEmpty()) {
                    val firstIndex = indexes[0]
                    val code = firstIndex.code
                    val displayName = firstIndex.displayName
                    val aqi = firstIndex.aqi
                    val aqiDisplay = firstIndex.aqiDisplay
                    val color = firstIndex.color
                    val category = firstIndex.category
                    val dominantPollutant = firstIndex.dominantPollutant
                    Log.d("airquality:","$code $displayName $dominantPollutant $aqi $aqiDisplay  $color $category")
                }
                continuation.resume(airQualityResponse)
            }
        })
    }
}


suspend fun getImage(applicationContext: Context): List<android.graphics.Bitmap> {
    val API_KEY = BuildConfig.MAPS_API_KEY
    return withContext(Dispatchers.IO) {
        Places.initialize(applicationContext, API_KEY)
        val placesClient = Places.createClient(applicationContext)

        val placeId = "ChIJ3S-JXmauEmsRUcIaWtf4MzE"
        val fields = listOf(Place.Field.PHOTO_METADATAS)
        val placeRequest = FetchPlaceRequest.newInstance(placeId, fields)

        val myBitmap: MutableList<Bitmap> = mutableListOf()

        try {
            val response = placesClient.fetchPlace(placeRequest).await()
            val place = response.place
            val metada = place.photoMetadatas

            if (metada != null) {
                for (i in 0 until metada.size) {
                    val photoMetadata = metada[i]
                    val photoRequest = FetchPhotoRequest.builder(photoMetadata)
                        .setMaxWidth(500) // Optional.
                        .setMaxHeight(300) // Optional.
                        .build()

                    try {
                        val fetchPhotoResponse = placesClient.fetchPhoto(photoRequest).await()
                        val bitmap = fetchPhotoResponse.bitmap
                        myBitmap.add(bitmap)
                    } catch (e: Exception) {
                        // Handle fetchPhoto error
                    }
                }
            }
        } catch (e: Exception) {
            // Handle fetchPlace error
        }

        myBitmap
    }
}


//fun main(){
//    //routes api call
//    makeDirectionsApiCall()
//    print("\n")
//    //air quality api call
//    makeAirQualityApiCall()
//
//}
