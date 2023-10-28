package com.google.persistent.googlemapsapisdemo.retrofit

import com.google.persistent.googlemapsapisdemo.retrofit.APIStatus.ERROR
import com.google.persistent.googlemapsapisdemo.retrofit.APIStatus.LOADING
import com.google.persistent.googlemapsapisdemo.retrofit.APIStatus.SUCCESS


data class Result<out T>(val APIStatus: APIStatus, val data: T?, val message: String?) {
    companion object {
        fun <T> success(data: T): Result<T> =
            Result(APIStatus = SUCCESS, data = data, message = null)
        fun <T> error(data: T?, message: String): Result<T> =
            Result(APIStatus = ERROR, data = data, message = message)
        fun <T> loading(data: T?): Result<T> =
            Result(APIStatus = LOADING, data = data, message = null)
    }
}