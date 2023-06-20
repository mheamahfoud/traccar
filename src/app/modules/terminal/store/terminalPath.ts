
import { createSlice } from '@reduxjs/toolkit';
import { TerminalPath, deviceLocation } from '../core/_models';
import { checkArrivedDevices } from '../services/measure';


const initialState: TerminalPath = {
    loading: true,
    terminalLoc: {
        lat: 0,
        lon: 0
    },
    terminalInfo: {},
    devices: [],
    devicesLocaton: {},
    devicesStatus: {},
    deviceDistance: {},
    checkArriveTerminal: false,
}


const { reducer, actions } = createSlice({
    name: 'terminalPath',
    initialState,
    reducers: {
        setDevices(state, action) {
            let terminal = action.payload?.terminal;
            //set devices of terminal
            state.devices = action.payload?.devices;
            //set status of devices
            action.payload?.devices?.forEach((item: any) => state.devicesStatus[item] = false);
            //set terminal info
            if (terminal?.length > 0) {
                state.terminalInfo = terminal[0];
                state.terminalLoc = {
                    lat: terminal[0].latitude,
                    lon: terminal[0].longitude,
                }
            }
            state.loading = false;
        },
        updateDeviceLocation(state, action) {
            action.payload.forEach((item: any) => {
                let loc: deviceLocation = {
                    lat: item.latitude,
                    lon: item.longitude,
                    speed: item.speed,
                }
                state.devicesLocaton[item.deviceId] = loc
            })
        },
        updateArriveTerminal(state, action) {
            state.checkArriveTerminal = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(checkArrivedDevices.pending, (state) => {
        })
        builder.addCase(checkArrivedDevices.fulfilled, (state, { payload }) => {
            state.deviceDistance = payload;
            Object.keys(payload)?.map((key, index) => {
                if (payload[key]?.distance < 100) {
                    state.checkArriveTerminal = true;
                }
            })
            //state.error = payload
            //state.loading = false
        })

        builder.addCase(checkArrivedDevices.rejected, (state, { payload }) => {
            //state.error = payload
            //state.loading = false
        })







    }
});

export { actions as terminalPathsActions };
export { reducer as terminalPathReducer };


// {
//     loading: false,
//     devices:[],
//     // stationPosition: {},
//     // staionDevices: [],
//     // devicesDistance: [],
//     // devicesLocation: [],
//     // checkArrive: false,

// },