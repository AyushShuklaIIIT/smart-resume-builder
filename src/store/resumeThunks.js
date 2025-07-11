import { fetchResumeAPI, saveResumeAPI } from "../services/api";
import { setPersonalInfo } from './slices/personalInfoSlice';
import { setEducationEntries } from "./slices/educationSlice";
import { setProjects } from "./slices/projectsSlice";
import { setSkills } from "./slices/skillsSlice";
import { setAchievements } from "./slices/achievementsSlice";
import { setLoading, setSaving, setError } from "./slices/appSlice";
import { setExperiences } from "./slices/experienceSlice";
import { setExtracurricular } from "./slices/extracurricularSlice";

export const fetchResume = () => async(dispatch) => {
    dispatch(setLoading(true));
    try {
        const { resume } = await fetchResumeAPI();
        if(resume) {
            dispatch(setPersonalInfo(resume.personalInfo || {}));
            dispatch(setExperiences(resume.experience || []));
            dispatch(setEducationEntries(resume.education || []));
            dispatch(setSkills(resume.skills || {}));
            dispatch(setProjects(resume.projects || []));
            dispatch(setAchievements(resume.achievements || []));
            dispatch(setExtracurricular(resume.activities || []));
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const saveResume = () => async (dispatch, getState) => {
    dispatch(setSaving(true));
    const { personalInfo, experience, education, skills, projects, achievements, extracurricular } = getState();
    const resumeData = {
        personalInfo,
        experience: experience.experiences,
        education: education.educationEntries,
        skills,
        projects: projects.projects,
        achievements: achievements.achievements,
        activities: extracurricular.activities,
    };

    try {
        await saveResumeAPI(resumeData);
    } catch(error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setSaving(false));
        dispatch(setError(null));
    }
};