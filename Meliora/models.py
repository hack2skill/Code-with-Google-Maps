from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Road(db.Model):
    Road_id = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(50), nullable = False)
    Long = db.Column(db.Float, nullable = False)
    Lat = db.Column(db.Float, nullable = False)
    S_veh = db.Column(db.Integer, nullable = False)
    Car = db.Column(db.Integer, nullable = False)
    B_veh = db.Column(db.Integer, nullable = False)
    Acc_ind = db.Column(db.Integer, nullable = False)


    def get_id(self):
        return str(self.Road_id)
