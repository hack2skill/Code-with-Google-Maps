package com.google.persistent.googlemapsapisdemo.activities.wealth_meter

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import com.google.android.material.slider.Slider
import com.google.persistent.googlemapsapisdemo.R
import com.google.persistent.googlemapsapisdemo.databinding.ActivityWealthMeterBinding
import com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight.BuildingInsightResponseModel

class WealthMeterActivity : AppCompatActivity(), Slider.OnChangeListener {

    private lateinit var binding: ActivityWealthMeterBinding
    private lateinit var buildingInsightData: BuildingInsightResponseModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWealthMeterBinding.inflate(layoutInflater)
        setContentView(binding.root)
        showToolBar()
        getBuildingInsightData()
        binding.sliderForPanel.addOnChangeListener(this)
        handle()
    }

    private fun getBuildingInsightData() {
        buildingInsightData = intent.getSerializableExtra(BUILDING_INSIGHT_DATA) as BuildingInsightResponseModel
    }

    private fun handle() {
        if (buildingInsightData.solarPotential.financialAnalyses == null) {
            Toast.makeText(this, "No financial details available for this building!", Toast.LENGTH_SHORT).show()
            return
        }
        /*buildingInsightData.solarPotential.financialAnalyses.forEachIndexed { index, financialAnalyse ->
            if (financialAnalyse.financialDetails != null) {
                //totalForYearlyEnergyDcKwh += financialAnalyse.financialDetails.costOfElectricityWithoutSolar.units.toInt()
                //totalSolarPercentage += financialAnalyse.financialDetails.solarPercentage.toInt()
                //totalOfExportedToGridValue += financialAnalyse.financialDetails.percentageExportedToGrid.toInt()
            }
        }*/
        binding.sliderForPanel.valueFrom = 1.0f
        binding.sliderForPanel.valueTo = buildingInsightData.solarPotential.financialAnalyses.size.toFloat()
        binding.sliderForPanel.value = 1.0f
        //binding.sliderForPanel.valueTo = buildingInsightData.solarPotential.financialAnalyses.size.toFloat()
    }

    private fun showToolBar() {
        val toolbar = binding.appToolbarTB.toolbar
        toolbar.findViewById<TextView>(R.id.toolbarMainTitleTV).text = "Solar, The Wealth Meter for tomorrow"
        toolbar.setNavigationOnClickListener { finish() }
    }

    companion object {
        const val BUILDING_INSIGHT_DATA = "building_inside_data"
    }

    var highestSliderSlidingVal = 0
    var totalForYearlyEnergyDcKwh:Int = 0
    override fun onValueChange(slider: Slider, value: Float, fromUser: Boolean) {
        val valCurrent = value.toInt() - 1
        /*if (valCurrent >= highestSliderSlidingVal) {
            highestSliderSlidingVal = valCurrent
            totalForYearlyEnergyDcKwh += buildingInsightData.solarPotential.solarPanels[valCurrent].yearlyEnergyDcKwh.toInt()
        }
        else {
            totalForYearlyEnergyDcKwh -= buildingInsightData.solarPotential.solarPanels[valCurrent].yearlyEnergyDcKwh.toInt()
        }*/
        totalForYearlyEnergyDcKwh += buildingInsightData.solarPotential.financialAnalyses[valCurrent].monthlyBill.units.toInt()
        binding.yrEnergyTV.text = totalForYearlyEnergyDcKwh.toString()
    }
}