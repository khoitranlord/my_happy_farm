import { createSlice } from "@reduxjs/toolkit";

export const announceSlice = createSlice({
    name: "announce",
    initialState: {
        announceId: null,
        announceDes: null,
        announceTime: null,
    },
    reducers: {
        setAnnounceInfo: (state, action) => {
            state.announceId = action.payload.announceId;
            state.announceDes = action.payload.announceDes;
            state.announceTime = action.payload.announceTime;
        },
    }
})

export const { setAnnounceInfo } = announceSlice.actions;
export default announceSlice.reducer;