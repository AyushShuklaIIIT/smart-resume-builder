import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    experiences: [
        {
            id: Date.now(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            responsibilities: ''
        }
    ]
};

export const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        addExperience: (state) => {
            state.experiences.push({
                id: Date.now(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                responsibilities: ''
            });
        },
        removeExperience: (state, action) => {
            if(state.experiences.length > 1) {
                state.experiences = state.experiences.filter(exp => exp.id !== action.payload);
            }
        },
        updateExperience: (state, action) => {
            const { id, field, value } = action.payload;
            const experience = state.experiences.find(exp => exp.id === id);
            if (experience) {
                experience[field] = value;
            }
        },
        updateCurrentStatus: (state, action) => {
            const {id, current} = action.payload;
            const experience = state.experiences.find(exp => exp.id === id);
            if (experience) {
                experience.current = current;
                if(current) {
                    experience.endDate = '';
                }
            }
        },
        setExperiences: (state, action) => {
            state.experiences = action.payload;
        },
        resetExperiences: () => initialState
    },
});

export const {
    addExperience,
    removeExperience,
    updateExperience,
    updateCurrentStatus,
    setExperiences,
    resetExperiences
} = experienceSlice.actions;

export default experienceSlice.reducer;