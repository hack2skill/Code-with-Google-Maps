package com.google.persistent.googlemapsapisdemo.models.lookup_render.response

data class LookupOrRenderVideoResponseModel(
    val metadata: Metadata,
    val state: String,
    val error: Error
)