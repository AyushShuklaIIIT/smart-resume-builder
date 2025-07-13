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
  photo: '',
};

export const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updatePersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    setPersonalInfo: (state, action) => {
      return { ...initialState, ...action.payload };
    },
    resetPersonalInfo: () => initialState,
  },
});

export const { updateField, updatePersonalInfo, resetPersonalInfo, setPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;