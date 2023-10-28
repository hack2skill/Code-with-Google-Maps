package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class SolarPanelConfig(
    val panelsCount: Int,
    val roofSegmentSummaries: List<RoofSegmentSummary>,
    val yearlyEnergyDcKwh: Double
):Serializable