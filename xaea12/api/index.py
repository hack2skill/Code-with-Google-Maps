import datetime

import requests
from flask import Flask, jsonify

import populartimes
import googlemaps

#app instance
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/popular_times")
def popular_times():
    gmaps = googlemaps.Client(key='AIzaSyDi9JdwPoacIpGgQKvZCZMyNsKQbuaZu94')
    query_response = gmaps.places(query="Kollam Railway Station")
    return query_response

    #Approach 1: We don't have much work in terms of getting popular times here
    #Syntax of popular times lib: https://github.com/m-wrzr/populartimes#populartimesget
        # response = populartimes.get(api_key="AIzaSyAHxiCosxz3mxqBlYjtyNxInNKTC8VD-qA", types=["bar"], p1=(48.132986, 11.566126), p2=(48.142199, 11.580047))
        # return response
    #It is ideally supposed to be giving me a combined popular times data of all such establishments in the region

    #Approach 2 
    #Syntax of popular times lib: https://github.com/m-wrzr/populartimes#populartimesget_id
        # response = populartimes.get_id(api_key=API_KEY, place_id=query_response)
    #This takes 2x the API calls but essentially does the same thing as the first approach.
    #All the client work is under the hood prolly. We can look at source code and figure something out maybe?

if __name__ == "__main__":
    app.run(debug=True)