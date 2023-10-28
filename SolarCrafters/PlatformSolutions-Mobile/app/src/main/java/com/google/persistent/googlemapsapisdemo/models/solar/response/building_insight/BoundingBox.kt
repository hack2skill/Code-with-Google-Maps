package com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight

import java.io.Serializable

data class BoundingBox(
    val ne: Ne,
    val sw: Sw
):Serializable