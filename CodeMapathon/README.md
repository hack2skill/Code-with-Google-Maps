#### Team Name - Code Mapathon

#### Problem Statement - "Unlocking the Full Potential of Location-Based Experiences: Bridging Gaps, Streamlining Interactions, and Enhancing User Security"

#### Team Leader Email - <sitammeur@gmail.com>

### A Brief of the Prototype

  This Django Project is designed to assist users in planning routes to their destinations and estimating the time it will take to reach those destinations. This is a valuable tool for anyone who wants to plan their journeys more effectively. Additionally, it leverages Google APIs for auto-populating fields, displaying maps, and routes for multiple waypoints.
  
### Tech Stack

- *Python* - The programming language used for the backend logic.
- *Django* - A high-level Python web framework for building robust web applications.
- *HTML/CSS* - Frontend development using HTML for structure and CSS for styling.
- *JavaScript* - Used for client-side interactivity and integration with Mapbox and Google APIs.
- *Virtual Environment* - Creating isolated development environments.
- *Database* - Mentioning the specific database system we are using SQLite. For production PostgreSQL can be used.
- *Google APIs* - Integration with Google APIs for auto-populating fields, maps, and routes.

### Step-by-Step Code Execution Instructions

- *Step 1* - Clone the repository using the following command:

```
git clone
```

- *Step 2* - cd into the directory using the following command:

```
cd CodeMapathon
```

- *Step 2* - Create a virtual environment using the following command:

```
python -m venv maps-env
```

- *Step 3* - Activate the virtual environment using the following command:

```bash
maps-env\Scripts\activate
```

- *Step 4* - cd into the directory using the following command:

```
cd djangomaps
```

- *Step 5* - Install the requirements using the following command:

```
pip install -r requirements.txt
```

- *Step 6* - Run the server using the following command:

```
python manage.py runserver
```

- *Step 7* - Open the browser and go to the following URL:

```
https://localhost:8000
```

Note: Don't forget to add Google API key and the recaptcha key in the .env file.

### Future Scope

  For future development, we can add more features like:

- *Adding a feature to add multiple waypoints* - Currently, we can add only two waypoint. We can add a feature to add multiple waypoints what user wants.
- *Real-time traffic updates* - We can add a feature to show real-time traffic updates on the map.

These above twos are main features which we will focus next. Apart from that many more features can be added to make this project more useful and user-friendly.
