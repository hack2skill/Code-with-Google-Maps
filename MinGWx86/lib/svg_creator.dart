import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:ui' as ui;
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

Future<BitmapDescriptor> bitmapDescriptorFromSvgAsset(
    BuildContext context, String data) async {
  // Read SVG file as String
  // String svgString = await DefaultAssetBundle.of(context).loadString(assetName,);
  // Create DrawableRoot from SVG String
  String svgStrings =
      '''<svg width="120" height="50" xmlns="http://www.w3.org/2000/svg">

  <path stroke="#000" id="svg_1" d="m75.14781,0.22566l-73.83144,-.00774l0,31.59256l75.27788,0l5.12395,17.65467c0.04658,0.00774 3.86625,-17.02746 3.86625,-17.02746c0,0 34.48279,0 34.42362,-0.00774c0.00739,0.00097 0.01513,-0.5015 0.02299,-1.38155c0.00393,-0.44003 0.0079,-0.97446 0.01188,-1.58755c0.00398,-0.61309 0.00796,-1.30486 0.01193,-2.05955c0.02677,-7.20252 0.04414,-12.03835 0.05589,-15.41562c0.01175,-3.37727 0.0179,-5.29597 0.02223,-6.66423c0.00433,-1.36826 0.00686,-2.18608 0.00844,-2.71689c0.00158,-0.53081 0.00223,-0.77459 0.00281,-0.99479c0.00058,-0.2202 0.00109,-0.4168 0.00154,-0.58784c0.00044,-0.17104 0.00082,-0.31653 0.00112,-0.4345c0.0003,-0.11796 0.00053,-0.2084 0.00069,-0.26935c0.00015,-0.06095 0.00023,-0.0924 0.00023,-0.0924c-0.0102,3.52301 -0.01745,6.03945 -0.02249,7.80293c-0.00505,1.76348 -0.00789,2.77399 -0.00928,3.28516c-0.00139,0.51116 -0.00132,0.52297 -0.00054,0.28903c0.00077,-0.23394 0.00225,-0.71362 0.0037,-1.18544c0.00144,-0.47182 0.00284,-0.93578 0.00419,-1.38991c0.00135,-0.45413 0.00266,-0.89844 0.00393,-1.33095c0.00126,-0.43251 0.00248,-0.85323 0.00364,-1.26018c0.00116,-0.40696 0.00228,-0.80015 0.00334,-1.17762c-0.02728,9.05903 -0.02086,7.04596 -0.0151,5.15867c0.00576,-1.88729 0.01086,-3.64879 0.0151,-5.15867c0.00848,-3.01976 0.01351,-5.03301 0.01351,-5.03301z" stroke-width="1.5" fill="#fffb00"/>
  <text  y="12.77155" x="5.02531" fill="#000000">$data</text>

</svg>''';
  DrawableRoot svgDrawableRoot = await svg.fromSvgString(svgStrings, "svg");

  // toPicture() and toImage() don't seem to be pixel ratio aware, so we calculate the actual sizes here
  MediaQueryData queryData = MediaQuery.of(context);
  double devicePixelRatio = queryData.devicePixelRatio;
  double width = 500; // where 32 is your SVG's original width
  double height = 50 * devicePixelRatio; // same thing

  // Convert to ui.Picture
  ui.Picture picture = svgDrawableRoot.toPicture(size: Size(width, height));

  // Convert to ui.Image. toImage() takes width and height as parameters
  // you need to find the best size to suit your needs and take into account the
  // screen DPI
  ui.Image image = await picture.toImage(width.toInt(), height.toInt());
  ByteData? bytes = await image.toByteData(format: ui.ImageByteFormat.png);
  return BitmapDescriptor.fromBytes(bytes!.buffer.asUint8List());
}
