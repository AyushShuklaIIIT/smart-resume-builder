import React from 'react'
import PersonalInfo from './PersonalInfo'
import Education from './Education'
import Experience from './Experience'
import Skills from './Skills'
import Projects from './Projects'
import Achievements from './Achievements'

const LeftPanel = () => {
  return (
    <div className='w-full lg:w-1/2 no-print'>
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Resume Information</h2>

        <PersonalInfo></PersonalInfo>
        <Education></Education>
        <Experience></Experience>
        <Skills></Skills>
        <Projects></Projects>
        <Achievements></Achievements>

        <div className='flex justify-center mt-6'>
          <button id='ai-suggestions-btn' type='button' className='flex items-center px-4 py-2 bg-[#0284c7] text-white font-medium rounded-md hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:ring-offset-2 transition'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 mr-2' viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z' clipRule='evenodd' />
            </svg>
            Get AI Suggestions
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
