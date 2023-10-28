package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class ImageryProcessedDate(
    val day: Int,
    val month: Int,
    val year: Int
):Serializable