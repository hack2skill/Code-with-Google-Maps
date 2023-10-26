# BIJLI, Chak De Chargers - Submission
<h2 align="center">
A crowd-sourced EV Charger Finder and Trip Planner app, akin to Tesla's "Go Anywhere" It lets users discover and add third-party EV chargers while planning electric journeys with ease
</h2> 

#### Team Name - Bijli, Chak De Chargers
#### Problem Statement -  The lack of an accessible, comprehensive, and user-driven platform for locating third-party EV chargers and effectively planning electric vehicle journeys hinders the adoption and convenience of electric mobility.
#### Team Leader Email - xshaburu@gmail.com

## A Brief of the Prototype:

An innovative EV Charger Discovery and Route Planning App, akin to Tesla's renowned technology "Go Anywhere". Unlike Tesla's proprietary network, this app is a collaborative platform where users can contribute and locate third-party EV chargers across the map.

Whether you're an EV owner or enthusiast, it empowers you to effortlessly discover and add EV chargers while planning your electric journeys with precision and ease.

Things done so far 

- [x] Maps ID create a custom beautiful map
- [x] Auto Locator to find Nearest EV Chargers
- [x] AutoComplete locations
- [x] Create DB with all EV Chargers
- [x] Create animated markers with DB Coordinates
- [x] Get and Display Places API data
- [x] Get Distance Matrix
- [ ] Get Roads API data
- [ ] Routes API - (Eco Friendly Routes)
- [ ] Which Direction will the sun be
- [x] Mockups layout etc etc
- [ ] CV to on ground scan to car detection on e-charger pumps
- [ ] Location from Click Lat/Long
- [x] Draggable Location
- [x] Addition of Waypoints in-between routes
- [ ] Address Validation for Input
- [x] Get Polyline data for 2 points
- [ ] Display PolyLine color depending on the time to reach

<p align="center"> 
UML Diagram 
</p>

![homepage](https://github.com/Shaburu/Code-with-Google-Maps/blob/main/BIJLI%2C%20Chak%20De%20Chargers%20-%20Submission%20PWA/main%20Work%20space.png)

<p align="center"> 
PROTOTYPE SCREENS & DESCRIPTION
</p>

|HomePage | EV Charger Near Me | EV Charger Selected Route| EV Charger Nav Started| Add EV Charger |
|-|-|-|-|-|
| ![homepage](https://github.com/Shaburu/Code-with-Google-Maps/blob/main/BIJLI%2C%20Chak%20De%20Chargers%20-%20Submission%20PWA/Home%20Screen.png)| ![nearme](https://github.com/Shaburu/Code-with-Google-Maps/blob/main/BIJLI%2C%20Chak%20De%20Chargers%20-%20Submission%20PWA/Near%20Me%201.png)| ![Route](https://github.com/Shaburu/Code-with-Google-Maps/blob/main/BIJLI%2C%20Chak%20De%20Chargers%20-%20Submission%20PWA/near%20me%202%20polyline.png)| ![Nav Started](https://github.com/Shaburu/Code-with-Google-Maps/blob/main/BIJLI%2C%20Chak%20De%20Chargers%20-%20Submission%20PWA/near%20me%20navigation%20starts.png)| ![Added EV Charger](https://github.com/Shaburu/Code-with-Google-Maps/blob/main/BIJLI%2C%20Chak%20De%20Chargers%20-%20Submission%20PWA/Add%20EV%20Charger.png) |
|Homepage displaying all the EV Chargers by Default | After selecting "near me" | Selecting the shortest and quickestroute | Navigation Begins (not yet native)  | List all the details of the EV Chargers |
  
### Tech Stack: 
Built a Progressive WebApp with :heartpulse: using

Front End
React + TS + Vite + html + css
Back End
c# (go for older apis) + Python + Flask + NodeMCU or Ardunio (for Live Tracking of Charging Station's Availability Status)

Docker to dockerize

    
### Future Scope:
  Future Scope would be this app evolving into a decentralized platform where anyone can contribute, whether it's about EVs, petrol, diesel, skateparks, or any other niche. Users can share their opinions and rank these offerings through user ratings.

Our initial focus is on the EV niche, <b>but our vision extends far beyond that.</b> We plan to expand into the vast world of vehicle-related media, encompassing videos, blogs, newsletters, and more. This creates a continuous cycle: we build an audience through engaging media, then invite them to our web app for enhanced user experiences, and vice versa. We listen closely to our users, understanding their needs, and keep adapting our platform accordingly.

Our goal is to make every interaction as smooth as possible, minimizing clicks required to fulfill users' needs. With these improvements, we aim to become the decentralized go-to app for user-recommended guidance on a variety of niche subjects, providing a seamless, satisfying experience for our growing community.
