import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: '',
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    github: "",
    website: "",
    summary: ""
};

export const personalInfoSlice = createSlice({
    name: 'personalInfo',
    initialState,
    reducers: {
        updatePersonalInfo: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value; 
        },
        resetPersonalInfo: () => initialState,
    },
});

export const { updatePersonalInfo, updateField, resetPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;