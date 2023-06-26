import { createSlice } from '@reduxjs/toolkit'
import { TerminalPath, deviceLocation } from '../core/_models'
import { checkArrivedDevices } from '../services/measure'

enum StatusArrive {
  Arrived = 1,
  NotArrived = 2,
}
const initialState: TerminalPath = {
  loading: true,
  terminalLoc: {
    lat: 0,
    lon: 0,
  },
  terminalInfo: {},
  devices: [],
  devicesLocaton: {},
  deviceDistance: {},
  deviceStatus: [],
  checkArriveTerminal: false,
}

const { reducer, actions } = createSlice({
  name: 'terminalPath',
  initialState,
  reducers: {
    setDevices(state, action) {
      let terminal = action.payload?.terminal
      state.devices = action.payload?.devices?.map((x) => x.id)
      console.log('action.payload?.devices')
      console.log(action.payload?.devices)
      if (terminal?.length > 0) {
        state.terminalInfo = terminal[0]
        state.terminalLoc = {
          lat: terminal[0].latitude,
          lon: terminal[0].longitude,
        }
      }

      action.payload?.devices?.forEach((item: any) => {
        state.deviceDistance[item?.id] = {
          name: item.name,
          deviceId: item?.id,
          status: StatusArrive.NotArrived,
        }
      })

      state.loading = false
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
      state.checkArriveTerminal = action.payload
      state.devices?.forEach((item: any) => {
        state.deviceDistance[item] = {
          ...state.deviceDistance[item][item],
          status: StatusArrive.NotArrived,
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkArrivedDevices.pending, (state) => { })
    builder.addCase(checkArrivedDevices.fulfilled, (state, { payload }) => {
      var temp = payload
      if (temp) {
        var deviceStatus = [];
        var deviceDistance = state.deviceDistance
        Object.keys(temp)?.map((key, index) => {
          deviceDistance[temp[key]?.deviceId] = {
            index: index,
            ...deviceDistance[temp[key]?.deviceId],
            distance: temp[key]?.distance,
            duration: temp[key]?.duration,
            //  status: StatusArrive.NotArrived,
          }
          if (temp[key]?.distance < 50 && temp[key]?.status != StatusArrive.Arrived) {
            state.checkArriveTerminal = true
            deviceDistance[temp[key]?.deviceId] = {
              ...deviceDistance[temp[key]?.deviceId],
              status: StatusArrive.Arrived,
            }


          }
        })

        Object.keys(deviceDistance)?.map((key, index) => {
          deviceStatus.push(deviceDistance[key])
        })
        state.deviceStatus = deviceStatus.sort((a, b) => {
          return a.index - b.index;
        });
      }



    })

    builder.addCase(checkArrivedDevices.rejected, (state, { payload }) => {
      //state.error = payload
      //state.loading = false
    })
  },
})

export { actions as terminalPathsActions }
export { reducer as terminalPathReducer }

// {
//     loading: false,
//     devices:[],
//     // stationPosition: {},
//     // staionDevices: [],
//     // devicesDistance: [],
//     // devicesLocation: [],
//     // checkArrive: false,

// },
