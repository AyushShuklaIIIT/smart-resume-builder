import React from 'react'

const AISuggestions = () => {
  return (
    <div id="ai-suggestions-modal" className='fixed inset-0 bg-gray-600 bg-opacity-50 items-center justify-center z-50 hidden'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col'>
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#f0f9ff]'>
            <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-[#0284c7] mr-2' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z' clipRule='evenodd' />
                </svg>
                AI Suggestions
            </h3>
            <button id='close-modal' className='text-gray-500 hover:text-gray-700'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
            </button>
        </div>
        <div className='p-6 overflow-y-auto flex-grow'>
            <div className='space-y-4'>
                <div className='suggestion-item p-4 bg-[#f0f9ff] rounded-md'>
                    <div className='flex justify-between'>
                        <h4 className='font-medium text-gray-800'>Enhance Your Professional Summary</h4>
                    </div>
                    <p className='text-gray-600 mt-1 text-sm'>Your current summary is good, but could be more impactful with specific achievements.</p>
                    <div className='mt-2 p-3 bg-white rounded border border-gray-200 text-sm'>
                        <p><span className='line-through text-gray-400'>Dedicated software engineer with 5+ years of experience in full-stack development. Passionate about creating efficient, scalable applications.</span></p>
                        <p className='text-[#0369a1] mt-2'>Results-driven software engineer with 5+ years of experience in full-stack development. Proven track record of delivering high-performance applications.</p>
                    </div>
                </div>

                <div className='suggestion-item p-4 bg-[#f0f9ff] rounded-md'>
                    <div className='flex justify-between'>
                        <h4 className='font-medium text-gray-800'>Quantify Your Experience</h4>
                    </div>
                    <p className='text-gray-600 mt-1 text-sm'>Add metrics to your first job experience to demonstrate impact.</p>
                    <div className='mt-2 p-3 bg-white rounded border border-gray-200 text-sm'>
                        <p><span className='line-through text-gray-400'>Collaborated with product managers to refine requirements and deliver features on time</span></p>
                        <p className='text-[#0369a1] mt-2'>Collaborated with product managers to refine requirements and deliver 15+ features on time, resulting in a 25% increase in user satisfaction.</p>
                    </div>
                </div>

                <div className='suggestion-item p-4 bg-[#f0f9ff] rounded-md'>
                    <div className='flex justify-between'>
                        <h4 className='font-medium text-gray-800'>Highlight Your Technical Skills</h4>
                    </div>
                    <p className='text-gray-600 mt-1 text-sm'>Incorporate more technical skills into your summary to attract attention.</p>
                    <div className='mt-2 p-3 bg-white rounded border border-gray-200 text-sm'>
                        <p><span className='line-through text-gray-400'>Experienced in JavaScript, React, and Node.js</span></p>
                        <p className='text-[#0369a1] mt-2'>Proficient in JavaScript, React, and Node.js, with a strong understanding of web development principles and best practices.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AISuggestions