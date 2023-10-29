
import googlemaps
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

a='AIzaSyCOnOQkks'
b='_tDZEubzMLfkTr'
c='a9E1R5oC7-4'
gmaps = googlemaps.Client(key=a+b+c)

def get_popular_places(cords, place_type, place_name='', radius=1500, rankby='prominence'):
    """
    Function to get popular places with their details based on coordinates.

    Args:
        lat (float): Latitude of the location.
        lng (float): Longitude of the location.
        radius (int, optional): Search radius in meters. Defaults to 1500 meters.
        place_type (str, optional): Type of place to search for. Defaults to 'restaurant'.
        rankby (str, optional): Specifies the ranking method. Defaults to 'prominence'.

    Returns:
        list: List of dictionaries containing place details.
    """
    places = gmaps.places_nearby(location=cords, radius=radius, type=place_type, rank_by=rankby)

    places_details = []

    for place in places['results']:
        place_id = place['place_id']
        details = gmaps.place(place_id, fields=['name', 'rating', 'user_ratings_total', 'geometry'])
        distance = gmaps.distance_matrix(origins=cords, destinations=(details['result']['geometry']['location']['lat'], details['result']['geometry']['location']['lng']))['rows'][0]['elements'][0]['distance']['value']
        try:
          place_details = {
              'name': details['result']['name'],
              'rating': details['result']['rating'],
              'user_ratings_total': details['result']['user_ratings_total'],
              'coordinates': details['result']['geometry']['location'],
              'distance': 1 if distance==0 else distance
          }
        except:
          place_details = {
            'name': details['result']['name'],
            'rating': 0.1,
            'user_ratings_total': 0.1,
            'coordinates': details['result']['geometry']['location'],
            'distance': 1 if distance==0 else distance
        }
        places_details.append(place_details)

    # Rank places based on rating and number of reviews
    places_details.sort(key=lambda x: (x['rating'], x['user_ratings_total']), reverse=True)

    return places_details



call=[(11.3599, 75.9129),(11.3215, 75.9953),(11.3049, 75.8771),('restaurant','medium','Calicut')]

def dist(a):
	if a>0:return a
	return 1
ranks=[]
def get_rank(coordinates,type_,size):
  error=[]
  if size=='large':
    size=2000
  elif size=='medium':
    size=1000
  elif size=='small':
    size=500
  ranks=[]
  compsd=[]
  compsr=[]
  comp_details={}
  for c in coordinates:

    rank=0
    weight=0
    compd=0
    compr=0
    try:
      competitors=get_popular_places(c, place_type=type_, radius=size)
    except Exception as e:
      print(e)
      error.append(c)
      continue
      
    #to get few compepitors to put in map we find competitors above average weight
    avg_weight=sum([b['rating']*b['user_ratings_total']/dist(b['distance']) for b in competitors])/len(competitors)
	
    for b in competitors:
      #print(b)
      weight = b['rating']*b['user_ratings_total']/b['distance']
      if weight>avg_weight*.9:
      	comp_details[b['name']]=[b['coordinates'],weight]
      compd+=b['distance']
      compr+=b['rating']*b['user_ratings_total']
      
      rank=rank+weight
    ranks.append(rank)
    compsd.append(compd)
    compsr.append(compr)
  #print(ranks)
  
  
  l = len(ranks)
  newl = ranks.copy()
  newl.sort()
  ranks = [newl.index(i)+1 for i in ranks]
  ranks=[l+1-i for i in ranks]

  #print(ranks)
  print(compsd)
  print(compsr)
  compsd_avg=sum(compsd)/len(compsd)
  for i in range(len(compsd)):
    if compsd[i]<(compsd_avg*80/100):
      compsd[i]='relatively more competitors closely'
    elif compsd[i]==0:
      compsd[i]='make sure place got enough population density'
    else:
      compsd[i]=''
  compsr_avg=sum(compsr)/len(compsr)
  for i in range(len(compsr)):
    if compsr[i]>(compsr_avg*120/100):
      compsr[i]='comparatively good competitors in this area'
    elif compsr[i]==0:
      compsr[i]='make sure place got enough population density'
    else:
      compsr[i]=''
  #print(compsd)
  #print(compsr)
  for i in error:
    ind=call.index(c)
    ranks.insert(ind,'error')
    compsd.insert(ind,'error')
    compsr.insert(ind,'error')

  return {'rank':ranks,'observation1':compsd,'observation2':compsr,'competitors':comp_details}


app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/')
def hello_world():
    return 'Hello frram Flask!'

@app.route('/test',methods=['POST','GET'])
def main():
	if request.method=='POST':
		print('api called')

		data = request.form.get('cords')
		data=[float(i) for i in data.split(',')]
		cords=[(data[i],data[i+1]) for i in range(0,len(data),2)]

		type_=request.form.get('type')
		size=request.form.get('size')

		result=get_rank(cords,type_,size)
		print(result)
		return jsonify(result)
	return 'Provide query'
	
    
if __name__ == '__main__':
    
    app.run(debug=True)
