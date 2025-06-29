import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: false,
}

export const ColorSlice = createSlice({
    name: 'ColorSlice',
    initialState,
    reducers: {
        toggleMode: (state) => { // used to toggle theme
            state.isDarkMode = !state.isDarkMode;
        },
        setMode:(state, action)=>{ // used to save user selected theme in db
            state.isDarkMode=action.payload;
        }
    }
})

export const { toggleMode, setMode} = ColorSlice.actions;
export default ColorSlice.reducer;