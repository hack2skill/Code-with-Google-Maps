package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class Stats(
    val areaMeters2: Double,
    val groundAreaMeters2: Double,
    val sunshineQuantiles: List<Double>
):Serializable