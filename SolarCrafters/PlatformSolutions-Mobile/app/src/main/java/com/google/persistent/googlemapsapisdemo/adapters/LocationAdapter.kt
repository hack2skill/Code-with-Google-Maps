package com.google.persistent.googlemapsapisdemo.adapters

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.persistent.googlemapsapisdemo.R
import com.google.persistent.googlemapsapisdemo.dataclasses.LocationDataClass
import org.w3c.dom.Text

class LocationAdapter(
    private val mList: List<LocationDataClass>,
    private val clickCallback: OnLocationListItemClicked
) : RecyclerView.Adapter<LocationAdapter.ViewHolder>() {

    // create new views
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.locations_itemview, parent, false))
    }

    // binds the list items to a view
    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val itemFromList = mList[position]
        holder.locationTitle.text = itemFromList.address
        holder.latLongValTV.text = "${itemFromList.latitude}, ${itemFromList.longitude}"
        if (itemFromList.isLocationIn3d) holder.threeDAvailIV.visibility = View.VISIBLE
        else holder.threeDAvailIV.visibility = View.GONE
        holder.itemView.setOnClickListener { clickCallback.onLocationItemClicked(itemFromList) }
    }

    // return the number of the items in the list
    override fun getItemCount(): Int { return mList.size }
    class ViewHolder(ItemView: View) : RecyclerView.ViewHolder(ItemView) {
        val threeDAvailIV: ImageView = itemView.findViewById(R.id.threedAvailIV)
        val locationTitle: TextView = itemView.findViewById(R.id.locationTitle)
        val latLongValTV: TextView = itemView.findViewById(R.id.latLongValTV)
    }
}

interface OnLocationListItemClicked {
    fun onLocationItemClicked(objectOfLocationDataClass:LocationDataClass)
}