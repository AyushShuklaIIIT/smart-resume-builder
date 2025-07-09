import React from 'react'

const Education = () => {
    const educationItems = [
        {
            id: "institution",
            label: "Institution",
            type: "text",
            placeholder: "Enter institution name",
        },
        {
            id: "degree",
            label: "Degree",
            type: "text",
            placeholder: "Enter degree",
        },
        {
            id: "startDate",
            label: "Start Date",
            type: "month",
            placeholder: "Select start date",
        },
        {
            id: "endDate",
            label: "End Date",
            type: "month",
            placeholder: "Select end date",
        }
    ]
  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      <button className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none'>
        <span>Education</span>
        <svg id='education-icon' xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>
      <div id="education" className='hidden px-4 py-3 border-t border-gray-200'>
        <div id="education-items">
            <div className="education-item mb-4 pb-4 border-b border-gray-200">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {educationItems.map((item) => (
                        <div key={item.id}>
                            <label htmlFor={item.id} className='block text-sm font-medium text-gray-700 mb-1'>{item.label}</label>
                            <input
                                id={item.id}
                                type={item.type}
                                placeholder={item.placeholder}
                                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]'
                            />
                        </div>
                    ))}
                    <div className='md:col-span-2'>
                        <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                        <textarea id="description" rows={2} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' placeholder="GPA: 3.8/4.0, Dean's List, Computer Science Student Association"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <button type='button' className='flex items-center text-sm text-[#0284c7] hover:text-[#075985] mt-2'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M10 5a1 1 0 011 1v3ha1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule="evenodd" />
            </svg>
            Add Education
        </button>
      </div>
    </div>
  )
}

export default Education
