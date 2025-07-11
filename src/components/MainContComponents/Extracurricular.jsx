import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  addActivity, 
  updateActivity, 
  removeActivity 
} from '../../store/slices/extracurricularSlice';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Extracurricular = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useAppDispatch();
  const { activities } = useAppSelector((state) => state.extracurricular || { activities: [] });

  const handleInputChange = (id, field, value) => {
    dispatch(updateActivity({ id, field, value }));
  };

  const handleAddActivity = () => {
    dispatch(addActivity());
  };

  const handleRemoveActivity = (id) => {
    dispatch(removeActivity(id));
  };

  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      {/* Header with toggle button - styled like Projects.jsx */}
      <button 
        className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none'
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <div className="flex items-center">
            <span>Extra-curricular Activities ({activities.length})</span>
        </div>
        <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>

      <div className={`px-4 py-3 border-t border-gray-200 ${isExpanded ? 'block' : 'hidden'}`}>
        <div>
          {activities.map((activity, index) => (
            <div key={activity.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              {/* Item header with actions - styled like Projects.jsx */}
              <div className='flex justify-between items-center mb-4'>
                <h4 className='font-semibold text-gray-800'>
                  Activity {index + 1}
                  {activity.title && ` - ${activity.title}`}
                </h4>
                {activities.length > 0 && (
                  <button
                    onClick={() => handleRemoveActivity(activity.id)}
                    className='text-red-500 hover:text-red-700 text-sm'
                    title='Remove activity'
                  >
                    <FaTrash className='w-4 h-4' />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className='md:col-span-2'>
                  <label htmlFor={`activity-title-${activity.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                    Title / Role
                  </label>
                  <input
                    type="text"
                    id={`activity-title-${activity.id}`}
                    placeholder="e.g., President, Team Captain"
                    value={activity.title}
                    onChange={(e) => handleInputChange(activity.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] border-gray-300"
                  />
                </div>

                {/* Organization */}
                <div className='md:col-span-2'>
                  <label htmlFor={`activity-org-${activity.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                    Organization / Club
                  </label>
                  <input
                    type="text"
                    id={`activity-org-${activity.id}`}
                    placeholder="e.g., University Debate Club"
                    value={activity.organization}
                    onChange={(e) => handleInputChange(activity.id, 'organization', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] border-gray-300"
                  />
                </div>
                
                {/* Description */}
                <div className='md:col-span-2'>
                  <label htmlFor={`activity-desc-${activity.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    id={`activity-desc-${activity.id}`}
                    placeholder="Describe your role, responsibilities, and any notable achievements..."
                    value={activity.description}
                    onChange={(e) => handleInputChange(activity.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] border-gray-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Activity Button - styled like Projects.jsx */}
        <button 
          type='button' 
          onClick={handleAddActivity}
          className='flex items-center text-sm text-[#0284c7] hover:text-[#075985] mt-2 transition-colors duration-200'
        >
          <FaPlus className='h-4 w-4 mr-1' />
          Add Activity
        </button>

        {/* Summary Box - styled like Projects.jsx */}
        <div className='mt-4 p-3 bg-yellow-50 rounded-md'>
          <p className='text-sm text-yellow-800'>
            <strong>{activities.length}</strong> extra-curricular activit{activities.length !== 1 ? 'ies' : 'y'} added.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Extracurricular;