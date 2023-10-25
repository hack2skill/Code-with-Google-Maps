package com.google.persistent.googlemapsapisdemo.constants

enum class Constants(name:String) {

    /** MAIN ROOT DIRECTORY NAME*/
    MAIN_DIRECTORY_NAME("SolarAPIs"),
    /** CONVERTED PNG IMGs DIRECTORY NAME */
    CONVERTED_PNG_DIRECTORY_NAME("SolarPNGs"),
    /** GEO TIFF IMAGE NAMES */
    GEO_TIFF_IMG_RGB("rgb.tiff"),
    GEO_TIFF_IMG_FLUX_MONTHLY("monthlyFlux.tiff"),
    GEO_TIFF_IMG_FLUX_ANNUAL("annualFlux.tiff"),
    GEO_TIFF_IMG_DSM("dsm.tiff"),
    GEO_TIFF_IMG_MASK("mask.tiff"),
    /** CONVERTED GEO TIFF IMAGE NAMES (PNG) */
    GEO_TIFF_IMG_RGB_IN_PNG_FORMAT("rgb.png"),
    GEO_TIFF_IMG_FLUX_MONTHLY_IN_PNG_FORMAT("monthlyFlux.png"),
    GEO_TIFF_IMG_FLUX_ANNUAL_IN_PNG_FORMAT("annualFlux.png"),
    GEO_TIFF_IMG_DSM_IN_PNG_FORMAT("dsm.png"),
    GEO_TIFF_IMG_MASK_IN_PNG_FORMAT("mask.png")

}