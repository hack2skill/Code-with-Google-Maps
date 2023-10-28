package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class SolarPanel(
    val center: Center,
    val orientation: String,
    val segmentIndex: Int,
    val yearlyEnergyDcKwh: Double
):Serializable