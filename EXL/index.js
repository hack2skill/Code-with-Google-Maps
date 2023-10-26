const express = require('express');
const axios = require('axios')
const cors = require('cors')
const app = express();
const ical = require('ical-generator');
const moment = require('moment');

const PORT = 5000;
let vec_copy = []
app.use(cors());
const {tsp_main, tsp_main1, reformat_vec, generate_ics} = require('./utils')
const dummy_response = {data: {
    "results": [
        {
            "search_id": "place0",
            "locations": [
                {
                    "id": "place1",
                    "properties": [
                        {
                            "travel_time": 880,
                            "distance": 3511
                        }
                    ]
                },
                {
                    "id": "place0",
                    "properties": [
                        {
                            "travel_time": 0,
                            "distance": 0
                        }
                    ]
                },
                {
                    "id": "place2",
                    "properties": [
                        {
                            "travel_time": 676,
                            "distance": 2508
                        }
                    ]
                }
            ],
            "unreachable": []
        },
        {
            "search_id": "place1",
            "locations": [
                {
                    "id": "place1",
                    "properties": [
                        {
                            "travel_time": 0,
                            "distance": 0
                        }
                    ]
                },
                {
                    "id": "place0",
                    "properties": [
                        {
                            "travel_time": 795,
                            "distance": 2762
                        }
                    ]
                },
                {
                    "id": "place2",
                    "properties": [
                        {
                            "travel_time": 1086,
                            "distance": 3278
                        }
                    ]
                }
            ],
            "unreachable": []
        },
        {
            "search_id": "place2",
            "locations": [
                {
                    "id": "place1",
                    "properties": [
                        {
                            "travel_time": 1192,
                            "distance": 4331
                        }
                    ]
                },
                {
                    "id": "place0",
                    "properties": [
                        {
                            "travel_time": 756,
                            "distance": 2955
                        }
                    ]
                },
                {
                    "id": "place2",
                    "properties": [
                        {
                            "travel_time": 0,
                            "distance": 0
                        }
                    ]
                }
            ],
            "unreachable": []
        }
    ]
}}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/', async(req,res)=>{

    try{
        console.log(req.body);

      // req.body contains- array of {name of place (id), coords[2]}
      //function generates dist(nxn)- no floyd warshall needed

      let departure_searches = []
      let dict = {}, rev_dict = {}, z_dict = {}
      for(let i=0;i<req.body.length; i++){

        dict[req.body[i].id] = i;
        rev_dict[i] = req.body[i].id;
        z_dict[i] = req.body[i].z;

        let arrival_location_ids = []
        for(let i=0;i<req.body.length;i++) arrival_location_ids.push(req.body[i].id);

        departure_searches.push({
          "id": req.body[i].id,
          "departure_location_id": req.body[i].id,
          "arrival_location_ids": arrival_location_ids,
          "transportation": {
              "type": "driving"
          },
          "departure_time": "2021-09-21T08:00:00Z",
          "travel_time": 3600,
          "properties": [
            "travel_time",
            "distance"
          ]
        })
      }

      const reqobject = {
        "locations": req.body,
        "departure_searches": departure_searches
      }

      let matrix_array = await axios({
        method: 'post',
        url: 'https://api.traveltimeapp.com/v4/time-filter',
        headers: {
          'X-Application-Id': '5543f7a8',
          'X-Api-Key': '1bcfbbc477ebcf6ed375498554b2ed75'
        },
        data: reqobject
      });
      // let matrix_array = dummy_response;

      const n = matrix_array.data.results.length

      let dist = new Array(n)
      for(let i=0;i<matrix_array.data.results.length;i++) dist[i]=new Array(n);
      for(let i=0;i<matrix_array.data.results.length;i++){
        let u=dict[matrix_array.data.results[i].search_id];
        for(let j=0;j<matrix_array.data.results[i].locations.length;j++){
          let v=dict[matrix_array.data.results[i].locations[j].id];
          if(dist[u] && dist[u][v]) continue;
          dist[u][v]=matrix_array.data.results[i].locations[j].properties[0].travel_time;
          dist[v][u]=matrix_array.data.results[i].locations[j].properties[0].travel_time;
        }
      }

      let arr = []
      for(let i=0;i<req.body.length;i++){
        let temparr = [req.body[i].start, req.body[i].end, req.body[i].z];
        arr.push(temparr);
      }

      let {ans, vec} = tsp_main1(dist, arr);

      vec = reformat_vec(vec, dist, rev_dict, z_dict);
      vec_copy = vec;
      // generate_ics(vec, z_dict);

      res.json({ans, vec});
    }
    catch(err){
        res.json({err})
    }
})

app.get('/calendar', (req,res)=>{

    try{
      let events_arr = []
      for(let i=0;i<vec_copy.length;i++){
        events_arr.push({
          start: vec_copy[i].start,
          end: vec_copy[i].end,
          location: vec_copy[i].name
        })
      }

      const cal = ical({
        events: events_arr
      });

      cal.serve(res);
    }
    catch(err){
        res.json({err})
    }
})

app.listen(PORT, ()=>{
  console.log('hi')
})