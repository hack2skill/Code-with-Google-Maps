package com.google.maps.android.compose

import android.content.Context
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row


import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import co.yml.charts.axis.AxisData
import co.yml.charts.common.model.Point
import co.yml.charts.ui.linechart.LineChart
import co.yml.charts.ui.linechart.model.GridLines
import co.yml.charts.ui.linechart.model.IntersectionPoint
import co.yml.charts.ui.linechart.model.Line
import co.yml.charts.ui.linechart.model.LineChartData
import co.yml.charts.ui.linechart.model.LinePlotData
import co.yml.charts.ui.linechart.model.LineStyle
import co.yml.charts.ui.linechart.model.SelectionHighlightPoint
import co.yml.charts.ui.linechart.model.SelectionHighlightPopUp
import co.yml.charts.ui.linechart.model.ShadowUnderLine


import com.google.maps.android.compose.model.GDPData
import com.google.maps.android.compose.model.PopulationData
import com.opencsv.CSVReader
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import org.apache.poi.hssf.usermodel.HSSFWorkbook
import org.apache.poi.ss.usermodel.CellType
import org.apache.poi.ss.usermodel.Row
import java.io.InputStreamReader

class GDP(private val applicationContext: Context) {
    val gdpDataList: List<GDPData>
    val listOfCountryNames: List<String>

    init {
        val tempGdpDataList = mutableListOf<GDPData>()
        val tempListOfCountryNames = mutableListOf<String>()

        try {
            val excelFile = applicationContext.assets.open("realgdp.xls")
            val workbook = HSSFWorkbook(excelFile)

            val sheet = workbook.getSheetAt(0)
            for (rowIndex in 0 until sheet.physicalNumberOfRows) {
                if (rowIndex == 1)
                    continue
                val row = sheet.getRow(rowIndex) as Row
                val country = row.getCell(0).stringCellValue
                tempListOfCountryNames.add(country)
                val growthRate = mutableListOf<Float>()

                for (colIndex in 1 until row.physicalNumberOfCells) {
                    val cell = row.getCell(colIndex)
                    val cellValue = when (cell.cellType) {
                        CellType.NUMERIC -> cell.numericCellValue.toFloat()
                        CellType.STRING -> {
                            if (cell.stringCellValue.trim().equals("no data", ignoreCase = true)) {
                                0.0f
                            } else {
                                0.0f
                            }
                        }
                        else -> 0.0f
                    }
                    growthRate.add(cellValue)
                }
                tempGdpDataList.add(GDPData(country, growthRate))
                println("Country: $country, Growth Rates: $growthRate")
            }

            workbook.close()
        } catch (e: Exception) {
            e.printStackTrace()
            Log.d("error", e.toString())
            tempListOfCountryNames.add("") // Add a placeholder if an error occurs
            tempGdpDataList.add(GDPData("", arrayListOf(0f, 0f)))
        }

        // Assign the temporary lists to the properties
        gdpDataList = tempGdpDataList
        tempListOfCountryNames.removeAt(0)

        listOfCountryNames = tempListOfCountryNames
        Log.d("listcountry", listOfCountryNames.toString())
    }

    fun getItems(): List<GDPData> {
        return gdpDataList
    }
    fun getCountryNames(): List<String> {
        return listOfCountryNames
    }
}


