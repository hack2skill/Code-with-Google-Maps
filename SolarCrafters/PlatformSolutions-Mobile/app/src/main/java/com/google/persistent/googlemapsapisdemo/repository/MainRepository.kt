package com.google.persistent.googlemapsapisdemo.repository

import com.google.persistent.googlemapsapisdemo.models.lookup_render.request.LookupOrRenderVideoReqModel
import com.google.persistent.googlemapsapisdemo.retrofit.ApiHelper


class MainRepository(private val apiHelper: ApiHelper) {
    suspend fun lookupOrRenderVideoByAddress(lookupOrRenderVideoReqModel: LookupOrRenderVideoReqModel) = apiHelper.lookupOrRenderVideoByAddress(lookupOrRenderVideoReqModel)
    suspend fun lookupVideoByVideoId(videoId: String) = apiHelper.lookupVideoByVideoId(videoId = videoId)
    suspend fun lookupVideoByAddress(address: String) = apiHelper.lookupVideoByAddress(address = address)
    suspend fun getDistanceMatrixFromLocation(destinations:String, origins:String) = apiHelper.getDistanceMatrixFromLocation(destinations, origins)
    suspend fun getBuildingInsight(latitude: Double, longitude:Double) = apiHelper.getBuildingInsight(latitude, longitude)
    suspend fun getDataLayerInfo() = apiHelper.getDataLayerInfo()
    suspend fun getGeoTiffImage(idOfGeoTiffImage:String) = apiHelper.getGeoTiffImage(idOfGeoTiffImage)

}