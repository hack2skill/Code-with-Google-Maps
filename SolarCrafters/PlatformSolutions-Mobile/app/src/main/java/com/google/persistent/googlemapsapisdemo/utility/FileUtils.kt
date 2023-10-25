package com.google.persistent.googlemapsapisdemo.utility

import android.content.Context
import android.os.Environment
import android.util.Log
import com.google.persistent.googlemapsapisdemo.R
import com.google.persistent.googlemapsapisdemo.callbacks.OnImageConversionOperation
import java.io.BufferedReader
import java.io.File
import java.io.FileInputStream
import java.io.FileNotFoundException
import java.io.FileOutputStream
import java.io.IOException
import java.io.InputStreamReader

object FileUtils {
    const val FILENAME = "building_insight_data.json"
    fun create(context: Context, jsonString: String?): Boolean {
        var statusOfOperation = false
        return try {
            val fos: FileOutputStream = context.openFileOutput(FILENAME, Context.MODE_PRIVATE)
            if (jsonString != null) {
                fos.write(jsonString.toByteArray())
            }
            fos.close()
            statusOfOperation = true
            true
        } catch (fileNotFound: FileNotFoundException) {
            statusOfOperation = false
            false
        } catch (ioException: IOException) {
            statusOfOperation = false
            false
        }
        finally {
            Log.e("STATUS", "File creation is: $statusOfOperation")
        }
    }

    fun isFilePresent(context: Context): Boolean {
        val path = context.filesDir.absolutePath + "/" + FILENAME
        val file = File(path)
        return file.exists()
    }

    fun read(context: Context): String? {
        return try {
            val fis: FileInputStream = context.openFileInput(FILENAME)
            val isr = InputStreamReader(fis)
            val bufferedReader = BufferedReader(isr)
            val sb = StringBuilder()
            var line: String?
            while (bufferedReader.readLine().also { line = it } != null) {
                sb.append(line)
            }
            sb.toString()
        } catch (fileNotFound: FileNotFoundException) {
            null
        } catch (ioException: IOException) {
            null
        }
    }


    fun getAllFilesFromDirectory() {
        val appDirectoryName = "SolarAPIs"
        val pathOfPicDirectory = File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), appDirectoryName)
        Log.e("pathOfPicDirectory", pathOfPicDirectory.path)
        val directory = File(pathOfPicDirectory.path)
        val files = directory.listFiles()
        Log.d("Files", "Size: " + files.size)
        for (i in files.indices) { Log.d("Files", "FileName:" + files[i].name) }
        /*val sourceFilePath = pathOfPicDirectory.path+"/"+files[0].name
        val createdImageStorePath = pathOfPicDirectory.path+"/rgb_geo.png"
        Log.e("sourceFilePath", sourceFilePath)
        Log.e("createdImageStorePath", createdImageStorePath)
        GeoTiffImageHandler.convertTiffImageToPng(sourceFilePath, createdImageStorePath)*/
    }

    /*fun convertGeoTiffImageToPngImage(
        tiffImageName: String,
        pngImageName: String,
        callback: OnImageConversionOperation
    ) {
        // step 1: Get source file with complete directory path (stored tiff image)
        val appDirectoryName = "SolarAPIs"
        val pathOfPicDirectory = File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), appDirectoryName)
        Log.e("pathOfPicDirectory", pathOfPicDirectory.path)
        val sourceFileWithPath = pathOfPicDirectory.path+"/"+tiffImageName
        Log.e("sourceFilePath", sourceFileWithPath)

        // step 2: create a destination file path (after converting into png)
        val createdImageStorePath = pathOfPicDirectory.path+"/"+pngImageName
        Log.e("createdImageStorePath", createdImageStorePath)

        // step 3: do Image convert operation
        GeoTiffImageHandler.convertTiffImageToPng(sourceFileWithPath, createdImageStorePath, callback)
    }*/

    fun getDataLayerImageByNameInPngFormat(imageName: String): String {
        val appDirectoryName = "SolarAPIs"
        val pathOfPicDirectory = File(
            Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES),
            appDirectoryName)
        return pathOfPicDirectory.path + "/" + imageName
    }

    fun getDrawableSolarPanel(solarPanelType:String): Int {
        return if (solarPanelType == "LANDSCAPE")
            R.drawable.ic_single_solar_panel_flat_image_landscape
        else
            R.drawable.ic_single_solar_panel_flat_image_portrait
    }
}