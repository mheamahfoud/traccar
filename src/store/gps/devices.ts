import { createSlice } from '@reduxjs/toolkit'

import { GetCurrentDevice, GetCurrentTerminal, GetStationInfo } from '../../services/traccargps'
import { stat } from 'fs'
import { object } from 'yup'
import { isEmptyObject } from 'jquery'

interface deviceState {
  loading: boolean
  stations: any
  items: any
  selectedId: any
  selectedIds: any
  stationDevices: any
  currentDevice: any
  error: any
}
const initialState: deviceState = {
  loading: true,
  stations: [],
  items: {},
  selectedId: null,
  selectedIds: [],
  currentDevice: {},
  stationDevices: [],
  error: '',
}

const { reducer, actions } = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    refresh(state, action) {
      alert(JSON.stringify(action.payload))
      state.items = {}
      action.payload.forEach((item) => (state.items[item.id] = item))
      state.loading = false
    },
    update(state, action) {
      action.payload.forEach((item) => (state.items[item.id] = item))
      //
    },
    select(state, action) {
      state.selectedId = action.payload
    },
    selectId(state, action) {
      state.selectedId = action.payload
      state.selectedIds = state.selectedId ? [state.selectedId] : []
    },
    selectIds(state, action) {
      state.selectedIds = action.payload
        ;[state.selectedId] = state.selectedIds
    },
    remove(state, action) {
      delete state.items[action.payload]
    },
    initStations(state, action) {
      state.stations = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetCurrentDevice.pending, (state) => { })

    builder.addCase(GetCurrentDevice.fulfilled, (state, { payload }) => {
      let data = payload
      state.items = {}
      if (payload?.length > 0) {
        state.stations = payload[0].terminal
        //  payload[0].devices.forEach((item) => (state.items[item.id] = item))
        if (Array.isArray(payload[0].devices)) {
          payload[0].devices.forEach((item) => (state.items[item.id] = item))
        } else {
          state.items[payload[0].devices?.id] = payload[0].devices
        }
        if (Object.keys(state.items).length > 0)
          state.currentDevice = parseInt(Object.keys(state.items)[0])
      }
      // state.loading = false
    })

    builder.addCase(GetCurrentDevice.rejected, (state, { payload }) => {
      state.error = payload
    })

    builder.addCase(GetStationInfo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(GetCurrentTerminal.fulfilled, (state, { payload }) => {
      let data = payload;
      state.items = {}
      if (payload?.length > 0) {
        state.stations = payload[0].terminal;
        //  payload[0].devices.forEach((item) => (state.items[item.id] = item))
        if (payload[0].devices) {
          if (Array.isArray(payload[0].devices)) {
            payload[0].devices.forEach((item) => (state.items[item.id] = item))
          } else {
            state.items[payload[0].devices?.id] = payload[0].devices
          }
          if (Object.keys(state.items).length > 0)
            state.currentDevice = parseInt(Object.keys(state.items)[0])
        }
        else {
          let devices = [{ "id": 6, "attributes": [], "groupId": 0, "name": "RUH-01", "uniqueId": "863540060245173", "status": "unknown", "lastUpdate": "2023-05-24T10:06:27.000+00:00", "positionId": 1268292, "geofenceIds": null, "phone": null, "model": "", "contact": null, "category": "bus", "disabled": false, "expirationTime": null }, { "id": 2, "attributes": [], "groupId": 0, "name": "Mudhsh", "uniqueId": "538453", "status": "offline", "lastUpdate": "2023-05-21T17:36:17.000+00:00", "positionId": 1231150, "geofenceIds": null, "phone": null, "model": "Mudhsh", "contact": null, "category": null, "disabled": false, "expirationTime": null }];
         // alert(JSON.stringify(devices))
          devices.forEach((item) => (state.items[item.id] = item))
        }
      }

      // state.loading = false
    })
    builder.addCase(GetStationInfo.fulfilled, (state, { payload }) => {
      let data = payload
      let devices = payload.devices;//.filter((x) => x.id == 6)
      state.items = {}
      if (!isEmptyObject(payload)) {
        state.stations = payload.info
        state.stationDevices = devices
        devices.forEach((item) => (state.items[item.id] = item))
      }
      state.loading = false
    })

    builder.addCase(GetStationInfo.rejected, (state, { payload }) => {
      state.error = payload
      state.loading = false
    })
  },
})

export { actions as devicesActions }
export { reducer as devicesReducer }
