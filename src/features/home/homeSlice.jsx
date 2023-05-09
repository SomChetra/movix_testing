import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: {},
    genres: {},
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        // https://developers.themoviedb.org/3/configuration/get-api-configuration
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;