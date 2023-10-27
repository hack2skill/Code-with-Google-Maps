package com.map.mom.adapters

import android.content.Context
import android.graphics.Color
import android.graphics.drawable.GradientDrawable
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.map.mom.R
import com.map.mom.models.RouteDetailData
import com.map.mom.databinding.ItemRouteDetailsBinding

class RouteDetailAdapter(
    private val mContext: Context,
    private val dataList: List<RouteDetailData>,
    private val iOnRouteDetailsItemClickListener: IOnRouteDetailsItemClickListener
) :
    RecyclerView.Adapter<RouteDetailAdapter.RouteDetailViewHolder>() {

//    var shapeDrawable = ShapeDrawable()
    private var lastSelectedItemPosition = 0
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RouteDetailViewHolder {
        return RouteDetailViewHolder(
            ItemRouteDetailsBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            ).root
        )
    }

    override fun getItemCount(): Int {
        return dataList.size
    }

    override fun onBindViewHolder(holder: RouteDetailViewHolder, position: Int) {
        holder.binding.apply {
            with(dataList[position]) {
                if (position == 0) {
                    tvRouteName.text = mContext.getString(R.string.txt_default_route)
                }
                else{
                    tvRouteName.text = "Route ${position+1}"
                }
                tvDistance.text = distance
                tvDuration.text = duration
                if (isSelected) {
                    ivTick.visibility = View.VISIBLE
                } else {
                    ivTick.visibility = View.GONE
                }
                holder.itemView.apply {
                    changeBackground(routeColor)
                    setOnClickListener{
                        iOnRouteDetailsItemClickListener.onRouteDetailItemClick(position, lastSelectedItemPosition)
                        changeRouteSelection(position)
                    }
                }

            }
        }
    }

    private fun changeRouteSelection(position: Int){
        lastSelectedItemPosition = position
    }

    private fun View.changeBackground(routeColor: Int) {
        Log.d("Adapter", "route color = $routeColor")
        val gradientDrawable = GradientDrawable()
        gradientDrawable.shape = GradientDrawable.RECTANGLE
        gradientDrawable.cornerRadius = 12f
        gradientDrawable.setStroke(12, routeColor)
        gradientDrawable.setColor(Color.WHITE)
        this.background = gradientDrawable
    }

    class RouteDetailViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val binding = ItemRouteDetailsBinding.bind(itemView)
    }

    interface IOnRouteDetailsItemClickListener{
        fun onRouteDetailItemClick(position: Int, lastSelectedItemPostion: Int)
    }
}
