package com.map.mom.utility

import com.google.android.gms.maps.model.Marker
import com.google.android.libraries.places.api.model.Place

object FeatureUtility {

    fun getFeatureTypeFromName(featureName: String): List<String> {
        return when (featureName) {
            Constants.FEATURE_ACTIVE -> {
                arrayListOf(
                    Place.Type.PARK.toString().lowercase()
                )
            }

            Constants.FEATURE_CRAVINGS -> {
                arrayListOf(
                    Place.Type.RESTAURANT.toString().lowercase(),
                    Place.Type.CAFE.toString().lowercase(),
                    Place.Type.SUPERMARKET.toString().lowercase(),
                    Place.Type.MEAL_DELIVERY.toString().lowercase(),
                    Place.Type.MEAL_TAKEAWAY.toString().lowercase(),
                    Place.Type.FOOD.toString().lowercase()
                )
            }

            Constants.FEATURE_EMERGENCY -> {
                arrayListOf(
                    Place.Type.DOCTOR.toString().lowercase(),
                    Place.Type.PHARMACY.toString().lowercase(),
                    Place.Type.HOSPITAL.toString().lowercase()
                )
            }

            Constants.FEATURE_SAFETY -> {
                arrayListOf(
                    Place.Type.POLICE.toString().lowercase(),
                    Place.Type.FIRE_STATION.toString().lowercase()
                )
            }

            Constants.FEATURE_SHOPPING -> {
                arrayListOf(
                    Place.Type.SHOPPING_MALL.toString().lowercase(),
                    Place.Type.CLOTHING_STORE.toString().lowercase(),
                    Place.Type.JEWELRY_STORE.toString().lowercase()
                )
            }

            else -> arrayListOf()
        }
    }

    fun getKeywordForFeatureType(featureName: String): String {
        return when (featureName) {
            Constants.FEATURE_ACTIVE -> {
                "pregnancy|walking|garden|care|physiotherapy|walkway"
            }

            Constants.FEATURE_CRAVINGS -> {
                "food||healthy|health|juice|fruits|diet|salad|pregnancy"
            }

            Constants.FEATURE_EMERGENCY -> {
                "maternity|gynecologist|obstetrician|prasutigruh|women|pregnancy|pharmacy"
            }

            Constants.FEATURE_SAFETY -> {
                ""
            }

            Constants.FEATURE_SHOPPING -> {
                "baby|pregnant|maternity|women|kids"
            }

            else -> ""
        }
    }

    fun removeAllFeatureMarkers(markerMap: MutableMap<String, MutableList<Marker>>, featureType: String) {
        if (markerMap[featureType] != null) {
            for (marker in markerMap[featureType]!!) {
                marker.remove()
            }
            markerMap[featureType]!!.clear()
        }
    }

}