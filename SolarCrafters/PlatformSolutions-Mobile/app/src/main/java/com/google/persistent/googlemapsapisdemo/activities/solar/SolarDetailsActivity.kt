package com.google.persistent.googlemapsapisdemo.activities.solar

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.github.mikephil.charting.components.Description
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry
import com.google.persistent.googlemapsapisdemo.databinding.ActivitySolarDetailsBinding
import com.google.persistent.googlemapsapisdemo.models.solar.response.building_insight.BuildingInsightResponseModel
import kotlin.math.roundToInt

/**
 * pitchDegrees
 * number
 * Angle of the roof segment relative to the theoretical ground plane.
 * 0 = parallel to the ground, 90 = perpendicular to the ground.
 *
 * azimuthDegrees
 * number
 * Compass direction the roof segment is pointing in.
 * 0 = North, 90 = East, 180 = South.
 * For a "flat" roof segment (pitchDegrees very near 0), azimuth is not well defined, so for consistency, we define it arbitrarily to be 0 (North).
 *
 */
class SolarDetailsActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySolarDetailsBinding
    private lateinit var buildingInsightData: BuildingInsightResponseModel
    private var segmentIndex = 0
    private var buildingLocation = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySolarDetailsBinding.inflate(layoutInflater)
        setContentView(binding.root)
        getPreviousScreenData()
    }

    private fun getPreviousScreenData() {
        if (intent.hasExtra(BUILDING_INSIGHT_DATA)) {
            buildingInsightData = intent.getSerializableExtra(BUILDING_INSIGHT_DATA) as BuildingInsightResponseModel
            segmentIndex = intent.getIntExtra(BUILDING_ROOF_TOP_INDEX, BUILDING_WHOLE_ROOF_TOP)
            buildingLocation = intent.getStringExtra(BUILDING_ADDRESS).toString()
            binding.addressValueTV.text = buildingLocation
            manageUiVisibility()
            renderData()
        }
    }

    private fun manageUiVisibility() {
        if (segmentIndex == BUILDING_WHOLE_ROOF_TOP) {
            binding.pitchDegreesLL.visibility = View.GONE
            binding.azimuthDegreeLL.visibility = View.GONE
        }
        else {
            binding.sunshineHrsLL.visibility = View.GONE
            binding.maximumPanelsCountLL.visibility = View.GONE
        }
    }

    @SuppressLint("SetTextI18n")
    private fun renderData() {
        //binding.sunshineHrsPerYrValueTV.text = "${buildingInsightData.solarPotential.maxSunshineHoursPerYear} hrs"
        //binding.areaInMtrValueTV.text = "${buildingInsightData.solarPotential.maxArrayAreaMeters2} (sqr mtrs)"
        //binding.maxPanelCountValueTV.text = "${buildingInsightData.solarPotential.maxArrayPanelsCount}"
        val latLongOfBuilding = "Latitude: ${buildingInsightData.center.latitude} & Longitude: ${buildingInsightData.center.longitude}"
        val sunshineHrsPrYr = "${buildingInsightData.solarPotential.maxSunshineHoursPerYear.roundToInt()}"
        val wholeAreaInMtrs = getAreaInMeters()
        val maxPanelCount = "${buildingInsightData.solarPotential.maxArrayPanelsCount}"
        val carbonOffset = "${buildingInsightData.solarPotential.carbonOffsetFactorKgPerMwh.roundToInt()}"
        val solarPanelLife = "${buildingInsightData.solarPotential.panelLifetimeYears}"
        val panelCapacityInWatts = "${buildingInsightData.solarPotential.panelCapacityWatts}"
        val pitchDegrees = getPitchDegrees()
        val azimuthDegree = getAzimuthDegrees()
        val heightAboveSeaLevel = getAboveSeaLevelHeight()
        binding.latLongOfBuildingLocationTV.text = latLongOfBuilding
        binding.sunshineHrsPerYrValueTV.text = sunshineHrsPrYr
        binding.areaInMtrValueTV.text = wholeAreaInMtrs
        binding.maxPanelCountValueTV.text = maxPanelCount
        binding.pitchDegreesValue.text = pitchDegrees
        binding.azimuthDegreesValue.text = azimuthDegree
        binding.solarPabelLifetimeValue.text = solarPanelLife
        binding.carbonOffsetFactorKgPerMwhValueTV.text = carbonOffset
        binding.panelCapicityWattsValue.text = panelCapacityInWatts
        binding.heightAboveSeaLevelValue.text = heightAboveSeaLevel
        showBarChart(buildingInsightData)
        calculateEnergyProduceInYear()
        calculateFinancials()
    }


    private fun getAboveSeaLevelHeight(): String {
        if (segmentIndex == BUILDING_WHOLE_ROOF_TOP)
            return ""
        return buildingInsightData.solarPotential.roofSegmentStats[segmentIndex-1].planeHeightAtCenterMeters.roundToInt().toString()
    }

    //REF: https://developers.google.com/maps/documentation/solar/reference/rest/v1/buildingInsights/findClosest#Money:~:text=of%20the%20panel.-,yearlyEnergyDcKwh,-number
    private fun calculateEnergyProduceInYear() {
        var energyProdInYear = 0
        buildingInsightData.solarPotential.solarPanels.forEachIndexed { index, solarPanel ->
            energyProdInYear += solarPanel.yearlyEnergyDcKwh.roundToInt()
        }
        binding.energyProdByAllPanelsInYrValue.text = energyProdInYear.toString()
    }

    private fun calculateFinancials() {
        if (buildingInsightData.solarPotential.financialAnalyses == null) {
            Toast.makeText(this, "No financial details available for this building!", Toast.LENGTH_SHORT).show()
            return
        }
        var totalForCostOfElectricityWithoutSolar:Int = 0
        var totalSolarPercentage:Int = 0
        var totalOfExportedToGridValue:Int = 0
        //Log.e("financialAnalyses.size", buildingInsightData.solarPotential.financialAnalyses.size.toString())
        buildingInsightData.solarPotential.financialAnalyses.forEachIndexed { index, financialAnalyse ->
            if (financialAnalyse.financialDetails != null) {
                totalForCostOfElectricityWithoutSolar += financialAnalyse.financialDetails.costOfElectricityWithoutSolar.units.toInt()
                totalSolarPercentage += financialAnalyse.financialDetails.solarPercentage.toInt()
                totalOfExportedToGridValue += financialAnalyse.financialDetails.percentageExportedToGrid.toInt()
            }
        }
        // CostOfElectricityWithoutSolar
        // Ref: https://developers.google.com/maps/documentation/solar/reference/rest/v1/buildingInsights/findClosest#Money:~:text=loan)%20the%20panels.-,costOfElectricityWithoutSolar,-object%20(Money
        val avgVal = totalForCostOfElectricityWithoutSolar / buildingInsightData.solarPotential.financialAnalyses.size
        binding.costEleWithoutSolarValue.text = avgVal.toString()

        /// SOLAR PERCENTAGE
        // Ref: https://developers.google.com/maps/documentation/solar/reference/rest/v1/buildingInsights/findClosest#Money:~:text=metering%20is%20allowed.-,solarPercentage,-number
        val avgValOfTotalSolarPercentage = totalSolarPercentage / buildingInsightData.solarPotential.financialAnalyses.size
        binding.solarPercentageValue.text = "$avgValOfTotalSolarPercentage"

        // exportedToGridValue
        //Ref: https://developers.google.com/maps/documentation/solar/reference/rest/v1/buildingInsights/findClosest#Money:~:text=for%20future%20years.-,percentageExportedToGrid,-number
        val avgValOfTotalOfExportedToGridValue = totalOfExportedToGridValue / buildingInsightData.solarPotential.financialAnalyses.size
        binding.exportedToGridValue.text = avgValOfTotalOfExportedToGridValue.toString()
    }

    private fun showBarChart(result: BuildingInsightResponseModel?) {
        //val valueList = ArrayList<Double>()
        val entries: ArrayList<BarEntry> = ArrayList()
        val title = "Sunniness over roof area"
        val percentages = arrayListOf<Int>(0, 500, 1000, 1500, 2000)
        /*for (i in 0..5) {
            valueList.add(i * 100.1)
        }*/
        //percentages.forEachIndexed { index, i -> valueList.add(percentages[i].toDouble()) }
        val barSize:Int = result?.solarPotential?.wholeRoofStats?.sunshineQuantiles?.size!!
        val sunshineQuantiles = result.solarPotential.wholeRoofStats.sunshineQuantiles
        //fit the data into a bar
        for (i in 0 until barSize) {
            //val barEntry = BarEntry(i.toFloat(), valueList[i].toFloat())
            val barEntry = BarEntry(i.toFloat(), sunshineQuantiles[i].toFloat())
            entries.add(barEntry)
        }
        val barDataSet = BarDataSet(entries, title)
        val data = BarData(barDataSet)
        //set bar color
        barDataSet.color = Color.parseColor("#304567");
        // remove description Label
        val description = Description()
        description.isEnabled = false
        binding.barChartSunniness.description = description
        // hide right side values
        binding.barChartSunniness.axisRight.isEnabled = false
        //setting animation for y-axis, the bar will pop up from 0 to its value within the time we set
        binding.barChartSunniness.animateY(2000)
        //setting animation for x-axis, the bar will pop up separately within the time we set
        binding.barChartSunniness.animateX(2000)
        //change the position of x-axis to the bottom
        val xAxis: XAxis = binding.barChartSunniness.xAxis
        xAxis.position = XAxis.XAxisPosition.BOTTOM
        //hiding the x-axis line, default true if not set
        xAxis.setDrawAxisLine(false)
        //hiding the vertical grid lines, default true if not set
        xAxis.setDrawGridLines(false)
        binding.barChartSunniness.data = data
        binding.barChartSunniness.invalidate()
        binding.barChartSunniness.setTouchEnabled(true)
    }

    private fun getAreaInMeters():String {
        return if (segmentIndex == BUILDING_WHOLE_ROOF_TOP)
            buildingInsightData.solarPotential.wholeRoofStats.areaMeters2.roundToInt().toString()
        else
            buildingInsightData.solarPotential.roofSegmentStats[segmentIndex-1].stats.areaMeters2.roundToInt().toString()
    }

    private fun getPitchDegrees():String {
        if (segmentIndex == BUILDING_WHOLE_ROOF_TOP)
            return ""
        return buildingInsightData.solarPotential.roofSegmentStats[segmentIndex-1].pitchDegrees.roundToInt().toString()
    }
    private fun getAzimuthDegrees():String {
        if (segmentIndex == BUILDING_WHOLE_ROOF_TOP)
            return ""
        val degree = buildingInsightData.solarPotential.roofSegmentStats[segmentIndex-1].azimuthDegrees.roundToInt()
        //0 = North, 90 = East, 180 = South.
        // 0-90 : North
        // 90-180 :  East
        // 180- 270: south
        // 270 - 360: West
        when (degree) {
            in 0..90 -> return "North"
            in 90 ..180 -> return  "East"
            in 180..270 -> return "South"
            in 180..360 -> return "West"
        }
        return degree.toString()
    }


    companion object {
        const val BUILDING_INSIGHT_DATA = "evaluation_data"
        const val BUILDING_ROOF_TOP_INDEX = "building_roof_top_index"
        const val BUILDING_WHOLE_ROOF_TOP = 12
        const val BUILDING_ADDRESS = "building_location"
    }
}