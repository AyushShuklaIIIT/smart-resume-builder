import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSkill, removeSkill, addBulkSkills } from '../../store/slices/skillsSlice';

const Skills = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('technical');
  const [newSkill, setNewSkill] = useState('');

  const dispatch = useAppDispatch();
  const skillsData = useAppSelector((state) => state.skills);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddSkill = (category = activeCategory) => {
    if (newSkill.trim() && !skillsData[category].includes(newSkill.trim())) {
      dispatch(addSkill({ category, skill: newSkill.trim() }));
      setNewSkill('');
    }
  };

  // Remove skill from specific category
  const handleRemoveSkill = (category, skillToRemove) => {
    dispatch(removeSkill({ category, skill: skillToRemove }));
  };

  // Handle bulk skills input (comma-separated)
  const handleBulkSkillsInput = (category, inputValue) => {
    if (inputValue.trim()) {
      const skills = inputValue
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill && !skillsData[category].includes(skill));

      if (skills.length > 0) {
        dispatch(addBulkSkills({ category, skills }));
      }
    }
  };

  // Handle Enter key to add skill
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Skill categories configuration
  const skillCategories = [
    {
      id: 'technical',
      label: 'Technical Skills',
      placeholder: 'e.g., Web Development, Data Analysis, Machine Learning',
      description: 'Technical domains and specializations'
    },
    {
      id: 'programming',
      label: 'Programming Languages',
      placeholder: 'e.g., JavaScript, Python, Java, C++',
      description: 'Programming languages you know'
    },
    {
      id: 'tools',
      label: 'Tools & Technologies',
      placeholder: 'e.g., React, Node.js, MongoDB, AWS',
      description: 'Frameworks, libraries, and tools'
    },
    {
      id: 'soft',
      label: 'Soft Skills',
      placeholder: 'e.g., Leadership, Communication, Problem Solving',
      description: 'Interpersonal and professional skills'
    },
    {
      id: 'languages',
      label: 'Languages',
      placeholder: 'e.g., English (Native), Spanish (Fluent)',
      description: 'Spoken languages and proficiency'
    }
  ];

  // Get total skills count
  const getTotalSkills = () => {
    return Object.values(skillsData).reduce((total, skills) => total + skills.length, 0);
  };

  // Get skill level color
  const getSkillColor = (category) => {
    const colors = {
      technical: 'bg-blue-100 text-blue-800',
      programming: 'bg-green-100 text-green-800',
      tools: 'bg-purple-100 text-purple-800',
      soft: 'bg-yellow-100 text-yellow-800',
      languages: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      {/* Header with toggle button */}
      <button
        className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none'
        onClick={toggleSection}
        type="button"
      >
        <span>Skills ({getTotalSkills()})</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>

      {/* Collapsible content */}
      <div className={`px-4 py-3 border-t border-gray-200 ${isExpanded ? 'block' : 'hidden'}`}>
        {/* Category tabs */}
        <div className='mb-4'>
          <div className='flex flex-wrap gap-2 mb-3'>
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === category.id
                    ? 'bg-[#0ea5e9] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.label} ({skillsData[category.id].length})
              </button>
            ))}
          </div>
          <p className='text-sm text-gray-600'>
            {skillCategories.find(cat => cat.id === activeCategory)?.description}
          </p>
        </div>

        {/* Add skill input */}
        <div className='mb-4'>
          <label htmlFor="skill-input" className='block text-sm font-medium text-gray-700 mb-1'>
            Add to {skillCategories.find(cat => cat.id === activeCategory)?.label}
          </label>
          <div className='flex gap-2'>
            <input
              type="text"
              id="skill-input"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={skillCategories.find(cat => cat.id === activeCategory)?.placeholder}
              className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
            />
            <button
              onClick={() => handleAddSkill()}
              disabled={!newSkill.trim()}
              className='px-4 py-2 bg-[#0ea5e9] text-white rounded-md hover:bg-[#0284c7] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
            >
              Add
            </button>
          </div>
        </div>

        {/* Bulk add */}
        <div className='mb-4'>
          <label htmlFor="bulk-skills-input" className='block text-sm font-medium text-gray-700 mb-1'>
            Or add multiple skills (comma-separated)
          </label>
          <textarea
            id="bulk-skills-input"
            rows={2}
            placeholder="JavaScript, React, Node.js, MongoDB"
            onBlur={(e) => {
              handleBulkSkillsInput(activeCategory, e.target.value);
              e.target.value = '';
            }}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
          />
        </div>

        {/* Skills display for active category */}
        <div className='mb-4'>
          <h4 className='text-sm font-medium text-gray-700 mb-2'>
            {skillCategories.find(cat => cat.id === activeCategory)?.label}
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillsData[activeCategory].map((skill) => (
              <span
                key={skill}
                className={`${getSkillColor(activeCategory)} text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1`}
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(activeCategory, skill)}
                  className='ml-1 text-current hover:bg-black hover:bg-opacity-10 rounded-full p-0.5'
                  title='Remove skill'
                >
                  <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                  </svg>
                </button>
              </span>
            ))}
            {skillsData[activeCategory].length === 0 && (
              <p className='text-gray-500 text-sm italic'>No skills added yet</p>
            )}
          </div>
        </div>

        {/* All skills overview */}
        <div className='mt-6 p-4 bg-gray-50 rounded-md'>
          <h4 className='text-sm font-medium text-gray-700 mb-3'>Skills Overview</h4>
          <div className='space-y-3'>
            {skillCategories.map((category) => (
              skillsData[category.id].length > 0 && (
                <div key={category.id}>
                  <h5 className='text-xs font-medium text-gray-600 mb-1'>{category.label}</h5>
                  <div className='flex flex-wrap gap-1'>
                    {skillsData[category.id].map((skill) => (
                      <span
                        key={skill}
                        className={`${getSkillColor(category.id)} text-xs px-2 py-0.5 rounded`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
          {getTotalSkills() === 0 && (
            <p className='text-gray-500 text-sm italic'>No skills added yet</p>
          )}
        </div>

        {/* Skills statistics */}
        <div className='mt-4 p-3 bg-blue-50 rounded-md'>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-blue-700'>
              <strong>Total Skills:</strong> {getTotalSkills()}
            </p>
            <div className='flex space-x-4 text-xs text-blue-600'>
              {skillCategories.map((category) => (
                <span key={category.id}>
                  {category.label}: {skillsData[category.id].length}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;