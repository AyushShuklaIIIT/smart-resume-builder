import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    isLoading: true,
    lastSaved: null,
    error: null
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSaving: (state, action) => {
            state.isSaving = action.payload;
            if(action.payload === false) {
                state.lastSaved = new Date().toISOString();
            }
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setSaving, setError } = appSlice.actions;
export default appSlice.reducer;