class Population(applicationContext: Context)
{
    val populationDataList = mutableListOf<PopulationData>()// Store the population data
    val listOfCountryNames: List<String>
    init {
        val inputStream = applicationContext.resources.openRawResource(R.raw.population)
        val reader = CSVReader(InputStreamReader(inputStream))

        // Read the header row to extract years
        val header = reader.readNext()
        val yearsMap = mutableMapOf<Int, String>()

        for (i in 4 until header.size) {
            val year = header[i].substringBefore(" [")
            yearsMap[i] = year
        }

        var line = reader.readNext()
        while (line != null) {
            val seriesName = line[0]
            val seriesCode = line[1]
            val countryName = line[2]
            val countryCode = line[3]
            val years = mutableMapOf<String, Int>()

            for ((index, year) in yearsMap) {
                val yearValue = line[index].toIntOrNull()
                if (yearValue != null) {
                    years[year] = yearValue
                }
            }

            val populationData = PopulationData(seriesName, seriesCode, countryName, countryCode, years)
            Log.d("years", years.toString())
            populationDataList.add(populationData)
//        Log.d("mydata", populationData.toString())

            line = reader.readNext()

        }
        reader.close()
        //populationDataList.removeAt(0)
        listOfCountryNames = populationDataList.map { it.countryName }
        println(populationDataList)
    }

fun getItems() : List<PopulationData>
{
    return populationDataList
}
    fun getCountryNames(): List<String> {
        return listOfCountryNames
    }
}
@Composable
fun PopulationGraph(applicationContext: Context){
    var years = remember { mutableStateListOf<Float>()}

    var maxPopulation  by remember { mutableStateOf<Float?>(null) }
    var minPopulation by remember {
        mutableStateOf<Float?>(null)
    }
    var myPoints = remember { mutableStateListOf<Point>()}
    // Use a state variable to track the status of your initialization
    var initialized by remember { mutableStateOf(false) }
    var range by remember {
        mutableStateOf<Float?>(null)
    }
    LaunchedEffect(Unit)
    {
        val temp = mutableListOf<Float?>(null)
        withContext(Dispatchers.IO)
        {
            val Populationdata = Population(applicationContext).getItems()
            for ((year, population) in Populationdata[0].years.entries)
            {
                myPoints.add(Point(year.toFloat(), population.toFloat()))
                years.add(year.toFloat())
            }

             maxPopulation = Populationdata[0].years.values.maxOrNull()?.toFloat()
             minPopulation = Populationdata[0].years.values.minOrNull()?.toFloat()
             range = maxPopulation!! - minPopulation!!
            Log.d("points", " $range $years $maxPopulation $minPopulation $myPoints ")
            initialized = true
        }
    }

    val isFloat = false
    if(initialized)
    {
        myPoints?.let {
            BuildGraph(years.toMutableList(),
                minPopulation!!.toFloat(),
                range!!.toFloat(),
                myPoints,
                isFloat)
        }
    }


}


//test
//fun main() {
//   // val csvReader = CSVReaderBuilder(FileReader("/home/aryan/AndroidProjects/android-maps-compose-main/population.csv")).withSkipLines(1).build()
//
//    val reader = CSVReader(FileReader("/home/aryan/AndroidProjects/android-maps-compose-main/population.csv"))
//    val populationDataList = mutableListOf<PopulationData>()
//    // Read the header row to extract years
//    val header = reader.readNext()
//    val yearsMap = mutableMapOf<Int, String>()
//
//    for (i in 4 until header.size) {
//        val year = header[i].substringBefore(" [")
//        yearsMap[i] = year
//    }
//
//    var line = reader.readNext()
//    while (line != null) {
//        val seriesName = line[0]
//        val seriesCode = line[1]
//        val countryName = line[2]
//        val countryCode = line[3]
//        val years = mutableMapOf<String, Int>()
//
//        for ((index, year) in yearsMap) {
//            val yearValue = line[index].toIntOrNull()
//            if (yearValue != null) {
//                years[year] = yearValue
//            }
//        }
//
//        val populationData = PopulationData(seriesName, seriesCode, countryName, countryCode, years)
//        populationDataList.add(populationData)
//
//        line = reader.readNext()
//    }
//
//    reader.close()
//    println(populationDataList)
//}

@OptIn(ExperimentalMaterialApi::class)

