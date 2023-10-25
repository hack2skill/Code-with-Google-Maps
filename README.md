
#### Team Name - LogicalVoids
#### Problem Statement -  Analysing sources of Pollution in an area and providing solutions for them.
#### Team Leader Email - ayushipal06@gmail.com

### A Brief of the Prototype:
We planned to design a website for providing the primarily cause of pollution in an area and how we can reduce it efficiently.
We will be extracting Google map Air Quality Index API to show the heat map of AQI of region. The user can search for a city to get further details about it.
As we get input from user , we will provide information about the main possible sources of pollution (like industries and their contribution, the traffic data and the stubble burning data) as well as some possible solution .
Moreover, we will also provide city v/s city comparison and plantation data.
  
### Tech Stack: 
Frontend : HTML5, CSS3, JavaScript
Backend : Node.js
Database Management
PYTHON
API Integration 
   
### Step-by-Step Code Execution Instructions:

1. Industries and their contribution  -- Count the number of factories in the area within a range of 10 km for a region and range of 50km for the city. We can count the number of factories using the Google Maps API and then store the data in a DataFrame. Then we will apply Machine Learning and categorise factories based on their contribution in pollution. This will be done by comparing AQI levels at the places.We will also show our final data as Tree Map showing contribution by each Factory.

2. Traffic Data -- Using the Roads API, We will get the traffic data. Create a traffic layer map that will show which route has most traffic.Then comparing traffic data with AQI, we finally give a result about reason of pollution and instant traffic control is required there.

3. Stubble Burning -- Collect the AQI level history data throughout the year. We will use IQR Based filtering / Z-score method to detect outliers.
We will keep those region in separate DataFrame and then will compare the AQI level and smog conditionsBased on the AQI, we will categorise the region as Red Zone and Yellow Zone.

  
### Future Scope:
On an average of 1.66 million deaths are in India due to pollution alone. There is an urgent need of providing an efficient mechanism for pollution management. Our project aims at providing the same.
