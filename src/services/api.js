const API_BASE_URL = 'http://localhost:3001/api';

const getAuthHeaders = async (getToken) => {
    const token = await getToken();
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

export const fetchResumeAPI = async (getToken) => {
    const headers = await getAuthHeaders(getToken);
    const response = await fetch(`${API_BASE_URL}/resume`, { headers });
    if(!response.ok) {
        throw new Error('Failed to fetch resume');
    }
    return response.json();
};

export const saveResumeAPI = async (getToken, resumeData) => {
    const headers = await getAuthHeaders(getToken);
    const response = await fetch(`${API_BASE_URL}/resume`, {
        method: 'POST',
        headers,
        body: JSON.stringify(resumeData),
    });
    if(!response.ok) {
        throw new Error('Failed to save resume');
    }
    return response.json();
}

export const exportPdfAPI = async (getToken, htmlContent) => {
    const headers = await getAuthHeaders(getToken);
    const response = await fetch(`${API_BASE_URL}/resume/export`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ html: htmlContent }),
    });
    if(!response.ok) {
        throw new Error('Failed to export PDF');
    }
    return response.blob();
}