package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class RoofSegmentStat(
    val azimuthDegrees: Double,
    val boundingBox: BoundingBoxX,
    val center: Center,
    val pitchDegrees: Double,
    val planeHeightAtCenterMeters: Double,
    val stats: Stats
):Serializable