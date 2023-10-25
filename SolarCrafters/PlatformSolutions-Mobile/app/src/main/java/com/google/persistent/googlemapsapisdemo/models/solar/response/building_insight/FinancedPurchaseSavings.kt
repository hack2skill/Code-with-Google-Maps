package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class FinancedPurchaseSavings(
    val annualLoanPayment: AnnualLoanPayment,
    val loanInterestRate: Double,
    val rebateValue: RebateValueX,
    val savings: SavingsX
):Serializable