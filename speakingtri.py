import cv2
import cvlib
from cvlib.object_detection import draw_bbox
import pyttsx3
import googlemaps

# Initialize video capture, text-to-speech engine, and Google Maps client
video_capture = cv2.VideoCapture(0)
engine = pyttsx3.init()
voices = engine.getProperty('voices')
# we are taking  avoice over here for the speech function
for voice in voices:
    if "female" in voice.name.lower():
        engine.setProperty('voice', voice.id)
#this is my google maps api key
gmaps = googlemaps.Client(key='AIzaSyDh3r-9NYFpvZDJ6H-W2W0jRmayAOtmnQI')

# Function for object detection
def detect_objects(frame):
    bbox, label, conf = cvlib.detect_common_objects(frame, model='yolov3', confidence=0.5)
    output_frame = draw_bbox(frame, bbox, label, conf)
    return label, output_frame

# Function to speak detected objects
def speak_detected_objects(detected_objects):
    engine.say("I see the following objects: " + ", ".join(detected_objects))
    engine.runAndWait()

# Function to get directions
def get_directions(start, destination):
    try:
        directions = gmaps.directions(start, destination, mode="driving")
        if directions:
            return directions[0]['legs'][0]['steps']
    except Exception as e:
        print(f"Error getting directions: {e}")
    return []

# Ask the user for starting and destination locations
current_location = input("Please specify your current location: ")
destination = input("Now, specify your destination: ")

# Get directions and speak the route
directions = get_directions(current_location, destination)
if directions:
    for step in directions:
        instruction = step['html_instructions']
        engine.say(instruction)
        engine.runAndWait()
else:
    engine.say("Sorry, I couldn't find directions.")
    engine.runAndWait()

# Maintain a list of currently detected objects
current_objects = []

while True:
    ret, frame = video_capture.read()

    if ret:
        frame = cv2.resize(frame, (440, 480))
        detected_objects, output_frame = detect_objects(frame)

        # Compare currently detected objects with the new objects
        new_objects = [obj for obj in detected_objects if obj not in current_objects]
        objects_left = [obj for obj in current_objects if obj not in detected_objects]

        if new_objects:
            speak_detected_objects(new_objects)
        elif objects_left:
            engine.say("The following objects have left: " + ", ".join(objects_left))
            engine.runAndWait()

        current_objects = detected_objects

        cv2.imshow('Object Detection', output_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources and clean up when done
video_capture.release()
cv2.destroyAllWindows()
engine.stop()
