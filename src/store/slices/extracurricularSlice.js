import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activities: [],
};

export const extracurricularSlice = createSlice({
    name: 'extracurricular',
    initialState,
    reducers: {
        setAllExtracurricular: (state, action) => {
            state.activities = action.payload || [];
        },
        addActivity: (state) => {
            const newActivity = {
                id: Date.now(),
                title: '',
                organization: '',
                startDate: '',
                endDate: '',
                description: '',
            };
            state.activities.push(newActivity);
        },
        updateActivity: (state, action) => {
            const { id, field, value } = action.payload;
            const activity = state.activities.find(act => act.id === id);
            if(activity) {
                activity[field] = value;
            }
        },
        removeActivity: (state, action) => {
            state.activities = state.activities.filter(act => act.id !== action.payload);
        },
    },
});

export const { setAllExtracurricular, addActivity, updateActivity, removeActivity } = extracurricularSlice.actions;
export default extracurricularSlice.reducer;