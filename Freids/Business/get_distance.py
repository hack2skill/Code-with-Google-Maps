import math
from geopy.distance import geodesic
# import googlemaps

def euclidean_distance(source, destination):
    # Assuming source and destination are tuples of (latitude, longitude)
    return math.sqrt((destination[0] - source[0])**2 + (destination[1] - source[1])**2)



def get_distances(api_key, source, destination_list, debug=False):
        # Use Euclidean distance
    distances = [euclidean_distance(source, destination) for destination in destination_list]
        # Use Google Maps API
        # gmaps = googlemaps.Client(key=api_key)

        # # Use the distance_matrix method to get distance and duration data
        # result = gmaps.distance_matrix(source, destination_list, mode="driving", units="metric")

        # distances = []
        # if "rows" in result and len(result["rows"]) > 0:
        #     row = result["rows"][0]
        #     elements = row["elements"]
        #     for element in elements:
        #         if "distance" in element:
        #             distances.append(element["distance"]["text"])
        #         else:
        #             distances.append("N/A")

    return distances


# Example usage
# api_key = "YOUR_GOOGLE_MAPS_API_KEY"
# source = "Your Source Address"
# destination_list = ["Destination 1 Address", "Destination 2 Address", "Destination 3 Address"]

# # Set debug mode to True if you want to use Euclidean distance
# debug_mode = True

# distances = get_distances(api_key, source, destination_list, debug=debug_mode)
# print(distances)
