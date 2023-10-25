package com.google.persistent.googlemapsapisdemo.utility

import com.google.persistent.googlemapsapisdemo.dataclasses.LocationDataClass

object BuildingData {

    fun getLocationDataList(): MutableList<LocationDataClass> {
        val listOfLocation = mutableListOf<LocationDataClass>()
        listOfLocation.add(LocationDataClass(25.8299, -80.195477, "45 Northeast 59th Street, Miami, FL 33137 Lemon City-Little Haiti Miami Florida United States", true))
        listOfLocation.add(LocationDataClass(32.81191404727009, -116.98483049869536, "1226 Pfeifer Lane, El Cajon, CA 92020 El Cajon California United States", true))
        listOfLocation.add(LocationDataClass(34.69218672400119, 135.79361468553543, "Heijo Palace Historical Park, tanida-nara line, Sakicho, Nara, Nara Prefecture 630-8003, Japan", false))
        listOfLocation.add(LocationDataClass(34.693359972717694, 135.7954328879714, "Heijo Palace Historical Park, nara-seika line, Nijoji-minami 5-chome, Nara, Nara Prefecture 630-8577, Japan", false))
        listOfLocation.add(LocationDataClass(34.69396643874814, 135.79543758183718, "Sakicho, Nara, 630-8003, Japan", false))
        listOfLocation.add(LocationDataClass(34.69486785959089, 135.8006839826703, "1151 Sakicho, Nara, 630-8001, Japan", false))
        listOfLocation.add(LocationDataClass(34.69367092494664, 135.79937104135752, "630-8003 Nara, Sakichō, 1151 Ruins Exhibition Hall, Japan", false))
        listOfLocation.add(LocationDataClass(34.69346858559709, 135.79929560422897, "3 Chome-5-Number 1 Nijoojiminami, Nara, 630-8012, Japan", false))
        listOfLocation.add(LocationDataClass(34.693253013702254, 135.7903303205967, "286-1 Sakicho, Nara, 630-8003, Japan", false))
        listOfLocation.add(LocationDataClass(32.81184021979403, -116.97026945650578, "Mountain View, CA 94043, USA", true))
        return listOfLocation
    }
}