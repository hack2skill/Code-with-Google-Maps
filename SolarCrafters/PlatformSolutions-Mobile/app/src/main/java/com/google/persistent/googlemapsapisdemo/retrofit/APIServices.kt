package com.google.persistent.googlemapsapisdemo.retrofit

import com.google.persistent.googlemapsapisdemo.models.distance_matrix.DistanceMatrixResponseModel
import com.google.persistent.googlemapsapisdemo.models.lookup_render.request.LookupOrRenderVideoReqModel
import com.google.persistent.googlemapsapisdemo.models.lookup_render.response.LookupOrRenderVideoResponseModel
import com.google.persistent.googlemapsapisdemo.models.lookupvideo_address.response.LookupVideoByAddressResponseModel
import com.google.persistent.googlemapsapisdemo.models.lookupvideo_video_id.response.LookupVideoByVideoIdResponseModel
import com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight.BuildingInsightResponseModel
import com.google.persistent.googlemapsapisdemo.models.solar.response.data_layer.DataLayerResponseModel
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface APIServices {

    //sample address: Transamerica Pyramid, located at 600 Montgomery St, San Francisco, CA 94111
    /**
     * APIs for  Aerial View (3-D Cinematic view)
     */
    @POST("v1/videos:renderVideo?key=" + RetrofitClient.GOOGLE_CLOUD_APIKEY)
    suspend fun lookupOrRenderVideoByAddress(@Body lookupOrRenderVideoReqModel: LookupOrRenderVideoReqModel): LookupOrRenderVideoResponseModel

    @GET("v1/videos:lookupVideo?key=" + RetrofitClient.GOOGLE_CLOUD_APIKEY)
    suspend fun lookupVideoByVideoId(@Query("videoId") videoId: String): LookupVideoByVideoIdResponseModel

    @GET("v1/videos:lookupVideo?key=" + RetrofitClient.GOOGLE_CLOUD_APIKEY)
    suspend fun lookupVideoByAddress(@Query("address") address: String): LookupVideoByAddressResponseModel

    // endpoint: https://maps.googleapis.com/maps/api/
    // units=imperial
    @GET("distancematrix/json?key="+RetrofitClient.GOOGLE_CLOUD_APIKEY)
    suspend fun getDistanceMatrixFromLocation(@Query("destinations") destinations:String,
                                              @Query("origins") origins:String
                                              /*@Query("units") units: String*/): DistanceMatrixResponseModel

    /** SOLAR APIs */
    /**
     * This service will return complete building analysis
     */
    @GET("v1/buildingInsights:findClosest?&requiredQuality=HIGH&key="+RetrofitClient.GOOGLE_CLOUD_APIKEY)
    suspend fun getBuildingInsight(@Query("location.latitude") latitude: Double,
                                   @Query("location.longitude") longitude:Double): BuildingInsightResponseModel

    /**
     * This service will give you all Daya Layers about the analysed buulding
     */
    @GET("v1/dataLayers:get?location.latitude=${RetrofitClient.LATITUDE_EVALUATE}&location.longitude=${RetrofitClient.LONGITUDE_EVALUATE}&radiusMeters=50&view=FULL_LAYERS&requiredQuality=HIGH&pixelSizeMeters=0.5&key="+RetrofitClient.GOOGLE_CLOUD_APIKEY)
    suspend fun getDataLayerInfo(): DataLayerResponseModel


    /**
     * This service will give you direct raw/stream response of XXX.tiff file from Data Layer.
     * You have to write it's response as FileOutputStream
     * And create directory and then store that physical file in File System
     */
    @GET("v1/geoTiff:get?key="+RetrofitClient.GOOGLE_CLOUD_APIKEY)
    suspend fun getGeoTiffImage(@Query("id") idOfGeoTiffImage:String): Response<ResponseBody>
}