package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class CashPurchaseSavings(
    val outOfPocketCost: OutOfPocketCost,
    val paybackYears: Double,
    val rebateValue: RebateValue,
    val savings: Savings,
    val upfrontCost: UpfrontCost
):Serializable