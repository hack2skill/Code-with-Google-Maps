package com.google.persistent.googlemapsapisdemo.retrofit

import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object RetrofitClient {

    private const val CONTENT_TYPE_KEY = "Content-Type"
    private const val CONTENT_TYPE_APPLICATION_JSON = "application/json"

    /** Key is generated and taken from Ghar Ghar Solar Google Cloud Project, it's a MAP Key
     *  also enable Maps SDK for Android
     *  */
    const val GOOGLE_CLOUD_APIKEY = "AIzaSyCWtexTwmn7uHVGGNJbFJUgL8zafOBFRVM"

    /** End point for Google Maps API consume */
    private const val BASE_URL_AERIAL_VIEW_APIs = "https://aerialview.googleapis.com/"
    const val BASE_URL_GOOGLE_MAP_SOLAR_APIs = "https://solar.googleapis.com/"

    const val LATITUDE_EVALUATE = 0f
    const val LONGITUDE_EVALUATE = 0f

    private fun getClient(): Retrofit {
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY

        val client = OkHttpClient.Builder()
            .addInterceptor(Interceptor { chain ->
                val original = chain.request()
                //header
                val request = original.newBuilder()
                    .header(CONTENT_TYPE_KEY, CONTENT_TYPE_APPLICATION_JSON)
                    //.header("access-token", "Utils.access_token")
                    .method(original.method, original.body)
                    .build()
                return@Interceptor chain.proceed(request)
            })
            .addInterceptor(interceptor)
            .connectTimeout(100, TimeUnit.SECONDS)
            .readTimeout(100, TimeUnit.SECONDS)
            .build()
        return Retrofit.Builder()
            .baseUrl(BASE_URL_AERIAL_VIEW_APIs)
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    private fun getClient(endpoint2Use:String): Retrofit {
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY

        val client = OkHttpClient.Builder()
            .addInterceptor(Interceptor { chain ->
                val original = chain.request()
                //header
                val request = original.newBuilder()
                    .header(CONTENT_TYPE_KEY, CONTENT_TYPE_APPLICATION_JSON)
                    //.header("access-token", "Utils.access_token")
                    .method(original.method, original.body)
                    .build()
                return@Interceptor chain.proceed(request)
            })
            .addInterceptor(interceptor)
            .connectTimeout(100, TimeUnit.SECONDS)
            .readTimeout(100, TimeUnit.SECONDS)
            .build()
        return Retrofit.Builder()
            .baseUrl(endpoint2Use)
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    val apiServiceForArialView: APIServices = getClient().create(APIServices::class.java)
    val apiServiceForSolar:APIServices = getClient(BASE_URL_GOOGLE_MAP_SOLAR_APIs).create(APIServices::class.java)
}