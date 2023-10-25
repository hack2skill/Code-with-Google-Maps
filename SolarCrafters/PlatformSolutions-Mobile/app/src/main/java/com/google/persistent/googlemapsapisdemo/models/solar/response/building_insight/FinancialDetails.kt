package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class FinancialDetails(
    val costOfElectricityWithoutSolar: CostOfElectricityWithoutSolar,
    val federalIncentive: FederalIncentive,
    val initialAcKwhPerYear: Double,
    val lifetimeSrecTotal: LifetimeSrecTotal,
    val netMeteringAllowed: Boolean,
    val percentageExportedToGrid: Double,
    val remainingLifetimeUtilityBill: RemainingLifetimeUtilityBill,
    val solarPercentage: Double,
    val stateIncentive: StateIncentive,
    val utilityIncentive: UtilityIncentive
):Serializable