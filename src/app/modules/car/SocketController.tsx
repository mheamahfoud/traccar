import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { sessionActions, truckPathActions } from "../../../store";

import { useEffectAsync } from "../../../reactHelper";
import { checkArriveNextStation, checkNearTerminal } from "./services/measure";
import { TerminalType, CoordDistance, Coordinate } from "./core/_models";
import { useAuth } from "../auth";




const logoutCode = 4000;

const SocketController = () => {
  const dispatch = useDispatch();
  const checkInitPath = useRef(true);
  const {currentUser}= useAuth()
  const stations = useSelector((state: any) => state.devices.stations);
  const currentDevice = useSelector((state: any) => state.devices.currentDevice);
  const socketRef = useRef<any>();

  const currentPosition: Coordinate = useSelector((state: any) => state.truckPath.currentPosition);
  const speed = useSelector((state: any) => state.truckPath.speed);


  const nextTerminal: TerminalType = useSelector((state: any) => state.truckPath.nextTerminal);

  useEffect(() => {

    if (currentPosition?.latitude != 0 && speed > 0 && nextTerminal?.latitude!=0) {
   //   alert(speed)
      let obj: CoordDistance = {
        currentLat: currentPosition.latitude,
        currentLon: currentPosition.longitude,
        goalLat: nextTerminal.latitude,
        goalLon: nextTerminal.longitude,
      }
      dispatch(checkArriveNextStation(obj))
    }
  }, [dispatch, currentPosition?.latitude, currentPosition?.longitude, speed,nextTerminal?.id]);

  const connectSocket = () => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    // const socket = new WebSocket(
    //   `${protocol}//${window.location.host}/api/socket`
    // );
  const socket = new WebSocket(`${process.env.REACT_APP_TRUCKGPS_SOCKET_URL}`);

    socketRef.current = socket;

    socket.onopen = () => {
      dispatch(sessionActions.updateSocket(true));
    };

    socket.onclose = async (event) => {
      dispatch(sessionActions.updateSocket(false));
      if (event.code !== logoutCode) {
        try {
        } catch (error) {
          // ignore errors
        }
        setTimeout(() => connectSocket(), 60000);
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.positions) {
        let temp = data.positions.filter(
          (x: any) => x.deviceId == currentDevice
        );
 
        if (temp && temp.length > 0) {
          if (checkInitPath.current) {
            dispatch(checkNearTerminal(
              {
                stations: stations,
                currentPos: [temp[0]?.longitude, temp[0]?.latitude]
              }
            ))
            checkInitPath.current = false;
          }
          else {
            dispatch(truckPathActions.updateSpeed(temp[0].speed));
            dispatch(
              truckPathActions.updateCurrentPosition({
                latitude: temp[0]?.latitude,
                longitude: temp[0]?.longitude,
              }))
          }
          dispatch(sessionActions.updatePositions(temp));
        }

      }

    };
  };



  useEffectAsync(async () => {
    connectSocket();
    return () => {
      const socket = socketRef.current;
      if (socket) {
        socket.close(logoutCode);
      }
    };


  }, []);



  return (
    <>
    </>
  );
};

export default connect()(SocketController);
