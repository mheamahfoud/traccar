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
      let devices=payload.devices;

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
