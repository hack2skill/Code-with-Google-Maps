
 
# disaster-managment-through-google-maps

# Team name = Double Trio ;

# Problem statement :
   We intend to provide a solution by establishing a
nationwide network to interconnect all rescue agencies within a unified
platform to collaborate and share their resources during natural/man-made
disaster.

# Team Leader Email : 22cs3075@rgipt.ac.in

# Brief about Prototype:
    We aim to systematically store images with precise location data (using the Geocoding API) and related notes, ensuring comprehensive record-keeping for future retrieval and contextual understanding. To notify users within a 2-kilometer radius, I recommend integrating the Nearby Messages API. This tool delivers location-based notifications to nearby users, enhancing engagement and communication. 

# Tech Stack:
  Website development: HTML, CSS, Javascript, Django, Python
  App development : Flutter
  Mapping: Geocoding API, Places API, Route API, Directions API,  Distance Matrix API, Geolocation API, Static Maps API
  Messaging system: Firebase Cloud Messaging (FCM), Nearby messages API
  Database: GOOGLE CLOUD RDS (MYSQL)


 # Step-by-Step Code Execution Instructions:
   

  ---->Clone the repository:

Open the command prompt or terminal on your computer.
Navigate to the directory where you want to clone the repository.
Run the following command: git clone <repository_url>.
Replace <repository_url> with the URL of the repository where the prototype is stored. If you don't have the repository URL, please contact the app's developer or project manager.

------>Install dependencies:

Ensure you have the necessary software installed on your computer, such as Node.js and npm (Node Package Manager).
Navigate to the cloned project directory using the command prompt or terminal.
Run the following command: npm install.
This command will install all the required dependencies specified in the project's package.json file.

----->Set up the Google Maps API:

Obtain a Google Maps API key. You can follow the instructions provided by Google to create an API key specific to your project.
Once you have the API key, open the project's source code in a text editor.
Locate the file or configuration where the API key is required.
Replace the placeholder API key with your own API key.

----->Configure the app:

Open the project's source code in a text editor.
Look for any configuration files or variables that need to be set according to your environment.
Update the necessary variables such as database connection details, server endpoints, or any other relevant configurations.
Save the changes.

----->Build and run the app:

In the command prompt or terminal, navigate to the project directory.
Run the command: npm run build.
This command will compile the project's source code and generate the necessary build files.
Once the build is successful, run the command: npm start.
This command will start the application.
You should see output in the terminal indicating that the app is running.

----->Test and analyze the app:

Open a web browser and enter the URL of the app's local development server. Typically, it will be http://localhost:<port_number>.
Replace <port_number> with the appropriate port number specified in the app's configuration or documentation.
You should now be able to access the app and test its functionality.
To analyze the app, use the provided features, such as taking a photo of a disaster and uploading it for verification.
Make sure to thoroughly test different scenarios and analyze the app's behavior and performance.

# Scalability:
  The project aims to connect all rescue agencies nationwide, which means it needs to be scalable to accommodate a large number of agencies and users.
The system should be designed to handle an increasing volume of data, communication, and resource sharing as the network expands.
Scalability can be achieved through the use of distributed systems, cloud infrastructure, and efficient data management techniques.
The platform should be able to scale both horizontally (adding more agencies and users) and vertically (handling increased data and traffic).

# Future aspects:
  The project aligns with the ongoing advancements in technology and communication systems, leveraging them to enhance disaster management capabilities.
It can incorporate cutting-edge technologies like Internet of Things (IoT), artificial intelligence (AI), and machine learning (ML) for real-time data analysis, predictive modeling, and decision support.
Integration with geographic information systems (GIS) can provide valuable spatial data for mapping and visualizing disaster scenarios.
The platform can support mobile applications, allowing users to access critical information and services on the go, making it more convenient and accessible.
Future enhancements may include the integration of drones, robotics, and remote sensing technologies for efficient data collection, surveillance, and rescue operations.
