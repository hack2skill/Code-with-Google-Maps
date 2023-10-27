package com.map.mom.retrofit

import android.util.Log
import okhttp3.ResponseBody
import org.json.JSONObject
import retrofit2.Response

object RetrofitResponseManager {

    fun onResponseFailed(response: Response<ResponseBody>, callerTag: String) {
        try {
            val errorBodyString = response.errorBody()?.string()
            errorBodyString?.let {
                val errorJSON = JSONObject(errorBodyString)
                Log.d(
                    callerTag,
                    "response is failed: ${response.code()}\n $errorBodyString"
                )
                val errorMessage =
                    errorJSON.getString("error") // Replace "error" with the actual key in the error response
                Log.d(callerTag, "Error message: $errorMessage")
            }
        } catch (e: Exception) {
            // Handle JSON parsing error or other exceptions
            Log.e(callerTag, "Error parsing error body: ${e.message}")
        }
    }

}