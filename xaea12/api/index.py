import datetime

import requests
from flask import Flask, jsonify
import json

import populartimes
import googlemaps

import os
API_KEY = os.getenv("API_KEY")

#app instance
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/popular_times", methods=['GET'])
def weight_gen():
    weights = []
    pop_time = popular_times()
    
    for index in range(len(pop_time)):
        pop_time_temp = pop_time[index]
        weight = {
            "coordinates": pop_time_temp["coordinates"],
            "weekly_sum": 0
        }

        for day_data in pop_time_temp["populartimes"]:
            data_values = day_data["data"]
            day_sum = sum(data_values)
            weight["weekly_sum"] += day_sum

        weights.append(weight)

    return jsonify(weights)


def popular_times():
    [p1, p2] = geocode()
    response = populartimes.get(API_KEY, ["bar"], p1, p2)
    return response

def geocode():
    gmaps = googlemaps.Client(key=API_KEY)
    geocode_response = gmaps.geocode(address="Surathkal")
    geocode_response_dict = geocode_response[0]
    
    northeast = geocode_response_dict["geometry"]["bounds"]["northeast"]
    southwest = geocode_response_dict["geometry"]["bounds"]["southwest"]

    p1 = (southwest["lat"], southwest["lng"])
    p2 = (northeast["lat"], northeast["lng"])

    return [p1, p2]

    #Approach 1: We don't have much work in terms of getting popular times here
    # #Syntax of popular times lib: https://github.com/m-wrzr/populartimes#populartimesget
    # response = populartimes.get_id(API_KEY, "ChIJj0i_N0xaozsRZP78dHq8e4I")
    # response = populartimes.get(API_KEY, ["restaurant"], (12.907582, 74.810978), (12.927127, 74.879116))
    # return response
    #It is ideally supposed to be giving me a combined popular times data of all such establishments in the region

    #Approach 2 
    #Syntax of popular times lib: https://github.com/m-wrzr/populartimes#populartimesget_id
        # response = populartimes.get_id(api_key=API_KEY, place_id=query_response)
    #This takes 2x the API calls but essentially does the same thing as the first approach.
    #All the client work is under the hood prolly. We can look at source code and figure something out maybe?

if __name__ == "__main__":
    app.run(debug=True)