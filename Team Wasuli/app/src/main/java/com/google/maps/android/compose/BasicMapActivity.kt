// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.maps.android.compose

import android.content.Intent
import android.location.Location
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.annotation.RequiresApi
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.EnterTransition
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.expandIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.Image
import androidx.compose.foundation.ScrollState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.Divider
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Icon
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.BottomSheetDefaults
import androidx.compose.material3.BottomSheetScaffold
import androidx.compose.material3.BottomSheetScaffoldState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SheetState
import androidx.compose.material3.SheetValue
import androidx.compose.material3.Text
import androidx.compose.material3.rememberBottomSheetScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.core.content.ContextCompat.startActivity
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.Dash
import com.google.android.gms.maps.model.Gap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.PolylineOptions
import com.google.maps.android.PolyUtil
import com.google.maps.android.compose.Navigation.Screens
import com.google.maps.android.compose.ViewModel.RegisterViewModel
import com.google.maps.android.compose.model.ImageData
import com.google.maps.android.compose.theme.MapsComposeSampleTheme
import com.google.maps.android.data.geojson.GeoJsonLayer
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONException
import java.io.IOException

private const val TAG = "BasicMapActivity"

val singapore = LatLng(1.3588227, 103.8742114)
val singapore2 = LatLng(1.40, 103.77)
val singapore3 = LatLng(1.45, 103.77)
val singapore4 = LatLng(1.50, 103.77)
val acropolispos = LatLng(37.9715, 23.7257)
val sydenypos = LatLng(-33.8568, 151.2153)
val myLcoation = LatLng(12.8173, 80.0403)
val defaultCameraPosition = CameraPosition.fromLatLngZoom(singapore, 11f)
val acropolisCameraPosition = CameraPosition.fromLatLngZoom(acropolispos, 16f)
val sydneyCameraPosition = CameraPosition.fromLatLngZoom(sydenypos, 16f)
val abode = CameraPosition.fromLatLngZoom(myLcoation, 20f)
var layer: GeoJsonLayer? = null
private var currentLocation: Location? = null

class BasicMapActivity : ComponentActivity() {

    @androidx.annotation.OptIn(androidx.media3.common.util.UnstableApi::class)
    @RequiresApi(Build.VERSION_CODES.R)
    @OptIn(ExperimentalMaterialApi::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        var ss = window
        var sd = actionBar

        setContent {

            MapsComposeSampleTheme(darkTheme = true) {
                MainScreen(comingFromActivity = false)
            }

        }
    }
}

@androidx.annotation.OptIn(androidx.media3.common.util.UnstableApi::class)
@RequiresApi(Build.VERSION_CODES.R)
@Composable
fun MainScreen(comingFromActivity: Boolean) {

    val context = LocalContext.current
    val navController: NavHostController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Screens.SplashScreen.route
    )
    {
        composable(route = Screens.SplashScreen.route)
        {
            SplashScreen {
                navController.navigate(Screens.BasicsMapActivity.route){
                    popUpTo(route = Screens.SplashScreen.route)
                    {
                        inclusive = true
                    }
                }
            }
        }

        composable(route = Screens.BasicsMapActivity.route)
        {

            Box(Modifier.fillMaxSize()) {
                var isMapLoaded by remember { mutableStateOf(false) }
                // Observing and controlling the camera's state can be done with a CameraPositionState
                val cameraPositionState = rememberCameraPositionState {
                    position = defaultCameraPosition
                }
                GoogleMapView(
                    modifier = Modifier,
                    cameraPositionState = cameraPositionState,
                    onMapLoaded = {
                        isMapLoaded = true

                    },
                    playVideo = {
                        navController.navigate(Screens.VideoPlayerScreen.route)
                    }

                )
                if (!isMapLoaded) {

                    AnimatedVisibility(
                        modifier = Modifier
                            .matchParentSize(),
                        visible = !isMapLoaded,
                        enter = EnterTransition.None,
                        exit = fadeOut()
                    ) {
                        CircularProgressIndicator(
                            modifier = Modifier
                                .background(MaterialTheme.colorScheme.background)
                                .wrapContentSize()
                        )
                    }
                }
            }

        }
        composable(route = Screens.VideoPlayerScreen.route)
        {
            VideoPlay(onClose = {
                navController.popBackStack()
            })
        }

        composable(route = Screens.StatsScreen.route)
        {
//            CountryName()
//            {
//                countryName->
//
//
//            }
        }

    }
}

@Composable
fun ShowCountryList(showBoundary: (String) -> Unit) {

    val showDialog = remember { mutableStateOf(true) }
    val selectedCountry = remember { mutableStateOf("") }
    var selectedStats = remember { mutableStateOf("") }
    var isCountrySelected by remember { mutableStateOf(false) }
    var showCountryDialog by remember {
        mutableStateOf(false)
    }

    val typeOfStats = listOf<String>("Real GDP", "Population Growth")
    val listOfCountry = remember { mutableStateOf(listOf("")) }
    val showGraph = remember { mutableStateOf(false) }

    val context = LocalContext.current

    if (showGraph.value) {
        Log.d("under show graph", "hmm")
        showBoundary(selectedCountry.value)

        if (selectedStats.value == typeOfStats[0]) {

            GDPGraph(selectedCountry.value)
            val context = LocalContext.current
            // Drawing on the map is accomplished witht a child-based API

        } else
            PopulationGraph(context)
        BackHandler {
            layer!!.removeLayerFromMap()
            showGraph.value = false
        }
    }
    if (showCountryDialog) {
        Log.d("undershowCountryDialog", selectedStats.toString())

        val gotList = remember { mutableStateOf(false) }
        LaunchedEffect(Unit)
        {
            Log.d("underLaunchedEFFEct", selectedStats.toString())
            if (selectedStats.value == typeOfStats[0]) {
                Log.d("underLaunchedEFFEctIf", "true")
                try {
                    withContext(Dispatchers.IO)
                    {
                        Log.d("underLaunchedEFFEctIfEwithContext", "true")
                        val obj = GDP(context)
                        listOfCountry.value = obj.listOfCountryNames
                        gotList.value = true
                    }
                } catch (e: Exception) {
                    Log.d("exception", e.message.toString())
                }

            } else {
                if (selectedStats.value == typeOfStats[1]) {
                    try {
                        withContext(Dispatchers.IO)
                        {
                            val obj = Population(context)
                            listOfCountry.value = obj.listOfCountryNames
                            gotList.value = true
                            Log.d("listis", listOfCountry.toString())
                        }
                    } catch (e: Exception) {
                        Log.d("exception", e.message.toString())
                    }
                }
            }

        }


        if (gotList.value) {
            Log.d("under got list", listOfCountry.toString())
            Dialog(onDismissRequest = { showCountryDialog = false }) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(16.dp))
                        .height(300.dp)
                        .width(200.dp)
                        .background(Color.White),
                    contentAlignment = Alignment.Center
                    // Add rounded corners to the box
                ) {

                    Column(
                        verticalArrangement = Arrangement.SpaceEvenly,
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            modifier = Modifier.padding(top = 8.dp),
                            text = "Select Country",
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.Black
                        )
                        Divider(
                            Modifier
                                .width(200.dp)
                                .padding(start = 10.dp, end = 10.dp),
                            color = Color.Black,
                            thickness = 2.dp
                        )
                        LazyColumn {

                            items(listOfCountry.value.size)
                            { option ->
                                Text(
                                    text = listOfCountry.value[option],
                                    color = Color(37, 150, 190),
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 18.sp,
                                    overflow = TextOverflow.Ellipsis,// Set the text color to blue
                                    modifier = Modifier
                                        .padding(8.dp)
                                        .clickable {
                                            selectedCountry.value = listOfCountry.value[option]
                                            showCountryDialog = false
                                            showGraph.value = true

                                        }
                                )

                            }
                        }

                    }


                }
            }
        }


    }
    if (showDialog.value) {
        Dialog(
            onDismissRequest = { showDialog.value = false }
        ) {

            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(16.dp))
                    .height(300.dp)
                    .width(200.dp)
                    .background(Color.White),
                contentAlignment = Alignment.Center
                // Add rounded corners to the box
            ) {
                Column(
                    verticalArrangement = Arrangement.SpaceEvenly,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        modifier = Modifier.padding(top = 8.dp),
                        text = "Select Type Of Stats",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.Black
                    )
                    Divider(
                        Modifier
                            .width(200.dp)
                            .padding(start = 10.dp, end = 10.dp),
                        color = Color.Black,
                        thickness = 2.dp
                    )
                    LazyColumn {
                        items(typeOfStats.size)
                        { option ->
                            Text(
                                text = typeOfStats[option],
                                color = Color(37, 150, 190),
                                fontWeight = FontWeight.Bold,
                                fontSize = 18.sp,
                                overflow = TextOverflow.Ellipsis,// Set the text color to blue
                                modifier = Modifier
                                    .padding(8.dp)
                                    .clickable {
                                        selectedStats.value = typeOfStats[option]
                                        showDialog.value = false
                                        Log.d(
                                            "type of stats clicked",
                                            "$selectedStats ${showCountryDialog}"
                                        )
                                        showCountryDialog = true
                                        Log.d(
                                            "type of stats clicked",
                                            "$selectedStats ${showCountryDialog}"
                                        )

                                    }
                            )

                        }
                    }

                }


            }
        }


    }
}

