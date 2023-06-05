import { VpnLock } from "@mui/icons-material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CoordDistance } from "../core/_models";
const accessToken ="pk.eyJ1IjoicmloYWEiLCJhIjoiY2pzZDBlNjNjMDVnNDQ5dGhoNW5teXExbiJ9.YUqVQBbawc44VFKVwaXw0w"// process.env.ACCESSTOKEN;
const API_URL ="https://api.mapbox.com/directions/v5/mapbox/driving"// process.env.MAP_URL;


export const checkNearStation : any = createAsyncThunk(
  "checkNearStation",
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

      //set duration between stations
      // for (var i = 0; i < stations.length; i++) {

      //   if (i == stations.length - 1) {
      //     const sourceLoc = [stations[i]?.longitude, stations[i]?.latitude];
      //     const destLoc = [stations[0]?.longitude, stations[0]?.latitude];

      //     const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLoc[0]},${sourceLoc[1]};${destLoc[0]},${destLoc[1]}?annotations=duration&access_token=${accessToken}`;
      //     const response = await fetch(apiUrl);

      //     const tem = await response.json();

      //     durationStation[stations[i].id] = tem.routes[0].duration;

      //   }
      //   else {
      //     const sourceLoc = [stations[i]?.longitude, stations[i]?.latitude];
      //     const destLoc = [stations[i + 1]?.longitude, stations[i + 1]?.latitude];

      //     const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLoc[0]},${sourceLoc[1]};${destLoc[0]},${destLoc[1]}?annotations=duration&access_token=${accessToken}`;
      //     const response = await fetch(apiUrl);

      //     const tem = await response.json();
      //     durationStation[stations[i].id] = tem.routes[0].duration;
      //   }


      // }
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








// export const checkDeviceDistanceByStation = createAsyncThunk(
//   "checkDeviceDistanceByStation",
//   async (values :any, thunkAPI) => {
//     try {

//       var devicseLoc = values.devicseLoc;
//       var stationLoc = values.stationLoc
//       // Return the sorted array of objects
//       var tempLoc = [];
//       for (var i = 0; i < devicseLoc.length; i++) {
//         const lat = devicseLoc[i]?.lat;
//         const lon = devicseLoc[i]?.lon;
//         const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${stationLoc.lon},${stationLoc.lat};${lon},${lat}?annotations=duration&access_token=${accessToken}`;
//         const response = await fetch(apiUrl);

//         const tem = await response.json();
//         const distance = tem.routes[0].distance
//         const duration = tem.routes[0].duration;
//         //alert(devicseLoc[i].deviceId)
//         tempLoc.push({
//           id: devicseLoc[i].deviceId,
//           distance: distance,
//           duration: duration //calculateDuration(distance, devicseLoc[i]?.speed )

//         })

//       }

//       tempLoc.sort((a, b) => a.distance - b.distance);
//       return tempLoc;


//     } catch {
//       thunkAPI.rejectWithValue("There is Error");
//     }
//   }
// );
