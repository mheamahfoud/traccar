import { createSlice } from "@reduxjs/toolkit";
import { GetPageTimes } from "../../services/traccargps";

interface PageTImeState {
    loading: boolean,
    landingTime: number,
    destinationTime: number,
    error: string
}
const initialState: PageTImeState = {
    error: "",
    loading: false,
    landingTime: 5,
    destinationTime: 3,
}

const { reducer, actions } = createSlice({
    name: "pageTimeManager",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(GetPageTimes.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(GetPageTimes.fulfilled, (state, { payload }) => {
            state.loading = false;
            var pagePeriod = payload.filter(x => x.code == 'destination_page')
            if (pagePeriod.length > 0) {
                var time = parseInt(pagePeriod[0]?.time)
                state.landingTime = time;
                state.destinationTime = time;

            }
        })

        builder.addCase(GetPageTimes.rejected, (state, { payload }) => {
            state.loading = false;
        })

        // [GetPageTimes.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [GetPageTimes.fulfilled]: (state, action) => {
        //     state.loading = false;

        //     var pagePeriod = action.payload.filter(x => x.code == 'destination_page')
        //     if (pagePeriod.length > 0) {
        //         var time = parseInt(pagePeriod[0]?.time)
        //         state.landingTime = time;
        //         state.destinationTime = time;

        //     }

        // },
        // [GetPageTimes.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;

        // },


    },
});

export { actions as pageTimeManagerActions };
export { reducer as pageTimeManagereReducer };
