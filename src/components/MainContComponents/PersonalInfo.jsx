import React from 'react'

const PersonalInfo = () => {
    const personalInfoArr = [
        {
            id: "fullName",
            placeholder: "John Doe",
            label: "Full Name",
            type: "text"
        },
        {
            id: "jobTitle",
            placeholder: "Software Engineer",
            label: "Job Title",
            type: "text"
        },
        {
            id: "email",
            placeholder: "john@example.com",
            label: "Email",
            type: "email"
        },
        {
            id: "phone",
            placeholder: "xxxxx xxxxx",
            label: "Phone",
            type: "tel"
        },
    ]
  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      <button className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none' onClick={toggleSection('personal-info')}>
        <span>Personal Information</span>
        <svg id='personal-info-icon' xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 transform rotate-180' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>
      <div id='personal-info' className='px-4 py-3 border-t border-gray-200'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {personalInfoArr.map((info) => (
                <div key={info.id}>
                    <label htmlFor={info.id} className='block text-sm font-medium text-gray-700 mb-1'>{info.label}</label>
                    <input type={info.type} id={info.id} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' placeholder={info.placeholder} />
                </div>
            ))}
            <div className='md:col-span-2'>
                <label htmlFor="location" className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                <input type="text" id='location' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' placeholder="City, State" />
            </div>
            <div className='md:col-span-2'>
                <label htmlFor="summary" className='block text-sm font-medium text-gray-700 mb-1'>Professional Summary</label>
                <textarea id="summary" rows={3} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' placeholder='Brief professional summary'></textarea>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
