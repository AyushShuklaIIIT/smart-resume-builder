import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [
        {
            id: Date.now(),
            name: '',
            technologies: '',
            url: '',
            github: '',
            description: '',
            startDate: '',
            endDate: '',
            status: 'completed',
            highlights: ['']
        }
    ]
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state) => {
            state.projects.push({
                id: Date.now(),
                name: '',
                technologies: '',
                url: '',
                github: '',
                description: '',
                startDate: '',
                endDate: '',
                status: 'completed',
                highlights: ['']
            });
        },
        removeProject: (state, action) => {
            if (state.projects.length > 1) {
                state.projects = state.projects.filter(project => project.id !== action.payload);
            }
        },
        updateProject: (state, action) => {
            const { id, field, value } = action.payload;
            const project = state.projects.find(proj => proj.id === id);
            if (project) {
                project[field] = value;
            }
        },
        updateProjectHighlight: (state, action) => {
            const { projectId, highlightIndex, value } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            if (project) {
                project.highlights[highlightIndex] = value;
            }
        },
        addProjectHighlight: (state, action) => {
            const project = state.projects.find(p => p.id === action.payload);
            if(project) {
                project.highlights.push('');
            }
        },
        removeProjectHighlight: (state, action) => {
            const { projectId, highlightIndex } = action.payload;
            const project = state.projects.find(p => p.id === projectId);
            if (project && project.highlights.length > 1) {
                project.highlights.splice(highlightIndex, 1);
            }
        },
        duplicateProject: (state, action ) => {
            const original = state.projects.find(p => p.id === action.payload);
            if(original) {
                const duplicate = {
                    ...original,
                    id: Date.now(),
                    name: `${original.name} (Copy)`,
                };
                state.projects.push(duplicate);
            }
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        resetProjects: () => initialState,
    },
});

export const {
    addProject,
    removeProject,
    updateProject,
    updateProjectHighlight,
    addProjectHighlight,
    removeProjectHighlight,
    duplicateProject,
    setProjects,
    resetProjects
} = projectsSlice.actions;

export default projectsSlice.reducer;