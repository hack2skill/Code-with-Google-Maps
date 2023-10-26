import time
import os
import json
from exif import Image
from roboflow import Roboflow

# Initialize Roboflow model
#os.environ["HOME"] = r"C:\Users\HP"
rf = Roboflow(api_key="VNw6owSxwgVIEULuPVke")
project = rf.workspace().project("pothole-detection-lwf9u")
model = project.version(3).model

# Initialize an empty GeoJSON feature collection
geojson_data = {
    "type": "FeatureCollection",
    "features": []
}


def decimal_coords(coords, ref):
    decimal_degrees = coords[0] + coords[1] / 60 + coords[2] / 3600
    if ref == "S" or ref == "W":
        decimal_degrees = -decimal_degrees
    return decimal_degrees


def image_coordinates(image_path):
    with open(image_path, 'rb') as src:
        img = Image(src)
    if img.has_exif:
        try:
            img.gps_longitude
            coords = (decimal_coords(img.gps_latitude, img.gps_latitude_ref),
                      decimal_coords(img.gps_longitude, img.gps_longitude_ref))
            return coords
        except AttributeError:
            print('No Coordinates')
    else:
        print('The Image has no EXIF information')
    return None


def add_coordinates_to_geojson(coordinates):
    if coordinates:
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": coordinates
            },
            "properties": {
                "title": f"Marker {len(geojson_data['features']) + 1}"
            }
        }
        geojson_data['features'].append(feature)


def save_geojson_file():
    with open("coordinates.geojson", "w") as f:
        json.dump(geojson_data, f)


def predict_and_save_coordinates(image_path):
    # Predict using Roboflow model
    result = model.predict(image_path, confidence=40, overlap=30).json()
    predictions = result.get("predictions", [])
    # Check if pothole detected in prediction
    if predictions:
        coordinates = image_coordinates(image_path)
        if coordinates:
            add_coordinates_to_geojson(coordinates)

    # Delete the processed image
    os.remove(image_path)


def process_images(directory_path):
    while True:
        for filename in os.listdir(directory_path):
            if filename.endswith(".jpg"):
                image_path = os.path.join(directory_path, filename)
                predict_and_save_coordinates(image_path)
                save_geojson_file()

        # Wait for 5 seconds before checking for new images
        time.sleep(5)


# Specify the directory containing the images
IMAGE_DIRECTORY = "C:/Users/HP/Desktop/GoogleMaps/target"
process_images(IMAGE_DIRECTORY)
