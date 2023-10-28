# Code-with-Google-Maps-2023 - Hack2skill

Welcome to the official repository for the Code-with-Google-Maps-2023 organized by Hack2skill!

## Getting Started

To get started with the Code-with-Google-Maps-2023 repository, follow these steps:

### Submission Instruction:
  1. Fork this repository
  2. Create a folder with your Team Name
  3. Upload all the code and necessary files in the created folder
  4. Upload a **README.md** file in your folder with the below mentioned informations.
  5. Generate a Pull Request with your Team Name. (Example: submission-XYZ_team)

### README.md must consist of the following information:

#### Team Name -KALRA
#### Problem Statement - The problem we aim to address is the delay in ambulance
response times due to traffic congestion.
#### Team Leader Email -virenkalra966@gmail.com

### A Brief of the Prototype:
  Our idea optimizes ambulance routes using real-time data
and Google Maps API. This system will notify vehicles on the road to clear the way for the
approaching ambulance, thereby expediting emergency response.

  
### Tech Stack: 
  HTML: Used for creating the structure of web page.
JavaScript: Used for client-side scripting and interactivity.
Google Maps JavaScript API: Used for embedding maps and location-related features.
Three.js: A 3D library for creating 3D graphics in the browser.
GLTFLoader: Part of Three.js, used for loading 3D models (e.g., ambulance and cars).
Google Places API: Utilized for searching nearby places, such as hospitals. 
  ### Step-by-Step Code Execution Instructions:
  # Google Maps Hackathon submission

This repo contains the project submitted to Google Maps' hackahon on Devpost, heavily modified from the original Google Maps Platform WebGL codelab.

## Getting Started
To get started, download or fork this repo and look in `/solution`.

To run the starter or solution apps, run the following from their respective directories:

1. `npm i`
2. `npm start`

This will install the needed dependencies and run the app locally in your browser using Webpack Dev Server.ed
  
### Future Scope:
  We have the opportunity to enhance traffic signals by integrating them with Google Maps. These signal devices will be linked to the Google Maps system. When an ambulance submits a route request to Google Maps, the system will relay signals to these devices located along the ambulance's designated route. These devices will then change the traffic signal to green specifically for the approaching ambulance and to red for all other vehicles. Once the ambulance has passed the location of each device, it will transmit a notification, causing the signal to revert to its standard operation. Additionally, in the future, we can install LED boards on major roads to alert non-Google Maps users about approaching ambulances.
