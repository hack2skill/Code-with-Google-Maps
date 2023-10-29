package com.google.maps.android.compose

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.content.pm.ActivityInfo
import android.location.Location
import android.net.Uri
import android.os.Build
import android.util.Log
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.annotation.RequiresApi
import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.ButtonColors
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material.Card
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.BottomSheetScaffoldState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.colorspace.ColorSpaces
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.datasource.DataSource
import androidx.media3.datasource.DefaultDataSource
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.source.ProgressiveMediaSource
import androidx.media3.ui.AspectRatioFrameLayout
import androidx.media3.ui.PlayerView
import com.google.accompanist.systemuicontroller.SystemUiController
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.maps.android.compose.model.AirQualityResponse
import com.google.maps.android.compose.Network.getImage
import com.google.maps.android.compose.Network.makeAirQualityApiCall
import com.google.maps.android.compose.Network.makeDirectionsApiCall
import com.google.maps.android.compose.ViewModel.RegisterViewModel

import com.google.maps.android.compose.model.iamge
import kotlinx.coroutines.launch
import java.util.Random


private lateinit var locationRequest: LocationRequest
private lateinit var locationCallback: LocationCallback
private var currentLocation: Location? = null
lateinit var locationProvider: FusedLocationProviderClient
private lateinit var fusedLocationProviderClient: FusedLocationProviderClient
@Composable
fun LockScreenOrientation(orientation: Int) {
    val context = LocalContext.current
    DisposableEffect(orientation) {
        val activity = context.findActivity() ?: return@DisposableEffect onDispose {}
        val originalOrientation = activity.requestedOrientation
        activity.requestedOrientation = orientation
        onDispose {
            // restore original orientation when view disappears
            activity.requestedOrientation = originalOrientation
        }
    }
}

fun Context.findActivity(): Activity? = when (this) {
    is Activity -> this
    is ContextWrapper -> baseContext.findActivity()
    else -> null
}

@RequiresApi(Build.VERSION_CODES.R)
@androidx.media3.common.util.UnstableApi
@Composable
fun VideoPlay(onClose: () -> Unit) {
    val systemUiController: SystemUiController = rememberSystemUiController()
    systemUiController.isStatusBarVisible = false
    systemUiController.isSystemBarsVisible = false
    systemUiController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE

    val context = LocalContext.current
    val rawUri = Uri.parse("android.resource://${context.packageName}/${R.raw.opera}")
    Card(
        Modifier
            .fillMaxSize()
            .clip(RoundedCornerShape(15.dp))
            .padding(start = 20.dp, end = 20.dp, top = 20.dp, bottom = 20.dp)
            .background(Color.Transparent)
            .clip(RoundedCornerShape(15.dp))
        , elevation = 240.dp
    )

    {
        val exoPlayer = remember{
            ExoPlayer.Builder(context)
                .build()
                .apply {
                    val defaultDataSourceFactory = DefaultDataSource.Factory(context)
                    val dataSourceFactory: DataSource.Factory = DefaultDataSource.Factory(
                        context,
                        defaultDataSourceFactory
                    )

                    val source = ProgressiveMediaSource.Factory(dataSourceFactory)
                        .createMediaSource(MediaItem.fromUri(rawUri))

                    setMediaSource(source)
                    prepare()
                }
        }

        exoPlayer.playWhenReady = true
        exoPlayer.videoScalingMode = C.VIDEO_SCALING_MODE_SCALE_TO_FIT_WITH_CROPPING
        exoPlayer.repeatMode = Player.REPEAT_MODE_ONE
        //WindowCompat.setDecorFitsSystemWindows(s, false)
//        actionBar!!.hide()
//        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.R) {
//            s.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
//        } else {
//            s.insetsController?.apply {
//                hide(WindowInsets.Type.statusBars())
//                systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
//            }
//        }
        LockScreenOrientation(orientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE)



        DisposableEffect(
            AndroidView(factory = { PlayerView(context).apply {
//            hideController()
                useController = true
                resizeMode = AspectRatioFrameLayout.RESIZE_MODE_ZOOM
                player = exoPlayer
                layoutParams = FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
            }})
        )
        {
            onDispose { exoPlayer.release() }

        }
        BackHandler {

            onClose()
        }

    }
}
fun getResourceIdForCountryName(countryName: String, context: Context): Int {
    Log.d("country name", countryName)
    return context.resources.getIdentifier(countryName, "raw", context.packageName)
}
fun formatCountryName(countryName: String): String {
    // Convert to lowercase
    val lowercaseName = countryName.toLowerCase()

    // Remove spaces, special characters, and non-alphanumeric characters
    val formattedName = lowercaseName.replace(Regex("[^a-zA-Z0-9]"), "")


    return formattedName
}