//done
@Composable
fun GDPGraph(country: String) {
    val applicationContext = LocalContext.current
    // Use a state delegate to store your GDPData
    var GDPData by remember { mutableStateOf<List<GDPData>?>(null) }
    var years by remember { mutableStateOf<List<Float>?>(null) }

    var maxGrowth by remember { mutableStateOf<Float?>(null) }
    var minGrowth by remember {
        mutableStateOf<Float?>(null)
    }
    var myPoints by remember { mutableStateOf<MutableList<Point>?>(null) }
    // Use a state variable to track the status of your initialization
    var initialized by remember { mutableStateOf(false) }
    var range by remember {
        mutableStateOf<Float?>(null)
    }
    LaunchedEffect(Unit) {
        withContext(Dispatchers.IO)
        {
            GDPData = GDP(applicationContext).getItems()
            myPoints = mutableListOf<Point>()
            years = GDPData?.get(0)?.growthRates
            maxGrowth = GDPData?.get(2)?.growthRates?.max()!!
            minGrowth = GDPData?.get(2)?.growthRates?.min()
            range = maxGrowth!! - minGrowth!!

            for (i in 0 until GDPData?.get(0)!!.growthRates.size) {
                myPoints!!.add(Point(GDPData?.get(0)!!.growthRates[i], GDPData!!.get(2).growthRates[i]))
            }
            initialized = true
        }

    }
    val isFloat = true
    // Call BuildGraph only when initialized is true
    if(initialized)
    {

        BuildGraph(
            years,
            minGrowth!!,
            range!!,
            myPoints!!,
            isFloat)
    }

}
@Composable
private fun BuildGraph(
    years: List<Float>?,
    minGrowth: Float,
    range: Float,
    myPoints: MutableList<Point>,
    isFloat: Boolean
) {
    var xAxisData1: AxisData
    var yAxisData1: AxisData
    xAxisData1 = AxisData.Builder()
        .axisStepSize(70.dp)
//        .startDrawPadding(70.dp)
        .backgroundColor(Color(255, 204, 0))
        .steps(years!!.size-1)
        .labelData { i -> years[i].toInt().toString() }
        .labelAndAxisLinePadding(15.dp)
        .build()

    yAxisData1 = AxisData.Builder()
//        .axisOffset(-10.dp)
        .steps(5)
        .backgroundColor(Color(164, 255, 164))
        .labelAndAxisLinePadding(10.dp)
        .labelData { i ->
            if (isFloat) {
                "%.2f".format(minGrowth + (i * (range / 5)))
            } else {
                "${(minGrowth + (i * (range / 5))).toInt()}"
            }
        }
        .build()

    val lineChartData = LineChartData(
        linePlotData = LinePlotData(
            lines = listOf(
                Line(
                    dataPoints = myPoints,
                    LineStyle(),
                    IntersectionPoint(),
                    SelectionHighlightPoint(),
                    ShadowUnderLine(),
                    SelectionHighlightPopUp(popUpLabel = { x, y ->
                        if (!isFloat) {
                            "${x.toInt()}, ${y.toInt()}"
                        } else {
                            "${x.toInt()}, $y"
                        }
                    })
                )
            ),
        ),
        xAxisData = xAxisData1!!,
        yAxisData = yAxisData1!!,
        gridLines = GridLines(),
        backgroundColor = Color(255, 255, 255)
    )

    Box(contentAlignment = Alignment.BottomCenter) {
        Column {
            Row {
                Box(contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .size(60.dp)
                        .weight(0.5f)
                        .fillMaxWidth()
                        .padding(8.dp)
                        .clip(RoundedCornerShape(50.dp))
                        .clickable { }
                        .background(Color(0xFF87CEEB))
                ) {
                    Text(text = "India", color = Color.White)


                }
                Box(contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .size(60.dp)
                        .weight(0.5f)
                        .fillMaxWidth()
                        .padding(8.dp)
                        .clip(RoundedCornerShape(50.dp))
                        .clickable { }
                        .background(Color(0xFF87CEEB))
                ) {
                    Text(text = "China", color = Color.White)

                }
            }
            LineChart(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(300.dp),
                lineChartData = lineChartData
            )
        }
    }
}

