from flask import *
import finaltest
app=Flask(__name__)

@app.route("/text",methods=['POST'])
def index():
    transcribed_txt=request.json["text"]
    start_address=request.json["address"]
    lat=float(request.json["latitude"])
    lng=float(request.json["longitude"])
    r=finaltest.text_evaluator_prompt_maker(transcribed_txt, start_address, lat, lng)
    return({"result":r})



if __name__=="__main__":
    app.run(debug=True,port=6000)