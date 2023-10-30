**Team Information:**

- Team Name: Team CodeForMap
- Problem Statement: Developed an app for users to buy houses, rooms, or rent PG accommodations.
- Team Leader Email: ankushkothiyal2012@gmail.com

**Repository Links:**
- Please find the houseapp-frontend repository here:

- [houseapp-frontend GitHub Repository](https://github.com/01ankush/houseapp-frontend)

**Project Overview:**

HouseForYou is an innovative rental platform that simplifies the housing search process, prioritizing user-centric features and advanced technologies. The app enables users to effortlessly upload property details, encompassing everything from individual rooms to PG accommodations.

**Tech Stack:**

- **AI Assistant:**
  - Natural Language Processing (NLP) with OpenAI key (text-davinci-003)
  - Programming Language: Python (used for integrating NLP models)

- **Maps Integration:**
  - Google Maps API, including Google Maps Directions API, Google Maps Geocoding API, Google Maps JavaScript API, and Google Maps Places API

- **App Development:**
  - Ionic-angular

- **Backend Development:**
  - Framework: Node.js with Express.js
  - Database: MongoDB

**Step-by-Step Code Execution Instructions for houseapp-frontend:**

1. **Navigate to the Frontend Folder:**
   - Open your terminal and change the directory to "houseapp-frontend" using the following command:
     ```shell
     cd houseapp-frontend
     ```

2. **Run Ionic Development Server:**
   - Start the development server by executing the command:
     ```shell
     ionic serve
     ```
   - This command will host your app on a local server, accessible through your web browser.
  
3. **Inspect Your App in the Browser:**
   - Open your web browser and navigate to the local host URL where your app is running, usually at `http://localhost:8100/`.
   - Right-click on your app and choose "Inspect" to access developer tools for viewing and analyzing the app's interface.

**Running Your App within an Android Emulator:**

Before testing on an Android emulator, ensure the Android SDK, Java, and emulator are properly configured.

1. **Build Your App:**
   - Use the following command to build your Ionic app:
     ```shell
     ionic build
     ```

2. **Copy the Web Assets:**
   - Copy your web assets to the native Android project folder with this command:
     ```shell
     npx cap copy
     ```

3. **Open the Android Project:**
   - Launch Android Studio by executing:
     ```shell
     npx cap open android
     ```
   - This command opens the project files in Android Studio.

4. **Run Your App:**
   - In Android Studio, click the "Run" button to launch your app within the Android emulator.

By following these steps, you can effectively test and debug your application within the Android emulator.

**Code Execution Instructions for houseapp-backend:**

1. **Navigate to the Backend Folder:**
   - In your terminal, change the directory to "houseapp-backend" using this command:
     ```shell
     cd houseapp-backend
     ```

2. **Install Dependencies:**
   - Install the "dotenv" package by executing the following command:
     ```shell
     npm install dotenv
     ```

3. **Run the Backend Server:**
   - Start the backend server by running this command:
     ```shell
     node index
     ```
   - The message "Connected to Db" indicates that the server is up and running.

4. **Access the App:**
   - Access the app on your local host. Open your web browser and visit the URL, typically `http://localhost:YOUR_PORT`.
   - Replace `YOUR_PORT` with the port number specified in your backend configuration.

These steps enable you to run your backend server and access the app locally.

**Code Execution Instructions for houseopenAi:**

1. **Navigate to the OpenAI Folder:**
   - Open your preferred code editor (e.g., VS Code, PyCharm) and access the "houseopenAi" folder.

2. **Run the Python Script:**
   - Open the "main.py" file.
   - Execute the Python script by clicking the "Run" icon in your code editor.

3. **Interact with the App:**
   - Interact with the app by speaking specific commands, such as:
     1. "What is the distance between any location to any location."
     2. Asking general questions.
     3. Using specific commands like:
        - "Can you find a one-person room in Delhi?"
        - "Can you help in finding a two-person room in Meerut?"
     4. To stop the app, say "Stop Loco!"

By following these steps, you can run and interact with your applications for houseapp-frontend, houseapp-backend, and houseopenAi projects.

**Future Scope:**

In the future, the project aims to add additional features, including:
- Providing an inside view of houses using Augmented Reality (AR).
- Offering the app in various languages to cater to a broader audience.
- Enabling users to make monthly payments directly to property owners through the app.
- Implementing a messaging system for direct communication between users and property owners.