//done
//@RequiresApi(Build.VERSION_CODES.R)
//@androidx.media3.common.util.UnstableApi
//@Composable
//fun VideoPlay( onClose: () -> Unit, s: Window, actionBar: ActionBar?) {
//    val systemUiController: SystemUiController = rememberSystemUiController()
//    systemUiController.isStatusBarVisible = false
//    systemUiController.isSystemBarsVisible = false
//
//    val context = LocalContext.current
//    val rawUri = Uri.parse("android.resource://${context.packageName}/${R.raw.opera}")
//    Card(Modifier
//        .fillMaxSize()
//        .clip(RoundedCornerShape(15.dp))
//        .padding(start = 20.dp, end = 20.dp, top = 20.dp, bottom = 20.dp)
//        .background(Color.Transparent)
//        .clip(RoundedCornerShape(15.dp))
//        , elevation = 240.dp
//      )
//
//    {
//        val exoPlayer = remember{
//            ExoPlayer.Builder(context)
//                .build()
//                .apply {
//                    val defaultDataSourceFactory = DefaultDataSource.Factory(context)
//                    val dataSourceFactory: DataSource.Factory = DefaultDataSource.Factory(
//                        context,
//                        defaultDataSourceFactory
//                    )
//
//                    val source = ProgressiveMediaSource.Factory(dataSourceFactory)
//                        .createMediaSource(MediaItem.fromUri(rawUri))
//
//                    setMediaSource(source)
//                    prepare()
//                }
//        }
//
//        exoPlayer.playWhenReady = true
//        exoPlayer.videoScalingMode = C.VIDEO_SCALING_MODE_SCALE_TO_FIT_WITH_CROPPING
//        exoPlayer.repeatMode = Player.REPEAT_MODE_ONE
//        WindowCompat.setDecorFitsSystemWindows(s, false)
////        actionBar!!.hide()
//        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.R) {
//            s.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
//        } else {
//            s.insetsController?.apply {
//                hide(WindowInsets.Type.statusBars())
//                systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
//            }
//        }
//        LockScreenOrientation(orientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE)
//
//
//
//        DisposableEffect(
//            AndroidView(factory = { PlayerView(context).apply {
////            hideController()
//                useController = true
//                resizeMode = AspectRatioFrameLayout.RESIZE_MODE_ZOOM
//                player = exoPlayer
//                layoutParams = FrameLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT)
//            }}))
//        {
//            onDispose { exoPlayer.release() }
//
//        }
//        BackHandler {
//            onClose()
//        }
//
//    }
//}

//test
//fun main()
//{
//    val gdpDataList = mutableListOf<GDPData>()
//    try {
//        val excelFile = File("/home/aryan/AndroidProjects/android-maps-compose-main/realgdp.xls") // Replace with the actual file path
//        val inputStream = FileInputStream(excelFile)
//        val workbook = HSSFWorkbook(inputStream)
//
//        val sheet = workbook.getSheetAt(0) // Assuming data is in the first sheet
//        for (rowIndex in 0 until sheet.physicalNumberOfRows) {
//            if (rowIndex == 1)
//                continue
//            val row = sheet.getRow(rowIndex) as Row
//            val country = row.getCell(0).stringCellValue
//            val growthRate = mutableListOf<Float>()
//
//            for (colIndex in 1 until row.physicalNumberOfCells) {
//                val cell = row.getCell(colIndex)
//                val cellValue = when (cell.cellType) {
//                    CellType.NUMERIC -> cell.numericCellValue.toFloat()
//                    CellType.STRING -> {
//                        if (cell.stringCellValue.trim().equals("no data", ignoreCase = true)) {
//                            0.0f
//
//                        } else {
//                            0.0f // Handle non-numeric values
//                        }
//                    }
//                    else -> 0.0f // Handle other cell types as needed
//                }
//                growthRate.add(cellValue)
//            }
//            gdpDataList.add(GDPData(country, growthRate))
////            println("Country: $country, Growth Rates: $growthRate")
//        }
//
//        workbook.close()
//    } catch (e: Exception) {
//        e.printStackTrace()
//    }
//    print(gdpDataList)
//    val GDPData = GDP(applicationContext).getItems()
//    val steps = 5
//    val years = GDPData.get(0).growthRates
//    val maxYear = years.max()
//    val stepYear = GDPData.get(2).growthRates.max()
//    println("$maxYear, $stepYear")
//}
