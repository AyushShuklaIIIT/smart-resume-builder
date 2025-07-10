import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-white border-t border-gray-200 py-6 no-print'>
      <div className='container mx-auto p-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='mb-4 md:mb-0'>
                <p className='text-gray-600 text-sm'>&copy; 2025 Smart Resume Builder. All rights reserved.</p>
            </div>
            <div className='flex space-x-6'>
                <a href="#" className='text-gray-600 hover:text-[#0284c7] transition'>Privacy Policy</a>
                <a href="#" className='text-gray-600 hover:text-[#0284c7] transition'>Terms of Service</a>
                <a href="#" className='text-gray-600 hover:text-[#0284c7] transition'>Contact</a>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
