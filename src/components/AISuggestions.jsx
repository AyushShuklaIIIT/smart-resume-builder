import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeAiModal } from '../store/slices/appSlice';
import { useAuth } from '@clerk/clerk-react';
import { getAiSuggestionsAPI } from '../services/api';
import ReactMarkdown from 'react-markdown';

const generatePrompt = (resumeData) => {
  const { personalInfo, experience, education, skills, projects, achievements } = resumeData;
  return `
    Please act as an expert career coach and resume writer. 
    Review the following resume data and provide specific, actionable suggestions for improvement.
    Focus on clarity, impact, and industry best practices. Format your response using markdown for readability.

    **Personal Information:**
    - Name: ${personalInfo.fullName}
    - Job Title: ${personalInfo.jobTitle}
    - Contact: ${personalInfo.email}, ${personalInfo.phone}, ${personalInfo.location}
    - Links: LinkedIn (${personalInfo.linkedIn}), GitHub (${personalInfo.github})

    **Experience:**
    ${experience.experiences.map(exp => `- ${exp.position} at ${exp.company}: ${exp.responsibilities}`).join('\n')}

    **Education:**
    ${education.educationEntries.map(edu => `- ${edu.degree} from ${edu.institution}`).join('\n')}

    **Skills:**
    - Languages: ${skills.programming.join(', ')}
    - Frameworks: ${skills.tools.join(', ')}
    - Soft Skills: ${skills.soft.join(', ')}

    **Projects:**
    ${projects.projects.map(proj => `- ${proj.name}: ${proj.description}`).join('\n')}

    **Achievements:**
    ${achievements.achievements.map(ach => `- ${ach.description}`).join('\n')}

    Now, provide your expert suggestions below:
  `;
};

const AISuggestions = () => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  const { isAiModalOpen } = useAppSelector((state) => state.app);
  const resumeData = useAppSelector((state) => state);

  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [error, setError] = useState('');

  const handleCloseModal = () => {
    dispatch(closeAiModal());
    // Reset state when closing
    setSuggestions('');
    setError('');
  };

  const handleGenerateSuggestions = async () => {
    setIsLoading(true);
    setSuggestions('');
    setError('');
    
    try {
      const prompt = generatePrompt(resumeData);
      const result = await getAiSuggestionsAPI(getToken, prompt);
      setSuggestions(result);
    } catch (err) {
      setError('Failed to get suggestions. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAiModalOpen) {
    return null;
  }

  return (
    <div id="ai-suggestions-modal" className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#f0f9ff]">
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Suggestions</h3>
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Click the button below to generate suggestions for improving your resume based on the information you've provided.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleGenerateSuggestions}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-[#10b981] text-white font-medium rounded-md hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10b981] transition-colors disabled:bg-gray-400"
            >
              {isLoading ? 'Generating...' : 'Generate Suggestions'}
            </button>
          </div>
          <div className="prose prose-sm max-w-none mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 min-h-[150px] max-h-[400px] overflow-y-auto">
            {isLoading && <p className="text-gray-500 text-sm">Getting suggestions from the AI, please wait...</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {suggestions && (
              <ReactMarkdown>
                {suggestions}
              </ReactMarkdown>
            )}
            {!isLoading && !error && !suggestions && <p className="text-gray-500 text-sm">AI suggestions will be displayed here...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;