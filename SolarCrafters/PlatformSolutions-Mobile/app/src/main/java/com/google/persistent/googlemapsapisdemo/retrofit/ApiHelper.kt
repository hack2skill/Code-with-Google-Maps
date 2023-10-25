package com.google.persistent.googlemapsapisdemo.retrofit

import com.google.persistent.googlemapsapisdemo.models.lookup_render.request.LookupOrRenderVideoReqModel

class ApiHelper(private val apiService: APIServices) {
    suspend fun lookupOrRenderVideoByAddress(lookupOrRenderVideoReqModel: LookupOrRenderVideoReqModel) = apiService.lookupOrRenderVideoByAddress(lookupOrRenderVideoReqModel)
    suspend fun lookupVideoByVideoId(videoId: String) = apiService.lookupVideoByVideoId(videoId = videoId)
    suspend fun lookupVideoByAddress(address: String) = apiService.lookupVideoByAddress(address = address)
    suspend fun getDistanceMatrixFromLocation(destinations:String, origins:String) = apiService.getDistanceMatrixFromLocation(destinations, origins)
    suspend fun getBuildingInsight(latitude: Double, longitude:Double) = apiService.getBuildingInsight(latitude, longitude)
    suspend fun getDataLayerInfo() = apiService.getDataLayerInfo()
    suspend fun getGeoTiffImage(idOfGeoTiffImage:String) = apiService.getGeoTiffImage(idOfGeoTiffImage)

}