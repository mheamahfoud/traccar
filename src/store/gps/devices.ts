import {createSlice} from '@reduxjs/toolkit'

import {GetCurrentDevice, GetStationInfo} from '../../services/traccargps'
import {stat} from 'fs'
import { object } from 'yup'
import { isEmptyObject } from 'jquery'

interface deviceState {
  loading: boolean
  stations: any
  items: any
  selectedId: any
  selectedIds: any
  staionDevices: any
  error: any
}
const initialState: deviceState = {
  loading: true,
  stations: [],
  items: {},
  selectedId: null,
  selectedIds: [],
  staionDevices: [],
  error: '',
}

const {reducer, actions} = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    refresh(state, action) {
      state.items = {}
      action.payload.forEach((item) => (state.items[item.id] = item))
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
  },
  extraReducers: (builder) => {
    builder.addCase(GetCurrentDevice.pending, (state) => {})

    builder.addCase(GetCurrentDevice.fulfilled, (state, {payload}) => {
      let data = payload
      state.items = {}
      if (payload?.length > 0) {
        state.stations = payload[0].terminal
        payload[0].devices.forEach((item) => (state.items[item.id] = item))
      }
      // state.loading = false
    })

    builder.addCase(GetCurrentDevice.rejected, (state, {payload}) => {
      state.error = payload
    })

    builder.addCase(GetStationInfo.pending, (state) => {})

    builder.addCase(GetStationInfo.fulfilled, (state, {payload}) => {
      let data = payload
      let devices=[];
      devices.push( {
        "id": 6,
        "attributes": [],
        "groupId": 0,
        "name": "RUH-01",
        "uniqueId": "863540060245173",
        "status": "online",
        "lastUpdate": "2023-05-17T11:27:07.000+00:00",
        "positionId": 1171953,
        "geofenceIds": null,
        "phone": null,
        "model": "",
        "contact": null,
        "category": "bus",
        "disabled": false,
        "expirationTime": null
    },)
    devices.push( {
      "id":4,
      "attributes": [],
      "groupId": 0,
      "name": "RUH-01",
      "uniqueId": "863540060245173",
      "status": "online",
      "lastUpdate": "2023-05-17T11:27:07.000+00:00",
      "positionId": 1171953,
      "geofenceIds": null,
      "phone": null,
      "model": "",
      "contact": null,
      "category": "bus",
      "disabled": false,
      "expirationTime": null
  },)
  devices.push( {
    "id": 5,
    "attributes": [],
    "groupId": 0,
    "name": "RUH-01",
    "uniqueId": "863540060245173",
    "status": "online",
    "lastUpdate": "2023-05-17T11:27:07.000+00:00",
    "positionId": 1171953,
    "geofenceIds": null,
    "phone": null,
    "model": "",
    "contact": null,
    "category": "bus",
    "disabled": false,
    "expirationTime": null
},)
devices.push( {
  "id": 8,
  "attributes": [],
  "groupId": 0,
  "name": "RUH-01",
  "uniqueId": "863540060245173",
  "status": "online",
  "lastUpdate": "2023-05-17T11:27:07.000+00:00",
  "positionId": 1171953,
  "geofenceIds": null,
  "phone": null,
  "model": "",
  "contact": null,
  "category": "bus",
  "disabled": false,
  "expirationTime": null
},)
      state.items = {}
      if (!isEmptyObject(payload)) {
        state.stations =[] ;//payload.info;
        state.staionDevices=devices;
        devices.forEach((item) => (state.items[item.id] = item))
      }
       state.loading = false
    })

    builder.addCase(GetStationInfo.rejected, (state, {payload}) => {
      state.error = payload
    })
  },
})

export {actions as devicesActions}
export {reducer as devicesReducer}
