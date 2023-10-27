package com.map.mom.utility

import android.Manifest
import android.graphics.Color
import com.google.android.libraries.places.api.model.Place
import com.map.mom.R

object Constants {

    const val GOOGLE_MAPS_PACKAGE_NAME = "com.google.android.apps.maps"

    const val MAP_TYPE_NORMAL = "normal"
    const val MAP_TYPE_HYBRID = "hybrid"
    const val MAP_TYPE_TERRAIN = "terrain"

    const val FEATURE_ACTIVE = "park"
    const val FEATURE_CRAVINGS = "restaurant"
    const val FEATURE_EMERGENCY = "hospital"
    const val FEATURE_SAFETY = "safety"
    const val FEATURE_SHOPPING = "shopping"

    const val max_safe_elevation_mtr = 2590.8

    val placeAPIFields = listOf(
        Place.Field.ID,
        Place.Field.NAME,
        Place.Field.LAT_LNG,
        Place.Field.ADDRESS
    )

    val LOCATION_PERMISSIONS = arrayOf(
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.ACCESS_COARSE_LOCATION
    )

    val featureColorMap = mapOf(
        FEATURE_ACTIVE to android.R.color.holo_green_dark,
        FEATURE_CRAVINGS to android.R.color.holo_orange_dark,
        FEATURE_EMERGENCY to android.R.color.holo_blue_dark,
        FEATURE_SAFETY to R.color.grey,
        FEATURE_SHOPPING to R.color.baby_pink
    )

    val featureImageMap = mapOf(
        FEATURE_ACTIVE to R.drawable.activity,
        FEATURE_CRAVINGS to R.drawable.cravings,
        FEATURE_EMERGENCY to R.drawable.emergency,
        FEATURE_SAFETY to R.drawable.safety,
        FEATURE_SHOPPING to R.drawable.shopping
    )

    val featureTextMap = mapOf(
        FEATURE_ACTIVE to "Want\nrefreshment?",
        FEATURE_CRAVINGS to "Any\nCravings?",
        FEATURE_EMERGENCY to "Have\nEmergency?",
        FEATURE_SAFETY to "Need\nSafety?",
        FEATURE_SHOPPING to "Like\nto Shop?"
    )

    val routeColorList = listOf(
        Color.argb(255, 241, 34, 104),      //pink
        Color.argb(255, 104, 241, 34),
        Color.argb(255, 34, 104, 241),
        Color.argb(255, 33, 243, 225),
        Color.argb(255, 255, 235, 59),
        Color.argb(255, 156, 39, 176),
        Color.argb(255, 248, 59, 255)
    )

    val iconMarker = mapOf(
        FEATURE_ACTIVE to R.drawable.marker_refresh,
        FEATURE_CRAVINGS to R.drawable.marker_cravings,
        FEATURE_EMERGENCY to R.drawable.marker_emergency,
        FEATURE_SAFETY to R.drawable.marker_safety,
        FEATURE_SHOPPING to R.drawable.marker_shopping
    )
}