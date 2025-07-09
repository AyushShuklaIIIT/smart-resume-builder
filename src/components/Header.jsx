import React from 'react'

const Header = () => {
    return (
        <header className='bg-white shadow-sm sticky top-0 z-10 no-print'>
            <div className='container mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center'>
                <div className='flex items-center mb-4 sm:mb-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0284c7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586L18 8.414V19a2 2 0 01-2 2z" />
                    </svg>
                    <h1 className='text-xl font-bold text-gray-800'>Smart Resume Builder</h1>
                </div>
                <nav>
                    <ul className='flex space-x-6'>
                        <li><a href="#" className='text-[#0284c7] font-medium'>Home</a></li>
                        <li><a href="#" className='text-gray-600 hover:text-[#0284c7] transition'>My Resumes</a></li>
                        <li><a href="#" className='text-gray-600 hover:text-[#0284c7] transition'>About</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
