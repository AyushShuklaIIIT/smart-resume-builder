import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  addEducation, 
  removeEducation, 
  updateEducation, 
  updateEducationCurrentStatus
} from '../../store/slices/educationSlice';

const Education = () => { 
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const { educationEntries } = useAppSelector(state => state.education);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (educationId, field, value) => {
    dispatch(updateEducation({ id: educationId, field, value }));
  };

  const handleCurrentChange = (educationId, isCurrent) => {
    dispatch(updateEducationCurrentStatus({ id: educationId, current: isCurrent }));
  };

  const handleAddEducation = () => {
    dispatch(addEducation());
  };

  const handleRemoveEducation = (educationId) => {
    dispatch(removeEducation(educationId));
  };

  const validateEducation = (education) => {
    const errors = {};
    if (!education.institution.trim()) errors.institution = 'Institution is required';
    if (!education.degree.trim()) errors.degree = 'Degree is required';
    if (!education.startDate) errors.startDate = 'Start date is required';
    if (!education.current && !education.endDate) errors.endDate = 'End date is required';
    return errors;
  };

  const educationItems = [
    {
      id: "institution",
      label: "Institution",
      type: "text",
      placeholder: "Enter institution name",
      required: true
    },
    {
      id: "degree",
      label: "Degree",
      type: "text",
      placeholder: "Enter degree (e.g., Bachelor of Science in Computer Science)",
      required: true
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: "City, State/Country",
      required: false
    },
    {
      id: "startDate",
      label: "Start Date",
      type: "month",
      placeholder: "Select start date",
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
        <span>Education ({educationEntries.length})</span>
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          viewBox='0 0 20 20' 
          fill='currentColor'
        >
          <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>

      <div className={`px-4 py-3 border-t border-gray-200 ${isExpanded ? 'block' : 'hidden'}`}>
        <div id="education-items">
          {educationEntries.map((education, index) => {
            const errors = validateEducation(education);
            
            return (
              <div key={education.id} className="education-item mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                <div className='flex justify-between items-center mb-4'>
                  <h4 className='font-semibold text-gray-800'>
                    Education {index + 1}
                    {education.institution && ` - ${education.institution}`}
                  </h4>
                  {educationEntries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(education.id)}
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
                  {educationItems.map((item) => (
                    <div key={item.id}>
                      <label htmlFor={`${item.id}-${education.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                        {item.label}
                        {item.required && <span className='text-red-500 ml-1'>*</span>}
                      </label>
                      <input
                        id={`${item.id}-${education.id}`}
                        type={item.type}
                        placeholder={item.placeholder}
                        value={education[item.id] || ''}
                        onChange={(e) => handleInputChange(education.id, item.id, e.target.value)}
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
                    <label htmlFor={`endDate-${education.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      End Date
                      {!education.current && <span className='text-red-500 ml-1'>*</span>}
                    </label>
                    <div className='flex items-center'>
                      <input 
                        type="month" 
                        id={`endDate-${education.id}`}
                        value={education.endDate || ''}
                        onChange={(e) => handleInputChange(education.id, 'endDate', e.target.value)}
                        disabled={education.current}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] ${
                          education.current ? 'bg-gray-100 cursor-not-allowed' : ''
                        } ${
                          errors.endDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <div className='ml-2 flex items-center'>
                        <input 
                          type="checkbox" 
                          id={`current-education-${education.id}`}
                          checked={education.current}
                          onChange={(e) => handleCurrentChange(education.id, e.target.checked)}
                          className='h-4 w-4 text-[#0284c7] focus:ring-[#0ea5e9] border-gray-300 rounded' 
                        />
                        <label htmlFor={`current-education-${education.id}`} className='ml-2 text-sm text-gray-700'>
                          Current
                        </label>
                      </div>
                    </div>
                    {errors.endDate && (
                      <p className='text-red-500 text-xs mt-1'>{errors.endDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`gpa-${education.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      id={`gpa-${education.id}`}
                      placeholder="e.g., 3.8/4.0"
                      value={education.gpa || ''}
                      onChange={(e) => handleInputChange(education.id, 'gpa', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label htmlFor={`description-${education.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Additional Information
                    </label>
                    <textarea 
                      id={`description-${education.id}`}
                      rows={2}
                      value={education.description || ''}
                      onChange={(e) => handleInputChange(education.id, 'description', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' 
                      placeholder="Relevant coursework, honors, achievements, etc."
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          type='button' 
          onClick={handleAddEducation}
          className='flex items-center text-sm text-[#0284c7] hover:text-[#075985] mt-2 transition-colors duration-200'
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule='evenodd' />
          </svg>
          Add Education
        </button>

        <div className='mt-4 p-3 bg-green-50 rounded-md'>
          <p className='text-sm text-green-700'>
            <strong>{educationEntries.length}</strong> education entr{educationEntries.length !== 1 ? 'ies' : 'y'} added
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;