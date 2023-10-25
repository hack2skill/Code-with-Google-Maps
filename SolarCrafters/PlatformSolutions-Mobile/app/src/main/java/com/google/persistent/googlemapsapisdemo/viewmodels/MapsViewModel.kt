package com.google.persistent.googlemapsapisdemo.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.liveData
import com.google.persistent.googlemapsapisdemo.models.lookup_render.request.LookupOrRenderVideoReqModel
import com.google.persistent.googlemapsapisdemo.repository.MainRepository
import com.google.persistent.googlemapsapisdemo.retrofit.Result
import kotlinx.coroutines.Dispatchers

class MapsViewModel(private val mainRepository: MainRepository): ViewModel() {

    fun lookupOrRenderVideoByAddress(lookupOrRenderVideoReqModel: LookupOrRenderVideoReqModel) = liveData(Dispatchers.IO) {
        emit(Result.loading(data = null))
        try {
            emit(Result.success(data = mainRepository.lookupOrRenderVideoByAddress(lookupOrRenderVideoReqModel)))
        } catch (exception: Exception) {
            emit(Result.error(data = null, message = exception.message ?: "Error Occurred!"))
        }
    }

    fun lookupVideoByVideoId(videoId: String) = liveData(Dispatchers.IO) {
        emit(Result.loading(data = null))
        try {
            emit(Result.success(data = mainRepository.lookupVideoByVideoId(videoId = videoId)))
        } catch (exception: Exception) {
            emit(Result.error(data = null, message = exception.message ?: "Error Occurred!"))
        }
    }

    fun lookupVideoByAddress(address: String) = liveData(Dispatchers.IO) {
        emit(Result.loading(data = null))
        try {
            emit(Result.success(data = mainRepository.lookupVideoByAddress(address = address)))
        } catch (exception: Exception) {
            emit(Result.error(data = null, message = exception.message ?: "Error Occurred!"))
        }
    }
}