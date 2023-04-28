import { createSlice } from "@reduxjs/toolkit";

export const announceSlice = createSlice({
    name: "announce",
    initialState: {
        announce: []
    },
    reducers: {
        addAnnounce: (state, action) => {
            state.announce.push(action.payload)
        },
        removeAnnounce: (state) => {
            state.announce.pop()
        }
    }
})

export const { addAnnounce, removeAnnounce} = announceSlice.actions;
export default announceSlice.reducer;