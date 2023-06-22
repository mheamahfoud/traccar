
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
    deviceTemp: []
}


const { reducer, actions } = createSlice({
    name: 'terminalPath',
    initialState,
    reducers: {
        setDevices(state, action) {
            let terminal = action.payload?.terminal;
            //set devices of terminal
            state.deviceTemp = action.payload?.devices;
            state.devices = action.payload?.devices?.map((x) => x.id);
            console.log('action.payload?.devices')
            console.log(action.payload?.devices)
            //set status of devices
            action.payload?.devices?.forEach((item: any) => state.devicesStatus[item?.id] = false);
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

            // for (const key in state.devicesStatus) {
            //     if (state.devicesStatus.hasOwnProperty(key)) {
            //         state.devicesStatus[key] = false;
            //     }
            // }
            state.checkArriveTerminal = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(checkArrivedDevices.pending, (state) => {
        })
        builder.addCase(checkArrivedDevices.fulfilled, (state, { payload }) => {

            //  state.deviceDistance = payload;
            var temp = payload
            Object.keys(temp)?.map((key, index) => {
                // alert(JSON.stringify( Object.keys(temp)))
                // alert(JSON.stringify(state.deviceTemp.map(x=>x.id)))
                temp[key] = { ...temp[key], name: state.deviceTemp.find(x => x.id == temp[key]?.deviceId)?.name }
                if (temp[key]?.distance < 50 && !state.devicesStatus[temp[key]?.deviceId]) {
                    state.checkArriveTerminal = true;
                    state.devicesStatus[temp[key]?.deviceId] = true;
                    for (const key1 in state.devicesStatus) {
                     //   alert(key == temp[key]?.deviceId)
                        if (state.devicesStatus.hasOwnProperty(key1) && key1 != temp[key]?.deviceId) {
                            state.devicesStatus[key] = false;
                        }
                    }

                }
            })

            state.deviceDistance = temp;

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