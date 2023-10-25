package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class BuildingInsightResponseModel(
    val administrativeArea: String,
    val boundingBox: BoundingBox,
    val center: Center,
    val imageryDate: ImageryDate,
    val imageryProcessedDate: ImageryProcessedDate,
    val imageryQuality: String,
    val name: String,
    val postalCode: String,
    val regionCode: String,
    val solarPotential: SolarPotential,
    val statisticalArea: String
):Serializable