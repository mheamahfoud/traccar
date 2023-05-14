import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { sessionActions, terminalPathsActions, truckPathActions } from "../../../store";

import { isObjectEmpty, useEffectAsync } from "../../../reactHelper";
import { checkArrivedDevices } from "./services/measure";
import { TerminalType, CoordDistance, Coordinate } from "./core/_models";




const logoutCode = 4000;

const SocketController = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state: any) => state.terminalPath.devices);
  const terminalLoc: Coordinate = useSelector((state: any) => state.terminalPath.terminalLoc);
  const devicesLocaton: Coordinate = useSelector((state: any) => state.terminalPath.devicesLocaton);

  const socketRef = useRef<any>();





  useEffect(() => {
    //  alert(JSON.stringify(currentPosition))
    if (!isObjectEmpty(devicesLocaton) && !isObjectEmpty(terminalLoc)) {
      dispatch(checkArrivedDevices(
        {
          devicesLocaton,
          terminalLoc
        }
      ))
    }
  }, [dispatch, devicesLocaton]);

  const connectSocket = () => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

    const socket = new WebSocket(
      `${protocol}//${window.location.host}/api/socket`
    );
    //const socket = new WebSocket("ws://173.249.51.233:8082/api/socket");

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
          (x: any) => devices.includes(x.deviceId)
        );
        if (temp && temp.length > 0) {
          dispatch(terminalPathsActions.updateDeviceLocation(temp))
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
