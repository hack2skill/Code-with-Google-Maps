package com.google.maps.android.compose



import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.compose.BackHandler
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidViewBinding
import androidx.fragment.app.Fragment
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.findNavController
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.maps.android.compose.ViewModel.RegisterViewModel
import com.google.maps.android.compose.databinding.ExtramapfeatureBinding
import com.google.maps.android.compose.databinding.ExtramapfeatureBinding.inflate
import com.google.maps.android.data.geojson.GeoJsonLayer
import org.json.JSONException
import java.io.IOException

//
//private var mMap: GoogleMap? = null
//
//class ExtraMapFeatureActivity : Fragment(), OnMapReadyCallback{
//    override fun onCreateView(
//        inflater: LayoutInflater,
//        container: ViewGroup?,
//        savedInstanceState: Bundle?
//    ): View {
//        return ComposeView(requireContext()).apply {
//
//            setContent {
//                AndroidViewBinding(ExtramapfeatureBinding::inflate) {
//                   val mapFragment  = SupportMapFragment.newInstance()
//                    childFragmentManager.beginTransaction()
//
//                        .replace(R.id.map_fragment, mapFragment)                }
//            }
//        }
//    }
//
//    override fun onMapReady(googleMap: GoogleMap) {
//               mMap = googleMap
//              mMap!!.uiSettings.isZoomControlsEnabled = true
//             val india = LatLng(20.5937,78.9629)
//             mMap!!.moveCamera(CameraUpdateFactory.newLatLngZoom(india, 3f))
//    }
//}

//class ExtraMapFeatureActivity : AppCompatActivity(),OnMapReadyCallback {
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.extramapfeature)
//        val mapFragment = supportFragmentManager
//            .findFragmentById(R.id.map_fragment) as SupportMapFragment?
//        mapFragment!!.getMapAsync(this)
//
//
//    }
//
//
//    @RequiresApi(Build.VERSION_CODES.R)
//    override fun onMapReady(googleMap: GoogleMap) {
//        mMap = googleMap
//        mMap!!.uiSettings.isZoomControlsEnabled = true
//        val india = LatLng(20.5937,78.9629)
//        mMap!!.moveCamera(CameraUpdateFactory.newLatLngZoom(india, 3f))
//        try {
//            val layer = GeoJsonLayer(mMap, R.raw.india, applicationContext)
//
//            val style = layer.defaultPolygonStyle
//           // style.fillColor = Color.MAGENTA
//            style.strokeColor = android.graphics.Color.RED
//            style.strokeWidth = 6f
//            layer.addLayerToMap()
//        }
//        catch ( ex: IOException) {
//            Log.e("IOException", ex.getLocalizedMessage());
//        } catch ( ex: JSONException) {
//            Log.e("JSONException", ex.getLocalizedMessage());
//        }
//        try {
//            val layer = GeoJsonLayer(mMap, R.raw.china, applicationContext)
//
//            val style = layer.defaultPolygonStyle
//            //style.fillColor = Color.BLACK
//            style.strokeColor = android.graphics.Color.RED
//            style.strokeWidth = 6f
//            layer.addLayerToMap()
//        }
//        catch ( ex: IOException) {
//            Log.e("IOException", ex.getLocalizedMessage());
//        } catch ( ex: JSONException) {
//            Log.e("JSONException", ex.getLocalizedMessage());
//        }
//        val id = findViewById<ComposeView>(R.id.composeInXML).setContent {
//
//            Box(contentAlignment = Alignment.BottomCenter, modifier = Modifier
//                .fillMaxSize()
//                .padding(all = 8.dp)
//                .clip(RoundedCornerShape(40.dp)))
//            {
//                val context = LocalContext.current
//                Log.d("yes", "yes")
//                Card(elevation = 50.dp) {
//                    GDPGraph()
//                }
//
//             }
//            val viewModel : RegisterViewModel = viewModel()
//            var state by remember{ mutableStateOf(false) }
//            BackHandler {
//            done()
//           }
//
//        }
//
//    }
//
//    private fun done()
//    {
//
////        val intent = Intent(applicationContext, MainActivity::class.java)
////        intent.addFlags(Intent.FLAG_ACTIVITY_PREVIOUS_IS_TOP)
////        startActivity(intent)
//        val intent = Intent(
//            applicationContext,
//            MainActivity::class.java) // Create an intent for the activity
//     startActivity (intent); // Start the activity
//
//
//    }
//
//
//
//
//}

//under test
//
//@Composable
//private fun GDPGraph(applicationContext: Context, GDPData: List<GDPData>?) {
//    var myPoints = mutableListOf<Point>()
//    Log.d("GDP", GDPData.toString())
//    val steps = 5
//    val years = GDPData?.get(0)?.growthRates
//    val maxGrowth = GDPData?.get(2)?.growthRates?.max()
//    val minGrowth = GDPData?.get(2)?.growthRates?.min()
//    val range = maxGrowth!! - minGrowth!!
//    Log.d("range", "$range.toString() $maxGrowth $minGrowth")
//
//    for (i in 0 until GDPData?.get(0)!!.growthRates!!.size) {
//        myPoints.add(Point(GDPData?.get(0)!!.growthRates[i], GDPData!!.get(2)!!.growthRates[i]))
//    }
//    Log.d("points are", myPoints.toString())
//    val pointsData: List<Point> =
//        listOf(Point(0f, 40f), Point(1f, 90f), Point(2f, 0f), Point(3f, 60f), Point(4f, 10f))
//    var xAxisData: AxisData? = null
//    var yAxisData: AxisData? = null
//
//    xAxisData = AxisData.Builder()
//        .axisStepSize(100.dp)
//        .backgroundColor(Color(255, 204, 0))
//        .steps(years!!.size - 1)
//        .labelData { i -> years[i].toString() }
//        .labelAndAxisLinePadding(15.dp)
//        .build()
//
//    yAxisData = AxisData.Builder()
//        .steps(5)
//        .backgroundColor(Color(164, 255, 164))
//        .labelAndAxisLinePadding(20.dp)
//        .labelData { i ->
//            (minGrowth + (i * (range / 5))).toString()
//        }.build()
//
//    val lineChartData = LineChartData(
//        linePlotData = LinePlotData(
//            lines = listOf(
//                Line(
//                    dataPoints = myPoints,
//                    LineStyle(),
//                    IntersectionPoint(),
//                    SelectionHighlightPoint(),
//                    ShadowUnderLine(),
//                    SelectionHighlightPopUp()
//                )
//            ),
//        ),
//        xAxisData = xAxisData!!,
//        yAxisData = yAxisData!!,
//        gridLines = GridLines(),
//        backgroundColor = Color(255, 255, 255)
//    )
//    LineChart(
//        modifier = Modifier
//            .fillMaxWidth()
//            .height(300.dp),
//        lineChartData = lineChartData
//    )
//}