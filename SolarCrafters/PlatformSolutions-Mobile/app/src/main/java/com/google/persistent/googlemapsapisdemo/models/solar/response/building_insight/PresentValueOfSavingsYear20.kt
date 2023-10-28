package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class PresentValueOfSavingsYear20(
    val currencyCode: String,
    val nanos: Int,
    val units: String
):Serializable