import React, { useState, useEffect } from 'react'

const Experience = ({ onDataChange, initialData = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [experiences, setExperiences] = useState(
    initialData.length > 0 ? initialData : [
      {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: ''
      }
    ]
  );

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (experienceId, field, value) => {
    setExperiences(prevExperiences => 
      prevExperiences.map(exp => 
        exp.id === experienceId 
          ? { ...exp, [field]: value }
          : exp
      )
    );
  };

  const handleCurrentChange = (experienceId, isCurrentJob) => {
    setExperiences(prevExperiences => 
      prevExperiences.map(exp => 
        exp.id === experienceId 
          ? { ...exp, current: isCurrentJob, endDate: isCurrentJob ? '' : exp.endDate }
          : exp
      )
    );
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: ''
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (experienceId) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== experienceId));
    }
  };

  useEffect(() => {
    if (onDataChange) {
      onDataChange(experiences);
    }
  }, [experiences, onDataChange]);

  const validateExperience = (experience) => {
    const errors = {};
    if (!experience.company.trim()) errors.company = 'Company is required';
    if (!experience.position.trim()) errors.position = 'Position is required';
    if (!experience.startDate) errors.startDate = 'Start date is required';
    if (!experience.current && !experience.endDate) errors.endDate = 'End date is required';
    return errors;
  };

  const experienceItems = [
    {
      id: "company",
      label: "Company",
      type: 'text',
      placeholder: "Enter company name",
      required: true
    },
    {
      id: "position",
      label: "Position",
      type: 'text',
      placeholder: "Enter position",
      required: true
    },
    {
      id: "startDate",
      label: "Start Date",
      type: "month",
      placeholder: "Enter start date",
      required: true
    },
  ];

  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      <button 
        className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none' 
        onClick={toggleSection}
        type="button"
      >
        <span>Experience</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          viewBox='0 0 20 20' 
          fill='currentColor'
        >
          <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>

      <div className={`px-4 py-3 border-t border-gray-200 ${isExpanded ? 'block' : 'hidden'}`}>
        <div id='experience-items'>
          {experiences.map((experience, index) => {
            const errors = validateExperience(experience);
            
            return (
              <div key={experience.id} className='experience-item mb-4 pb-4 border-b border-gray-200 last:border-b-0'>
                <div className='flex justify-between items-center mb-4'>
                  <h4 className='font-semibold text-gray-800'>
                    Experience {index + 1}
                    {experience.company && ` - ${experience.company}`}
                  </h4>
                  {experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(experience.id)}
                      className='text-red-500 hover:text-red-700 text-sm flex items-center'
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {experienceItems.map((item) => (
                    <div key={item.id}>
                      <label htmlFor={`${item.id}-${experience.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                        {item.label}
                        {item.required && <span className='text-red-500 ml-1'>*</span>}
                      </label>
                      <input
                        type={item.type}
                        id={`${item.id}-${experience.id}`}
                        placeholder={item.placeholder}
                        value={experience[item.id] || ''}
                        onChange={(e) => handleInputChange(experience.id, item.id, e.target.value)}
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
                    <label htmlFor={`endDate-${experience.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      End Date
                      {!experience.current && <span className='text-red-500 ml-1'>*</span>}
                    </label>
                    <div className='flex items-center'>
                      <input 
                        type="month" 
                        id={`endDate-${experience.id}`}
                        value={experience.endDate || ''}
                        onChange={(e) => handleInputChange(experience.id, 'endDate', e.target.value)}
                        disabled={experience.current}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] ${
                          experience.current ? 'bg-gray-100 cursor-not-allowed' : ''
                        } ${
                          errors.endDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <div className='ml-2 flex items-center'>
                        <input 
                          type="checkbox" 
                          id={`current-job-${experience.id}`}
                          checked={experience.current}
                          onChange={(e) => handleCurrentChange(experience.id, e.target.checked)}
                          className='h-4 w-4 text-[#0284c7] focus:ring-[#0ea5e9] border-gray-300 rounded' 
                        />
                        <label htmlFor={`current-job-${experience.id}`} className='ml-2 text-sm text-gray-700'>
                          Current
                        </label>
                      </div>
                    </div>
                    {errors.endDate && (
                      <p className='text-red-500 text-xs mt-1'>{errors.endDate}</p>
                    )}
                  </div>
                  <div className='md:col-span-2'>
                    <label htmlFor={`responsibilities-${experience.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Responsibilities & Achievements
                    </label>
                    <textarea 
                      id={`responsibilities-${experience.id}`}
                      rows={4}
                      value={experience.responsibilities || ''}
                      onChange={(e) => handleInputChange(experience.id, 'responsibilities', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' 
                      placeholder='Led a team of developers to implement new features...'
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button 
          type="button" 
          onClick={addExperience}
          className='flex items-center text-sm text-[#0284c7] hover:text-[#075985] mt-2 transition-colors duration-200'
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule='evenodd' />
          </svg>
          Add Experience
        </button>
        <div className='mt-4 p-3 bg-blue-50 rounded-md'>
          <p className='text-sm text-blue-700'>
            <strong>{experiences.length}</strong> experience{experiences.length !== 1 ? 's' : ''} added
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;