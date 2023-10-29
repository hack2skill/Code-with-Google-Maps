package com.google.maps.android.compose.ViewModel

import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
class RegisterViewModel  : ViewModel()
{
    private val _fromActivity = MutableStateFlow<Boolean>(false)
    val fromActivity: StateFlow<Boolean> = _fromActivity.asStateFlow()


    private val _selectedPlace = MutableStateFlow<String>("")
    val selectedPlace: StateFlow<String> = _selectedPlace.asStateFlow()
    fun goBack()
    {
        Log.d("modelvaluebefore","$_fromActivity.value.toString()  ${fromActivity.value.toString()}")
        _fromActivity.update { true
        }
        Log.d("modelvalueafter","$_fromActivity.value.toString()   ${fromActivity.value.toString()}")

    }

    fun updateLocation(add:String)
    {
        Log.d("before", _selectedPlace.value.toString())
        _selectedPlace.update { add }
        Log.d("beforea", _selectedPlace.value.toString())
    }
    fun reset()
    {
        _fromActivity.update { false }
    }

}