package com.google.persistent.googlemapsapisdemo.dataclasses

import java.io.Serializable

/**
 * This Data class is useful for creating Building list data which is displayed immediate after login
 */
data class LocationDataClass(val latitude: Double,
                             val longitude: Double,
                             val address:String,
                             val isLocationIn3d:Boolean): Serializable
