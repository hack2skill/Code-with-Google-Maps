import requests
import googlemaps
from math import cos, radians
import os
import ast
from langchain.schema import HumanMessage
from langchain.chat_models import ChatOpenAI

os.environ["OPENAI_API_KEY"] = os.environ.get('OPENAI_API_KEY')
os.environ["API_KEY"] = os.environ.get('API_KEY')
api_key=os.environ.get('API_KEY')

def text_evaluator_prompt_maker(transcribed_txt, start_address, lat, lng):
    instructions = """You are a text evaluator. Your duty is to analyze the text and return the time he wants to go in railway time.
    and hours he is free.
    You must only return a list, no sentences.
    also return the time in 24-hour format with a '.' not a ':'. i.e., if it's 13:00, return 13.00.
    Return a list like this [start_time, end_time, free hours].
    """

    data = str(transcribed_txt)
    question = f"Give me a list in this format [start_time, end_time, free hours]."  
    prompt = instructions + data + question
    return text_evaluator_ask_gpt(prompt, start_address, lat, lng)

def text_evaluator_ask_gpt(prompt, start_address, lat, lng):
    chat_model = ChatOpenAI(temperature=0.0, model='gpt-3.5-turbo', openai_api_key=os.environ.get("OPENAI_API_KEY"), max_tokens=250, stop=["\n"])   
    output = chat_model([HumanMessage(content=prompt)])
    response = output.content
    parsed_list = ast.literal_eval(response) 
    # print(parsed_list)
    # print(type(parsed_list))
    return plan_travel(api_key, start_address,parsed_list[0],parsed_list[1], lat, lng,parsed_list[2])

