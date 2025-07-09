import React from 'react'

const Projects = () => {
    const projectsArr = [
        {
            label: "Project Name",
            placeholder: "Enter project name",
            type: "text",
            id: "project-name"
        },
        {
            label: "Technologies",
            placeholder: "Enter technologies used",
            type: "text",
            id: "project-technologies"
        },
        {
            label: "URL (optional)",
            placeholder: "Enter project URL",
            type: "url",
            id: "project-url"
        }
    ]
  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      <button className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none' onClick={() => toggleSection('projects')}>
        <span>Projects</span>
        <svg id='projects-icon' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>
      <div id='projects' className='hidden px-4 py-3 border-t border-gray-200'>
        <div id="project-items">
            <div className='project-item mb-4 pb-4 border-b border-gray-200'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {projectsArr.map((item) => (
                        <div key={item.id}>
                            <label htmlFor={item.id} className='block text-sm font-medium text-gray-700 mb-1'>{item.label}</label>
                            <input type={item.type} id={item.id} placeholder={item.placeholder} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' />
                        </div>
                    ))}
                    <div className='md:col-span-2'>
                        <label htmlFor="project-description" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                        <textarea id="project-description" rows={3} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' placeholder='Enter project description'></textarea>
                    </div>
                </div>
            </div>
        </div>
        <button type='button' className='flex items-center text-sm text-[#0284c7] hover:text-[#075985] mt-2'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule="evenodd" />
            </svg>
            Add Project
        </button>
      </div>
    </div>
  )
}

export default Projects
