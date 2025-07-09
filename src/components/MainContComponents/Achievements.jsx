import React, { useState, useEffect } from 'react'

const Achievements = ({ onDataChange, initialData = [] }) => {
  // State management
  const [isExpanded, setIsExpanded] = useState(false);
  const [achievements, setAchievements] = useState(
    initialData.length > 0 ? initialData : [
      {
        id: Date.now(),
        title: '',
        description: '',
        date: '',
        category: 'professional',
        organization: '',
        url: '',
        importance: 'medium'
      }
    ]
  );

  // Toggle section visibility
  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle input changes for specific achievement and field
  const handleInputChange = (achievementId, field, value) => {
    setAchievements(prevAchievements => 
      prevAchievements.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, [field]: value }
          : achievement
      )
    );
  };

  // Add new achievement
  const addAchievement = () => {
    const newAchievement = {
      id: Date.now(),
      title: '',
      description: '',
      date: '',
      category: 'professional',
      organization: '',
      url: '',
      importance: 'medium'
    };
    setAchievements([...achievements, newAchievement]);
  };

  // Remove achievement
  const removeAchievement = (achievementId) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter(achievement => achievement.id !== achievementId));
    }
  };

  // Duplicate achievement
  const duplicateAchievement = (achievementId) => {
    const achievementToDuplicate = achievements.find(a => a.id === achievementId);
    if (achievementToDuplicate) {
      const duplicatedAchievement = {
        ...achievementToDuplicate,
        id: Date.now(),
        title: `${achievementToDuplicate.title} (Copy)`,
      };
      setAchievements([...achievements, duplicatedAchievement]);
    }
  };

  // Bulk add achievements from textarea
  const handleBulkAdd = (textContent) => {
    if (textContent.trim()) {
      const achievementTitles = textContent
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);

      const newAchievements = achievementTitles.map(title => ({
        id: Date.now() + Math.random(),
        title: title,
        description: '',
        date: '',
        category: 'professional',
        organization: '',
        url: '',
        importance: 'medium'
      }));

      setAchievements([...achievements, ...newAchievements]);
    }
  };

  // Sort achievements by importance and date
  const sortAchievements = (sortBy) => {
    const sorted = [...achievements].sort((a, b) => {
      if (sortBy === 'importance') {
        const importanceOrder = { high: 3, medium: 2, low: 1 };
        return importanceOrder[b.importance] - importanceOrder[a.importance];
      } else if (sortBy === 'date') {
        return new Date(b.date || '1900-01-01') - new Date(a.date || '1900-01-01');
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
    setAchievements(sorted);
  };

  // Notify parent component of data changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(achievements);
    }
  }, [achievements, onDataChange]);

  // Form validation
  const validateAchievement = (achievement) => {
    const errors = {};
    if (!achievement.title.trim()) errors.title = 'Achievement title is required';
    if (achievement.url && !isValidUrl(achievement.url)) {
      errors.url = 'Please enter a valid URL';
    }
    return errors;
  };

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      professional: 'bg-blue-100 text-blue-800',
      academic: 'bg-green-100 text-green-800',
      technical: 'bg-purple-100 text-purple-800',
      leadership: 'bg-yellow-100 text-yellow-800',
      volunteer: 'bg-pink-100 text-pink-800',
      personal: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Get importance color
  const getImportanceColor = (importance) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[importance] || 'bg-gray-100 text-gray-800';
  };

  // Achievement categories
  const categories = [
    { value: 'professional', label: 'Professional' },
    { value: 'academic', label: 'Academic' },
    { value: 'technical', label: 'Technical' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'personal', label: 'Personal' }
  ];

  // Importance levels
  const importanceLevels = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      {/* Header with toggle button */}
      <button 
        className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none'
        onClick={toggleSection}
        type="button"
      >
        <span>Achievements ({achievements.length})</span>
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          viewBox='0 0 20 20' 
          fill='currentColor'
        >
          <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>

      {/* Collapsible content */}
      <div className={`px-4 py-3 border-t border-gray-200 ${isExpanded ? 'block' : 'hidden'}`}>
        {/* Quick actions */}
        <div className='mb-4 flex flex-wrap gap-2'>
          <button
            onClick={() => sortAchievements('importance')}
            className='px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
          >
            Sort by Importance
          </button>
          <button
            onClick={() => sortAchievements('date')}
            className='px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
          >
            Sort by Date
          </button>
          <button
            onClick={() => sortAchievements('category')}
            className='px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
          >
            Sort by Category
          </button>
        </div>

        {/* Bulk add section */}
        <div className='mb-6 p-4 bg-gray-50 rounded-md'>
          <label htmlFor="bulk-achievements" className='block text-sm font-medium text-gray-700 mb-2'>
            Quick Add (one achievement per line)
          </label>
          <textarea
            id="bulk-achievements"
            rows="3"
            placeholder="Won Best Student Award&#10;Published research paper&#10;Led team of 10 developers"
            onBlur={(e) => {
              handleBulkAdd(e.target.value);
              e.target.value = '';
            }}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
          />
          <p className='text-xs text-gray-500 mt-1'>
            Enter multiple achievements separated by new lines. They will be added as individual entries.
          </p>
        </div>

        {/* Individual achievements */}
        <div id="achievement-items">
          {achievements.map((achievement, index) => {
            const errors = validateAchievement(achievement);
            
            return (
              <div key={achievement.id} className='achievement-item mb-6 pb-6 border-b border-gray-200 last:border-b-0'>
                {/* Achievement header */}
                <div className='flex justify-between items-center mb-4'>
                  <div className='flex items-center space-x-3'>
                    <h4 className='font-semibold text-gray-800'>
                      Achievement {index + 1}
                      {achievement.title && ` - ${achievement.title.substring(0, 30)}${achievement.title.length > 30 ? '...' : ''}`}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(achievement.category)}`}>
                      {achievement.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getImportanceColor(achievement.importance)}`}>
                      {achievement.importance}
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <button
                      onClick={() => duplicateAchievement(achievement.id)}
                      className='text-blue-500 hover:text-blue-700 text-sm'
                      title='Duplicate achievement'
                    >
                      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M4 4v12h12V4H4zm8 10H6v-2h6v2zm0-3H6V9h6v2zm0-3H6V6h6v2z' />
                      </svg>
                    </button>
                    {achievements.length > 1 && (
                      <button
                        onClick={() => removeAchievement(achievement.id)}
                        className='text-red-500 hover:text-red-700 text-sm'
                        title='Remove achievement'
                      >
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Achievement form */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Title */}
                  <div className='md:col-span-2'>
                    <label htmlFor={`title-${achievement.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Achievement Title *
                    </label>
                    <input
                      type="text"
                      id={`title-${achievement.id}`}
                      value={achievement.title || ''}
                      onChange={(e) => handleInputChange(achievement.id, 'title', e.target.value)}
                      placeholder="e.g., Won Best Student Award, Published Research Paper"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.title && (
                      <p className='text-red-500 text-xs mt-1'>{errors.title}</p>
                    )}
                  </div>

                  {/* Organization */}
                  <div>
                    <label htmlFor={`organization-${achievement.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Organization/Institution
                    </label>
                    <input
                      type="text"
                      id={`organization-${achievement.id}`}
                      value={achievement.organization || ''}
                      onChange={(e) => handleInputChange(achievement.id, 'organization', e.target.value)}
                      placeholder="e.g., University, Company, Organization"
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor={`date-${achievement.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Date
                    </label>
                    <input
                      type="month"
                      id={`date-${achievement.id}`}
                      value={achievement.date || ''}
                      onChange={(e) => handleInputChange(achievement.id, 'date', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor={`category-${achievement.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Category
                    </label>
                    <select
                      id={`category-${achievement.id}`}
                      value={achievement.category}
                      onChange={(e) => handleInputChange(achievement.id, 'category', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Importance */}
                  <div>
                    <label htmlFor={`importance-${achievement.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Importance
                    </label>
                    <select
                      id={`importance-${achievement.id}`}
                      value={achievement.importance}
                      onChange={(e) => handleInputChange(achievement.id, 'importance', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    >
                      {importanceLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* URL */}
                  <div className='md:col-span-2'>
                    <label htmlFor={`url-${achievement.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      URL/Link (optional)
                    </label>
                    <input
                      type="url"
                      id={`url-${achievement.id}`}
                      value={achievement.url || ''}
                      onChange={(e) => handleInputChange(achievement.id, 'url', e.target.value)}
                      placeholder="https://example.com/achievement"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] ${
                        errors.url ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.url && (
                      <p className='text-red-500 text-xs mt-1'>{errors.url}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className='md:col-span-2'>
                    <label htmlFor={`description-${achievement.id}`} className='block text-sm font-medium text-gray-700 mb-1'>
                      Description
                    </label>
                    <textarea
                      id={`description-${achievement.id}`}
                      rows="3"
                      value={achievement.description || ''}
                      onChange={(e) => handleInputChange(achievement.id, 'description', e.target.value)}
                      placeholder="Describe the achievement, its significance, and impact..."
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Achievement Button */}
        <button 
          type='button' 
          onClick={addAchievement}
          className='flex items-center text-sm text-[#0284c7] hover:text-[#075985] mt-4 transition-colors duration-200'
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule='evenodd' />
          </svg>
          Add Achievement
        </button>

        {/* Achievements summary */}
        <div className='mt-4 p-3 bg-yellow-50 rounded-md'>
          <div className='flex justify-between items-center mb-2'>
            <p className='text-sm text-yellow-700'>
              <strong>{achievements.length}</strong> achievement{achievements.length !== 1 ? 's' : ''} added
            </p>
            <div className='flex space-x-2'>
              {categories.map(cat => {
                const count = achievements.filter(a => a.category === cat.value).length;
                return count > 0 ? (
                  <span key={cat.value} className={`text-xs px-2 py-1 rounded ${getCategoryColor(cat.value)}`}>
                    {cat.label}: {count}
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

export default Achievements;