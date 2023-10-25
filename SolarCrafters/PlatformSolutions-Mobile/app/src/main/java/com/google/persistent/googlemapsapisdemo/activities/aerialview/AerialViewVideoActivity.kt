package com.google.persistent.googlemapsapisdemo.activities.aerialview

import android.annotation.SuppressLint
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.media3.common.MediaItem
import androidx.media3.common.MimeTypes
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.common.util.Util
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.trackselection.DefaultTrackSelector
import androidx.media3.ui.PlayerView
import com.google.persistent.googlemapsapisdemo.databinding.ActivityAerialViewVideoBinding


@UnstableApi class AerialViewVideoActivity : AppCompatActivity() {
    private val playbackStateListener: Player.Listener = playbackStateListener()

    private lateinit var binding: ActivityAerialViewVideoBinding
    private var player: ExoPlayer? = null
    private var playWhenReady = true
    private var currentItem = 0
    private var playbackPosition = 0L
    private lateinit var video_view : PlayerView
    val uri: Uri = Uri.parse("https://rr2---sn-p5qs7nzr.googlevideo.com/videoplayback?expire=1694600384&ei=zIoBZcPfMtqw9fwPtOmrQA&ip=0.0.0.0&id=b7ef090000000001&itag=375&source=aerial_view&requiressl=yes&mh=mF&mm=31&mn=sn-p5qs7nzr&ms=au&mv=D&mvi=2&pl=0&susc=av&acao=yes&mime=video/mp4&vprv=1&gir=yes&clen=37352001&dur=40.016&lmt=1693567670837084&mt=1694598051&txp=0011224&sparams=expire,ei,ip,id,itag,source,requiressl,susc,acao,mime,vprv,gir,clen,dur,lmt&sig=AOq0QJ8wRAIgTebiioWlBISr0g0X6fYzInGlSL8Bi-JiYwTVHdjr_L0CIC6ywSpeuulSmmTI3twh2jYPpeyLySPmJmkEL3gZHvEg&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgQvws6FteC-OnvE7HGcj-wlBo7w__xPD87cgZsa3g2r4CIQCzTj3bHK6-oIJxN56SWnQeg04X1_Sad0saikipOZgtKA==")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAerialViewVideoBinding.inflate(layoutInflater)
        video_view = binding.exoPlayerView
        initializePlayer()
    }

    private fun initializePlayer() {
        val trackSelector = DefaultTrackSelector(this).apply {
            setParameters(buildUponParameters().setMaxVideoSizeSd())
        }
        player = ExoPlayer.Builder(this)
            .setTrackSelector(trackSelector)
            .build()
            .also { exoPlayer ->
                video_view.player = exoPlayer

                val mediaItem = MediaItem.Builder()
                    .setUri(URL)
                    .setMimeType(MimeTypes.VIDEO_MP4)
                    .build()
                exoPlayer.setMediaItem(mediaItem)
                exoPlayer.playWhenReady = playWhenReady
                exoPlayer.seekTo(currentItem, playbackPosition)
                exoPlayer.addListener(playbackStateListener)
                exoPlayer.prepare()
                exoPlayer.play()
            }
    }
    private fun playbackStateListener() = object : Player.Listener {
        override fun onPlaybackStateChanged(playbackState: Int) {
            val stateString: String = when (playbackState) {
                ExoPlayer.STATE_IDLE -> "ExoPlayer.STATE_IDLE      -"
                ExoPlayer.STATE_BUFFERING -> "ExoPlayer.STATE_BUFFERING -"
                ExoPlayer.STATE_READY -> "ExoPlayer.STATE_READY     -"
                ExoPlayer.STATE_ENDED -> "ExoPlayer.STATE_ENDED     -"
                else -> "UNKNOWN_STATE             -"
            }
            Log.d("Play", "changed state to $stateString")
        }
    }
    private fun releasePlayer() {
        player?.let { exoPlayer ->
            playbackPosition = exoPlayer.currentPosition
            currentItem = exoPlayer.currentMediaItemIndex
            playWhenReady = exoPlayer.playWhenReady
            exoPlayer.removeListener(playbackStateListener)
            exoPlayer.release()
        }
        player = null
    }
    @SuppressLint("InlinedApi")
    private fun hideSystemUi() {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        WindowInsetsControllerCompat(window, video_view).let { controller ->
            controller.hide(WindowInsetsCompat.Type.systemBars())
            controller.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }
    }

    public override fun onStart() {
        super.onStart()
        if (Util.SDK_INT > 23) {
            initializePlayer()
        }
    }

    public override fun onResume() {
        super.onResume()
        hideSystemUi()
        if (Util.SDK_INT <= 23 || player == null) {
            initializePlayer()
        }
    }

    public override fun onPause() {
        super.onPause()
        if (Util.SDK_INT <= 23) {
            releasePlayer()
        }
    }

    public override fun onStop() {
        super.onStop()
        if (Util.SDK_INT > 23) {
            releasePlayer()
        }
    }

    companion object {
        const val URL = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
}