package com.google.persistent.googlemapsapisdemo.viewmodel_generator

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.google.persistent.googlemapsapisdemo.repository.MainRepository
import com.google.persistent.googlemapsapisdemo.retrofit.ApiHelper
import com.google.persistent.googlemapsapisdemo.viewmodels.MapsViewModel
import com.google.persistent.googlemapsapisdemo.viewmodels.SolarViewModel

@Suppress("UNCHECKED_CAST")
class ViewModelFactory(private val apiHelper: ApiHelper) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MapsViewModel::class.java)) {
            return MapsViewModel(MainRepository(apiHelper)) as T
        }
        /*else if (modelClass.isAssignableFrom(RouteViewModel::class.java)) {
            return RouteViewModel(MainRepository(apiHelper)) as T
        }*/
        else if (modelClass.isAssignableFrom(SolarViewModel::class.java)) {
            return SolarViewModel(MainRepository(apiHelper)) as T
        }
        throw IllegalArgumentException("Unknown class name")
    }


}

