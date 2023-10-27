package com.map.mom.utility

import android.content.Context
import android.widget.Toast
import com.google.android.gms.maps.GoogleMap

fun GoogleMap.changeMapView(mapType: String) {
    when (mapType) {
        Constants.MAP_TYPE_NORMAL -> this.mapType = GoogleMap.MAP_TYPE_NORMAL
        Constants.MAP_TYPE_HYBRID -> this.mapType = GoogleMap.MAP_TYPE_HYBRID
        Constants.MAP_TYPE_TERRAIN -> this.mapType = GoogleMap.MAP_TYPE_TERRAIN
    }
}

fun Context.showToast(message: String){
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}