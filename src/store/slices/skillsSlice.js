import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    technical: [],
    programming: [],
    tools: [],
    soft: [],
    languages: [],
};

export const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        addSkill: (state, action) => {
            const { category, skill } = action.payload;
            if (!state[category].includes(skill)) {
                state[category].push(skill);
            }
        },
        removeSkill: (state, action) => {
            const { category, skill } = action.payload;
            state[category] = state[category].filter(s => s !== skill);
        },
        addBulkSkills: (state, action) => {
            const { category, skills } = action.payload;
            skills.forEach(skill => {
                if (!state[category].includes(skill)) {
                    state[category].push(skill);
                }
            });
        },
        setSkills: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetSkills: () => initialState,
    },
});

export const { addSkill, removeSkill, addBulkSkills, setSkills, resetSkills } = skillsSlice.actions;
export default skillsSlice.reducer;