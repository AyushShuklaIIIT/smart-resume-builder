import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    isLoading: true,
    lastSaved: null,
    error: null,
    isAiModalOpen: false,
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
        openAiModal: (state) => {
            state.isAiModalOpen = true;
        },
        closeAiModal: (state) => {
            state.isAiModalOpen = false;
        }
    },
});

export const { setLoading, setSaving, setError, openAiModal, closeAiModal } = appSlice.actions;
export default appSlice.reducer;