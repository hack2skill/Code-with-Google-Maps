package com.google.persistent.googlemapsapisdemo.activities.aerialview

import android.graphics.Bitmap
import android.graphics.drawable.BitmapDrawable
import android.media.ThumbnailUtils
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.WindowManager
import android.widget.MediaController
import android.widget.Toast
import android.widget.VideoView
import androidx.appcompat.app.AppCompatActivity
import com.google.persistent.googlemapsapisdemo.databinding.ActivityVideoBinding


class VideoActivity : AppCompatActivity() {
    companion object {
        const val testUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        const val AREIALVIEW_VIDEO_KEY = "AREIALVIEW_VIDEO_KEY"
        const val AREIALVIEW_BANNER_IMG_KEY = "AREIALVIEW_BANNER_IMG_KEY"
    }

    private lateinit var videoView: VideoView
    private lateinit var binding: ActivityVideoBinding
    private lateinit var uriOfBannerImg:String
    private lateinit var uriOfAerialViewVideo:String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN)
        binding = ActivityVideoBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (intent.hasExtra(AREIALVIEW_VIDEO_KEY) && intent.hasExtra(AREIALVIEW_BANNER_IMG_KEY)) {
            uriOfBannerImg = intent.getStringExtra(AREIALVIEW_BANNER_IMG_KEY).toString()
            uriOfAerialViewVideo = intent.getStringExtra(AREIALVIEW_VIDEO_KEY).toString()
            initVideo()
        }
        else {
            Toast.makeText(this, "No aerial video found.", Toast.LENGTH_SHORT).show()
            finish()
        }
    }

    private fun initVideo() {
        runOnUiThread {
            Toast.makeText(this, "Please wait while loading the 3-D video of building surrounding.", Toast.LENGTH_LONG).show()
            videoView = binding.videoView
            videoView.setMediaController(MediaController(this))
            videoView.setVideoURI(Uri.parse(uriOfAerialViewVideo))
            videoView.requestFocus()
            videoView.setOnPreparedListener { mp ->
                mp.isLooping = true
                videoView.start()
            }
            videoView.setOnCompletionListener {
                Toast.makeText(this, "Video is ended, preparing for re-playing", Toast.LENGTH_LONG).show()
            }
            val thumb: Bitmap? = ThumbnailUtils.createVideoThumbnail(uriOfBannerImg, MediaStore.Images.Thumbnails.MINI_KIND)
            val bitmapDrawable = BitmapDrawable(thumb)
            videoView.setBackgroundDrawable(bitmapDrawable)
        }
    }
}