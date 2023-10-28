package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class SolarPotential(
    val buildingStats: BuildingStats,
    val carbonOffsetFactorKgPerMwh: Double,
    val financialAnalyses: List<FinancialAnalyse>,
    val maxArrayAreaMeters2: Double,
    val maxArrayPanelsCount: Int,
    val maxSunshineHoursPerYear: Double,
    val panelCapacityWatts: Int,
    val panelHeightMeters: Double,
    val panelLifetimeYears: Int,
    val panelWidthMeters: Double,
    val roofSegmentStats: List<RoofSegmentStat>,
    val solarPanelConfigs: List<SolarPanelConfig>,
    val solarPanels: List<SolarPanel>,
    val wholeRoofStats: WholeRoofStats
):Serializable