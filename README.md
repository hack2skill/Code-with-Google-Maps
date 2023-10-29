# Code-with-Google-Maps-2023 - Hack2skill

# Team Name - 

Tech Buddy

## Problem Statement - 

Real-Time Road Blockage Reporting System with Google

## Team Leader Email - 

btushar301@gmail.com

### A Brief of the Prototype:

This section must include UML Diagrams and prototype description
_Description_:
The RoadSafety Web Application Prototype aims to enhance road safety and improve traffic management by allowing users to report road blockages, faults, and other issues in real-time. This application utilizes the Google Maps API to provide a user-friendly interface for reporting and viewing road incidents. It promotes community engagement and enables efficient incident reporting.
_Key Features_:

1. _Real-Time Incident Reporting_: Users can report road incidents such as potholes, accidents, roadblocks, and other issues through the application. The location and details of the incident are captured through Google Maps Api.

2. _Interactive Map Interface_: The application integrates Google Maps to provide a familiar and intuitive map interface. Users can easily pinpoint the location of incidents and view the map interactively.

3. _Custom Markers_: Users can mark incidents on the map using custom markers, making it easy to identify the type and location of each incident.

4. _Community Engagement_: The platform encourages community engagement by allowing users to contribute to road safety. It fosters a sense of responsibility and collaboration among users.

5. _Route Planning_: Users can plan routes, view traffic conditions, and receive real-time traffic updates to ensure safe and efficient travel.
## UML
![image](https://github.com/devil-1964/RoadSafety/assets/98086933/e8498383-9792-4933-9d67-a79bd2aa6e10)

## LOGIN 
![WhatsApp Image 2023-10-26 at 22 15 51_fc2c10d2](https://github.com/devil-1964/RoadSafety/assets/98086933/3dcc5009-58df-4f2e-9027-65991f11c0b4)

## HOME PAGE
![WhatsApp Image 2023-10-26 at 22 16 46_b46472c5](https://github.com/devil-1964/RoadSafety/assets/98086933/acb9db6e-1550-4777-a3cb-88ec63470395)

## ROUTE
![WhatsApp Image 2023-10-26 at 22 18 09_742db4cb](https://github.com/devil-1964/RoadSafety/assets/98086933/1a83acc6-0aa2-4839-b606-55a7a7d3c9ae)

## REPORTING AN ISSUE
![WhatsApp Image 2023-10-26 at 22 19 57_1c79267c](https://github.com/devil-1964/RoadSafety/assets/98086933/5a0ffb72-adfa-44fa-bf97-a8c49a314e9f)

### Tech Stack:

- *HTML*

- *CSS*

- *JAVASCRIPT*

- *REACT*

- *NODE*

- *EXPRESS JS*

- *PASSPORT JS*

- *GOOGLE MAPS API*

- *mongo DB*

- *CHAKRA UI*

# Step-by-Step Code Execution Instructions:

## To Start The Backend 

**Clone the repo**

``` git clone https://github.com/Tushar106/RoadSafety.git ```

**Open the RoadSafety**

``` cd RoadSafety ```

**Starting the backend**

``` cd backend ```

``` npm install ```

``` node index.js ```

**Create an .env**

```
PORT=8800
MONGO="mongodb+srv://<YOUR_MONGODB_NAME>:<PASSWORD>@cluster0.liyyi8h.mongodb.net/RoadSafety?retryWrites=true&w=majority"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_SECRET"
```

- NOTE : **MUST CONTAIN THE ACCESS FOR AUTH0**

## To Start The Frontend

``` cd frontend ```

``` npm install ```

``` npm start ```

**create an .env file**

```
REACT_APP_GOOGLE_MAPS_API= "YOUR_API_KEY"
```

### Future Scope & Scalability:

**Futuristic Aspects:**

- Predictive Analytics: Incorporating machine learning and AI algorithms, the prototype can predict road safety issues based on historical incident data and current conditions. This can enable proactive measures to mitigate risks.

- Emergency Services Integration: In emergencies, the application can directly notify and coordinate with local emergency services, providing real-time information about incidents to expedite responses.

- Global Data Sharing: In the future, the application can facilitate data sharing with other road safety platforms and government agencies, creating a global network for incident reporting and analysis.

**Scalability:**

- Geographical Expansion: The prototype can scale to cover a broader geographical area, making it applicable to regions beyond its initial deployment. As the user base grows, it can accommodate reports from various locations, becoming a valuable tool for road safety worldwide.

- Additional Incident Categories: The application can scale by adding more incident categories, such as construction zones, traffic accidents, or weather-related issues. This enhances its utility for diverse road safety concerns.

- Multilingual Support: To cater to a global audience, multilingual support can be integrated, allowing users to report incidents and access information in their preferred language.

- User Profiles and Rewards: Scalability includes the addition of user profiles and reward systems. Users could earn points or incentives for their contributions to road safety, fostering increased engagement.
