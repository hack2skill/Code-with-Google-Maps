# Code-with-Google-Maps-2023 - Hack2skill

#### Team Name - Karma
#### Problem Statement - Turboroute - Emergency Healthcare Navigation For Quickest Route From Patient To Hospital
#### Team Leader Email - mkb.kalra@gmail.com

### A Brief of the Prototype:
Turboroute is an emergency healthcare navigation app, utilizing Google Maps API for real-time routing. It swiftly guides users and providers to the nearest hospital, integrating geolocation, traffic updates, and dynamic route optimization. The intuitive interface, offline mode, and accessibility features ensure usability in high-stress situations. Privacy measures and feedback mechanisms enhance security and continuous improvement. Turboroute's potential to save lives makes it a crucial tool in emergency healthcare response.
  
### Tech Stack: 
   <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" />
   <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" />
   <img src="https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white" />
   
### Step-by-Step Code Execution Instructions (Mobile Client):

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/GopalVerma1303/Code-with-Google-Maps.git
   ```
2. **Navigate to the Project Directory:**

   ```bash
   cd Code-with-Google-Maps/KARMA/client
   ```

3. **Install Dependencies:**

    ```bash
    flutter pub get
    ```

<br>

> ### *We have used our credentials in this repo. But, if you want, you can use your own credentials too!

<br>

4. **Configure Firebase:**

  - Set up a Firebase project and obtain the necessary credentials.
  - Add the `google-services.json` (for Android) and `GoogleService-Info.plist` (for iOS) files to the respective directories in the project.

5. **Enable Google Maps API:**

  - Go to the Google Cloud Console.
  - Enable the Google Maps SDK and obtain an API key.

6. **Insert API Key:**

  - In the project, locate the file where the Google Maps widget is implemented (e.g., `map_screen.dart`).
  - Insert your Google Maps API key in the designated location.

7. **Run the Application:**

  - Connect your device (emulator or physical device) to your development environment.

8. **Run the app using the following command:**

    ```bash
    flutter run
    ```

    This command will compile and launch the application on your connected device.

9. **Testing:**

  - Explore the prototype, test various functionalities, and analyze the user experience.

### Step-by-Step Code Execution Instructions (ML Model):

1. **Navigate to the project:**
   ```bash
   cd Code-with-Google-Maps/KARMA/model
   ```
2. **Install Requirement:**
   
    ```bash
    pip install -r requirements.txt
    ```
3. **Get API key:**
    
    Get your own Google Maps API key and store it in key.txt.
    
4. **Prediction:**
   
    Predict the location of coordinates using the trained model. See python predict.py --help for details

    The label file is used to associate category with location names in the output. For non-binary mode, you can simply use the map file. For binary mode, you can create a file with two lines:
   
    0,Others
    1,{City name}


### Future Scope:

| Task                                | Description                                            |
|-------------------------------------|--------------------------------------------------------|
| Improved UI/UX                      | Enhance user interface for a more intuitive experience  |
| Refine Emergency Routing Algorithm   | Fine-tune routing logic for even quicker response times |
| Basic Language Translation           | Add support for one additional language initially       |
| Basic Analytics Dashboard            | Add a simple dashboard for tracking app usage           |
| Local Hospital Database Expansion    | Include more hospitals and healthcare facilities        |
| Error Handling and User Feedback     | Implement alerts for common errors and gather user feedback |

### Contributors

<a href="https://github.com/CodeDeployingSquad/docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=CodeDeployingSquad/docs" />
</a>

### Demos & Screenshots:

**PPT LINK:**
[https://docs.google.com/presentation/d/1ZTrXjLjmY17FRtEVmNSRmhjeo-oie3P3qBXKFXLdedU/edit?usp=sharing](https://docs.google.com/presentation/d/1ZTrXjLjmY17FRtEVmNSRmhjeo-oie3P3qBXKFXLdedU/edit?usp=sharing)

**Screenshots:**
<br>
<div>
  <img src="/demo/ss1.png" width="150">
  <img src="/demo/ss2.png" width="150">
  <img src="/demo/ss3.png" width="150">
  <img src="/demo/ss4.png" width="150">
  <img src="/demo/ss5.png" width="150">
</div>
