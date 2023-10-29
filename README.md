#### Team Name - Geogundam
#### Problem Statement - Using Google Maps API for real-time pothole detection and safer navigation
#### Team Leader Email - rriya1_be20@thapar.edu

### A Brief of the Prototype:
  Imagine driving without the jolt of unexpected potholes. With the power of AI, we've developed a system that not only spots these road nuisances but also displays them on a user-friendly map powered by the trusted Google Maps API. And it doesn't stop there — we guide drivers with alternative routes for a smoother journey. As we move forward, we truly value and incorporate community insights to continuously enhance our system. Together, we're redefining the standards of comfortable and safe driving.

  ![Alt Text](https://github.com/D4em0nn/Code-with-Google-Maps/blob/main/images/WhatsApp%20Image%202023-10-26%20at%2010.10.03%20PM.jpeg?raw=true)
  
  ![Website Layout]https://github.com/D4em0nn/Code-with-Google-Maps/blob/main/images/Screenshot%20(1385).png?raw=true
  
### Tech Stack: 
   Hyper-text markup language(HTML)

  Cascading Style Sheets(CSS)

  JavaScript

  Google Maps API
   
### Step-by-Step Code Execution Instructions:
  1. Clone the github repository
  2. Open the Geogundam folder in a terminal
  3. Write the following command - python -m http.server 8050
  4. Double click the index.html file to view it

  Note: We have implemented a functionality to get real time pothole data using our own phone and laptop, for that we need Android adb, roboflow library and the OpenCamera app for taking continuous images. For the scope of this project, we have also made a final_coordinates.js file with dummy coordinate data for the route between Delhi and Patiala. Hence this model will work only for this particular route unless the python scripts are run and data is collected outside. You can add extra data for checking in the final_coordinates.js file.

### Future Scope:
   1. By getting more pothole data, we can accurately display routes which avoid potholes.
   2. We can allow for vehicle type selection for tailored navigation.
   3. Custom pop-ups to notify users when they're approaching areas with high density of potholes
   4. Balanced route with less distance and potholes, both taken into account.
