import React from 'react'

const Achievements = () => {
  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      <button className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none' onClick={() => toggleSection('achievements')}>
        <span>Achievements</span>
        <svg id='achievements-icon' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>
      <div id="achievements" className='hidden px-4 py-3 border-t border-gray-200'>
        <div id="achievement-items">
            <div className='achievement-item mb-4'>
                <div className='grid grid-cols-1 gap-4'>
                    <div>
                        <label htmlFor="achievement-title" className='block text-sm font-medium text-gray-700'>Achievements (one per line)</label>
                        <textarea id="achievement-title" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" placeholder='Enter your achievements here...'></textarea>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Achievements
