from flask import Flask, render_template, request, redirect, url_for, jsonify
from models import *

# ============================ Configuration ============================

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///LibraryData.sqlite3"
app.config['SECRET_KEY'] = "MyLibrary"

db.init_app(app)
app.app_context().push()

# =======================================================================

@app.route('/', methods=['GET','POST'])
def index():
    msg01 = request.args.get('msg01')
    msg02 = request.args.get('msg02')
    return render_template('index.html', msg01 = msg01, msg02 = msg02)

@app.route('/vote', methods=['POST'])
def vote():
    vote = request.form.get('vote')
    title = request.form.get('selected-route')

    r = Road.query.filter_by(Title=title).first()
    
    if r:
        if vote == 'small-vehicle':
            r.S_veh = r.S_veh + 1
            db.session.commit()
        if vote == 'car':
            r.Car = r.Car + 1
            db.session.commit()
        if vote == 'big-vehicle':
            r.B_veh = r.B_veh + 1
            db.session.commit()
    # return f"{vote} & {title}"
    return redirect(url_for('index', msg01=1))

@app.route('/add_marker', methods=['GET', 'POST'])
def add_marker():
    if request.method == 'GET':
        return render_template('add_marker.html')
    if request.method == 'POST':
        title = request.form.get('title')
        long = float(request.form.get('long'))
        lat = float(request.form.get('lat'))
        ind = request.form.get('ind')
        flag = 0
        if ind == "yes":
            flag = 1
        r = Road(Title = title, Long = long, Lat = lat, Acc_ind = flag, S_veh = 0, Car = 0, B_veh = 0)
        db.session.add(r)
        db.session.commit()
        return redirect(url_for('index', msg02=1))


@app.route('/api/road_details/<title>', methods = ['GET'])
def road_details(title):
    try:
        r = Road.query.filter_by(Title = title).first()
        m = max(r.S_veh, r.Car, r.B_veh)
        flag = ""
        if r.Acc_ind == 1:
            flag = "The region is accident-prone"
        msg = ''
        if m == 0:
            msg = "This road is not voted yet."
        elif m == r.S_veh and m == r.Car and m == r.B_veh:
            msg = "This road is voted to be suitable for all size of vehicles"
        elif m == r.S_veh == r.Car:
            msg = "This road is voted to be suitable for a car and smaller vehicles"  
        elif m == r.B_veh == r.Car:
            msg = "This road is voted to be suitable for a car as well as big vehicles"
        elif m == r.B_veh == r.Car:
            msg = "This road is voted to be suitable for a small as well as big vehicles- compartively less suitable for cars"
        elif m == r.S_veh:
            msg = "This road is voted to be suitable for smaller vehicles"
        elif m == r.Car:
            msg = "This road is voted to be suitable for a car"
        elif m == r.B_veh:
            msg = "This road is voted to be suitable for big vehicles"
        send = [msg, flag]
        return jsonify(send), 201
        
    except Exception as e:
        msg = 'An error occured'
        return jsonify([msg, flag])
    
@app.route('/api/markers', methods = ['GET'])
def markers():
    roads = Road.query.all()
    roads_data = [{
            'Title': road.Title,
            'Long': road.Long,
            'Lat': road.Lat,
        }
        for road in roads]
    return jsonify(roads_data)

if __name__ == '__main__':
    app.run()