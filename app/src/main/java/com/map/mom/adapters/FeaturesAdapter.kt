package com.map.mom.adapters

import android.content.Context
import android.graphics.drawable.GradientDrawable
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.cardview.widget.CardView
import androidx.core.content.res.ResourcesCompat
import androidx.recyclerview.widget.RecyclerView
import com.map.mom.utility.Constants
import com.map.mom.models.Feature
import com.map.mom.R
import com.map.mom.databinding.ItemFeatureBinding

class FeaturesAdapter(
    private val mContext: Context,
    private val features: List<Feature>,
    private val iOnFeatureItemClickListener: IOnFeatureItemClickListener
) :
    RecyclerView.Adapter<FeaturesAdapter.ViewHolder>() {

    private lateinit var shapeDrawable: GradientDrawable

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val binding = ItemFeatureBinding.bind(itemView)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemFeatureBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding.root)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val feature = features[position]
        holder.binding.apply {
            tvFeature.text = Constants.featureTextMap[feature.name] ?: ""
            if (feature.isSelected) {
                cardview.setFeatureSelected(feature.name)
            } else {
                cardview.setFeatureUnSelected()
            }
            ivFeature.setImageDrawable(
                ResourcesCompat.getDrawable(
                    mContext.resources,
                    Constants.featureImageMap[feature.name] ?: R.drawable.activity,
                    null
                )
            )
        }
        holder.itemView.setOnClickListener {
            iOnFeatureItemClickListener.onItemClick(feature, position)
        }
    }

    private fun initDrawable() {
        shapeDrawable = GradientDrawable()
        shapeDrawable.setColor(
            ResourcesCompat.getColor(
                mContext.resources,
                R.color.background,
                null
            )
        )
        shapeDrawable.cornerRadius = 15.dpToPx().toFloat()
    }

    private fun Int.dpToPx(): Int = (this * mContext.resources.displayMetrics.density).toInt()

    override fun getItemCount(): Int {
        return features.size
    }

    fun getSelectedFeature(): String?{
        val selectedFeature = features.find { it.isSelected }
        return selectedFeature?.name
    }

    private fun CardView.setFeatureSelected(featureName: String) {
//Apply same color to card as Map marker
        //initialize for every different feature
        initDrawable()
        shapeDrawable.setStroke(
            5.dpToPx(),
            ResourcesCompat.getColor(
                mContext.resources,
                Constants.featureColorMap[featureName] ?: R.color.grey,
                null
            )
        )
        background = shapeDrawable
        setContentPadding(10, 10, 10, 10)
    }

    private fun CardView.setFeatureUnSelected(){
        setContentPadding(0, 0, 0, 0)
    }

    interface IOnFeatureItemClickListener {
        fun onItemClick(feature: Feature, position: Int)
    }
}