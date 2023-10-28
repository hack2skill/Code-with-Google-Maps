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
        binding.sliderForPanel.visibility = View.GONE
        binding.wealthMeterActionBTN.setOnClickListener {
            handle()
        }
    }

    private fun getBuildingInsightData() {
        buildingInsightData = intent.getSerializableExtra(BUILDING_INSIGHT_DATA) as BuildingInsightResponseModel
        if (buildingInsightData.solarPotential.financialAnalyses == null) {
            Toast.makeText(this, "No financial details available for this building!", Toast.LENGTH_SHORT).show()
            finish()
        }
    }

    private fun handle() {
        if (binding.consuTIL.editText?.text?.toString().isNullOrEmpty()) {
            Toast.makeText(this, "Please enter Avg. monthly consumptions units", Toast.LENGTH_SHORT).show()
            return
        }
        if (binding.consumRatePerUnitTIL.editText?.text?.toString().isNullOrEmpty()) {
            Toast.makeText(this, "Please enter rates/unit for Avg. monthly consumptions", Toast.LENGTH_SHORT).show()
            return
        }
        if (binding.prodTIL.editText?.text?.toString().isNullOrEmpty()) {
            Toast.makeText(this, "Please enter monthly production units", Toast.LENGTH_SHORT).show()
            return
        }
        if (binding.productionRatePerUnitTIL.editText?.text?.toString().isNullOrEmpty()) {
            Toast.makeText(this, "Please enter rate/units for estimated monthly production units", Toast.LENGTH_SHORT).show()
            return
        }

        val avgMonthlyConsumption = binding.consuTIL.editText?.text?.toString()!!.toInt()
        val rateOfAvgMonthlyConsumption = binding.consumRatePerUnitTIL.editText?.text?.toString()!!.toInt()
        val estMonthlyProduction = binding.prodTIL.editText?.text?.toString()!!.toInt()
        val rateOfEstMonthlyProduction = binding.productionRatePerUnitTIL.editText?.text?.toString()!!.toInt()
        if (avgMonthlyConsumption > estMonthlyProduction) {
            val profit = (avgMonthlyConsumption - estMonthlyProduction) * rateOfAvgMonthlyConsumption;
            setProfit(profit)
        } else if (avgMonthlyConsumption < estMonthlyProduction) {
            val profit = (estMonthlyProduction - avgMonthlyConsumption) * rateOfEstMonthlyProduction;
            setProfit(profit)
        } else {
            setProfit(0)
        }
        binding.monthlyBillValueTV.text = (avgMonthlyConsumption * rateOfAvgMonthlyConsumption).toString()
        binding.zeroCostValueTV.text = (avgMonthlyConsumption - estMonthlyProduction).toString()

        /*binding.sliderForPanel.valueFrom = 1.0f
        binding.sliderForPanel.valueTo = profit.toFloat()
        binding.sliderForPanel.value = 1.0f*/
        //binding.sliderForPanel.valueTo = buildingInsightData.solarPotential.financialAnalyses.size.toFloat()
    }

    private fun setProfit(profit: Int) {
        binding.profitValueTV.text = profit.toString()
    }


    private fun showToolBar() {
        val toolbar = binding.appToolbarTB.toolbar
        toolbar.findViewById<TextView>(R.id.toolbarMainTitleTV).text = "Solar, The Wealth Meter for tomorrow"
        toolbar.setNavigationOnClickListener { finish() }
    }

    companion object {
        const val BUILDING_INSIGHT_DATA = "building_inside_data"
    }
}
