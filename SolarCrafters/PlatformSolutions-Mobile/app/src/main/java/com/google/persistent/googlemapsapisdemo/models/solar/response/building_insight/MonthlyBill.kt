package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class MonthlyBill(
    val currencyCode: String,
    val units: String
):Serializable