@Composable
fun Test() {
    val model: RegisterViewModel = viewModel()
    model.goBack()
}

@RequiresApi(Build.VERSION_CODES.R)
@androidx.annotation.OptIn(androidx.media3.common.util.UnstableApi::class)
@OptIn(
    ExperimentalMaterialApi::class, MapsComposeExperimentalApi::class,
    ExperimentalMaterial3Api::class
)
@Composable
fun GoogleMapView(
    modifier: Modifier = Modifier,
    cameraPositionState: CameraPositionState = rememberCameraPositionState(),
    onMapLoaded: () -> Unit = {},
    content: @Composable () -> Unit = {},
    playVideo: () -> Unit,
//    OptedForStats: () -> Unit

) {

    val scope = rememberCoroutineScope()
    val singaporeState = rememberMarkerState(position = singapore)
    val singapore2State = rememberMarkerState(position = singapore2)
    val singapore3State = rememberMarkerState(position = singapore3)
    val singapore4State = rememberMarkerState(position = singapore4)
    val acropolis = rememberMarkerState()
    var circleCenter by remember { mutableStateOf(singapore) }
    if (singaporeState.dragState == DragState.END) {
        circleCenter = singaporeState.position
    }

    var uiSettings by remember { mutableStateOf(MapUiSettings(compassEnabled = false)) }
    var shouldAnimateZoom by remember { mutableStateOf(true) }
    var ticker by remember { mutableStateOf(0) }
    var mapProperties by remember {
        mutableStateOf(MapProperties(mapType = MapType.HYBRID))
    }
    var mapVisible by remember { mutableStateOf(true) }
    var selectedCountry = remember { mutableStateOf("") }
    val showBoundary = remember { mutableStateOf(false) }
    val LatLng = remember { mutableStateOf(LatLng(0.0, 0.0)) }
    val showCountryDialog = remember { mutableStateOf(false) }
    val stateOfScaffold = rememberBottomSheetScaffoldState(bottomSheetState = SheetState(skipPartiallyExpanded = false,
        initialValue = SheetValue.Expanded))
    val viewModel: RegisterViewModel = viewModel()
    val line = remember { mutableStateOf("") }
    val showDirection = remember { mutableStateOf(false) }
    val LocateButton = remember {
        mutableStateOf(false)
    }
    val MarkerPlaced = remember{ mutableStateOf(false) }
    val showMarker = remember { mutableStateOf(false) }
    val options =
        mutableListOf(
            ImageData(
                "Archopolis of Athens",
                R.drawable.archopolis,
                Color(232, 222, 248)
            ),
            ImageData(
                "Opera House",
                R.drawable.sydney,
                Color(232, 222, 248)
            )

        )
    for (i in 1..8)
        options.add(ImageData("Sample Image", R.drawable.eifeltower, Color(232, 222, 248)))


    if (mapVisible) {
    val markerPos = remember{ mutableStateOf(LatLng(0.0,0.0)) }
        BottomSheetScaffold(modifier = Modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                detectTapGestures(onTap = {

                    Log.d("value", stateOfScaffold.bottomSheetState.currentValue.toString())
                    scope.launch {
                        if (stateOfScaffold.bottomSheetState.hasExpandedState) {
                            stateOfScaffold.bottomSheetState.partialExpand()
                        }
                    }
                })
            },
            scaffoldState = stateOfScaffold, sheetPeekHeight = 40.dp, sheetDragHandle = {
                BottomSheetDefaults.DragHandle(
                    width = 60.dp,
                    modifier = Modifier.offset(y = (-5).dp)
                )
            },
            sheetContent = {
    if(!LocateButton.value)
    {

        SheetContent(
            stateOfScaffold,
            options,
            scope,
            cameraPositionState,
            LatLng,
            showMarker,
            LocateButton,
            viewModel,
            line,
            showDirection,
            MarkerPlaced
        )
    }
                else{
                    ARUtil(MarkerPlaced, stateOfScaffold) {

                    }
    }


            }) {

            GoogleMap(
                modifier = modifier.fillMaxSize(),
                cameraPositionState = cameraPositionState,
                properties = mapProperties,
                uiSettings = uiSettings,
                onMapLoaded = onMapLoaded,
                onPOIClick = {
                    Log.d(TAG, "POI clicked: ${it.name}")
                }
                ,
                onMapClick = {
                    Log.d("Map is clicked", "yes")
                    MarkerPlaced.value = true
                    markerPos.value = it
                }
            ) {

                Marker()

                if (showMarker.value) {
                    MarkerInfoWindowContent(state = MarkerState(LatLng.value)) {

                    }

                }
                if(MarkerPlaced.value)
                {
                    Marker(state = MarkerState(markerPos.value))
                }
                val context = LocalContext.current


                val markerClick: (Marker) -> Boolean = {
                    Log.d(TAG, "${it.title} was clicked")
                    cameraPositionState.projection?.let { projection ->
                        Log.d(TAG, "The current projection is: $projection")
                    }
                    false
                }
                BackHandler {
                    if (layer != null) {
                        layer!!.removeLayerFromMap()
                        showDirection.value = false

                    }
                    LocateButton.value = false
                    MarkerPlaced.value = false
                    showMarker.value = false
                }


                if (showDirection.value) {
                    val PATTERN_DASH_LENGTH_PX = 20f // The length of each dash in pixels
                    val PATTERN_GAP_LENGTH_PX = 20f // The gap between each dash in pixels
                    val DASH = Dash(PATTERN_DASH_LENGTH_PX) // A dash pattern item
                    val GAP = Gap(PATTERN_GAP_LENGTH_PX) // A gap pattern item
                    val PATTERN_POLYLINE_DASH = listOf(DASH, GAP)
                    Log.d("underthis", "${line.value}")
                    val decodedPolyline =
                        PolyUtil.decode("~jvmEgxyy[dCXQlAY`D@h@@Vz@_@dB}@bBcAnB_A~@q@b@k@`@}@XeALqAIuCMqAu@cEWyB_@iAg@eAQUuAcAsAa@MDeAIaBCe@CqGIw@Gw@[][]y@Ma@JcEW{G?eAJ}C^gHZgEVqC_AQ_GYqF_@\\iFL_B_TyAe@M}Im@uDSoFi@a@MGLM@KK?A")
                    val polylineOptions = PolylineOptions()
                        .width(10f)
                        .color(0xFFFF0000.toInt())
                        .pattern(PATTERN_POLYLINE_DASH)
                    MapEffect(key1 = Unit)
                    {
                        it.addPolyline(polylineOptions.addAll(decodedPolyline))

                    }

                }
                if (showBoundary.value) {

                    MapEffect(key1 = Unit)
                    {
                        try {
                            val selectedCountryResource = getResourceIdForCountryName(
                                formatCountryName(selectedCountry.value),
                                context
                            )

                            layer = GeoJsonLayer(it, selectedCountryResource, context)

                            val style = layer!!.defaultPolygonStyle
                            // style.fillColor = Color.MAGENTA
                            style.strokeColor = android.graphics.Color.RED
                            style.strokeWidth = 6f
                            layer!!.addLayerToMap()
                        } catch (ex: IOException) {
                            Log.e("IOException", ex.localizedMessage)
                        } catch (ex: JSONException) {
                            Log.e("JSONException", ex.localizedMessage)
                        }

                    }

                }
                content()

            }

            if (showCountryDialog.value) {
                ShowCountryList()
                {
                    showBoundary.value = true
                    selectedCountry.value = it
                }
            }
            Column {
                Row {


                    val mapTypes = listOf(
                        MapType.NONE,
                        MapType.NORMAL,
                        MapType.SATELLITE,
                        MapType.TERRAIN,
                        MapType.HYBRID
                    )
                    // A state variable to store the selected map type
                    var mapType by remember { mutableStateOf(mapTypes[0]) }
                    // A state variable to control the expansion of the Map Type menu
                    var mapTypeExpanded = remember { mutableStateOf(false) }

                    // A list of options for the NERF button
                    val nerfOptions =
                        listOf("Arcopolis of Athens", "Opera House", "place3", "place4")
                    // A state variable to store the selected NERF option
                    var nerfOption by remember { mutableStateOf(nerfOptions[0]) }
                    // A state variable to control the expansion of the NERF menu
                    var nerfExpanded by remember { mutableStateOf(false) }

                    // A modifier to align the menus with the buttons
//            val menuAnchor = Modifier.menuAnchor()

                    // A row that contains the two buttons
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.Center,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // The Map Type button that shows the selected map type and toggles the menu
                        Box(modifier = Modifier.weight(0.4f)) {
//                            Button(
//                                modifier = Modifier
//                                    .fillMaxWidth()
//                                    .padding(8.dp), shape = RoundedCornerShape(50.dp),
//                                onClick = { mapTypeExpanded.value = !mapTypeExpanded.value },
//                                colors = ButtonDefaults.buttonColors(
//                                    backgroundColor = Color(
//                                        0xFF87CEEB
//                                    )
//                                )
//                            ) {
//
//
//                            }

//                            if (mapTypeExpanded.value) {
//                                Dialog(onDismissRequest = { mapTypeExpanded.value = false }) {
//                                    Box(
//                                        modifier = Modifier
//                                            .clip(RoundedCornerShape(16.dp))
//                                            .height(300.dp)
//                                            .width(200.dp)
//                                            .background(Color.White),
//                                        contentAlignment = Alignment.Center
//                                        // Add rounded corners to the box
//                                    )
//                                    {
//                                        Column(
//                                            verticalArrangement = Arrangement.SpaceEvenly,
//                                            horizontalAlignment = Alignment.CenterHorizontally
//                                        ) {
//                                            Text(
//                                                modifier = Modifier.padding(top = 8.dp),
//                                                text = "Select Map Type",
//                                                fontSize = 20.sp,
//                                                fontWeight = FontWeight.Bold,
//                                                color = Color.Black
//                                            )
//                                            Divider(
//                                                Modifier
//                                                    .width(200.dp)
//                                                    .padding(start = 10.dp, end = 10.dp),
//                                                color = Color.Black,
//                                                thickness = 2.dp
//                                            )
//                                            LazyColumn(
//                                                verticalArrangement = Arrangement.SpaceEvenly,
//                                                horizontalAlignment = Alignment.CenterHorizontally,
//                                                modifier = Modifier
//                                                    .fillMaxSize()
//                                                    .padding(6.dp)
//                                            ) {
//                                                items(mapTypes.size) { option ->
//                                                    Text(
//                                                        text = mapTypes[option].toString(),
//                                                        color = Color(37, 150, 190),
//                                                        fontWeight = FontWeight.Bold,
//                                                        fontSize = 18.sp,
//                                                        overflow = TextOverflow.Ellipsis,// Set the text color to blue
//                                                        modifier = Modifier
//                                                            .padding(8.dp)
//                                                            .clickable {
//                                                                mapProperties =
//                                                                    mapProperties.copy(mapType = mapTypes[option])
//                                                                mapTypeExpanded.value = false
//                                                            }
//                                                    )
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//
//                            }

                        }


//                        Box(modifier = Modifier.weight(0.4f)) {
//                            OldExplorePlacesButton(
//                                showDialog,
//                                showCountryDialog,
//                                showBoundary,
//                                nerfExpanded,
//                                nerfOptions,
//                                nerfOption,
//                                scope,
//                                cameraPositionState
//                            )
//
//                        }


                    }


                }
                val coroutineScope = rememberCoroutineScope()
                ZoomControls(
                    shouldAnimateZoom,
                    uiSettings.zoomControlsEnabled,
                    onZoomOut = {
                        if (shouldAnimateZoom) {
                            coroutineScope.launch {
                                cameraPositionState.animate(CameraUpdateFactory.zoomOut())
                            }
                        } else {
                            cameraPositionState.move(CameraUpdateFactory.zoomOut())
                        }
                    },
                    onZoomIn = {
                        if (shouldAnimateZoom) {
                            coroutineScope.launch {
                                cameraPositionState.animate(CameraUpdateFactory.zoomIn())
                            }
                        } else {
                            cameraPositionState.move(CameraUpdateFactory.zoomIn())
                        }
                        ticker++
                    },
                    onCameraAnimationCheckedChange = {
                        shouldAnimateZoom = it
                    },
                    onZoomControlsCheckedChange = {
                        uiSettings = uiSettings.copy(zoomControlsEnabled = it)
                    }
                )
//        DebugView(cameraPositionState, singaporeState)
            }

        }


    }

}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SheetContent(
    stateOfScaffold: BottomSheetScaffoldState,
    options: MutableList<ImageData>,
    scope: CoroutineScope,
    cameraPositionState: CameraPositionState,
    LatLng: MutableState<LatLng>,
    showMarker: MutableState<Boolean>,
    LocateButton: MutableState<Boolean>,
    viewModel: RegisterViewModel,
    line: MutableState<String>,
    showDirection: MutableState<Boolean>,
    MarkerPlaced : MutableState<Boolean>
) {
    Box(
        modifier = Modifier
            .animateContentSize()
            .fillMaxWidth()
            .padding(5.dp)
    ) {

        Column(
            Modifier
                .fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {

            val itemClicked = remember { mutableStateOf(false) }
            val itemNo = remember { mutableStateOf(-1) }
            val itemName = remember { mutableStateOf("") }

            LaunchedEffect(stateOfScaffold.bottomSheetState.currentValue) {
                itemNo.value = -1
                itemClicked.value = false


            }

            AssistChip(onClick = { /*TODO*/ }, label = {
                Log.d("not good", "not good")
                Text(
                    text = "Explore Places",
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
            },
                shape = RoundedCornerShape(10.dp),
                colors = AssistChipDefaults.assistChipColors(containerColor = MaterialTheme.colorScheme.secondaryContainer),
                border = AssistChipDefaults.assistChipBorder(borderColor = MaterialTheme.colorScheme.tertiary)
            )
            Spacer(modifier = Modifier.size(5.dp))
            Divider()
            val colors = listOf<Color>(Color.Green, Color.Yellow)

            val viewNerf = remember { mutableStateOf(false) }
            if (!viewNerf.value ) {
                NerfItems(
                    options,
                    itemNo,
                    itemClicked,
                    itemName,
                    scope,
                    cameraPositionState,
                    showMarker
                )
            }


            Spacer(modifier = Modifier.size(15.dp))
            val density = LocalDensity.current

            AnimatedVisibility(
                itemClicked.value && !viewNerf.value,
                enter = expandIn()
            ) {
                Body(itemName, viewNerf,
                    showMap = { latlng ->

                        Log.d("showmap invoked", "h")
                        LatLng.value = latlng
                        showMarker.value = true

                        scope.launch {

                            stateOfScaffold.bottomSheetState.partialExpand()

                            try {
                                withContext(Dispatchers.Main) {
                                    val cameraPosition =
                                        CameraPosition.fromLatLngZoom(latlng, 18f)
                                    cameraPositionState.animate(
                                        update = CameraUpdateFactory.zoomBy(
                                            -20f
                                        ),
                                        1000
                                    )
                                    delay(1000)
                                    cameraPositionState.animate(
                                        update = CameraUpdateFactory.newCameraPosition(
                                            cameraPosition
                                        ),
                                        3000
                                    )

                                LocateButton.value = true
                                }
                            } catch (e: Exception) {
                                Log.d(
                                    "failed due to",
                                    e.message.toString()
                                )
                            }


                        }

                    },
                    showButton = {

                    }
                )

            }

            if (viewNerf.value) {
                val configuraiton = LocalConfiguration.current
                val width = configuraiton.screenWidthDp.dp
                val height = configuraiton.screenHeightDp.dp
                Column {
                    Box(
                        modifier = Modifier

                            .clip(
                                RoundedCornerShape(5.dp)
                            )
                            .fillMaxWidth()
                            .height((height / 3))
                            .background(MaterialTheme.colorScheme.background)
                            .clickable { }, contentAlignment = Alignment.Center
                    )
                    {


                        PlayVideo {
                            viewNerf.value = false
                        }

                    }
                    OptionsInVideo(viewModel) {
                        line.value = it
                        showDirection.value = true
                    }
                    Spacer(modifier = Modifier.size(15.dp))
                }
            }
            Spacer(modifier = Modifier.size(15.dp))
            UploadView()

        }
    }
}

@Composable
private fun OldExplorePlacesButton(
    showDialog: MutableState<Boolean>,
    showCountryDialog: MutableState<Boolean>,
    showBoundary: MutableState<Boolean>,
    nerfExpanded: Boolean,
    nerfOptions: List<String>,
    nerfOption: String,
    scope: CoroutineScope,
    cameraPositionState: CameraPositionState
) {
    var nerfOption1 = nerfOption
    Button(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp), shape = RoundedCornerShape(50.dp),
        onClick = {
            showDialog.value = !showDialog.value
            showCountryDialog.value = false
            showBoundary.value = false
            if (layer != null) {
                layer!!.removeLayerFromMap()
            }


        },
        colors = ButtonDefaults.buttonColors(
            backgroundColor = Color(
                0xFF87CEEB
            )
        )
    ) {
        Text(text = "Explore Places")
        // An icon that indicates the expansion state of the menu
        val icon =
            if (nerfExpanded) Icons.Filled.ArrowDropDown else Icons.Filled.ArrowDropDown
        Icon(imageVector = icon, contentDescription = null)
    }

    if (showDialog.value) {
        Dialog(
            onDismissRequest = { showDialog.value = false }
        ) {
            // Use a LazyColumn or a VerticalScroller here
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(16.dp))
                    .height(300.dp)
                    .width(200.dp)
                    .background(Color.White),
                contentAlignment = Alignment.Center
                // Add rounded corners to the box
            ) {
                Column(
                    verticalArrangement = Arrangement.SpaceEvenly,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        modifier = Modifier.padding(top = 8.dp),
                        text = "Select a Place",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.Black
                    )
                    Divider(
                        Modifier
                            .width(200.dp)
                            .padding(start = 10.dp, end = 10.dp),
                        color = Color.Black,
                        thickness = 2.dp
                    )
                    // Stats
                    Box(contentAlignment = Alignment.Center)
                    {
                        Button(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(8.dp),
                            shape = RoundedCornerShape(50.dp),
                            onClick = {
                                showDialog.value = false
                                showCountryDialog.value = true
                                Log.d("clicked", "yes")

                            },
                            colors = ButtonDefaults.buttonColors(backgroundColor = Color(0xFF87CEEB))
                        )
                        {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceEvenly
                            ) {
                                Text(text = "Explore by Stats")
                                Spacer(modifier = Modifier.size(8.dp))
                                Icon(
                                    painter = painterResource(id = R.drawable.chart),
                                    contentDescription = "df",
                                    tint = Color(Color.Green.toArgb()),
                                    modifier = Modifier.size(25.dp)
                                )
                            }


                        }
                    }




                    LazyColumn(
                        verticalArrangement = Arrangement.SpaceEvenly,
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(6.dp)
                    ) {
                        items(nerfOptions.size) { option ->
                            Text(
                                text = nerfOptions[option].replaceFirstChar { it -> it.uppercase() },
                                color = Color(37, 150, 190),
                                fontWeight = FontWeight.Bold,
                                fontSize = 18.sp,
                                overflow = TextOverflow.Ellipsis,// Set the text color to blue
                                modifier = Modifier
                                    .padding(8.dp)
                                    .clickable {
                                        nerfOption1 = nerfOptions[option]
                                        showDialog.value = false

                                        scope.launch {
                                            try {
                                                withContext(Dispatchers.Main) {
                                                    val cameraPosition =
                                                        if (nerfOptions[option] == nerfOptions[0]) acropolisCameraPosition else sydneyCameraPosition

                                                    cameraPositionState.animate(
                                                        update = CameraUpdateFactory.zoomBy(
                                                            -20f
                                                        ),
                                                        1000
                                                    )
                                                    delay(1000)
                                                    cameraPositionState.animate(
                                                        update = CameraUpdateFactory.newCameraPosition(
                                                            cameraPosition
                                                        ),
                                                        3000
                                                    )
//                                                                            modalSheetState.show()
                                                }
                                            } catch (e: Exception) {
                                                Log.d(
                                                    "failed due to",
                                                    e.message.toString()
                                                )
                                            }
                                        }

                                    }
                            )
                        }
                    }
                }


            }
        }
    }
}

