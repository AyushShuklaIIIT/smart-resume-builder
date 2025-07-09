import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    educationEntries: [
        {
            id: Date.now(),
            institution: '',
            degree: '',
            startDate: '',
            endDate: '',
            description: '',
            gpa: '',
            location: '',
            current: false
        }
    ]
};

export const educationSlice = createSlice({
    name: 'education',
    initialState,
    reducers: {
        addEducation: (state) => {
            state.educationEntries.push({
                id: Date.now(),
                institution: '',
                degree: '',
                startDate: '',
                endDate: '',
                description: '',
                gpa: '',
                location: '',
                current: false
            });
        },
        removeEducation: (state, action) => {
            if(state.educationEntries.length > 1) {
                state.educationEntries = state.educationEntries.filter(entry => entry.id !== action.payload);
            }
        },
        updateEducation: (state, action) => {
            const { id, field, value } = action.payload;
            const education = state.educationEntries.find(entry => entry.id === id);
            if (education) {
                education[field] = value;
            }
        },
        updateEducationCurrentStatus: (state, action) => {
            const { id, current } = action.payload;
            const education = state.educationEntries.find(entry => entry.id === id);
            if (education) {
                education.current = current;
                if (current) {
                    education.endDate = '';
                }
            }
        },
        setEducationEntries: (state, action) => {
            state.educationEntries = action.payload;
        },
        resetEducation: () => initialState
    },
});

export const {
    addEducation,
    removeEducation,
    updateEducation,
    updateEducationCurrentStatus,
    setEducationEntries,
    resetEducation
} = educationSlice.actions;

export default educationSlice.reducer;