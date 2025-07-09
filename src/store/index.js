import { configureStore } from '@reduxjs/toolkit';
import personalInfoSlice from './slices/personalInfoSlice';
import skillsSlice from './slices/skillsSlice';
import experienceSlice from './slices/experienceSlice';
import educationSlice from './slices/educationSlice';
import projectsSlice from './slices/projectsSlice';
import achievementsSlice from './slices/achievementsSlice';

export const store = configureStore({
    reducer: {
        personalInfo: personalInfoSlice,
        skills: skillsSlice,
        experience: experienceSlice,
        education: educationSlice,
        projects: projectsSlice,
        achievements: achievementsSlice
    },
});