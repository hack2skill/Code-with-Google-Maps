# SafeRoute-Navigator

## Team Name - Sherlock

## Problem Statement 
In today's fast-paced world, personal safety is a top concern for travelers and commuters. Many people prioritize safety when choosing where to go and how to get there. However, current navigation apps mostly focus on speed and distance, ignoring safety. Recent studies have shown that 87% of travelers and commuters express a heightened need for safety-aware navigation tools. This highlights the critical need for a reliable and user-centric system that not only provides safety ratings for different areas but also recommends the safest and quickest routes based on comprehensive user reviews and area safety data.

## Team Leader Email - 1218.muskangupta@gmail.com

## A Brief Of the Prototype
In today's fast-paced world, personal safety is a top concern for travelers and commuters. Many people prioritize safety when choosing where to go and how to get there. However, current navigation apps mostly focus on speed and distance, ignoring safety. Recent studies have shown that 87% of travelers and commuters express a heightened need for safety-aware navigation tools. This highlights the critical need for a reliable and user-centric system that not only provides safety ratings for different areas but also recommends the safest and quickest routes based on comprehensive user reviews and area safety data.

Our project is designed to address this pressing issue by leveraging Google Maps API suite. Our web-based platform rates the safety of various areas, assigning a safety score on a scale of 0-5, derived from user reviews and sentiment analysis. 

Our system goes beyond traditional navigation apps by calculating route safety scores for multiple route options, factoring in the safety ratings of the areas traversed during the journey. 

We empower users to make well-informed decisions by offering the top three route recommendations that prioritize both safety and travel time. These routes are visualized on a map, with highlighted safety ratings for each area, enhancing user understanding and confidence.

Our goal is to make personal safety a paramount consideration during travel, fostering a sense of security and trust in navigation choices.

## Tech Stacks:
* Front-End Development: HTML, CSS, JavaScript, React, Next.js
* Back-End Development: Node.js, Express.js
* Database: MongoDB (for reviews)
* Mapping and Location Services: Google Maps APIs( Places API, Routes API, Maps SDK)
* Sentiment Analysis: Google Cloud Natural Language API

## Step-by-Step Code Execution Instructions:
To run this project, you'll need to run the frontend and backend simultaneously. Follow these steps:

### Frontend Setup
* Navigate to the frontend directory:
``` cd frontend ```
* Create an environment variable NEXT_PUBLIC_GOOGLE_MAPS_API_KEY with your Google Maps API key. You can obtain an API key from the Google Cloud Console.
* Run the frontend:
``` npm install
npm run dev
```
This command will start the development server for the frontend. You can access the frontend application at http://localhost:3000.

### Backend Setup
* Navigate to the backend directory:
``` cd backend ```
* Set the following environment variables in your system or create a .env file in the backend directory with the following variables:

```
PORT=8000
MONGO_DB_USER (your MongoDB username)
MONGO_DB_PASSWORD (your MongoDB password)
CLIENT_ID (your client ID)
CLIENT_SECRET (your client secret)
```
* Create a JSON file containing your Natural Language API credentials.
* Start the backend server:
```
npm i
node server.js
```
* The backend server will be up and running on http://localhost:8000.
## Future Scope
* Real time Safety-Optimized Routes:

Plan to implement real-time safety updates system which will keep you informed during your journey at every point of time about varoius situations such as accidents, riots, protests, etc.

* Detailed Safety Information:

Introduce support for more detailed safety information such as timing-based safety scores, demographic-based safety of areas and routes.

* Customized Alerts

Implement alerts or notifications for users when entering areas with lower safety ratings, offering alternative routes or safety tips.
