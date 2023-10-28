package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class AnnualLoanPayment(
    val currencyCode: String,
    val nanos: Int,
    val units: String
):Serializable