def get_farthest_best_place(api_key, lat, lng, radius, num_results, place_type, keyword):
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    params = {
        'location': f'{lat},{lng}',
        'radius': radius,
        'key': api_key,
        'keyword': keyword,
        'name': place_type,
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        results = data.get('results', [])

        if results:
            
            def custom_sort(place):
                rating = place.get('rating', 0)

                
                categories = place.get('types', [])
                if any(category in categories for category in ['park', 'nature_reserve', 'scenic_lookout']):
                    rating += 0.15

                
                lat2 = place['geometry']['location']['lat']
                lng2 = place['geometry']['location']['lng']
                distance = ((lat - lat2) ** 2 + (lng - lng2) ** 2) ** 0.5

                
                return (-rating, distance, place['name'])

            sorted_results = sorted(results, key=custom_sort)

            top_places = []
            for i, place in enumerate(sorted_results[:num_results]):
                name = place['name']
                rating = place.get('rating', 'Rating not available')
                address = place.get('vicinity', 'Address not available')
                lat = place['geometry']['location']['lat']  # Get latitude
                lng = place['geometry']['location']['lng']
                place_info = {
                    'name': name,
                    'rating': rating,
                    'address': address,
                    'lat': lat,
                    'lng': lng,
                }
                top_places.append(place_info)
            # print(top_places)
            return top_places
        else:
            return []

    else:
        print('Error in the API request. Status code:', response.status_code)
        return []


def get_top_places_between(api_key, start_address, end_address):
    gmaps = googlemaps.Client(key=api_key)

    geocode_start = gmaps.geocode(start_address)
    geocode_end = gmaps.geocode(end_address)

    if geocode_start and geocode_end:
        start_lat = geocode_start[0]['geometry']['location']['lat']
        start_lng = geocode_start[0]['geometry']['location']['lng']
        end_lat = geocode_end[0]['geometry']['location']['lat']
        end_lng = geocode_end[0]['geometry']['location']['lng']

        num_points = 10

        start_latitude_in_radians = radians(start_lat)
        one_degree_in_km = 1 / ((111.32 * 1000) * cos(start_latitude_in_radians))
        min_distance_in_degrees = 0.02
        places_along_route = []

        for i in range(1, num_points + 1):
            intermediate_lat = start_lat + i * (end_lat - start_lat) / (num_points + 1)
            intermediate_lng = start_lng + i * (end_lng - start_lng) / (num_points + 1)
            distance_from_start = ((intermediate_lat - start_lat) ** 2 + (intermediate_lng - start_lng) ** 2) ** 0.5
            distance_from_end = ((intermediate_lat - end_lat) ** 2 + (intermediate_lng - end_lng) ** 2) ** 0.5

            if (
                distance_from_start >= min_distance_in_degrees
                and distance_from_end >= min_distance_in_degrees
            ):
                midpoint_lat = intermediate_lat
                midpoint_lng = intermediate_lng
                radius = 2000
                place_type = 'nature|entertainment|zoo|museum|theater|cinema|amusement park|art gallery|scenic lookout|shopping mall'
                keyword = "tourist attraction|sightseeing|shopping|entertainment|mall's"

                params = {
                    'location': (midpoint_lat, midpoint_lng),
                    'radius': radius,
                    'type': place_type,
                    'keyword': keyword,
                }

                places = gmaps.places_nearby(**params)

                if 'results' in places:
                    places_along_route.extend(places['results'])

        if places_along_route:
            def custom_sort(place):
                rating = place.get('rating', 0)
                categories = place.get('types', [])
                if any(category in categories for category in ['park', 'nature_reserve', 'scenic_lookout']):
                    rating += 0.15
                return rating

            sorted_places_by_rating = sorted(places_along_route, key=custom_sort, reverse=True)

            top_10_places = []
            added_places = set()  # Set to track added places

            for i, place in enumerate(sorted_places_by_rating):
                name = place.get('name', 'Name not available')
                rating = place.get('rating', 'Rating not available')
                address = place.get('vicinity', 'Address not available')
                lat = place['geometry']['location']['lat']  # Get latitude
                lng = place['geometry']['location']['lng'] 

                # Create a unique identifier for the place
                place_identifier = f"{name}-{rating}-{address}"

                if place_identifier not in added_places:
                    place_info = {'name': name, 'rating': rating, 'address': address, 'lat': lat, 'lng': lng}
                    top_10_places.append(place_info)
                    added_places.add(place_identifier)
                    if len(top_10_places) == 10:
                        break

            place_info_list = top_10_places

            if place_info_list:
                return place_info_list
            else:
                return []
        else:
            return []
    else:
        return []


def get_travel_time(api_key, start_address, destination_address):
  
    gmaps = googlemaps.Client(key=api_key)

    geocode_result_start = gmaps.geocode(start_address)
    if not geocode_result_start:
        return "Error: Starting address not found"

    start_location = geocode_result_start[0]['geometry']['location']
    start_lat = start_location['lat']
    start_lng = start_location['lng']

    geocode_result_destination = gmaps.geocode(destination_address)
    if not geocode_result_destination:
        return "Error: Destination address not found"

    destination_location = geocode_result_destination[0]['geometry']['location']
    destination_lat = destination_location['lat']
    destination_lng = destination_location['lng']

    params = {
        'origins': f'{start_lat},{start_lng}',
        'destinations': f'{destination_lat},{destination_lng}',
        'departure_time': 'now',  
        'mode': 'driving',  
    }

    response = gmaps.distance_matrix(**params)

    if response['status'] == 'OK':
        duration_in_seconds = response['rows'][0]['elements'][0]['duration_in_traffic']['value']
        duration_in_hours = duration_in_seconds / 3600.0
        formatted_duration = f"{duration_in_hours:.3f}"
        return formatted_duration

    return "Error: Unable to calculate travel time"
def get_place_photo(api_key, place_name):
    gmaps = googlemaps.Client(key=api_key)
    places = gmaps.places(place_name)

    if places['status'] == 'OK' and len(places['results']) > 0:
        place_id = places['results'][0]['place_id']
        photos = gmaps.place(place_id, fields=['photo'])

        if 'photos' in photos['result']:
            photo_reference = photos['result']['photos'][0]['photo_reference']
            photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={api_key}"
            return photo_url
        else:
            return None
    else:
        return None

def find_restaurant(api_key, start_location, end_location):
    gmaps = googlemaps.Client(key=api_key)

    geocode_start = gmaps.geocode(start_location)
    geocode_end = gmaps.geocode(end_location)

    if geocode_start and geocode_end:
        start_lat = geocode_start[0]['geometry']['location']['lat']
        start_lng = geocode_start[0]['geometry']['location']['lng']
        end_lat = geocode_end[0]['geometry']['location']['lat']
        end_lng = geocode_end[0]['geometry']['location']['lng']

        midpoint_lat = (start_lat + end_lat) / 2
        midpoint_lng = (start_lng + end_lng) / 2

        radius = 1000  # Set the radius to 1000 meters
        place_type = 'restaurant'
        keyword = 'food'

        params = {
            'location': (midpoint_lat, midpoint_lng),
            'radius': radius,
            'type': place_type,
            'keyword': keyword,
        }

        places = gmaps.places_nearby(**params)

        if 'results' in places:
            # Sort places based on rating in descending order
            sorted_places = sorted(places['results'], key=lambda x: x.get('rating', 0), reverse=True)

            if sorted_places:
                place = sorted_places[0]  # Get the top-rated restaurant
                name = place.get('name', 'Name not available')
                rating = place.get('rating', 'Rating not available')
                address = place.get('vicinity', 'Address not available')
                lat = place['geometry']['location']['lat']  # Get latitude
                lng = place['geometry']['location']['lng']
            
                return {
                    'name': name,
                    'rating': rating,
                    'address': address,
                    'lat': lat,
                    'lng': lng
                
                }
            else:
                return {'error': 'No restaurants found along the route.'}
        else:
            return {'error': 'No restaurants found along the route.'}
    else:
        return {'error': 'Error in geocoding the starting or ending location'}
def description_prompt_maker(place):
    instructions = """You are a travel assistant .You duty is to give one line descripion of place that user ask for.
    Your description must be in one line.
    """

    data = str(place)
    question = f"Give me a one line description of {place}."  
    prompt = instructions + data + question
    return description_ask_gpt(prompt)

def description_ask_gpt(prompt):
    chat_model = ChatOpenAI(temperature=0.0, model='gpt-3.5-turbo', openai_api_key=os.environ.get("OPENAI_API_KEY"), max_tokens=250, stop=["\n"])   
    output = chat_model([HumanMessage(content=prompt)])
    response = output.content
    return response

def plan_travel(api_key, start_address, start_time,end_time,lat, lng,available_time):
    plan=[]
    tea = 0
    breakfast = 0
    lunch = 0
    dinner = 0
    place_type = 'park|zoo|museum|theater|cinema|amusement park|art gallery|nature reserve|scenic lookout|shopping mall'
    keyword = 'tourist attraction|sightseeing|shopping|entertainment'
    speed=40
    num_results=1
    radius=available_time*speed*1000
    # print("radius",radius)
    top_places = get_farthest_best_place(api_key, lat, lng, radius, num_results, place_type, keyword)
    # print("top places",top_places)
    end_address = top_places[0]['name'] +","+ top_places[0]['address']
    # print("end adress",end_address)
    time_for_final = get_travel_time(api_key, start_address, end_address)
    # print("time for final",time_for_final)
    n_available_time = float(float(available_time) - (2 * float(time_for_final)))
    c_time=end_time-2*float(time_for_final)
    # print(c_time)
    # print("n_available_time",n_available_time)
    while (n_available_time < 0):
        speed=speed-10
        radius=available_time*speed*1000
        top_places = get_farthest_best_place(api_key, lat, lng, radius, num_results, place_type, keyword)
        end_address = top_places[0]['name'] +","+ top_places[0]['address']
        time_for_final = get_travel_time(api_key, start_address, end_address)
        n_available_time = float(float(available_time) - (2 * float(time_for_final)))
    # print("n_available_time",n_available_time)
    if n_available_time >= 0.5:
        # print("if")
        places_between = get_top_places_between(api_key, start_address, end_address)
        print("places between",places_between)
        # print("first place is ",places_between[1]['name'] + "," +places_between[1]['address'])
        t = get_travel_time(api_key, start_address, places_between[1]['name'] + "," +places_between[1]['address'])
        # print("t",t)
        e_t = float(float(start_time) + float(t))
        # restaurant = find_restaurant(api_key, start_address, places_between[1]['name'] + "," +places_between[1]['address'])
        place_data = {'name': places_between[1]['name'], 'rating': places_between[1]['rating'], 'address': places_between[1]['address'],'lat':places_between[1]['lat'],'lng':places_between[1]['lng'], 'stime': start_time, 'etime': e_t, 'ttime': t, 'type': 'travel'}        
        n_available_time = float(float(n_available_time) - float(t))
        plan.append(place_data)
        i = 1
       
        # print("plan is ",plan)

        while n_available_time > 0 and i < len(places_between) and (plan[i-1]['stime']<c_time):
            start_time = plan[i - 1]['etime']
            t = get_travel_time(api_key, start_address, str(place_data['name'] + ","+ place_data['address']))
            e_t = float(float(start_time) + float(t))
            fractional_part = float(e_t)- int(e_t)
            if (fractional_part> 0.60):
                e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
            n_available_time = float(float(n_available_time) - float(t))
            if n_available_time > 0:
                place_data = {'name': places_between[i]['name'], 'rating': places_between[i]['rating'], 'address': places_between[i]['address'],'lat':places_between[i]['lat'],'lng':places_between[i]['lng'], 'stime': start_time, 'etime': e_t, 'ttime': t, 'type': 'travel'}
                plan.append(place_data)
                if (float(e_t) > 16.30  and float(e_t)< 17.30 and tea == 0):
                    restaurant = find_restaurant(api_key, plan[i]['name'] + plan[i]['address'], places_between[i + 1]['name'] + places_between[i + 1]['address'])
                    rt = get_travel_time(api_key, plan[i]['name'] + plan[i]['address'], restaurant['name'] + restaurant['address'])
                    e_t = float(float(plan[i]['etime']) + 0.5)
                    fractional_part = float(e_t)- int(e_t)
                    if (fractional_part> 0.60):
                        e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
                    place_data = {'name': restaurant['name'], 'rating': restaurant['rating'], 'address': restaurant['address'],'lat':restaurant['lat'],'lng':restaurant['lng'], 'stime': plan[i]['etime'], 'etime': e_t, 'ttime': rt, 'type': 'restaurant'}
                    plan.append(place_data)
                    n_available_time = float(float(n_available_time) - 0.5)
                    tea = 1
                if (float(e_t) > 9 and float(e_t)<10  and breakfast == 0):
                    restaurant = find_restaurant(api_key, plan[i]['name'] + plan[i]['address'], places_between[i + 1]['name'] + places_between[i + 1]['address'])

                    rt = get_travel_time(api_key, plan[i]['name'] + plan[i]['address'], restaurant['name'] + ","+ restaurant['address'])
                    e_t = float(float(plan[i]['etime']) + 0.5)
                    fractional_part = float(e_t)- int(e_t)
                    if (fractional_part> 0.60):
                        e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
                    place_data = {'name': restaurant['name'], 'rating': restaurant['rating'], 'address': restaurant['address'],'lat':restaurant['lat'],'lng':restaurant['lng'], 'stime': plan[i]['etime'], 'etime': e_t, 'ttime': rt, 'type': 'restaurant'}
                    plan.append(place_data)
                    n_available_time = float(float(n_available_time) - 0.5)
                    breakfast = 1
                if (float(e_t) > 13.00 and float(e_t) > 14.00 and  lunch == 0):
                    restaurant = find_restaurant(api_key, plan[i]['name'] + plan[i]['address'], places_between[i + 1]['name'] + places_between[i + 1]['address'])
                    rt = get_travel_time(api_key, plan[i]['name'] + plan[i]['address'], restaurant['name'] + restaurant['address'])
                    e_t = float(float(plan[i]['etime']) + 0.5)
                    fractional_part = float(e_t)- int(e_t)
                    if (fractional_part> 0.60):
                        e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
                    place_data = {'name': restaurant['name'], 'rating': restaurant['rating'], 'address': restaurant['address'],'lat':restaurant['lat'],'lng':restaurant['lng'], 'stime': plan[i]['etime'], 'etime': e_t, 'ttime': rt, 'type': 'restaurant'}
                    plan.append(place_data)
                    n_available_time = float(float(n_available_time) - 0.5)
                    lunch = 1
                if (float(e_t) > 20.00 and float(e_t) > 21.00  and dinner == 0):
                    restaurant = find_restaurant(api_key, plan[i]['name'] + plan[i]['address'], places_between[i + 1]['name'] + places_between[i + 1]['address'])
                    rt = get_travel_time(api_key, plan[i]['name'] + plan[i]['address'], restaurant['name'] + restaurant['address'])
                    e_t = float(float(plan[i]['etime']) + 0.5)
                    fractional_part = float(e_t)- int(e_t)
                    if (fractional_part> 0.60):
                        e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
                    place_data = {'name': restaurant['name'], 'rating': restaurant['rating'], 'address': restaurant['address'],'lat':restaurant['lat'],'lng':restaurant['lng'], 'stime': plan[i]['etime'], 'etime': e_t, 'ttime': rt, 'type': 'restaurant'}
                    plan.append(place_data)
                    n_available_time = float(float(n_available_time) - 0.5)
                    dinner = 1
            i += 1

        t = get_travel_time(api_key, plan[i - 2]['name'] + plan[i - 2]['address'], top_places[0]['name'] + top_places[0]['address'])
        place_data = {'name': top_places[0]['name'], 'rating': top_places[0]['rating'], 'address': top_places[0]['address'],'lat':top_places[0]['lat'],'lng':top_places[0]['lng'], 'stime': plan[i - 2]['etime'], 'ttime': t, 'type': 'travel'}
        plan.append(place_data)
    else:
        # print(top_places)
        # print(n_available_time)
        # print(end_address)
        # print("else")
        time_for_final = get_travel_time(api_key, start_address, end_address)
        e_t = float(float(start_time) + float(time_for_final))
        # print(e_t)
        place_data = {'name': top_places[0]['name'], 'rating': top_places[0]['rating'], 'address': top_places[0]['address'], 'lat':top_places[0]['lat'],'lng':top_places[0]['lng'],'stime': start_time,'etime': e_t, 'ttime': time_for_final, 'type': 'travel'}
        plan.append(place_data)
        
        if n_available_time > 0:
            if (float(e_t) > 16.30  and float(e_t)< 17.30 and tea == 0):
                restaurant = find_restaurant(api_key, plan[0]['name'] + ","+ plan[0]['address'],start_address)
                # print("rest",restaurant)
                rt = get_travel_time(api_key, plan[0]['name'] + plan[0]['address'], restaurant['name'] + restaurant['address'])
                e_t = float(float(plan[0]['etime']) + 0.5)
                fractional_part = float(e_t)- int(e_t)
                if (fractional_part> 0.60):
                    e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
                place_data = {'name': restaurant['name'], 'rating': restaurant['rating'], 'address': restaurant['address'],'lat':restaurant['lat'],'lng':restaurant['lng'], 'stime': plan[i]['etime'], 'etime': e_t, 'ttime': rt, 'type': 'restaurant'}
                plan.append(place_data)
                n_available_time = float(float(n_available_time) - 0.5)
                tea = 1
            if (float(e_t) > 9 and float(e_t)<10  and breakfast == 0):
                restaurant = find_restaurant(api_key, plan[0]['name'] + ","+ plan[0]['address'],start_address)
                rt = get_travel_time(api_key, plan[0]['name'] + plan[0]['address'], restaurant['name'] + restaurant['address'])
                e_t = float(float(plan[0]['etime']) + 0.5)
                fractional_part = float(e_t)- int(e_t)
                if (fractional_part> 0.60):
                    e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
                place_data = {'name': restaurant['name'], 'rating': restaurant['rating'], 'address': restaurant['address'],'lat':restaurant['lat'],'lng':restaurant['lng'], 'stime': plan[i]['etime'], 'etime': e_t, 'ttime': rt, 'type': 'restaurant'}
                plan.append(place_data)
                n_available_time = float(float(n_available_time) - 0.5)
                breakfast = 1
            if (float(e_t) > 13.00 and float(e_t) > 14.00 and  lunch == 0):
                restaurant = find_restaurant(api_key, plan[0]['name'] + ","+ plan[0]['address'],start_address)
                rt = get_travel_time(api_key, plan[0]['name'] + plan[0]['address'], restaurant['name'] + restaurant['address'])
                e_t = float(float(plan[0]['etime']) + 0.5)
                fractional_part = float(e_t)- int(e_t)
                if (fractional_part> 0.60):
                    e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
                place_data = {'name': restaurant['name'], 'rating': restaurant['rating'], 'address': restaurant['address'],'lat':restaurant['lat'],'lng':restaurant['lng'], 'stime': plan[i]['etime'], 'etime': e_t, 'ttime': rt, 'type': 'restaurant'}
                plan.append(place_data)
                n_available_time = float(float(n_available_time) - 0.5)
                lunch = 1
            if (float(e_t) > 20.00 and float(e_t) > 21.00  and dinner == 0):
                restaurant = find_restaurant(api_key, plan[0]['name'] + ","+ plan[0]['address'],start_address)
                rt = get_travel_time(api_key, plan[0]['name'] + plan[0]['address'], restaurant['name'] + restaurant['address'])
                e_t = float(float(plan[0]['etime']) + 0.5)
                fractional_part = float(e_t)- int(e_t)
                if (fractional_part> 0.60):
                    e_t = float(int(e_t)+1.00)+(fractional_part-0.60)
                place_data = {'name': restaurant['name'], 'rating': restaurant['rating'], 'address': restaurant['address'],'lat':restaurant['lat'],'lng':restaurant['lng'], 'stime': plan[i]['etime'], 'etime': e_t, 'ttime': rt, 'type': 'restaurant'}                
                plan.append(place_data)
                n_available_time = float(float(n_available_time) - 0.5)
                dinner = 1
    for i in range(len(plan)):
        plan[i]['description'] = description_prompt_maker(plan[i]['name']+plan[i]['address'])
    for i in range(len(plan)):
        plan[i]['pic']=get_place_photo(api_key, plan[i]['name']+","+plan[i]['address'])           
       
    unique_addresses = set()
    unique_data = []

    for item in plan:
        address = item['address']
        if address not in unique_addresses:
            unique_data.append(item)
            unique_addresses.add(address)
    return unique_data
    
    




