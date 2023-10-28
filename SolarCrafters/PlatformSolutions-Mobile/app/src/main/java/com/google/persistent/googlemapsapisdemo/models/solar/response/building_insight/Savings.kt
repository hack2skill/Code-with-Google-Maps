package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class Savings(
    val financiallyViable: Boolean,
    val presentValueOfSavingsLifetime: PresentValueOfSavingsLifetime,
    val presentValueOfSavingsYear20: PresentValueOfSavingsYear20,
    val savingsLifetime: SavingsLifetime,
    val savingsYear1: SavingsYear1,
    val savingsYear20: SavingsYear1
):Serializable