@Composable
private fun NerfItems(
    options: MutableList<ImageData>,
    itemNo: MutableState<Int>,
    itemClicked: MutableState<Boolean>,
    itemName: MutableState<String>,
    scope: CoroutineScope,
    cameraPositionState: CameraPositionState,
    showMarker: MutableState<Boolean>
) {

    val viewModel = RegisterViewModel()
    LazyRow(
        modifier = Modifier.padding(top = 10.dp),
        horizontalArrangement = Arrangement.spacedBy(10.dp),

        )
    {
        items(options.size)
        {
            val isItemSelected = itemNo.value == it
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {

                Box(
                    contentAlignment = Alignment.BottomEnd,
                    modifier = Modifier
                        .size(height = 120.dp, width = 190.dp)
                        .border(
                            width = 2.dp,
                            shape = RoundedCornerShape(10.dp),
                            color = if (isItemSelected) Color.Green else Color.Black
                        )
                        .clip(RoundedCornerShape(15.dp))
//                                            .background(
//                                                color = randomColor(),
//                                                shape = RectangleShape
//                                            )
                        .clickable {
                            if (itemNo.value == it)
                                itemClicked.value = !itemClicked.value
                            else
                                itemClicked.value = true
                            itemNo.value = it
                            itemName.value = options[it].name
                            viewModel.updateLocation(options[it].name)
                            val job = scope.launch {
                                try {
                                    withContext(Dispatchers.Main) {
                                        val cameraPosition =
                                            if (options[it] == options[0]) acropolisCameraPosition else sydneyCameraPosition

                                        cameraPositionState.animate(
                                            update = CameraUpdateFactory.zoomBy(
                                                -20f
                                            ),
                                            1000
                                        )
                                        delay(1000)
                                        cameraPositionState.animate(
                                            update = CameraUpdateFactory.newCameraPosition(
                                                cameraPosition
                                            ),
                                            3000
                                        )
//                                                                            modalSheetState.show()
                                    }
                                } catch (e: Exception) {
                                    Log.d(
                                        "failed due to",
                                        e.message.toString()
                                    )
                                }
                            }
                            if (showMarker.value) {
                                Log.d("showmarker is true", "h")
                                if (job.isActive)
                                    job.cancel()
                            }
                        }
                )
                {
                    Image(
                        painter = painterResource(options[it].image),
                        contentDescription = options[it].name,
                        contentScale = ContentScale.FillBounds
                    )
                }

                Text(
                    text = options[it].name,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 15.sp,
                    color = MaterialTheme.colorScheme.primary
                )


            }
        }
    }
}

