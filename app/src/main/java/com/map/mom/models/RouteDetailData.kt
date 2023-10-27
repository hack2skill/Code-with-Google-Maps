package com.map.mom.models

data class RouteDetailData(
    var distance: String? = null,
    var distanceInMtrs: Int,
    var duration: String? = null,
    var isSelected: Boolean = false,
    val routeColor: Int
)
