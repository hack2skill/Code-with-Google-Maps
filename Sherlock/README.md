# SafeRoute-Navigator

## Team Name - Sherlock

## Problem Statement 
In today's fast-paced world, personal safety is a top concern for travelers and commuters. Many people prioritize safety when choosing where to go and how to get there. However, current navigation apps mostly focus on speed and distance, ignoring safety. Recent studies have shown that 87% of travelers and commuters express a heightened need for safety-aware navigation tools. This highlights the critical need for a reliable and user-centric system that not only provides safety ratings for different areas but also recommends the safest and quickest routes based on comprehensive user reviews and area safety data.

## Team Leader Email - 1218.muskangupta@gmail.com

## A Brief Of the Prototype
In today's fast-paced world, personal safety is a top concern for travelers and commuters, with 87% expressing a heightened need for safety-aware navigation tools. Current navigation apps predominantly prioritize speed and distance, often overlooking safety.
Our project is designed to bridge this crucial gap. We've developed a web-based platform that rates the safety of various areas, assigning a safety score from 0 to 5. This score is determined by user reviews and sentiment analysis.
Our platform equips users with the means to make well-informed decisions by displaying safety ratings and user reviews for searched areas. Additionally, it offers visual representations of the surroundings to aid decision-making.
Going beyond traditional navigation apps, our platform calculates route safety scores for the most optimized route. These scores factor in the safety ratings of both the source and destination. The routes are visualized on a map, enhancing user comprehension and confidence.
Our ultimate goal is to champion personal safety during travel, instilling a sense of security and trust in every navigation decision.

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
* Safety-Optimized Routes:

Next, we plan to implement safety-focused route guidance. Our system will calculate safety scores for areas along your route, ensuring you're guided through the safest path possible. Real-time safety updates will keep you informed during your journey.

* Multiple Route Options:

We'll introduce support for multiple route choices. Whether you prefer speed or safety, you can select from diverse routes tailored to your needs. Visual comparisons will be provided, making it easy to pick the route that best suits your preferences.

