package com.google.persistent.googlemapsapisdemo.utility

import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.Toast
import androidx.core.content.ContextCompat.startActivity
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.Observer
import com.google.persistent.googlemapsapisdemo.activities.aerialview.VideoActivity
import com.google.persistent.googlemapsapisdemo.models.lookup_render.request.LookupOrRenderVideoReqModel
import com.google.persistent.googlemapsapisdemo.models.lookup_render.response.LookupOrRenderVideoResponseModel
import com.google.persistent.googlemapsapisdemo.models.lookupvideo_video_id.response.LookupVideoByVideoIdResponseModel
import com.google.persistent.googlemapsapisdemo.retrofit.APIStatus
import com.google.persistent.googlemapsapisdemo.retrofit.Result
import com.google.persistent.googlemapsapisdemo.viewmodels.MapsViewModel

class AerialViewChecker constructor(private val viewModelFor3dVideo: MapsViewModel,
                                    private val context: Context,
                                    private val lifeCycleOwner:LifecycleOwner) {

    var videoId = ""
    fun checkForAerialViewOfThisBuilding(addressOfBuilding:String) {
        viewModelFor3dVideo.lookupOrRenderVideoByAddress(LookupOrRenderVideoReqModel(addressOfBuilding)).observe(lifeCycleOwner) {
            it?.let { result ->
                when (result.APIStatus) {
                    APIStatus.SUCCESS   -> { checkIf3dVideoExistInResponse(result) }
                    APIStatus.ERROR     -> { handleApiFailureResponse(result) }
                    APIStatus.LOADING   -> { DialogUtils.showLoaderDialog("Google Cloud API", "Checking for Aerial view of this location.", context) }
                }
            }
        }
    }
    private fun checkIf3dVideoExistInResponse(result: Result<LookupOrRenderVideoResponseModel>) {
        DialogUtils.hideLoaderDialog()
        Log.e("success", result.toString())
        if (result.data?.state?.lowercase() == "processing") {
            Toast.makeText(context, "3-d video is processing for this location, please check after sometimes.", Toast.LENGTH_LONG).show()
        }
        else if (result.data?.state?.lowercase() == "active") {
            videoId = result.data.metadata.videoId
            nowLookupVideoByVideoId()
        }
    }

    private fun nowLookupVideoByVideoId() {
        if (videoId.isEmpty()) {
            return
        }
        viewModelFor3dVideo.lookupVideoByVideoId(videoId).observe(lifeCycleOwner, Observer {
            it?.let { result ->
                when(result.APIStatus) {
                    APIStatus.SUCCESS   -> { handleVideoResponse(result) }
                    APIStatus.ERROR     -> { handleVideoApiFailureResponse(result) }
                    APIStatus.LOADING   -> { DialogUtils.showLoaderDialog("Google Cloud API", "Looking for 3-d Cinematic video", context) }
                }
            }
        })
    }
    private fun handleVideoResponse(result: Result<LookupVideoByVideoIdResponseModel>) {
        Log.e("success", result.toString())
        DialogUtils.hideLoaderDialog()
        val intentOfVideo = Intent(context, VideoActivity::class.java)
        intentOfVideo.putExtra(VideoActivity.AREIALVIEW_VIDEO_KEY, result.data?.uris?.MP4_MEDIUM?.landscapeUri)
        intentOfVideo.putExtra(VideoActivity.AREIALVIEW_BANNER_IMG_KEY, result.data?.uris?.IMAGE?.landscapeUri)
        startActivity(context, intentOfVideo, null)
    }
    private fun handleVideoApiFailureResponse(result: Result<LookupVideoByVideoIdResponseModel>) {
        DialogUtils.hideLoaderDialog()
        Toast.makeText(context, result.message, Toast.LENGTH_LONG).show()
        Log.e("Error", result.toString())
    }
    private fun handleApiFailureResponse(result: Result<LookupOrRenderVideoResponseModel>): Boolean {
        DialogUtils.hideLoaderDialog()
        Toast.makeText(context, getFormattedMessage(result.message), Toast.LENGTH_LONG).show()
        Log.e("Error", result.toString())
        return false
    }

    private fun getFormattedMessage(message: String?): String {
        if (message == "HTTP 400 ") {
            return "Address is not supported."
        }
        return  "An error occurred:$message"
    }
}