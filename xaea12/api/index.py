import datetime
import time

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

@app.route("/api/popular_times_demo", methods=['GET'])
def delayed_api_req():
    time.sleep(20)
    response = [
        {
            "coordinates": {
            "lat": 12.9682704,
            "lng": 74.8065197
            },
            "weekly_sum": 5307
        },
        {
            "coordinates": {
            "lat": 12.9883174,
            "lng": 74.8005921
            },
            "weekly_sum": 3800
        },
        {
            "coordinates": {
            "lat": 13.0223759,
            "lng": 74.8079575
            },
            "weekly_sum": 5655
        },
        {
            "coordinates": {
            "lat": 12.9894559,
            "lng": 74.8015439
            },
            "weekly_sum": 3798
        },
        {
            "coordinates": {
            "lat": 12.9743232,
            "lng": 74.8036651
            },
            "weekly_sum": 4279
        },
        {
            "coordinates": {
            "lat": 12.9815466,
            "lng": 74.8227607
            },
            "weekly_sum": 4314
        },
        {
            "coordinates": {
            "lat": 13.0010366,
            "lng": 74.8260901
            },
            "weekly_sum": 5191
        }
    ]
    return response


@app.route("/api/popular_times_test", methods=['GET'])
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

if __name__ == "__main__":
    app.run(debug=True)