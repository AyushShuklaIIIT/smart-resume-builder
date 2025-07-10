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
      const newExperience = {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: ''
      };
      state.experiences.push(newExperience);
    },
    
    removeExperience: (state, action) => {
      const experienceId = action.payload;
      state.experiences = state.experiences.filter(exp => exp.id !== experienceId);
    },
    
    updateExperience: (state, action) => {
      const { id, field, value } = action.payload;
      const experienceIndex = state.experiences.findIndex(exp => exp.id === id);
      if (experienceIndex !== -1) {
        state.experiences[experienceIndex][field] = value;
      }
    },
    
    updateCurrentStatus: (state, action) => {
      const { id, current } = action.payload;
      
      const experienceIndex = state.experiences.findIndex(exp => exp.id === id);
      if (experienceIndex !== -1) {
        state.experiences[experienceIndex].current = current;
        if (current) {
          state.experiences[experienceIndex].endDate = '';
        }
      }
      if (experienceIndex !== -1) {
        state.experiences[experienceIndex].current = current;
        if (current) {
          state.experiences[experienceIndex].endDate = '';
        }
      } 
    }
  }
});

export const { addExperience, removeExperience, updateExperience, updateCurrentStatus } = experienceSlice.actions;
export default experienceSlice.reducer;