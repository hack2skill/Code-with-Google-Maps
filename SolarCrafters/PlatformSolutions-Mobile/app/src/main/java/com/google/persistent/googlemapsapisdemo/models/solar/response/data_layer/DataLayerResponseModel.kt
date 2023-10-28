package com.google.persistent.googlemapsapisdemo.models.solar.response.data_layer

data class DataLayerResponseModel(
    val annualFluxUrl: String,
    val dsmUrl: String,
    val hourlyShadeUrls: List<String>,
    val imageryDate: ImageryDate,
    val imageryProcessedDate: ImageryProcessedDate,
    val imageryQuality: String,
    val maskUrl: String,
    val monthlyFluxUrl: String,
    val rgbUrl: String
)