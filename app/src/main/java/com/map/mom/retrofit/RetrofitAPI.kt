package com.map.mom.retrofit

import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface RetrofitAPI {

    @GET("maps/api/place/nearbysearch/json")
    fun getNearbyPlaces(
        @Query("location") location: String,
        @Query("radius") radius: Int,
        @Query("type") type: String,
        @Query("keyword") keyword: String,
        @Query("key") apiKey: String
    ): Call<ResponseBody>

    @POST("directions/v2:computeRoutes")
    fun findRoute(
        @Query("key") apiKey: String,
        @Query("fields") fields: String,
        @Body requestBody: RequestBody
    ): Call<ResponseBody>

    @GET("maps/api/elevation/json")
    fun getElevationData(
        @Query("locations") locations: String,
        @Query("key") apiKey: String
    ): Call<ResponseBody>
}