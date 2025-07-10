import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedIn: '',
  github: '',
  website: '',
  summary: '',
};

export const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    updateField: (state, action) => {
      console.log('🔧 UpdateField reducer called:', action.payload);
      const { field, value } = action.payload;
      state[field] = value;
      console.log('🔧 Updated state:', state);
    },
    updatePersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPersonalInfo: () => initialState,
  },
});

export const { updateField, updatePersonalInfo, resetPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;