package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class RoofSegmentSummary(
    val azimuthDegrees: Double,
    val panelsCount: Int,
    val pitchDegrees: Double,
    val segmentIndex: Int,
    val yearlyEnergyDcKwh: Double
):Serializable