@Composable
fun OptionsInVideo(viewModel: RegisterViewModel, line : (String) -> Unit) {

    val isAirQuality = remember {
        mutableStateOf(false)
    }
    val isPhotos = remember {
        mutableStateOf(false)
    }
    val isDirections = remember {
        mutableStateOf(false)
    }
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically) {
        AssistChip(onClick = {

            isDirections.value = true
            isPhotos.value = false
            isAirQuality.value = false

        }, label = {
            Text(text = "Directions", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        },
            shape = RoundedCornerShape(10.dp),
            colors = AssistChipDefaults.assistChipColors(containerColor = MaterialTheme.colorScheme.secondaryContainer),
            border = AssistChipDefaults.assistChipBorder(borderColor = MaterialTheme.colorScheme.background)
        )
        AssistChip(onClick = {
            isPhotos.value = false
            isAirQuality.value = true
            isDirections.value = false

        }, label = {
            Text(text = "Air quality", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        },
            shape = RoundedCornerShape(10.dp),
            colors = AssistChipDefaults.assistChipColors(containerColor = MaterialTheme.colorScheme.secondaryContainer),
            border = AssistChipDefaults.assistChipBorder(borderColor = MaterialTheme.colorScheme.background)
        )
        AssistChip(onClick = { isPhotos.value = true
            isAirQuality.value = false

                             isDirections.value = false}, label = {
            Text(text = "   Photos   ", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        },
            shape = RoundedCornerShape(10.dp),
            colors = AssistChipDefaults.assistChipColors(containerColor = MaterialTheme.colorScheme.secondaryContainer),
            border = AssistChipDefaults.assistChipBorder(borderColor = MaterialTheme.colorScheme.background)
        )
    }

    if(isAirQuality.value){

        AirQualityView(viewModel)
        //TestView()
//        AirQualityCard()
    }
    if(isPhotos.value)
    {
        Log.d("yes is true", "yes")

        PhotosView()
    }

    if(isDirections.value)
    {
       LaunchedEffect(Unit)
       {
           val d = makeDirectionsApiCall()
           Log.d("line is", d!!.routes.get(0).polyline.encodedPolyline.toString())
           line(d.routes.get(0).polyline.encodedPolyline.toString())
       }
    }

}





// call this function on button click

@Composable
fun AirQualityView(viewModel: RegisterViewModel) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .animateContentSize()
        , contentAlignment = Alignment.Center
    ) {
        Log.d("yes clicked", "hm")
        val data = remember {
            mutableStateOf(AirQualityResponse("","", emptyList()))
        }
        val valueGot = remember {
            mutableStateOf(false)
        }
        val mystate by remember{ mutableStateOf(viewModel.selectedPlace.value) }
        LaunchedEffect(Unit){

            val d = makeAirQualityApiCall(mystate)
            Log.d("give", mystate.toString())
            if(d != null){
                data.value = d
                valueGot.value = true
            }
        }

        if(!valueGot.value)
        {
            LinearProgressIndicator()

        }
        else{
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.SpaceEvenly, modifier = Modifier
                    .fillMaxWidth(0.9f)
                    .clip(RoundedCornerShape(20.dp))
                    .background(MaterialTheme.colorScheme.background)
                    .padding(18.dp)
            ) {

                Text(text = "Universal AQI",
                    color = MaterialTheme.colorScheme.onSurface,  fontWeight = FontWeight.SemiBold, fontSize = 20.sp)
                Spacer(modifier = Modifier.size(15.dp))

                Row(Modifier.fillMaxWidth(),horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "AQI", color = MaterialTheme.colorScheme.onSecondaryContainer, fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
                    Text(text =  data.value.indexes.get(0).aqiDisplay, color = MaterialTheme.colorScheme.onSecondaryContainer,  fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
                }
                Spacer(modifier = Modifier.size(10.dp))
                Row(Modifier.fillMaxWidth(),horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "Air Quality",color = MaterialTheme.colorScheme.onSecondaryContainer, fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
                    Text(text = data.value.indexes.get(0).category, color = MaterialTheme.colorScheme.onSecondaryContainer,  fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
                }
                Spacer(modifier = Modifier.size(10.dp))
                Row(Modifier.fillMaxWidth(),horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "Dominant Pollutant",color = MaterialTheme.colorScheme.onSecondaryContainer, fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
                    Text(text = data.value.indexes.get(0).dominantPollutant, color = MaterialTheme.colorScheme.onSecondaryContainer,  fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
                }
                Spacer(modifier = Modifier.size(10.dp))
                Row(Modifier.fillMaxWidth(),horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically) {

                    val colors = mapOf(
                        "red" to data.value.indexes.get(0).color.red,
                        "green" to  data.value.indexes.get(0).color.green,
                        "blue" to  data.value.indexes.get(0).color.blue,
                    )
                    val mycolor = createColorFromData(colors)
                    Box(modifier = Modifier
                        .height(20.dp)
                        .clip(RoundedCornerShape(5.dp))
                        .fillMaxWidth()
                        .background(mycolor))
                }
            }
        }



    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ARUtil(
    markerPlaced: MutableState<Boolean>,
    stateOfScaffold: BottomSheetScaffoldState,
    go: () -> Unit
)
{

    val scope = rememberCoroutineScope()
    val context = LocalContext.current
    LaunchedEffect(Unit)
    {
        scope.launch {
            stateOfScaffold.bottomSheetState.expand()
            Log.d("invoked partial expand", ";ds")
        }
    }

    Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center)
    {
        val pm = LocalContext.current.packageManager
        val d = if(markerPlaced.value) "View in Geospatial" else "Select Place"
        val s = if(markerPlaced.value) Color(40, 215, 101) else Color(38, 40, 46)
        FilledTonalButton(onClick = {


                                    if(markerPlaced.value)
                                    {

                                        val myintent = pm.getLaunchIntentForPackage("com.DefaultCompany.google_maps")
                                        // check if the intent is not null
                                        if (myintent != null) {
                                            // start the app
                                            ContextCompat.startActivity(context, myintent, null)
                                        } else {
                                            // show a message that the app is not found
                                            Toast.makeText(context, "App not found", Toast.LENGTH_SHORT).show()
                                        }
                                    }



        }, colors = ButtonDefaults.filledTonalButtonColors(containerColor = s)) {
            Text(text = d)
        }
    }


}

@Composable
@androidx.annotation.OptIn(androidx.media3.common.util.UnstableApi::class)
fun SplashScreen(goToScreen : () -> Unit)
{
    Box(modifier = Modifier.fillMaxSize())
    {
        val context = LocalContext.current
        val rawUri = Uri.parse("android.resource://${context.packageName}/${R.raw.appsplash}")
        val exoPlayer = remember{
            ExoPlayer.Builder(context)
                .build()
                .apply {
                    val defaultDataSourceFactory = DefaultDataSource.Factory(context)
                    val dataSourceFactory: DataSource.Factory = DefaultDataSource.Factory(
                        context,
                        defaultDataSourceFactory
                    )

                    val source = ProgressiveMediaSource.Factory(dataSourceFactory)
                        .createMediaSource(MediaItem.fromUri(rawUri))

                    setMediaSource(source)
                    prepare()
                }
        }
        exoPlayer.playWhenReady = true
        exoPlayer.videoScalingMode = C.VIDEO_SCALING_MODE_SCALE_TO_FIT_WITH_CROPPING
        exoPlayer.addListener(object : Player.Listener {
            override fun onPlaybackStateChanged(state: Int) {
                if (state == Player.STATE_ENDED) {
                    goToScreen()
                }
            }
        })

        DisposableEffect(
            AndroidView(factory = { PlayerView(context).apply {
//            hideController()
                useController = false
                resizeMode = AspectRatioFrameLayout.RESIZE_MODE_ZOOM
                player = exoPlayer
                layoutParams = FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
            }})
        )
        {
            onDispose { exoPlayer.release() }

        }
    }
}

@Composable
fun PhotosView() {
    val context = LocalContext.current

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .animateContentSize(), contentAlignment = Alignment.Center
    ) {
        val tt = remember {
            mutableStateOf(iamge())
        }
        val yes = remember {
            mutableStateOf(false)
        }

        LaunchedEffect(Unit)
        {
            tt.value.image = getImage(context)
            yes.value = true
        }


        if (yes.value) {
            Log.d("sizeis", tt.value.image!!.size.toString())
            Spacer(modifier = Modifier.size(10.dp))
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.SpaceEvenly, modifier = Modifier
                    .fillMaxWidth(0.9f)
                    .clip(RoundedCornerShape(20.dp))
                    .background(MaterialTheme.colorScheme.background)
                    .padding(2.dp)
            ) {

                LazyRow()
                {
                    items(tt.value.image!!.size) {
                        Image(
                            contentScale = ContentScale.FillBounds,
                            modifier = Modifier
                                .clip(RoundedCornerShape(10.dp))
                                .size(250.dp),
                            bitmap = tt.value.image!![it].asImageBitmap(),
                            contentDescription = "some useful description",
                        )
                        Spacer(modifier = Modifier.size(10.dp))
                    }
                }
            }
        }
        else
        {
            LinearProgressIndicator()
        }
    }
}

@Composable
@androidx.annotation.OptIn(androidx.media3.common.util.UnstableApi::class)
fun PlayVideo(onClose : () -> Unit) {

    val context = LocalContext.current
    val rawUri = Uri.parse("android.resource://${context.packageName}/${R.raw.opera}")
    Card(
        Modifier
            .fillMaxSize()
            .clip(RoundedCornerShape(5.dp))
            .background(Color.Transparent)
    )

    {
        val exoPlayer = remember{
            ExoPlayer.Builder(context)
                .build()
                .apply {
                    val defaultDataSourceFactory = DefaultDataSource.Factory(context)
                    val dataSourceFactory: DataSource.Factory = DefaultDataSource.Factory(
                        context,
                        defaultDataSourceFactory
                    )

                    val source = ProgressiveMediaSource.Factory(dataSourceFactory)
                        .createMediaSource(MediaItem.fromUri(rawUri))

                    setMediaSource(source)
                    prepare()
                }
        }

        exoPlayer.playWhenReady = true
        exoPlayer.videoScalingMode = C.VIDEO_SCALING_MODE_SCALE_TO_FIT_WITH_CROPPING
        exoPlayer.repeatMode = Player.REPEAT_MODE_ONE
        //WindowCompat.setDecorFitsSystemWindows(s, false)
//        actionBar!!.hide()
//        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.R) {
//            s.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
//        } else {
//            s.insetsController?.apply {
//                hide(WindowInsets.Type.statusBars())
//                systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
//            }
//        }



        DisposableEffect(
            AndroidView(factory = { PlayerView(context).apply {
//            hideController()
                useController = true
                resizeMode = AspectRatioFrameLayout.RESIZE_MODE_ZOOM
                player = exoPlayer
                layoutParams = FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
            }})
        )
        {
            onDispose { exoPlayer.release() }

        }
        BackHandler {

            onClose()
        }

    }
}


fun randomColor(): Color {
    val random = Random()
    val alpha = random.nextInt(256)
    val red = random.nextInt(256)
    val green = random.nextInt(256)
    val blue = random.nextInt(256)
    return Color(alpha, red, green, blue)
}
fun createColorFromData(colorData: Map<String, Float>): Color {
    val red = colorData["red"] ?: 0.0f // Provide a default value if "red" is missing
    val green = colorData["green"] ?: 0.0f // Provide a default value if "green" is missing
    val blue = colorData["blue"] ?: 0.0f // Provide a default value if "blue" is missing
    val alpha = colorData["alpha"] ?: 1f // Provide a default value if "alpha" is missing

    return Color(red = red, green = green, blue = blue, alpha = alpha.toFloat(), colorSpace = ColorSpaces.Srgb)
}
