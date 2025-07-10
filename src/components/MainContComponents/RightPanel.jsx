import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAppSelector } from '../../store/hooks';
import { useAuth } from '@clerk/clerk-react';
import { exportPdfAPI } from '../../services/api';

const RightPanel = () => {
  const resumeRef = useRef(null);
  const { getToken } = useAuth();

  const personalInfo = useAppSelector((state) => state.personalInfo);
  const { experiences } = useAppSelector((state) => state.experience);
  const { educationEntries } = useAppSelector((state) => state.education);
  const skillsData = useAppSelector((state) => state.skills);
  const { projects } = useAppSelector((state) => state.projects);
  const { achievements } = useAppSelector((state) => state.achievements);

  // Data aliases for rendering
  const experienceData = experiences || [];
  const educationData = educationEntries || [];
  const projectsData = projects || [];
  const achievementsData = achievements || [];

  // Handle print functionality
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${personalInfo.fullName || 'Resume'}_Resume`,
  });

  // Handle PDF export
  const handleExportPDF = async () => {
    if (!resumeRef.current) {
      console.error('Resume preview element is not available.');
      alert('Could not export PDF. Please try again in a moment.');
      return;
    }

    const linkedStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.outerHTML).join('');

    const inlineStyles = Array.from(document.querySelectorAll('style')).map(style => style.innerHTML).join('');

    const resumeHtml = resumeRef.current.innerHTML;

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        ${linkedStyles}
        <style>
        ${inlineStyles}
          body {
            -webkit-print-color-adjust: exact !important;
          }
        </style>
      </head>
      <body>
      <div class="p-6">
        ${resumeHtml}
      </div>
      </body>
      </html>
    `;

    try {
      const blob = await exportPdfAPI(getToken, fullHtml);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${personalInfo.fullName || 'Resume'}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch(error) {
      console.error("Failed to export PDF:", error);
      alert('There was an error exporting your resume. Please check the console for details.');
    }
  };

  // Combine all skills from different categories
  const getAllSkills = () => {
    const allSkills = [];
    Object.keys(skillsData).forEach(category => {
      if (skillsData[category] && Array.isArray(skillsData[category])) {
        allSkills.push(...skillsData[category]);
      }
    });
    return allSkills;
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Format date range
  const formatDateRange = (startDate, endDate, isCurrent = false) => {
    const start = formatDate(startDate);
    const end = isCurrent ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className='w-full lg:w-1/2'>
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Resume Preview</h2>
          <div className='flex space-x-2 no-print'>
            <button
              onClick={handleExportPDF}
              className='flex items-center px-3 py-1.5 bg-[#0284c7] text-white text-sm font-medium rounded-md hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] transition-colors'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 11.586V8z' clipRule='evenodd' />
              </svg>
              Export as PDF
            </button>
            <button
              onClick={handlePrint}
              className='flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z' clipRule='evenodd' />
              </svg>
              Print
            </button>
          </div>
        </div>

        <div className='border border-gray-200 rounded-md p-6 bg-white resume-preview' ref={resumeRef}>
          {/* Personal Information */}
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-gray-900 mb-1'>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className='text-gray-600 font-medium mb-3'>
              {personalInfo.jobTitle || 'Your Job Title'}
            </p>
            <div className='contact-info text-sm text-gray-600 space-y-1'>
              {personalInfo.email && (
                <div className='flex items-center'>
                  <span className='mr-2'>📧</span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className='flex items-center'>
                  <span className='mr-2'>📞</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className='flex items-center'>
                  <span className='mr-2'>📍</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedIn && (
                <div className='flex items-center'>
                  <span className='mr-2'>💼</span>
                  <a href={personalInfo.linkedIn} target='_blank' rel='noopener noreferrer' className='text-[#0284c7] hover:underline'>
                    LinkedIn
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className='flex items-center'>
                  <span className='mr-2'>🔗</span>
                  <a href={personalInfo.github} target='_blank' rel='noopener noreferrer' className='text-[#0284c7] hover:underline'>
                    GitHub
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className='section mb-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                Professional Summary
              </h2>
              <p className='text-gray-700 leading-relaxed'>{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience Section */}
          {experienceData.length > 0 && experienceData.some(exp => exp.company || exp.position) && (
            <div className='section mb-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                Experience
              </h2>
              {experienceData.map((exp) => (
                exp.company || exp.position ? (
                  <div key={exp.id} className='item mb-4'>
                    <div className='flex justify-between items-start mb-1'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>
                          {exp.position || 'Position'}
                        </h3>
                        <p className='text-gray-600'>{exp.company || 'Company'}</p>
                      </div>
                      <div className='text-right text-sm text-gray-500'>
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </div>
                    </div>
                    {exp.responsibilities && (
                      <div className='item-content mt-2'>
                        <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-line'>
                          {exp.responsibilities}
                        </p>
                      </div>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          )}

          {/* Education Section */}
          {educationData.length > 0 && educationData.some(edu => edu.institution || edu.degree) && (
            <div className='section mb-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                Education
              </h2>
              {educationData.map((edu) => (
                edu.institution || edu.degree ? (
                  <div key={edu.id} className='item mb-4'>
                    <div className='flex justify-between items-start mb-1'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>
                          {edu.degree || 'Degree'}
                        </h3>
                        <p className='text-gray-600'>{edu.institution || 'Institution'}</p>
                        {edu.location && (
                          <p className='text-gray-500 text-sm'>{edu.location}</p>
                        )}
                      </div>
                      <div className='text-right text-sm text-gray-500'>
                        {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                      </div>
                    </div>
                    {(edu.gpa || edu.description) && (
                      <div className='item-content mt-2'>
                        {edu.gpa && (
                          <p className='text-gray-700 text-sm'>GPA: {edu.gpa}</p>
                        )}
                        {edu.description && (
                          <p className='text-gray-700 text-sm leading-relaxed'>
                            {edu.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          )}

          {/* Skills Section */}
          {getAllSkills().length > 0 && (
            <div className='section mb-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                Skills
              </h2>
              <div className='skills-list flex flex-wrap gap-2'>
                {getAllSkills().map((skill) => (
                  <span
                    key={skill}
                    className='bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {projectsData.length > 0 && projectsData.some(proj => proj.name || proj.description) && (
            <div className='section mb-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                Projects
              </h2>
              {projectsData.map((project) => (
                project.name || project.description ? (
                  <div key={project.id} className='item mb-4'>
                    <div className='flex justify-between items-start mb-1'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>
                          {project.name || 'Project Name'}
                        </h3>
                        {project.technologies && (
                          <p className='text-gray-600 text-sm'>{project.technologies}</p>
                        )}
                      </div>
                      <div className='text-right text-sm text-gray-500'>
                        {formatDateRange(project.startDate, project.endDate)}
                      </div>
                    </div>
                    {project.description && (
                      <div className='item-content mt-2'>
                        <p className='text-gray-700 text-sm leading-relaxed'>
                          {project.description}
                        </p>
                      </div>
                    )}
                    {project.highlights && project.highlights.length > 0 && project.highlights.some(h => h.trim()) && (
                      <div className='mt-2'>
                        <ul className='text-gray-700 text-sm space-y-1'>
                          {project.highlights.filter(h => h.trim()).map((highlight) => (
                            <li key={highlight} className='flex items-start'>
                              <span className='mr-2 text-gray-400'>•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className='flex space-x-4 mt-2'>
                      {project.url && (
                        <a href={project.url} target='_blank' rel='noopener noreferrer' className='text-[#0284c7] text-sm hover:underline'>
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target='_blank' rel='noopener noreferrer' className='text-[#0284c7] text-sm hover:underline'>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}

          {/* Achievements Section */}
          {achievementsData.length > 0 && achievementsData.some(ach => ach.title) && (
            <div className='section mb-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                Achievements
              </h2>
              <ul className='space-y-2'>
                {achievementsData.map((achievement) => (
                  achievement.title ? (
                    <li key={achievement.id} className='flex items-start'>
                      <span className='mr-2 text-gray-400 mt-1'>•</span>
                      <div className='flex-1'>
                        <span className='text-gray-700 text-sm'>
                          {achievement.title}
                          {achievement.organization && ` - ${achievement.organization}`}
                          {achievement.date && ` (${formatDate(achievement.date)})`}
                        </span>
                        {achievement.description && (
                          <p className='text-gray-600 text-sm mt-1'>{achievement.description}</p>
                        )}
                      </div>
                    </li>
                  ) : null
                ))}
              </ul>
            </div>
          )}

          {/* Empty state */}
          {!personalInfo.fullName && !experienceData.length && !educationData.length &&
            getAllSkills().length === 0 && !projectsData.length && !achievementsData.length && (
              <div className='text-center py-12'>
                <div className='text-gray-400 text-6xl mb-4'>📄</div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>Start Building Your Resume</h3>
                <p className='text-gray-600'>Fill in your information in the form to see your resume preview here.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;