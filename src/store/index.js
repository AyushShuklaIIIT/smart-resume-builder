import { configureStore } from '@reduxjs/toolkit';
import personalInfoSlice from './slices/personalInfoSlice';
import experienceSlice from './slices/experienceSlice';
import educationSlice from './slices/educationSlice';
import skillsSlice from './slices/skillsSlice';
import projectsSlice from './slices/projectsSlice';
import achievementsSlice from './slices/achievementsSlice';
import appSlice from './slices/appSlice';

export const store = configureStore({
  reducer: {
    personalInfo: personalInfoSlice,
    experience: experienceSlice,
    education: educationSlice,
    skills: skillsSlice,
    projects: projectsSlice,
    achievements: achievementsSlice,
    app: appSlice,
  },
});