@Composable
private fun Body(
    itemName: MutableState<String>,
    viewNerf: MutableState<Boolean>,
    showMap: (LatLng) -> Unit,
    showButton: () -> Unit
) {
    val ltlng = remember {
        mutableStateOf(LatLng(0.0, 0.0))
    }
    val context = LocalContext.current
    val already = remember{ mutableStateOf(false) }

    Box(
        modifier = Modifier.animateContentSize()
    ) {
        val scope = rememberCoroutineScope()
        Log.d("yes clicked", "hm")
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceEvenly, modifier = Modifier
                .fillMaxWidth(0.9f)
                .clip(RoundedCornerShape(20.dp))

                .background(MaterialTheme.colorScheme.background)
                .padding(10.dp)
        ) {
            val checkLocation = remember { mutableStateOf(false) }
            AssistChip(onClick = { /*TODO*/ }, label = {
                Log.d("not good", "not good")
                Text(
                    text = "Selected: ${itemName.value}",
                    fontWeight = FontWeight.Bold
                )
            },
                shape = RoundedCornerShape(10.dp),
                colors = AssistChipDefaults.assistChipColors(containerColor = MaterialTheme.colorScheme.secondaryContainer),
                border = AssistChipDefaults.assistChipBorder(borderColor = MaterialTheme.colorScheme.tertiary)
            )
            Column(horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly,
                    verticalAlignment = Alignment.CenterVertically
                ) {

                    val haveLocation = remember {
                        mutableStateOf(false)
                    }
                    FilledTonalButton(onClick = {
                        viewNerf.value = true


                    }) {
                        Text(text = "View in NERF")
                    }
                    FilledTonalButton(onClick = {

                    checkLocation.value = true
                    if(already.value)
                    {
                        Log.d("coordinates", ltlng.value.latitude.toString() + " " + ltlng.value.longitude.toString()  )
                        showMap(ltlng.value)
                    }

                    }) {
                        Text(text = "View in Geospatial")
                    }

                }
                val pm = LocalContext.current.packageManager
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    FilledTonalButton(onClick = {

                        val myintent = pm.getLaunchIntentForPackage("com.wasul.nerfnavAR")
                        // check if the intent is not null
                        if (myintent != null) {
                            // start the app
                            startActivity(context, myintent, null)
                        } else {
                            // show a message that the app is not found
                            Toast.makeText(context, "App not found", Toast.LENGTH_SHORT).show()
                        }

                    }) {
                        Text(text = "View in AR")
                    }

                    FilledTonalButton(onClick = {

                        // get the launch intent for the app
                        val myintent = pm.getLaunchIntentForPackage("com.wasuli.nerfnav360")
                        // check if the intent is not null
                        if (myintent != null) {
                            // start the app
                            startActivity(context, myintent, null)
                        } else {
                            // show a message that the app is not found
                            Toast.makeText(context, "App not found", Toast.LENGTH_SHORT).show()
                        }

                    }) {
                        Text(text = "View in Spatial")
                    }
                }
            }

            if(checkLocation.value)
            {

                Layout{
                    lat->
                        Log.d("coordinatesare", "${lat.latitude} ${lat.longitude}")
                    ltlng.value = lat
                        showMap(lat)
                    already.value = true
                }
            }
        }


    }
}

