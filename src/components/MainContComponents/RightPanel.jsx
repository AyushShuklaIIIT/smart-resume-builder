import React from 'react'

const RightPanel = () => {
    const skillsList = [
        'JavaScript',
        'React',
        'Node.js',
        'TypeScript',
        'Python',
        'Django',
        'SQL',
        'MongoDB',
        'Docker',
        'AWS',
        'Git',
        'CI/CD',
        'Agile Methodologies',
        'RESTful APIs',
        'GraphQL'
    ]
  return (
    <div className='w-full lg:w-1/2'>
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>Resume Preview</h2>
                <div className='flex space-x-2'>
                    <button id='export-pdf' className='flex items-center px-3 py-1.5 bg-[#0284c7] text-white text-sm font-medium rounded-md hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:ring-offset-2 transition'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 20 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z' clipRule='evenodd' />
                        </svg>
                        Export as PDF
                    </button>
                    <button id='print-resume' className='flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z' clipRule='evenodd' />
                        </svg>
                        Print
                    </button>
                </div>
            </div>
            <div className='border border-gray-200 rounded-md p-6 bg-white resume-preview' id='resume-preview'>
                <h1 id='preview-name'>John Doe</h1>
                <p id='preview-title' className='text-gray-600 font-medium'>Software Engineer</p>
                <div className='contact-info text-sm'>
                    <span id='preview-email'>john@example.com</span>
                    <span id='preview-phone'>(123) 456-7890</span>
                    <span id='preview-location'>San Francisco, CA</span>
                </div>

                <div className='section'>
                    <h2>Experience</h2>
                    <div className='item'>
                        <div className='item-header'>
                            <span>Senior Software Engineer</span>
                            <span>Tech Innovations Inc.</span>
                        </div>
                        <div className='item-subheader'>
                            <span></span>
                            <span>Mar 2020 - Present</span>
                        </div>
                        <div className='item-content'>
                            <ul>
                                <li>Led a team of 5 developers to deliver a microservices architecture that improved system performance by 40%</li>
                                <li>Implemented CI/CD pipeline reducing deployment time from days to hours</li>
                                <li>Mentored junior developers and conducted code reviews to ensure code quality</li>
                                <li>Collaborated with product managers to refine requirements and deliver features on time</li>
                            </ul>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='item-header'>
                            <span>Software Developer</span>
                            <span>WebSolutions Co.</span>
                        </div>
                        <div className='item-subheader'>
                            <span></span>
                            <span>Jun 2018 - Feb 2020</span>
                        </div>
                        <div className='item-content'>
                            <ul>
                                <li>Developed and maintained RESTful APIs serving over 10,000 daily users</li>
                                <li>Reduced database query times by 60% through optimization and indexing</li>
                                <li>Implemented responsive design principles, improving mobile user experience</li>
                                <li>Participated in agile development cycles with bi-weekly sprints</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='section'>
                    <h2>Education</h2>
                    <div className="item">
                        <div className="item-header">
                            <span>Bachelor of Science in Computer Science</span>
                            <span>University of California, Berkeley</span>
                        </div>
                        <div className="item-subheader">
                            <span></span>
                            <span>Sep 2014 - May 2018</span>
                        </div>
                        <div className="item-content">
                            <p>GPA: 3.8/4.0, Dean's List, Computer Science Student Association</p>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h2>Skills</h2>
                    <div className="skills-list">
                        {skillsList.map((skill) => {
                            return <span key={skill}>{skill}</span>
                        })}
                    </div>
                </div>

                <div className="section">
                    <h2>Projects</h2>
                    <div className="item">
                        <div className="item-header">
                            <span>E-commerce Platform</span>
                            <span>React, Node.js, MongoDB, AWS</span>
                        </div>
                        <div className="item-content">
                            <p>Developed a full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment processing. Implemented responsive design and optimized for performance.</p>
                            <p className='text-[#0284c7] text-sm mt-1'>
                                <a href="https://github.com/johndoe/ecommerce-platform" target='_blank'>https://github.com/johndoe/ecommerce-platform</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h2>Achievements</h2>
                    <ul>
                        <li>Awarded "Employee of the Year" for exceptional performance and leadership (2022)</li>
                        <li>Speaker at React Conference 2021 on "Optimizing React Applications"</li>
                        <li>Published article on Medium: "Best Practices for Modern Web Development"</li>
                        <li>Open source contributor to React and Node.js projects</li>
                    </ul>
                </div>
            </div>
        </div>      
    </div>
  )
}

export default RightPanel
