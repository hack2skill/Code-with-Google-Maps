package com.google.maps.android.compose.Navigation

sealed class Screens(val route: String)
{
    object SplashScreen : Screens(route = "SplashScreen")
    object BasicsMapActivity : Screens(route = "BasicMapScren")
    object VideoPlayerScreen : Screens(route = "VideoScreen")
    object StatsScreen : Screens(route = "StatsScreen")
}