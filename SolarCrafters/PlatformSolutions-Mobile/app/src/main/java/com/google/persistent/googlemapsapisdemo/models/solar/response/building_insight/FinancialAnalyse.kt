package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class FinancialAnalyse(
    val cashPurchaseSavings: CashPurchaseSavings,
    val defaultBill: Boolean,
    val financedPurchaseSavings: FinancedPurchaseSavings,
    val financialDetails: FinancialDetails,
    val leasingSavings: LeasingSavings,
    val monthlyBill: MonthlyBill,
    val panelConfigIndex: Int
):Serializable