@Composable
private fun UploadView() {
    Box(modifier = Modifier

        .clip(
            RoundedCornerShape(20.dp)
        )
        .fillMaxWidth(0.9f)

        .background(MaterialTheme.colorScheme.background)
        .clickable { }
        .padding(all = 30.dp), contentAlignment = Alignment.Center)
    {
        Row(
            Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Text(text = "Upload NERF Data")
            Spacer(modifier = Modifier.size(5.dp))
            Icon(
                tint = MaterialTheme.colorScheme.surfaceTint,
                modifier = Modifier.size(20.dp),
                painter = painterResource(id = R.drawable.noun_project_cloud_upload_icon_411593_cc),
                contentDescription = "upload icon"
            )
        }

    }
}

//@RequiresApi(Build.VERSION_CODES.R)
//@androidx.annotation.OptIn(androidx.media3.common.util.UnstableApi::class)
//@OptIn(ExperimentalMaterialApi::class, MapsComposeExperimentalApi::class)
//@Composable
//fun GoogleMapView(
//    modifier: Modifier = Modifier,
//    cameraPositionState: CameraPositionState = rememberCameraPositionState(),
//    onMapLoaded: () -> Unit = {},
//    content: @Composable () -> Unit = {},
//    playVideo: () -> Unit,
////    OptedForStats: () -> Unit
//
//    ) {
//
//    val scope = rememberCoroutineScope()
//    val singaporeState = rememberMarkerState(position = singapore)
//    val singapore2State = rememberMarkerState(position = singapore2)
//    val singapore3State = rememberMarkerState(position = singapore3)
//    val singapore4State = rememberMarkerState(position = singapore4)
//    val acropolis = rememberMarkerState()
//    var circleCenter by remember { mutableStateOf(singapore) }
//    if (singaporeState.dragState == DragState.END) {
//        circleCenter = singaporeState.position
//    }
//
//    var uiSettings by remember { mutableStateOf(MapUiSettings(compassEnabled = false)) }
//    var shouldAnimateZoom by remember { mutableStateOf(true) }
//    var ticker by remember { mutableStateOf(0) }
//    var mapProperties by remember {
//        mutableStateOf(MapProperties(mapType = MapType.HYBRID))
//    }
//    var mapVisible by remember { mutableStateOf(true) }
//    var selectedCountry = remember{ mutableStateOf("") }
//    val showBoundary = remember{ mutableStateOf(false) }
//    val showDialog = remember { mutableStateOf(false) }
//    val showCountryDialog = remember{ mutableStateOf(false) }
////    LaunchedEffect(key1 = true) {
////        cameraPositionState.animate(
////            update = CameraUpdateFactory.newCameraPosition(
////                CameraPosition(acropolispos, 15f, 0f, 0f)
////            ),
////            durationMs = 1000
////        )
////    }
//    val modalSheetState = rememberModalBottomSheetState(
//        initialValue = ModalBottomSheetValue.Hidden,
//        confirmValueChange = { it != ModalBottomSheetValue.HalfExpanded },
//        skipHalfExpanded = false
//    )
//    if (mapVisible) {
//        ModalBottomSheetLayout(sheetState = modalSheetState,
//            sheetShape = RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp),
//            sheetContent = {
//                Row {
//                    Button(
//                        modifier = Modifier
//                            .weight(0.5f)
//                            .fillMaxWidth()
//                            .padding(8.dp), shape = RoundedCornerShape(50.dp),
//                        onClick = { },
//                        colors = ButtonDefaults.buttonColors(backgroundColor = Color(0xFF87CEEB))
//                    ) {
//                        Text(text = "View in AR")
//                        // An icon that indicates the expansion state of the menu
//
//                    }
//                    var s by rememberSaveable { mutableStateOf(false) }
//                    Button(
//                        modifier = Modifier
//                            .weight(0.5f)
//                            .fillMaxWidth()
//                            .padding(8.dp), shape = RoundedCornerShape(50.dp),
//                        onClick = {
//                           playVideo()
//                        },
//                        colors = ButtonDefaults.buttonColors(backgroundColor = Color(0xFF87CEEB))
//                    ) {
//                        Text(text = "View NERF")
//
//                    }
//                }
//
//
//            }) {
//            GoogleMap(
//                modifier = modifier,
//                cameraPositionState = cameraPositionState,
//                properties = mapProperties,
//                uiSettings = uiSettings,
//                onMapLoaded = onMapLoaded,
//                onPOIClick = {
//                    Log.d(TAG, "POI clicked: ${it.name}")
//                }
//            ) {
//
//                val context = LocalContext.current
//                // Drawing on the map is accomplished with a child-based API
//
//                val markerClick: (Marker) -> Boolean = {
//                    Log.d(TAG, "${it.title} was clicked")
//                    cameraPositionState.projection?.let { projection ->
//                        Log.d(TAG, "The current projection is: $projection")
//                    }
//                    false
//                }
//                BackHandler {
//                    if(layer != null)
//                    {
//                        layer!!.removeLayerFromMap()
//                    }
//                }
//if(showBoundary.value)
//{
//
//    MapEffect(key1 = Unit)
//    {
//        try {
//            val selectedCountryResource = getResourceIdForCountryName(formatCountryName(selectedCountry.value), context)
//
//             layer = GeoJsonLayer(it, selectedCountryResource, context)
//
//            val style = layer!!.defaultPolygonStyle
//            // style.fillColor = Color.MAGENTA
//            style.strokeColor = android.graphics.Color.RED
//            style.strokeWidth = 6f
//            layer!!.addLayerToMap()
//        }
//        catch ( ex: IOException) {
//            Log.e("IOException", ex.getLocalizedMessage());
//        } catch ( ex: JSONException) {
//            Log.e("JSONException", ex.getLocalizedMessage());
//        }
//
//    }
//
//}
//
//
//
//
//
//
////            MarkerInfoWindowContent(
////                state = singaporeState,
////                title = "Zoom in has been tapped $ticker times.",
////                onClick = markerClick,
////                draggable = true,
////            ) {
////                Text(it.title ?: "Title", color = Color.Red)
////            }
////            MarkerInfoWindowContent(
////                state = singapore2State,
////                title = "Marker with custom info window.\nZoom in has been tapped $ticker times.",
////                icon = BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE),
////                onClick = markerClick,
////            ) {
////                Text(it.title ?: "Title", color = Color.Blue)
////            }
////            Marker(
////                state = singapore3State,
////                title = "Marker in Singapore",
////                onClick = markerClick
////            )
////            MarkerComposable(
////                title = "Marker Composable",
////                keys = arrayOf("singapore4"),
////                state = singapore4State,
////                onClick = markerClick,
////            ) {
////                Box(
////                    modifier = Modifier
////                        .width(88.dp)
////                        .height(36.dp)
////                        .clip(RoundedCornerShape(16.dp))
////                        .background(Color.Red),
////                    contentAlignment = Alignment.Center,
////                ) {
////                ) {
////                    Text(
////                        text = "Compose Marker",
////                        textAlign = TextAlign.Center,
////                    )
////                }
////            }
////            Circle(
////                center = circleCenter,
////                fillColor = MaterialTheme.colors.secondary,
////                strokeColor = MaterialTheme.colors.secondaryVariant,
////                radius = 1000.0,
////            )
//                content()
//
//            }
//            if(showCountryDialog.value)
//            {
//                ShowCountryList()
//                {
//                    showBoundary.value = true
//                    selectedCountry.value = it
//                }
//            }
//            Column {
////
////        MapTypeButton(type = Map) {
////
////        }
////        MapTypeControls(onMapTypeClick = {
////            Log.d("GoogleMap", "Selected map type $it")
////            mapProperties = mapProperties.copy(mapType = it)
////        })
//                Row {
////            MapButton(
////                text = "Reset Map",
////                onClick = {
////                    mapProperties = mapProperties.copy(mapType = MapType.NORMAL)
////                    cameraPositionState.position = defaultCameraPosition
////                    singaporeState.position = singapore
////                    singaporeState.hideInfoWindow()
////                }
////            )
////            MapButton(
////                text = "Toggle Map",
////                onClick = { mapVisible = !mapVisible },
////                modifier = Modifier.testTag("toggleMapVisibility"),
////            )
//
//
//                    val mapTypes = listOf(
//                        MapType.NONE,
//                        MapType.NORMAL,
//                        MapType.SATELLITE,
//                        MapType.TERRAIN,
//                        MapType.HYBRID
//                    )
//                    // A state variable to store the selected map type
//                    var mapType by remember { mutableStateOf(mapTypes[0]) }
//                    // A state variable to control the expansion of the Map Type menu
//                    var mapTypeExpanded = remember { mutableStateOf(false) }
//
//                    // A list of options for the NERF button
//                    val nerfOptions =
//                        listOf("Arcopolis of Athens", "Opera House", "place3", "place4")
//                    // A state variable to store the selected NERF option
//                    var nerfOption by remember { mutableStateOf(nerfOptions[0]) }
//                    // A state variable to control the expansion of the NERF menu
//                    var nerfExpanded by remember { mutableStateOf(false) }
//
//                    // A modifier to align the menus with the buttons
////            val menuAnchor = Modifier.menuAnchor()
//
//                    // A row that contains the two buttons
//                    Row(
//                        modifier = Modifier.fillMaxWidth(),
//                        horizontalArrangement = Arrangement.Center,
//                        verticalAlignment = Alignment.CenterVertically
//                    ) {
//                        // The Map Type button that shows the selected map type and toggles the menu
//                        Box(modifier = Modifier.weight(0.4f)) {
//                            Button(
//                                modifier = Modifier
//                                    .fillMaxWidth()
//                                    .padding(8.dp), shape = RoundedCornerShape(50.dp),
//                                onClick = { mapTypeExpanded.value = !mapTypeExpanded.value },
//                                colors = ButtonDefaults.buttonColors(
//                                    backgroundColor = Color(
//                                        0xFF87CEEB
//                                    )
//                                )
//                            ) {
//                                Text(text = "Map Type")
//
//                            }
//                            if (mapTypeExpanded.value) {
//                                Dialog(onDismissRequest = { mapTypeExpanded.value = false }) {
//                                    Box(
//                                        modifier = Modifier
//                                            .clip(RoundedCornerShape(16.dp))
//                                            .height(300.dp)
//                                            .width(200.dp)
//                                            .background(Color.White),
//                                        contentAlignment = Alignment.Center
//                                        // Add rounded corners to the box
//                                    )
//                                    {
//                                        Column(
//                                            verticalArrangement = Arrangement.SpaceEvenly,
//                                            horizontalAlignment = Alignment.CenterHorizontally
//                                        ) {
//                                            Text(
//                                                modifier = Modifier.padding(top = 8.dp),
//                                                text = "Select Map Type",
//                                                fontSize = 20.sp,
//                                                fontWeight = FontWeight.Bold,
//                                                color = Color.Black
//                                            )
//                                            Divider(
//                                                Modifier
//                                                    .width(200.dp)
//                                                    .padding(start = 10.dp, end = 10.dp),
//                                                color = Color.Black,
//                                                thickness = 2.dp
//                                            )
//                                            LazyColumn(
//                                                verticalArrangement = Arrangement.SpaceEvenly,
//                                                horizontalAlignment = Alignment.CenterHorizontally,
//                                                modifier = Modifier
//                                                    .fillMaxSize()
//                                                    .padding(6.dp)
//                                            ) {
//                                                items(mapTypes.size) { option ->
//                                                    Text(
//                                                        text = mapTypes[option].toString(),
//                                                        color = Color(37, 150, 190),
//                                                        fontWeight = FontWeight.Bold,
//                                                        fontSize = 18.sp,
//                                                        overflow = TextOverflow.Ellipsis,// Set the text color to blue
//                                                        modifier = Modifier
//                                                            .padding(8.dp)
//                                                            .clickable {
//                                                                mapProperties =
//                                                                    mapProperties.copy(mapType = mapTypes[option])
//                                                                mapTypeExpanded.value = false
//                                                            }
//                                                    )
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//
//                            }
//
//                        }
//
//
//
//                        Box(modifier = Modifier.weight(0.4f)) {
//                            Button(
//                                modifier = Modifier
//                                    .fillMaxWidth()
//                                    .padding(8.dp), shape = RoundedCornerShape(50.dp),
//                                onClick = { showDialog.value = !showDialog.value;
//                                            showCountryDialog.value = false
//                                            showBoundary.value = false
//                                            if(layer != null)
//                                            {
//                                                layer!!.removeLayerFromMap()
//                                            }
//
//
//
//                                          },
//                                colors = ButtonDefaults.buttonColors(
//                                    backgroundColor = Color(
//                                        0xFF87CEEB
//                                    )
//                                )
//                            ) {
//                                Text(text = "Explore Places")
//                                // An icon that indicates the expansion state of the menu
//                                val icon =
//                                    if (nerfExpanded) Icons.Filled.ArrowDropDown else Icons.Filled.ArrowDropDown
//                                Icon(imageVector = icon, contentDescription = null)
//                            }
//
//                            if (showDialog.value) {
//                                Dialog(
//                                    onDismissRequest = { showDialog.value = false }
//                                ) {
//                                    // Use a LazyColumn or a VerticalScroller here
//                                    Box(
//                                        modifier = Modifier
//                                            .clip(RoundedCornerShape(16.dp))
//                                            .height(300.dp)
//                                            .width(200.dp)
//                                            .background(Color.White),
//                                        contentAlignment = Alignment.Center
//                                        // Add rounded corners to the box
//                                    ) {
//                                        Column(
//                                            verticalArrangement = Arrangement.SpaceEvenly,
//                                            horizontalAlignment = Alignment.CenterHorizontally
//                                        ) {
//                                            Text(
//                                                modifier = Modifier.padding(top = 8.dp),
//                                                text = "Select a Place",
//                                                fontSize = 20.sp,
//                                                fontWeight = FontWeight.Bold,
//                                                color = Color.Black
//                                            )
//                                            Divider(
//                                                Modifier
//                                                    .width(200.dp)
//                                                    .padding(start = 10.dp, end = 10.dp),
//                                                color = Color.Black,
//                                                thickness = 2.dp
//                                            )
//                                            // Stats
//                                            Box(contentAlignment = Alignment.Center)
//                                            {
//                                                Button(
//                                                    modifier = Modifier
//                                                        .fillMaxWidth()
//                                                        .padding(8.dp),
//                                                    shape = RoundedCornerShape(50.dp),
//                                                    onClick = {
//                                                        showDialog.value = false
//                                                        showCountryDialog.value = true
//                                                        Log.d("clicked", "yes")
//
//                                                    },
//                                                    colors = ButtonDefaults.buttonColors(backgroundColor = Color(0xFF87CEEB))
//                                                )
//                                                {
//                                                    Row (verticalAlignment = Alignment.CenterVertically,
//                                                        horizontalArrangement = Arrangement.SpaceEvenly){
//                                                        Text(text = "Explore by Stats")
//                                                        Spacer(modifier = Modifier.size(8.dp))
//                                                        Icon(painter = painterResource(id = R.drawable.chart), contentDescription = "df",
//                                                            tint =Color(Color.Green.toArgb()), modifier = Modifier.size(25.dp))
//                                                    }
//
//
//                                                }
//                                            }
//
//
//
//
//                                            LazyColumn(
//                                                verticalArrangement = Arrangement.SpaceEvenly,
//                                                horizontalAlignment = Alignment.CenterHorizontally,
//                                                modifier = Modifier
//                                                    .fillMaxSize()
//                                                    .padding(6.dp)
//                                            ) {
//                                                items(nerfOptions.size) { option ->
//                                                    Text(
//                                                        text = nerfOptions[option].replaceFirstChar { it -> it.uppercase() },
//                                                        color = Color(37, 150, 190),
//                                                        fontWeight = FontWeight.Bold,
//                                                        fontSize = 18.sp,
//                                                        overflow = TextOverflow.Ellipsis,// Set the text color to blue
//                                                        modifier = Modifier
//                                                            .padding(8.dp)
//                                                            .clickable {
//                                                                nerfOption = nerfOptions[option]
//                                                                showDialog.value = false
//
//                                                                scope.launch {
//                                                                    try {
//                                                                        withContext(Dispatchers.Main) {
//                                                                            val cameraPosition =
//                                                                                if (nerfOptions[option] == nerfOptions[0]) acropolisCameraPosition else sydneyCameraPosition
//
//                                                                            cameraPositionState.animate(
//                                                                                update = CameraUpdateFactory.zoomBy(
//                                                                                    -20f
//                                                                                ),
//                                                                                1000
//                                                                            )
//                                                                            delay(1000)
//                                                                            cameraPositionState.animate(
//                                                                                update = CameraUpdateFactory.newCameraPosition(
//                                                                                    cameraPosition
//                                                                                ),
//                                                                                3000
//                                                                            )
//                                                                            modalSheetState.show()
//                                                                        }
//                                                                    } catch (e: Exception) {
//                                                                        Log.d(
//                                                                            "failed due to",
//                                                                            e.message.toString()
//                                                                        )
//                                                                    }
//                                                                }
//                                                            }
//                                                    )
//                                                }
//                                            }
//                                        }
//
//
//                                    }
//                                }
//                            }
//
//                        }
//
//
//                    }
//
//
//                }
//                val coroutineScope = rememberCoroutineScope()
//                ZoomControls(
//                    shouldAnimateZoom,
//                    uiSettings.zoomControlsEnabled,
//                    onZoomOut = {
//                        if (shouldAnimateZoom) {
//                            coroutineScope.launch {
//                                cameraPositionState.animate(CameraUpdateFactory.zoomOut())
//                            }
//                        } else {
//                            cameraPositionState.move(CameraUpdateFactory.zoomOut())
//                        }
//                    },
//                    onZoomIn = {
//                        if (shouldAnimateZoom) {
//                            coroutineScope.launch {
//                                cameraPositionState.animate(CameraUpdateFactory.zoomIn())
//                            }
//                        } else {
//                            cameraPositionState.move(CameraUpdateFactory.zoomIn())
//                        }
//                        ticker++
//                    },
//                    onCameraAnimationCheckedChange = {
//                        shouldAnimateZoom = it
//                    },
//                    onZoomControlsCheckedChange = {
//                        uiSettings = uiSettings.copy(zoomControlsEnabled = it)
//                    }
//                )
////        DebugView(cameraPositionState, singaporeState)
//            }
//        }
//
//
//    }
//
//}

