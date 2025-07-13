import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  addProject, 
  removeProject, 
  updateProject, 
  updateProjectHighlight,
  addProjectHighlight,
  removeProjectHighlight,
  duplicateProject
} from '../../store/slices/projectsSlice';
import { FaCopy, FaTrash, FaPlus } from 'react-icons/fa';

const Projects = () => { 
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const { projects } = useAppSelector(state => state.projects);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (projectId, field, value) => {
    dispatch(updateProject({ id: projectId, field, value }));
  };

  const handleHighlightChange = (projectId, highlightIndex, value) => {
    dispatch(updateProjectHighlight({ projectId, highlightIndex, value }));
  };

  const handleAddHighlight = (projectId) => {
    dispatch(addProjectHighlight(projectId));
  };

  const handleRemoveHighlight = (projectId, highlightIndex) => {
    dispatch(removeProjectHighlight({ projectId, highlightIndex }));
  };

  const handleAddProject = () => {
    dispatch(addProject());
  };

  const handleRemoveProject = (projectId) => {
    dispatch(removeProject(projectId));
  };

  const handleDuplicateProject = (projectId) => {
    dispatch(duplicateProject(projectId));
  };

  const validateProject = (project) => {
    const errors = {};
    if (!project.name.trim()) errors.name = 'Project name is required';
    if (!project.technologies.trim()) errors.technologies = 'Technologies are required';
    if (!project.description.trim()) errors.description = 'Description is required';
    
    if (project.url && !isValidUrl(project.url)) {
      errors.url = 'Please enter a valid URL';
    }
    if (project.github && !isValidUrl(project.github)) {
      errors.github = 'Please enter a valid GitHub URL';
    }
    
    return errors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      ongoing: 'bg-blue-100 text-blue-800',
      planned: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const projectsArr = [
    {
      label: "Project Name",
      placeholder: "Enter project name",
      type: "text",
      id: "name",
      required: true
    },
    {
      label: "Technologies",
      placeholder: "React, Node.js, MongoDB, etc.",
      type: "text",
      id: "technologies",
      required: true
    },
    {
      label: "Live Demo URL",
      placeholder: "https://your-project.com",
      type: "url",
      id: "url",
      required: false
    },
    {
      label: "GitHub Repository",
      placeholder: "https://github.com/username/repo",
      type: "url",
      id: "github",
      required: false
    }
  ];

  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      <button 
        className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none'
        onClick={toggleSection}
        type="button"
      >
        <div className='flex items-center'>
          <span>Projects ({projects.length})</span>
        </div>
        <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>

      <div className={`px-4 py-3 border-t border-gray-200 ${isExpanded ? 'block' : 'hidden'}`}>
        <div id="project-items">
          {projects.map((project, index) => {
            const errors = validateProject(project);
            
            return (
              <div key={project.id} className='project-item mb-6 pb-6 border-b border-gray-200 last:border-b-0'>
                <div className='flex justify-between items-center mb-4'>
                  <div className='flex items-center space-x-3'>
                    <h4 className='font-semibold text-gray-800'>
                      Project {index + 1}
                      {project.name && ` - ${project.name}`}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <button
                      onClick={() => handleDuplicateProject(project.id)}
                      className='text-blue-500 hover:text-blue-700 text-sm'
                      title='Duplicate project'
                    >
                      <FaCopy className='w-4 h-4' />
                    </button>
                    {projects.length > 1 && (
                      <button
                        onClick={() => handleRemoveProject(project.id)}
                        className='text-red-500 hover:text-red-700 text-sm'
                        title='Remove project'
                      >
                        <FaTrash className='w-4 h-4' />
                      </button>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {projectsArr.map((item) => (
                    <div key={item.id}>
                      <label htmlFor={`${item.id}-${project.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                        {item.label}
                        {item.required && <span className='text-red-500 ml-1'>*</span>}
                      </label>
                      <input 
                        type={item.type} 
                        id={`${item.id}-${project.id}`}
                        placeholder={item.placeholder}
                        value={project[item.id] || ''}
                        onChange={(e) => handleInputChange(project.id, item.id, e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] ${
                          errors[item.id] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required={item.required}
                      />
                      {errors[item.id] && (
                        <p className='text-red-500 text-xs mt-1'>{errors[item.id]}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label htmlFor={`startDate-${project.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Start Date
                    </label>
                    <input 
                      type="month" 
                      id={`startDate-${project.id}`}
                      value={project.startDate || ''}
                      onChange={(e) => handleInputChange(project.id, 'startDate', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    />
                  </div>

                  <div>
                    <label htmlFor={`endDate-${project.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      End Date
                    </label>
                    <input 
                      type="month" 
                      id={`endDate-${project.id}`}
                      value={project.endDate || ''}
                      onChange={(e) => handleInputChange(project.id, 'endDate', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    />
                  </div>

                  <div>
                    <label htmlFor={`status-${project.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Project Status
                    </label>
                    <select 
                      id={`status-${project.id}`}
                      value={project.status}
                      onChange={(e) => handleInputChange(project.id, 'status', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    >
                      <option value="completed">Completed</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>

                  <div className='md:col-span-2'>
                    <label htmlFor={`description-${project.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Description *
                    </label>
                    <textarea 
                      id={`description-${project.id}`}
                      rows={3}
                      value={project.description || ''}
                      onChange={(e) => handleInputChange(project.id, 'description', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='Describe your project, its purpose, and key features...'
                      required
                    />
                    {errors.description && (
                      <p className='text-red-500 text-xs mt-1'>{errors.description}</p>
                    )}
                  </div>

                  <div className='md:col-span-2'>
                    <label 
                      htmlFor={`highlight-${project.id}-0`} 
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Key Highlights & Features
                    </label>
                    {project.highlights.map((highlight, highlightIndex) => (
                      <div key={`${project.id}-highlight-${highlightIndex}`} className='flex items-center space-x-2 mb-2'>
                        <input
                          type="text"
                          id={`highlight-${project.id}-${highlightIndex}`}
                          value={highlight}
                          onChange={(e) => handleHighlightChange(project.id, highlightIndex, e.target.value)}
                          placeholder='e.g., Implemented user authentication system'
                          className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                        />
                        {project.highlights.length > 1 && (
                          <button
                            onClick={() => handleRemoveHighlight(project.id, highlightIndex)}
                            className='text-red-500 hover:text-red-700'
                          >
                            <FaTrash className='w-4 h-4' />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddHighlight(project.id)}
                      className='flex items-center text-sm text-[#0284c7] hover:text-[#075985]'
                    >
                      <FaPlus className='w-4 h-4 mr-1' />
                      Add Highlight
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          type='button' 
          onClick={handleAddProject}
          className='flex items-center text-sm text-[#0284c7] hover:text-[#075985] mt-4 transition-colors duration-200'
        >
          <FaPlus className='w-4 h-4 mr-1' />
          Add Project
        </button>

        <div className='mt-4 p-3 bg-indigo-50 rounded-md'>
          <div className='flex justify-between items-center mb-2'>
            <p className='text-sm text-indigo-700'>
              <strong>{projects.length}</strong> project{projects.length !== 1 ? 's' : ''} added
            </p>
            <div className='flex space-x-2'>
              {['completed', 'ongoing', 'planned'].map(status => {
                const count = projects.filter(p => p.status === status).length;
                return count > 0 ? (
                  <span key={status} className={`text-xs px-2 py-1 rounded ${getStatusColor(status)}`}>
                    {status}: {count}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;