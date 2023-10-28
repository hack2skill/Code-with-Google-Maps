package com.google.persistent.googlemapsapisdemo.viewmodels

import android.content.Context
import android.os.Environment
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.liveData
import androidx.lifecycle.viewModelScope
import com.google.persistent.googlemapsapisdemo.constants.Constants
import com.google.persistent.googlemapsapisdemo.repository.MainRepository
import com.google.persistent.googlemapsapisdemo.retrofit.Result
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.ResponseBody
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream

class SolarViewModel(private val mainRepository: MainRepository): ViewModel() {

    private lateinit var onTiffImageOperationCallback:OnTiffImageOperationCallback

    fun getBuildingInsight(latitude:Double, longitude:Double) = liveData(
        Dispatchers.IO) {
        emit(Result.loading(data = null))
        try {
            emit(Result.success(data = mainRepository.getBuildingInsight(latitude, longitude)))
        } catch (exception: Exception) {
            emit(Result.error(data = null, message = exception.message ?: "Error Occurred!"))
        }
    }

    fun getDataLayerInfo(latitude:Double, longitude:Double) = liveData(
        Dispatchers.IO) {
        emit(Result.loading(data = null))
        try {
            emit(Result.success(data = mainRepository.getDataLayerInfo()))
        } catch (exception: Exception) {
            emit(Result.error(data = null, message = exception.message ?: "Error Occurred!"))
        }
    }

    /*fun getGeoTiffImage(idOfGeoTiffImage:String) = liveData(Dispatchers.IO) {
        emit(Result.loading(data = null))
        try {
            emit(Result.success(data = mainRepository.getGeoTiffImage(idOfGeoTiffImage)))
        } catch (exception: Exception) {
            emit(Result.error(data = null, message = exception.message ?: "Error Occurred!"))
        }
    }*/

    fun getGeoTiffImage(idOfGeoTiffImage:String,
                        context: Context,
                        geoTiffImageName:String,
                        imageCallbackOperation:OnTiffImageOperationCallback) = viewModelScope.launch {
        onTiffImageOperationCallback = imageCallbackOperation
        val responseBody = mainRepository.getGeoTiffImage(idOfGeoTiffImage).body()
        saveFile(responseBody, context, geoTiffImageName)
    }

    private fun saveFile(body: ResponseBody?, context: Context, geoTiffImageName: String) : String {
        if (body == null) {
            Log.e("saveFile", "body is null")
            return ""
        }
        var input: InputStream? = null
        try {
            input = body.byteStream()
            //val path = context.getExternalFilesDir(null)!!.path
            val path = createFile(geoTiffImageName).path
            val fos = FileOutputStream(path)
            fos.use { output ->
                val buffer = ByteArray(4 * 1024) // or other buffer size
                var read: Int
                while (input.read(buffer).also { read = it } != -1) {
                    output.write(buffer, 0, read)
                }
                output.flush()
            }
            onTiffImageOperationCallback.onImageSuccess("$geoTiffImageName is downloaded and saved.")
            return path
        } catch(e: Exception) {
            Log.e("saveFile",e.toString())
            onTiffImageOperationCallback.onImageFailed("Unable to download $geoTiffImageName!")
        }
        finally {
            input?.close()
        }
        return ""
    }

    private fun createFile(geoTiffImageName: String): File {
        val appDirectoryName = "SolarAPIs"
        val imageRoot = File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), appDirectoryName)
        if (!imageRoot.exists()) {
            imageRoot.mkdir()
        }
        return File(imageRoot, geoTiffImageName)
    }

    /*fun getRgbTiffImage(): File {
        val appDirectoryName = "SolarAPIs"
        val tiffImageFile = File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES),
            "${Constants.MAIN_DIRECTORY_NAME.name}/rgb_geo.tiff")
        Log.e("path_of_img", tiffImageFile.path)
        return tiffImageFile
    }*/

    interface OnTiffImageOperationCallback {
        fun onImageSuccess(nameOfImageDownloadedAndSaved:String)
        fun onImageFailed(nameOfImageIsFailedToDownloadedAndSaved:String)
    }
}