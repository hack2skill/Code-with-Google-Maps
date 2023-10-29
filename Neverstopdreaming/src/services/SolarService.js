//To be removed
import { bestwayResponse } from "../responses/BestwayConstructions";
import { KikiResponse } from "../responses/NikunjResponse";
import { opt2Response } from "../responses/opt2";
import { opt3Response } from "../responses/opt3";
import { bloomquistResponse } from "../responses/Bloomquist";
import {response3D} from '../responses/3dResponse';
import { frankfurtResponse } from "../responses/Frankfurt";
import { premiereAutoResponse } from "../responses/PremeireAuto";
import { seattleResponse } from "../responses/Seattle";
import { pslResponse } from "../responses/PslSantaClara";
import { usPostalResponse } from "../responses/US_Postal";
import { defaultUSResponse } from "../responses/DefaultUS";


import axios from "axios";
const APIKEY = "AIzaSyCMtUFMOV1x4yp9cB8Z22nLX85iItpqdIg";

export function getBuildingInsights(lat, lng, id) {

  // calling building insights endpoint

  // axios
  //   .get(
  //     `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=${APIKEY}`
  //   )
  //   .then((response) => {
  //     console.log("Solar Response: ", response);
  //     return response;
  //   })
  //   .catch((error) => {
  //     console.log("Error encountered: ", error);
  //   });

  //To be commented - static response added to avoid unnecessary additional api costing during development
  switch (id) {
    case 1:
      return defaultUSResponse;
    case 2:
      return opt2Response;
    case 3:
      return response3D;
    case 4:
      return opt3Response;
    case 5:
      return seattleResponse;
    case 6:
      return pslResponse;
    case 7:
      return usPostalResponse;
    case 8:
      return bestwayResponse;
    case 9:
      return bloomquistResponse;
    case 10:
      return premiereAutoResponse;
    case 11:
      return frankfurtResponse;
    case 12:
      return opt2Response;

    default:
      return KikiResponse;
  }
}

// data layers endpoint - in progress
export function getDataLayers(lat, lng, id) {
  // axios
  //   .get(
  //     `https://solar.googleapis.com/v1/dataLayers:get?location.latitude=${lat}&location.longitude=${lng}&radiusMeters=100&view=FULL_LAYERS&requiredQuality=HIGH&pixelSizeMeters=0.5&key=${APIKEY}`
  //   )
  //   .then((response) => {
  //     console.log("Data layer Response: ", response);
  //     console.log("url", response["data"].rgbUrl);
  //     showLayer(response["data"].rgbUrl);
  //     showLayer(response["data"].dsmUrl);
  //     showLayer(response["data"].maskUrl);
  //     showLayer(response["data"].annualFluxUrl);
  //   })
  //   .catch((error) => {
  //     console.log("Error encountered: ", error);
  //   });

}

// 3D aerial view - in progress 
export function lookupVideo(address) {
  axios
    .get(
      `https://aerialview.googleapis.com/v1/videos:lookupVideoMetadata?key=${APIKEY}&address=${address}"`
    )
    .then((response) => {
      console.log("Solar Response: ", response);
      return response;
    })
    .catch((error) => {
      console.log("Error encountered: ", error);
    });
}
