package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class LeasingSavings(
    val annualLeasingCost: AnnualLeasingCost,
    val leasesAllowed: Boolean,
    val leasesSupported: Boolean,
    val savings: SavingsXX
):Serializable