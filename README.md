# TRIPN
<h1 align="center">
  <br>
  <img src="logo.png" alt="Markdownify" width="400">
  <br>
  TRIPN
  <br>
</h1>

<h3 align="center">Smart plan maker by the user choice!!</h3>


## About

This project was created for </Code> with Maps Hackathon

## Video Presentation:

- [Youtube](https://youtu.be/lt8JlCf0XDs)

## Apk Download:

- [Tripn](https://drive.google.com/file/d/1HwsJDHB45no_icQoOCBjdI-Kq6y2Fsdp/view?usp=drive_link)  
## Team Name:
Mark-10
## Team Members:

- [Goutham C Arun](https://github.com/GouthamCArun)
- [Alfred Jimmy](https://github.com/alffy007)
- [Athul Babu](https://github.com/ATHULB04)

## Team Leader Email 

-gouthamchennamakkal@gmail.com

<p align="center">
  <a href="#problem-helpnow-solves">Problem Statement</a> •
   <a href="#solution">Solution</a> •
  <a href="#tech-stacks-used">Tech-Stacks used</a> •
  <a href="#backend-repo">Backend Repo</a> •

</p>
<div align="center">
  
  <img src="1.png" alt="Screenshot" width="33%" />
</div>


## The Problem We Solve: Time is precious; let's automate your adventures, no travel time calculations needed..
"Planning outings is time-consuming, and people often face the challenge of choosing destinations and calculating travel times. We need an AI solution to recommend suitable places to visit based on a user's available time and preferences, simplifying planning and enabling users to maximize their leisure time."

## Solution: Elevate your outings, make traveling easy, and reclaim time for unforgettable adventures.
Our product will have the following features:

### 1. Plan trip base on user need
-Trip Planning: The core feature allows users to plan their trips based on their preferences and needs. This feature will consider factors like available time, interests, and location.

### 2. Different Rrestaurants and other services are shown in the plans. 
- The app will provide a diverse range of recommendations, including restaurants and other services, to enhance the user's travel experience.


### 3.Include brief descriptions with each recommendation to give users more information about the suggested places, helping them make informed decisions.
- To help users make informed decisions, the app will include brief descriptions of the suggested places. These descriptions will offer valuable information about the recommended locations, making it easier for users to choose their destinations.

Tripn Descriptions:

An AI-driven service app for generates personalized trip plans, showcasing various restaurants and services, while also providing informative place descriptions for user convenience.

### Railway for Hosting
Furthermore, for hosting our project, we chose Railway. Railway is a cloud platform that simplifies the deployment and management of web applications. By utilizing Railway for hosting, we were able to easily deploy our project and make it accessible to users over the internet. Railway's user-friendly interface and seamless setup process allowed us to integrate our project with their platform effortlessly. With Railway, we benefit from reliable hosting infrastructure and automatic scaling, ensuring that our application can handle incoming traffic effectively. 



 <h3>This is How it works</h3>
     <br>
   </div>
      <div style="display:flex;" align="center">
    <img src="flow.png" alt="Screenshot" width="33%">
    <br>
   <h3>Google APi Key Used/h3>
     <br>
    </div>
      <div style="display:flex;" align="center">
    <img src="api.png" alt="Screenshot" width="33%">
    <br>
   </div>
   <br>
    <h3>ScreenShots of our app</h3>
   <div style="display:flex; gap:"5px";" align="center">
    <img src="2.png" alt="Screenshot" width="33%">
    <img src="3.png" alt="Screenshot" width="33%">
    <img src="4.png" alt="Screenshot" width="33%">
   </div>
     

     
### TECH STACKS USED

<h3> 
  1. Flutter
  <br>
  2.ChatGPT with LangChain
  <br>
 4. Flask Rest API (Backend for API calls)
  <br>
 5. Railway
  <br>

### FUTURE SCOPE

*Travel Made Simple:*
  With TripN, just tell us what you need, and we'll plan and book everything – from transport to accommodation. Your perfect trip, hassle-free.
  Meet TripN, your virtual travel companion. Just like a trusted friend, it offers guidance, advice, and information for a stress-free and enjoyable journey.

### Step-by-Step Code Execution Instructions:
## backend
1. Create a virtual environment:
    ```bash
    cd backend
    python -m venv env
    source env/Scripts/./Activate.ps1
    ```

2. Install the dependencies
    ```bash
   pip install -r requirements.txt

3. Start the development server:
    ```bash
   python main.py

4. Access the API in your browser at http://127.0.0.1:6000/text.
 ```bash
 example of post request:
    {"text":"I have no office today where can I go from 8 am to 5 pm. I wanna chill",
    "address": "Govt.Model Engineering College, Thrikakara",
    "latitude": "10.02817195",
    "longitude": "76.32843611331214"}  

