import React from 'react'

const Skills = () => {
  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      <button className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none' onClick={() => toggleSection('skills')}>
        <span>Skills</span>
        <svg id='skills-icon' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>
      <div id='skills' className='hidden px-4 py-3 border-t border-gray-200'>
        <div className='mb-4'>
            <label htmlFor="skills-input" className='block text-sm font-medium text-gray-700 mb-1'>Skills (comma separated)</label>
            <textarea id="skills-input" rows={3} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'>JavaScript, React, Node.js</textarea>
        </div>
        <div className="flex flex-wrap gap-2 mt-2" id='skills-tags'>
            <span className='bg-[#e0f2fe] text-[#075985] text-xs font-medium px-2.5 py-0.5 rounded'>JavaScript</span>
            <span className='bg-[#e0f2fe] text-[#075985] text-xs font-medium px-2.5 py-0.5 rounded'>React</span>
            <span className='bg-[#e0f2fe] text-[#075985] text-xs font-medium px-2.5 py-0.5 rounded'>Node.js</span>
        </div>
      </div>
    </div>
  )
}

export default Skills
