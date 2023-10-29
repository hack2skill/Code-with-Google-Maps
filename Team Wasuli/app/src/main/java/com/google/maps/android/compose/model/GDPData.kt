package com.google.maps.android.compose.model

import androidx.compose.ui.graphics.Color

data class GDPData(
    val country: String,
    val growthRates: List<Float>
)

data class PopulationData(
    val seriesName: String,
    val seriesCode: String,
    val countryName: String,
    val countryCode: String,
    val years: Map<String, Int>
)

data class ImageData(
    val name : String,
    val image : Int,
    var color : Color
)



//Air qulaity response
data class Colo(val red: Float, val green: Float, val blue: Float)
data class Index(
    val code: String,
    val displayName: String,
    val aqi: Int,
    val aqiDisplay: String,
    val color: Colo,
    val category: String,
    val dominantPollutant: String
)
data class AirQualityResponse(
    val dateTime: String,
    val regionCode: String,
    val indexes: List<Index>
)

//Route Response
data class Location(val latLng: LatLng)
data class LatLng(val latitude: Double, val longitude: Double)
data class Polyline(val encodedPolyline: String)
data class Route(
    val distanceMeters: Int,
    val duration: String,
    val polyline: Polyline
)
data class iamge(
    var image : List<android.graphics.Bitmap>? = null
)
data class DirectionsResponse(val routes: List<Route>)

data class Coordinates(var lat: Double, var long: Double)