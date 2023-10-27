package com.map.mom.viewmodels

import androidx.lifecycle.ViewModel
import com.map.mom.utility.Constants
import com.map.mom.models.Feature
import com.map.mom.R

class FeaturesViewModel: ViewModel() {

    private val _featureList = mutableListOf<Feature>()
    val featureList: List<Feature> = _featureList

    init {
        _featureList.add(Feature(Constants.FEATURE_ACTIVE, R.drawable.demo, false))
        _featureList.add(Feature(Constants.FEATURE_CRAVINGS, R.drawable.demo, false))
        _featureList.add(Feature(Constants.FEATURE_EMERGENCY, R.drawable.demo, false))
        _featureList.add(Feature(Constants.FEATURE_SAFETY, R.drawable.demo, false))
        _featureList.add(Feature(Constants.FEATURE_SHOPPING, R.drawable.demo, false))
    }

    fun onFeatureClick(position: Int) {
        _featureList[position].isSelected = !_featureList[position].isSelected
    }

    /*fun getSelectedFeatures(): List<Feature> {
        return _featureList.filter { it.isSelected }
    }*/
}