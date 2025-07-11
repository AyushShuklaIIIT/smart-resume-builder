const API_BASE_URL = 'http://localhost:3001/api';

const jsonHeaders = {
    'Content-Type': 'application/json',
}

export const fetchResumeAPI = async () => {
    const response = await fetch(`${API_BASE_URL}/resume`);
    if(!response.ok) {
        throw new Error('Failed to fetch resume');
    }
    return response.json();
};

export const saveResumeAPI = async (resumeData) => {
    const response = await fetch(`${API_BASE_URL}/resume`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(resumeData),
    });
    if(!response.ok) {
        throw new Error('Failed to save resume');
    }
    return response.json();
}

export const exportPdfAPI = async (htmlContent) => {
    const response = await fetch(`${API_BASE_URL}/resume/export`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ html: htmlContent }),
    });
    if(!response.ok) {
        throw new Error('Failed to export PDF');
    }
    return response.blob();
}

export const getAiSuggestionsAPI = async (prompt) => {
    const response = await fetch(`${API_BASE_URL}/resume/suggestions`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ prompt }),
    });

    if(!response.ok) {
        throw new Error('Failed to get AI suggestions');
    }

    const data = await response.json();
    return data.suggestions;
}