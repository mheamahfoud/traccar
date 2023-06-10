import axios from "axios"
import { LiveStreamModel } from "./models";

const API_BASE_URL = process.env.REACT_APP_HIKECENTRAL_API_URL;
const API_KEY = process.env.REACT_APP_HIKECENTRAL_SITE_KEY;
const CAMERA_INDEX = process.env.REACT_APP_HIKECENTRAL_CAMERA_INDEX;
const getLiveStream = (): Promise<LiveStreamModel> => {
      //   const response: any =  fetch(`${API_BASE_URL}/artemis/api/video/v2/cameras/previewURLs`, {
      //   method: "POST",
      //   body: new URLSearchParams(
      //     `email=${encodeURIComponent(
      //       "admin"
      //     )}&password=${encodeURIComponent("Hik@12345")}`
      //   ),
      // });
      // return response

    return axios
        .post(
           `${API_BASE_URL}/artemis/api/video/v2/cameras/previewURLs`,
   
            {
                "cameraIndexCodes": "1",
                "streamType": 0,
                "protocol": "rstp",
                "transmode": 1,
                // "username": 'admin',
                // "password": 'Hik@12345',
                // Replace with the index code(s) of your camera(s)
            },
            // {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Token': API_KEY,
            //     },
            // }
        ).then((response: any) => {
            return response
        })
}


export { getLiveStream }