@Composable
private fun MapTypeControls(
    onMapTypeClick: (MapType) -> Unit
) {
    Row(
        Modifier
            .fillMaxWidth()
            .horizontalScroll(state = ScrollState(0)),
        horizontalArrangement = Arrangement.Center
    ) {
        MapType.values().forEach {
            MapTypeButton(type = it) { onMapTypeClick(it) }
        }
    }
}

@Composable
private fun MapTypeButton(type: MapType, onClick: () -> Unit) =
    MapButton(text = type.toString(), onClick = onClick)

@Composable
private fun ZoomControls(
    isCameraAnimationChecked: Boolean,
    isZoomControlsEnabledChecked: Boolean,
    onZoomOut: () -> Unit,
    onZoomIn: () -> Unit,
    onCameraAnimationCheckedChange: (Boolean) -> Unit,
    onZoomControlsCheckedChange: (Boolean) -> Unit,
) {
//    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center) {
////        MapButton("-", onClick = { onZoomOut() })
////        MapButton("+", onClick = { onZoomIn() })
//        Column(verticalArrangement = Arrangement.Center) {
//            Text(text = "Camera Animations On?")
//            Switch(
//                isCameraAnimationChecked,
//                onCheckedChange = onCameraAnimationCheckedChange,
//                modifier = Modifier.testTag("cameraAnimations"),
//            )
//            Text(text = "Zoom Controls On?")
//            Switch(
//                isZoomControlsEnabledChecked,
//                onCheckedChange = onZoomControlsCheckedChange
//            )
//        }
//    }
}

@Composable
private fun MapButton(text: String, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Button(
        modifier = modifier.padding(4.dp),
        colors = ButtonDefaults.buttonColors(
            backgroundColor = MaterialTheme.colorScheme.onPrimary,
            contentColor = MaterialTheme.colorScheme.primary
        ),
        onClick = onClick
    ) {
        Text(text = text, style = MaterialTheme.typography.bodyLarge)
    }
}

@Composable
private fun DebugView(
    cameraPositionState: CameraPositionState,
    markerState: MarkerState
) {
    Column(
        Modifier
            .fillMaxWidth(),
        verticalArrangement = Arrangement.Center
    ) {
        val moving =
            if (cameraPositionState.isMoving) "moving" else "not moving"
        Text(text = "Camera is $moving")
        Text(text = "Camera position is ${cameraPositionState.position}")
        Spacer(modifier = Modifier.height(4.dp))
        val dragging =
            if (markerState.dragState == DragState.DRAG) "dragging" else "not dragging"
        Text(text = "Marker is $dragging")
        Text(text = "Marker position is ${markerState.position}")
    }
}

