package com.google.persistent.googlemapsapisdemo.utility

import android.app.ProgressDialog
import android.content.Context
import android.content.DialogInterface
import androidx.appcompat.app.AlertDialog
import com.google.persistent.googlemapsapisdemo.adapters.LocationAdapter
import com.google.persistent.googlemapsapisdemo.adapters.OnLocationListItemClicked
import com.google.persistent.googlemapsapisdemo.dataclasses.LocationDataClass
import java.util.function.Function


object DialogUtils {

    /**
     * Ref to use: https://stackoverflow.com/questions/16120697/kotlin-how-to-pass-a-function-as-parameter-to-another#:~:text=Use%20%3A%3A%20to%20signify%20a%20function%20reference%2C%20and%20then%3A
     */
    fun showConfirmationDialog(
        context: Context,
        titleOfDialog: String?,
        message2Show: String?,
        callBackFunction: (input: String) -> Unit
    ) {
        // Create the object of AlertDialog Builder class
        val builder = AlertDialog.Builder(context)
        // Set the message show for the Alert time
        builder.setMessage(message2Show)
        // Set Alert Title
        builder.setTitle(titleOfDialog)
        // Set Cancelable false for when the user clicks on the outside the Dialog Box then it will remain show
        builder.setCancelable(false)
        // Set the positive button with yes name Lambda OnClickListener method is use of DialogInterface interface.
        builder.setPositiveButton(
            "Yes"
        ) { dialog: DialogInterface, which: Int ->
            // When the user click yes button then app will close
            dialog.cancel()
            dialog.dismiss()
            callBackFunction("YES")
        }

        // Set the Negative button with No name Lambda OnClickListener method is use of DialogInterface interface.
        builder.setNegativeButton(
            "No"
        ) { dialog: DialogInterface, which: Int ->
            // If user click no then dialog box is canceled.
            dialog.cancel()
            dialog.dismiss()
            callBackFunction("NO")
        }
        // Create the Alert dialog
        val alertDialog = builder.create()
        // Show the Alert Dialog box
        alertDialog.show()
    }

    private var progressDialog: ProgressDialog? = null
    fun showLoaderDialog(title2Show: String?, message2Show: String?, context: Context) {
        progressDialog = ProgressDialog(context)
        progressDialog?.apply {
            this.setTitle(title2Show)
            this.setCancelable(false)
            this.isIndeterminate = true
            this.show()
        }
        if (message2Show.isNullOrEmpty())
            progressDialog?.setMessage("Please wait...")
        else progressDialog?.setMessage(message2Show)
    }

    fun hideLoaderDialog() {
        if (progressDialog != null && progressDialog!!.isShowing) {
            progressDialog?.hide()
            progressDialog?.dismiss()
            progressDialog = null
        }
    }

    /*fun showLocationsDialog(
        context: Context,
        locationDataList: MutableList<LocationDataClass>,
        callbackOnClick: OnLocationListItemClicked
    ) {
        val dialog = Dialog(context)
        dialog.setContentView(R.layout.bottomsheet_draggable_dialog_layout)
        dialog.window!!.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        dialog.setCancelable(true)
        dialog.window!!.attributes.windowAnimations = R.style.fade_animation
        val locationRecyclerView = dialog.findViewById<RecyclerView>(R.id.locationsRV)
        locationRecyclerView.adapter = LocationAdapter(locationDataList, callbackOnClick)
        dialog.show()
    }*/
}