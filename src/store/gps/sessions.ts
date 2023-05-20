import { createSlice } from '@reduxjs/toolkit';
import { GetStationInfo } from '../../services/traccargps';
interface SessionState {
  server: any,
  user: any,
  socket: any,
  positions: any,
  history: any,
}


const initialState: SessionState = {
  server: null,
  user: null,
  socket: null,
  positions: {},
  history: {},
};
const { reducer, actions } = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {

    updateServer(state, action) {
      console.log(`server :  `)
      console.log(action.payload)
      state.server = action.payload;
    },
    updateUser(state, action) {
      console.log(`user : `)
      console.log(action.payload)
      state.user = action.payload;
    },
    updateSocket(state, action) {
      state.socket = action.payload;
    },
    updatePositions(state, action) {
      const liveRoutes = state.user?.attributes?.mapLiveRoutes || state.server?.attributes?.mapLiveRoutes || 'none';
      const liveRoutesLimit = state.user?.attributes['web.liveRouteLength'] || state.user?.attributes['web.liveRouteLength'] || 10;
      action.payload.forEach((position) => {
        state.positions[position.deviceId] = position;
        if (liveRoutes !== 'none') {
          const route = state.history[position.deviceId] || [];
          const last = route.at(-1);
          if (!last || (last[0] !== position.longitude && last[1] !== position.latitude)) {
            state.history[position.deviceId] = [...route.slice(1 - liveRoutesLimit), [position.longitude, position.latitude]];
          }
        } else {
          state.history = {};
        }

      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetStationInfo.pending, (state) => { })

    builder.addCase(GetStationInfo.fulfilled, (state, { payload }) => {
      state.positions = {};
    })

    builder.addCase(GetStationInfo.rejected, (state, { payload }) => {
      state.error = payload
    })
  }
});

export { actions as sessionActions };
export { reducer as sessionReducer };
