package com.google.persistent.googlemapsapisdemo.utility

import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.GroundOverlayOptions
import com.google.android.gms.maps.model.LatLng
import com.google.persistent.googlemapsapisdemo.R

object MapUtils {

    /** Get GroundOverlay as demand */
    fun getGroundOverlay(
        groundOverlayLocation: LatLng,
        solarPanelIcon: Int,
        panelWidth: Float,
        panelHeight: Float
    ): GroundOverlayOptions {
        return GroundOverlayOptions()
            .image(BitmapDescriptorFactory.fromResource(solarPanelIcon))
            .position(groundOverlayLocation, panelWidth, panelHeight)
            .clickable(true)
    }

    /** Get solar panel icon */
    fun getDrawableSolarPanel(solarPanelType:String): Int {
        return if (solarPanelType == "LANDSCAPE") R.drawable.ic_single_solar_panel_flat_image_landscape
        else R.drawable.ic_single_solar_panel_flat_image_portrait
    }
}