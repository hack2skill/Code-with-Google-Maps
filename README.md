**Team Information:**

- Team Name: Team CodeForMap
- Problem Statement: Developed an app for users to buy houses, rooms, or rent PG accommodations.
- Team Leader Email: ankushkothiyal2012@gmail.com

**Repository Links:**
- Please find the houseapp-frontend repository here:
- [houseapp-frontend GitHub Repository](https://github.com/01ankush/houseapp-frontend)
- Prototype Presentation link :
- [drive link](https://drive.google.com/drive/folders/1Z8LC8B9MlcAvfmvJ5qZrg_X4wMhVVcRs?usp=sharing)
  
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

**Instructions for Running the houseapp-backend:**
- Ensure that you have created a MongoDB connection string for your MongoDB cluster and added it to the .env file.

1. **Navigate to the Backend Directory:**
   - Open your terminal and change the current directory to the "houseapp-backend" folder using the following command:
     ```shell
     cd houseapp-backend
     ```

2. **Install Required Dependencies:**
   - Install the "dotenv" package by running this command:
     ```shell
     npm install dotenv
     ```

3. **Start the Backend Server:**
   - Initiate the backend server by executing the following command:
     ```shell
     node index
     ```
   - If you see the message "Connected to Db," it means the server is running successfully.

4. **Access the Application:**
   - Access the application on your local machine by opening a web browser and navigating to the URL, usually `http://localhost:YOUR_PORT`.
   - Replace `YOUR_PORT` with the specific port number configured in your backend settings.

These instructions will help you run the houseapp-backend, enabling you to access the application locally.

**----Code Execution Instructions for houseopenAi----**

**Instructions for Generating a Free OpenAI API Key:**

1. **Create an OpenAI Account:**
   - Begin by visiting the OpenAI website (https://www.openai.com) and creating a new account if you haven't already.

2. **Access Your Dashboard:**
   - After creating your account, log in to the OpenAI platform and access your user dashboard.

3. **Generate an API Key:**
   - In your OpenAI dashboard, navigate to the API or Developer section. Look for the option to generate an API key.

4. **Create a New API Key:**
   - Follow the provided instructions to create a new API key. You may need to specify the type of access you require (e.g., GPT-3, DALL-E) and any usage restrictions.

5. **Copy the API Key:**
   - Once your API key is generated, copy it to your clipboard.

6. **Configure the API Key in Your Project:**
   - Open the `config.py` file in your project and paste the API key you copied in the previous step.

7. **Save the `config.py` File:**
   - After pasting the API key, save the `config.py` file to ensure that your project can access the OpenAI API.

By following these steps, you will generate a free OpenAI API key and configure it in your project's `config.py` file, allowing you to make API requests to OpenAI services.
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
