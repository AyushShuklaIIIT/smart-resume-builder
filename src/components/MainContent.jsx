import React from 'react'
import LeftPanel from './MainContComponents/LeftPanel'

const MainContent = () => {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <LeftPanel></LeftPanel>
      </div>
    </main>
  )
}

export default MainContent
