### Code-with-Google-Maps-2023 - Hack2skill
## Team Name : 
                 The_Innovators
## Problem Statement : 
                 To specify the ideal time to visit a place and also to indicate the accident prone zones.
### Team Leader Email : 
                 mandalavamsi372@gmail.com

### A Brief of the Prototype:
  plot-1: By ensuring about the safety of Google map users,we are trying to point out the major accident prone zones.
          This observation allows the users to travel safe and slower in major accident zones by popup window notification.
  plot-2: It is about introducing an option(preferred time to visit a place) that enables users to plan the prime time to 
          explore the location.
          
### Tech Stack: 
  Data Sources: We have sources like OpenStreetMap,gov databases for obtaining information about accident prone areas.
  API'S Usage:
       1.Google maps JavaScript API:
            Using this API  we will be able to create multiple markers in google maps based on existing danger prone areas 
            data we can mark it.
       2.Routes API:
            This API we can travel any location by entering destination details from our location.
       3.Geolocation API:
            This API is used to geting our current location .After mentioning all Danger locations it checks our location is 
            nearer to danger zone location if it nearer it shows pop-up window(we can design pop up window 
            using(css,js,html).
  Frontend:
       JavaScript framework like Node,React-js .HTML/CSS for designing the map display and also we design a pop window 
       notification while reaching nearer to the danger zone by geolocation API.
  API Integration:
       Integrating with Api key we can add google maps feature in our website or building APP.
We're divided problem statement into 2 plots.
## PLOT 1: Indication of Accident-prone Zones and notification alerts.
  # Working:
        1.We accumulate the data about accident prone spots from government or other sources like Internet, public reviews 
          By this we can find the majority accident occurring domains.
        2.By that, we mark the major spots in the location using google maps API with the help of markers.
        3.For example: we have taken a Danger Zones in Punjab district wise as a demo & implemented a prototype link as 
          given below.
                  https://www.google.com/maps/d/edit?mid=1bNvJtkZrXfrSfHWX_QmUibKgyZ2TQ3o&usp=sharing
        4.This feature enables ensure more safety of users by specifying the danger regions in Google maps.
        5.We are Implementing a notification system that alert users when they are approaching the danger zones.
        6.Open google maps select any destination as our wish after entering destination details it will show all possible 
          major accident spots across the route as shown below fig.
        ![image](https://github.com/VamsiM-Coder/Code-with-Google-Maps/assets/146115452/6dbcabb3-cce0-4b46-ad32-a4e09c0708a4)
        7. While reaching the danger zones, it shows a popup window as shown in below.
        ![image](https://github.com/VamsiM-Coder/Code-with-Google-Maps/assets/146115452/26fc9347-e11e-4ebd-aecb-1f2abb1838f9)
        8.The design of the popup window will be based on type of vehicle being used, “Wear Helmet” for motor cycles, “Wear 
          Seatbelts” for cars while approaching in danger zones.
   Step-by-Step Code Execution Instructions:
        1.Firstly,we must implement a danger zones by various markers based on geocoding API as per Data of Accident Prone 
          areas.
        2.After that By using Routes API we can travel any destination accordingly.
        3.In that route if any danger zone present it shows popup notification window while reaching danger Zone.
        4.Otherwise,as it continues normally.
# Accident Prone Zone Data in Punjab state refer in below link.
     file:///C:/Users/user/Downloads/Danger%20Zones%20in%20Punjab%20State%20(Data).pdf
## PLOT 2: Prime time to visit particular Location with ease access
  # Working:
        1.By introducing this option that enables users to plan the prime time to explore the specific location.
        2.By this feature users can visit any location in premier times with best experience.
        3.It allows users to plan have a pre planned schedule along with Google maps.
  Step-by-Step Code Execution Instructions:
        1.By the popular times graph, we can demonstrate preferred time for a particular location.
        ![image](https://github.com/VamsiM-Coder/Code-with-Google-Maps/assets/146115452/8ea6121a-2dfe-4dd9-bb66-8077f82929c9)
        2.We can add this option in location plot or in location description as shown in below fig.
        ![image](https://github.com/VamsiM-Coder/Code-with-Google-Maps/assets/146115452/41994011-5bdf-473c-a5cf-27e103fb118e)
        3.It becomes straight forward for the users to watch the prime time by displaying/enabling as option as shown in 
          below.
### Future Scope:
   As a technology advances we are responsible to provide users with valuable information like best time to visit any location and also we can take safety precautions for users while travelling.By adopting these conditions will be key to the future sucess of google maps Platform.

# FURTHER DETAILS: email@us       
