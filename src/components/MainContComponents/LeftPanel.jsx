import React from 'react'
import PersonalInfo from './PersonalInfo'
import Education from './Education'
import Experience from './Experience'
import Skills from './Skills'

const LeftPanel = () => {
  return (
    <div className='w-full lg:w-1/2 no-print'>
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Resume Information</h2>
        <PersonalInfo></PersonalInfo>
        <Education></Education>
        <Experience></Experience>
        <Skills></Skills>
      </div>
    </div>
  )
}

export default LeftPanel
