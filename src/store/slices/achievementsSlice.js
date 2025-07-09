import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    achievements: [
        {
            id: Date.now(),
            title: '',
            description: '',
            date: '',
            category: 'professional',
            organization: '',
            url: '',
            importance: 'medium'
        }
    ]
};

export const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        addAchievement: (state) => {
            state.achievements.push({
                id: Date.now(),
                title: '',
                description: '',
                date: '',
                category: 'professional',
                organization: '',
                url: '',
                importance: 'medium'
            });
        },
        removeAchievement: (state, action) => {
            if (state.achievements.length > 1) {
                state.achievements = state.achievements.filter(achievement => achievement.id !== action.payload);
            }
        },
        updateAchievement: (state, action) => {
            const { id, field, value } = action.payload;
            const achievement = state.achievements.find(ach => ach.id === id);
            if (achievement) {
                achievement[field] = value;
            }
        },
        addBulkAchievements: (state, action ) => {
            const bulkAchievements = action.payload.map(title => ({
                id: Date.now() + Math.random(),
                title,
                description: '',
                date: '',
                category: 'professional',
                organization: '',
                url: '',
                importance: 'medium'
            }));
            state.achievements.push(...bulkAchievements);
        },
        duplicateAchievement: (state, action) => {
            const original = state.achievements.find(ach => ach.id === action.payload);
            if(original) {
                const duplicate = {
                    ...original,
                    id: Date.now(),
                    title: `${original.title} (Copy)`,
                };
                state.achievements.push(duplicate);
            }
        },
        sortAchievements: (state, action) => {
            const sortBy = action.payload;
            state.achievements.sort((a, b) => {
                if(sortBy === 'importance') {
                    const importanceOrder = { low: 1, medium: 2, high: 3 };
                    return importanceOrder[b.importance] - importanceOrder[a.importance];
                }
                else if(sortBy === 'date') {
                    return new Date(b.date || '1900-01-01') - new Date(a.date || '1900-01-01');
                }
                else if(sortBy === 'category') {
                    return a.category.localeCompare(b.category);
                }
                return 0;
            });
        },
        setAchievements: (state, action) => {
            state.achievements = action.payload;
        },
        resetAchievements: () => initialState,
    },
});

export const {
    addAchievement,
    removeAchievement,
    updateAchievement,
    addBulkAchievements,
    duplicateAchievement,
    sortAchievements,
    setAchievements,
    resetAchievements
} = achievementsSlice.actions;
export default achievementsSlice.reducer;