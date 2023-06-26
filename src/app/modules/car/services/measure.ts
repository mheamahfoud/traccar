import { createAsyncThunk } from "@reduxjs/toolkit";
import { CoordDistance } from "../core/_models";
const accessToken =process.env.REACT_APP_ACCESSTOKEN ;//"pk.eyJ1IjoicmloYWEiLCJhIjoiY2pzZDBlNjNjMDVnNDQ5dGhoNW5teXExbiJ9.YUqVQBbawc44VFKVwaXw0w"// process.env.REACT_APP_ACCESSTOKEN;
const API_URL =process.env.REACT_APP_MAP_URL ;//"https://api.mapbox.com/directions/v5/mapbox/driving"// process.env.MAP_URL;


export const checkNearTerminal : any = createAsyncThunk(
  "checkNearTerminal",
  async (values :any , thunkAPI?:any) => {
    try {

      var stations = values.stations;
      var currentPos = values.currentPos;


      let closestCoord = null;
     // let duration = {};
      let durationStation = {};
      let distanceStation = {};
      let closestDistance = Infinity;
      for (var i = 0; i < stations.length; i++) {

        const lat = stations[i]?.latitude;
        const lon = stations[i]?.longitude;


        const apiUrl = `${API_URL}/${currentPos[0]},${currentPos[1]};${lon},${lat}?annotations=duration&access_token=${accessToken}`;
        const response = await fetch(apiUrl);

        const tem = await response.json();
        const distance = tem.routes[0].distance

        distanceStation[stations[i].id] = distance;
        durationStation[stations[i].id] = tem.routes[0].duration;
        if (distance < closestDistance) {
          closestCoord = stations[i];
          closestDistance = distance;

        }

      }

     
      return {
        closestCoord: closestCoord,
        durationStation: durationStation,
      //  durationStation: durationStation,
        distanceStation: distanceStation
      };

    } catch {
      thunkAPI.rejectWithValue("There is Error");
    }
  }
);



export const checkArriveNextStation  : any = createAsyncThunk(
  "checkArriveNextStation",
  async (coordinates : CoordDistance, thunkAPI) => {
    try {
      const apiUrl = `${API_URL}/${coordinates.currentLon},${coordinates.currentLat};${coordinates.goalLon},${coordinates.goalLat}?annotations=duration&access_token=${accessToken}`;
      const response = await fetch(apiUrl);
      return await response.json()
    } catch {
      thunkAPI.rejectWithValue("There is Error");
    }
  }
);


